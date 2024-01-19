const ExchangeNotes = [100, 50, 20, 10];

type Note = string;

export function getEx(withdrawAmount: number) {
	let amountRemaining = withdrawAmount;

	const exchangeToWithdraw = new Map<Note, number>();
	let i = 0;

	while (amountRemaining > 0) {
		const note = ExchangeNotes[i];
		const noteStr = String(note);

		const noteCount = exchangeToWithdraw.get(noteStr) ?? 0;

		if (amountRemaining >= note) {
			exchangeToWithdraw.set(noteStr, noteCount + 1);
			amountRemaining -= note;

			// continue é tipo o return do while, ele para o código aqui voltando para o loop
			// sem deixar o resto do código continuar
			continue;
		}

		i++;

		if (i >= ExchangeNotes.length) {
			console.log('valor deu merda');
			break;
		}
	}

	return Object.fromEntries(exchangeToWithdraw.entries());
}
