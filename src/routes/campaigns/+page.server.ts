import type { PageServerLoad } from './$types';
import { findCurrentParticipant } from '$lib/site/active-campaigns';
import { fetchCampaignGroups } from '$lib/server/sheets';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'private, no-cache' });

	const { groups, source } = await fetchCampaignGroups();
	const participant = findCurrentParticipant(groups);

	return {
		groups,
		source,
		featuredId: participant?.id ?? null
	};
};
