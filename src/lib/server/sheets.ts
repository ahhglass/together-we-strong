import { env } from '$env/dynamic/private';
import { parseSheetCsv, type CampaignGroup } from '$lib/site/active-campaigns';
import { CAMPAIGN_REFRESH_MS } from '$lib/site/config';

export type CampaignDataSource = 'csv' | 'unavailable';

let cache: { data: CampaignGroup[]; source: 'csv'; at: number } | null = null;

function csvConfigured(): boolean {
	return Boolean(
		env.GOOGLE_SHEET_CSV_URL ||
		(env.GOOGLE_SHEET_ID && (env.GOOGLE_SHEET_GID || env.GOOGLE_SHEET_TAB))
	);
}

function buildCsvUrl(): string | null {
	if (env.GOOGLE_SHEET_CSV_URL) return env.GOOGLE_SHEET_CSV_URL;

	if (env.GOOGLE_SHEET_ID && env.GOOGLE_SHEET_GID) {
		return `https://docs.google.com/spreadsheets/d/${env.GOOGLE_SHEET_ID}/export?format=csv&gid=${env.GOOGLE_SHEET_GID}`;
	}

	if (env.GOOGLE_SHEET_ID && env.GOOGLE_SHEET_TAB) {
		return `https://docs.google.com/spreadsheets/d/${env.GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(env.GOOGLE_SHEET_TAB)}`;
	}

	return null;
}

async function fetchPublishedCsv(): Promise<CampaignGroup[]> {
	const url = buildCsvUrl();
	if (!url) throw new Error('CSV URL not configured');

	const response = await fetch(url, { redirect: 'follow' });
	if (!response.ok) {
		throw new Error(`Google Sheet CSV error: ${response.status}`);
	}

	const csv = await response.text();
	const groups = parseSheetCsv(csv);

	if (groups.length === 0) {
		throw new Error('CSV returned no participants');
	}

	return groups;
}

function useUnavailable(): { groups: CampaignGroup[]; source: 'unavailable' } {
	return { groups: [], source: 'unavailable' };
}

export async function fetchCampaignGroups(): Promise<{
	groups: CampaignGroup[];
	source: CampaignDataSource;
	fetchedAt: Date | null;
}> {
	if (cache && Date.now() - cache.at < CAMPAIGN_REFRESH_MS) {
		return { groups: cache.data, source: 'csv', fetchedAt: new Date(cache.at) };
	}

	if (!csvConfigured()) {
		return { ...useUnavailable(), fetchedAt: null };
	}

	try {
		const groups = await fetchPublishedCsv();
		const fetchedAt = new Date();
		cache = { data: groups, source: 'csv', at: fetchedAt.getTime() };
		return { groups, source: 'csv', fetchedAt };
	} catch (error) {
		console.error('Failed to load Google Sheet CSV:', error);
		return { ...useUnavailable(), fetchedAt: null };
	}
}
