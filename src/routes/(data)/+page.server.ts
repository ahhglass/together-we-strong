import type { PageServerLoad } from './$types';
import { findCurrentParticipant } from '$lib/site/active-campaigns';
import { buildCampaignForParticipant } from '$lib/site/campaign';

export const load: PageServerLoad = async ({ parent }) => {
	const { groups, dataUpdatedAt } = await parent();
	const participant = findCurrentParticipant(groups);

	return {
		campaign: participant ? buildCampaignForParticipant(participant, dataUpdatedAt) : null
	};
};
