export interface CampaignSpendingItem {
	title: string;
	description: string;
}

export interface CampaignParticipant {
	id: string;
	name: string;
	goal: number;
	collected: number;
	completed: boolean;
	title?: string;
	story?: string;
	location?: string;
	cardNumber?: string;
	bank?: string;
	spending?: CampaignSpendingItem[];
	updatedAt?: string;
}

export interface CampaignGroup {
	id: string;
	title: string;
	participants: CampaignParticipant[];
}

function parseCompleted(value: string | undefined, collected: number, goal: number): boolean {
	if (value?.trim()) {
		const normalized = value.trim().toLowerCase();
		if (['true', '1', 'да', 'yes', 'y'].includes(normalized)) return true;
		if (['false', '0', 'нет', 'no', 'n'].includes(normalized)) return false;
	}

	return collected >= goal;
}

function parseRequiredNumber(value: string | undefined): number {
	const raw = String(value ?? '')
		.trim()
		.replace(/\s/g, '');
	if (!raw) return NaN;

	const parsed = Number(raw);
	return Number.isNaN(parsed) ? NaN : parsed;
}

function parseOptionalNumber(value: string | undefined, fallback: number): number {
	const raw = String(value ?? '')
		.trim()
		.replace(/\s/g, '');
	if (!raw) return fallback;

	const parsed = Number(raw);
	return Number.isNaN(parsed) ? fallback : parsed;
}

/**
 * Строки таблицы без заголовка:
 * name | collected | goal | group | sort_order | completed | title | story | location | card_number | bank | spending | updated_at
 *
 * spending — несколько строк в одной ячейке: «Заголовок: описание» (каждая статья с новой строки)
 */
export function parseSpendingCell(value: string | undefined): CampaignSpendingItem[] | undefined {
	if (!value?.trim()) return undefined;

	const items: CampaignSpendingItem[] = [];

	for (const line of value.split(/\n/)) {
		const trimmed = line.trim();
		if (!trimmed) continue;

		const colonIndex = trimmed.indexOf(':');
		if (colonIndex === -1) {
			items.push({ title: trimmed, description: '' });
			continue;
		}

		items.push({
			title: trimmed.slice(0, colonIndex).trim(),
			description: trimmed.slice(colonIndex + 1).trim()
		});
	}

	return items.length > 0 ? items : undefined;
}

export function parseSheetRows(rows: string[][]): CampaignGroup[] {
	const entries: {
		participant: CampaignParticipant;
		group: number;
		sortOrder: number;
	}[] = [];

	for (const [index, row] of rows.entries()) {
		const name = String(row[0] ?? '').trim();
		if (!name) continue;

		const collected = parseRequiredNumber(row[1]);
		const goal = parseRequiredNumber(row[2]);
		if (Number.isNaN(collected) || Number.isNaN(goal) || goal <= 0) continue;

		const group = parseOptionalNumber(row[3], 1);
		if (group < 1) continue;

		const sortOrder = parseOptionalNumber(row[4], index + 1);

		entries.push({
			participant: {
				id: `participant-${entries.length + 1}`,
				name,
				collected,
				goal,
				completed: parseCompleted(row[5], collected, goal),
				title: String(row[6] ?? '').trim() || undefined,
				story: String(row[7] ?? '').trim() || undefined,
				location: String(row[8] ?? '').trim() || undefined,
				cardNumber: String(row[9] ?? '').trim() || undefined,
				bank: String(row[10] ?? '').trim() || undefined,
				spending: parseSpendingCell(row[11]),
				updatedAt: String(row[12] ?? '').trim() || undefined
			},
			group,
			sortOrder
		});
	}

	entries.sort((a, b) => a.group - b.group || a.sortOrder - b.sortOrder);

	const byGroup = new Map<number, CampaignParticipant[]>();

	for (const entry of entries) {
		const list = byGroup.get(entry.group) ?? [];
		list.push(entry.participant);
		byGroup.set(entry.group, list);
	}

	return [...byGroup.entries()]
		.sort(([a], [b]) => a - b)
		.map(([groupNumber, participants]) => ({
			id: `group-${groupNumber}`,
			title: `Группа ${groupNumber}`,
			participants
		}));
}

/** Разбирает CSV с учётом кавычек и переносов строк внутри ячеек (RFC 4180). */
export function parseCsvRows(csv: string): string[][] {
	const text = csv.replace(/^\uFEFF/, '');
	const rows: string[][] = [];
	let row: string[] = [];
	let field = '';
	let inQuotes = false;

	const pushField = () => {
		row.push(field.trim());
		field = '';
	};

	const pushRow = () => {
		if (row.length > 0 && row.some((cell) => cell.length > 0)) {
			rows.push(row);
		}
		row = [];
	};

	for (let i = 0; i < text.length; i += 1) {
		const char = text[i];

		if (inQuotes) {
			if (char === '"') {
				if (text[i + 1] === '"') {
					field += '"';
					i += 1;
				} else {
					inQuotes = false;
				}
			} else {
				field += char;
			}
			continue;
		}

		if (char === '"') {
			inQuotes = true;
		} else if (char === ',') {
			pushField();
		} else if (char === '\r') {
			if (text[i + 1] === '\n') i += 1;
			pushField();
			pushRow();
		} else if (char === '\n') {
			pushField();
			pushRow();
		} else {
			field += char;
		}
	}

	pushField();
	pushRow();

	return rows;
}

/** Парсит CSV из опубликованной Google Таблицы (первая строка-заголовок пропускается). */
export function parseSheetCsv(csv: string): CampaignGroup[] {
	const rows = parseCsvRows(csv);

	if (rows.length > 0 && isHeaderRow(rows[0])) {
		rows.shift();
	}

	return parseSheetRows(rows);
}

function isHeaderRow(row: string[]): boolean {
	const first = String(row[0] ?? '')
		.trim()
		.toLowerCase();
	return ['name', 'имя', 'участник', 'participant', 'fio', 'фио'].includes(first);
}

export function flattenParticipantsInOrder(groups: CampaignGroup[]): CampaignParticipant[] {
	return groups.flatMap((group) => group.participants);
}

/** Первый участник в порядке списка, у которого сбор ещё не завершён. */
export function findCurrentParticipant(
	groups: CampaignGroup[]
): (CampaignParticipant & { collected: number }) | null {
	for (const participant of flattenParticipantsInOrder(groups)) {
		if (!participant.completed) {
			return { ...participant, collected: participant.collected, completed: false };
		}
	}

	return null;
}
