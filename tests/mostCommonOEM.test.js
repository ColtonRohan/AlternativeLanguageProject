import { Cell } from "../main";

describe('mostCommonOEM method', () => {
  test('should return the most common OEM from the provided cells map', () => {
    const cell = new Cell();

    // cells map with sample data
    const cellsMap = new Map();
    cellsMap.set(1, { getOem: () => 'Apple' });
    cellsMap.set(2, { getOem: () => 'Samsung' });
    cellsMap.set(3, { getOem: () => 'Apple' });
    cellsMap.set(4, { getOem: () => 'Google' });

    const mostCommonOEM = cell.mostCommonOEM(cellsMap);

    expect(mostCommonOEM).toBe('Apple');
  });

});