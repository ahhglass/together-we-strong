import type { LayoutServerLoad } from './$types';
import { findCurrentParticipant } from '$lib/site/active-campaigns';
import { formatUpdatedAt } from '$lib/site/campaign';
import { fetchCampaignGroups } from '$lib/server/sheets';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	// Не кэшируем в браузере — иначе при client-side navigation остаётся stale unavailable.
	setHeaders({ 'cache-control': 'private, no-cache' });

	const { groups, source, fetchedAt } = await fetchCampaignGroups();
	const participant = findCurrentParticipant(groups);

	return {
		groups,
		source,
		featuredId: participant?.id ?? null,
		dataUpdatedAt: fetchedAt ? formatUpdatedAt(fetchedAt) : null
	};
};
