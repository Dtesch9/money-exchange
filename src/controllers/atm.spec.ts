import { test } from 'vitest';
import app from '..';

test('Should retrieve the right exchange', async ({ expect }) => {
	const fixture = [
		{ amount: '10', toExpect: [{ '10': 1 }] },
		{ amount: '20', toExpect: [{ '20': 1 }] },
		{ amount: '30', toExpect: [{ '20': 1 }, { '10': 1 }] },
		{ amount: '40', toExpect: [{ '20': 2 }] },
		{ amount: '50', toExpect: [{ '50': 1 }] },
		{ amount: '250', toExpect: [{ '100': 2 }, { '50': 1 }] },
		{ amount: '270', toExpect: [{ '100': 2 }, { '50': 1 }, { '20': 1 }] },
		{ amount: '230', toExpect: [{ '100': 2 }, { '20': 1 }, { '10': 1 }] },
		{ amount: '130', toExpect: [{ '100': 1 }, { '20': 1 }, { '10': 1 }] },
	];

	for (const { amount, toExpect } of fixture) {
		const response = await app.inject({
			method: 'POST',
			url: `/withdraw/${amount}`,
		});

		expect(JSON.parse(response.payload)).toEqual({ withdraw: toExpect });
	}
});

test('Should retrieve the right exchange', async ({ expect }) => {
	const fixture = {
		'10': [{ '10': 1 }],
		'20': [{ '20': 1 }],
		'30': [{ '20': 1 }, { '10': 1 }],
		'40': [{ '20': 2 }],
		'50': [{ '50': 1 }],
		'250': [{ '100': 2 }, { '50': 1 }],
		'270': [{ '100': 2 }, { '50': 1 }, { '20': 1 }],
		'230': [{ '100': 2 }, { '20': 1 }, { '10': 1 }],
		'130': [{ '100': 1 }, { '20': 1 }, { '10': 1 }],
	};

	const ops = Object.entries(fixture).map(async ([amount, notes]) => {
		const response = await app.inject({
			method: 'POST',
			url: `/withdraw/${amount}`,
		});

		return {
			response,
			expectedNotes: notes,
		};
	});

	for await (const { response, expectedNotes } of ops) {
		expect(JSON.parse(response.payload)).toEqual({ withdraw: expectedNotes });
	}

	Promise.all(ops);
});
