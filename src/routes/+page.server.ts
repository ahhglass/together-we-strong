import type { PageServerLoad } from './$types';
import { findCurrentParticipant } from '$lib/site/active-campaigns';
import { buildCampaignForParticipant } from '$lib/site/campaign';
import { fetchCampaignGroups } from '$lib/server/sheets';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'public, max-age=300, stale-while-revalidate=60' });

	const { groups, source } = await fetchCampaignGroups();
	const participant = findCurrentParticipant(groups);

	return {
		source,
		campaign: participant ? buildCampaignForParticipant(participant) : null
	};
};
