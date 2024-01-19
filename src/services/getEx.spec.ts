import { test, expect } from 'vitest';
import { getEx } from './getEx';

test('Pega no meu com força lá ele', () => {
  expect(getEx(10)).toEqual({ '10': 1 });
  expect(getEx(20)).toEqual({ '20': 1 });
  expect(getEx(30)).toEqual({ '20': 1, '10': 1 });
  expect(getEx(40)).toEqual({ '20': 2 });
  expect(getEx(50)).toEqual({ '50': 1 });

  expect(getEx(250)).toEqual({ '100': 2, '50': 1 });
  expect(getEx(270)).toEqual({ '100': 2, '50': 1, '20': 1 });
  expect(getEx(230)).toEqual({ '100': 2, '20': 1, '10': 1 });
  expect(getEx(130)).toEqual({ '100': 1, '20': 1, '10': 1 });
});
