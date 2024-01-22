// @todo: Make sure exchanges are ordered
const ExchangeNotes = [100, 50, 20, 10];

type Note = string;
export type ExchangeReturn = ReturnType<typeof getExchangeNotes>;
// Test this with vitest
export function getExchangeNotes(withdrawAmount: number) {
	let amountRemaining = withdrawAmount;

	const exchangeToWithdraw: Array<Record<Note, number>> = [];

	for (const note of ExchangeNotes) {
		const noteCount = Math.floor(amountRemaining / note);

		if (noteCount > 0) {
			exchangeToWithdraw.push({ [String(note)]: noteCount });
			amountRemaining %= note;
		}

		if (amountRemaining === 0) {
			break;
		}
	}

	return { withdraw: exchangeToWithdraw };
}
