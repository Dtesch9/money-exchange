import { describe, it, expect } from 'vitest';
import { getExchangeNotes } from './getExchangeNotes';

describe('Should return exchange with the minimum notes possible', () => {
  it('Should return', () => {
    expect(getExchangeNotes(10).withdraw).toEqual([{ '10': 1 }]);
    expect(getExchangeNotes(20).withdraw).toEqual([{ '20': 1 }]);
    expect(getExchangeNotes(30).withdraw).toEqual([{ '20': 1 }, { '10': 1 }]);
    expect(getExchangeNotes(40).withdraw).toEqual([{ '20': 2 }]);
    expect(getExchangeNotes(50).withdraw).toEqual([{ '50': 1 }]);

    expect(getExchangeNotes(250).withdraw).toEqual([{ '100': 2 }, { '50': 1 }]);
    expect(getExchangeNotes(270).withdraw).toEqual([{ '100': 2 }, { '50': 1 }, { '20': 1 }]);
    expect(getExchangeNotes(230).withdraw).toEqual([{ '100': 2 }, { '20': 1 }, { '10': 1 }]);
    expect(getExchangeNotes(130).withdraw).toEqual([{ '100': 1 }, { '20': 1 }, { '10': 1 }]);
  });
});