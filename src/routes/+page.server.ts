import type { PageServerLoad } from './$types';
import { findCurrentParticipant } from '$lib/site/active-campaigns';
import { buildCampaignForParticipant } from '$lib/site/campaign';
import { fetchCampaignGroups } from '$lib/server/sheets';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Не кэшируем в браузере — иначе при client-side navigation остаётся stale unavailable.
	setHeaders({ 'cache-control': 'private, no-cache' });

	const { groups, source } = await fetchCampaignGroups();
	const participant = findCurrentParticipant(groups);

	return {
		source,
		campaign: participant ? buildCampaignForParticipant(participant) : null
	};
};
