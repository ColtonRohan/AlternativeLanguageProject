import { Cell } from "../main";

describe('allOEMs method', () => {
  test('should return counts of all specific OEMs from the provided cells map', () => {
    const cell = new Cell();

    const cellsMap = new Map();
    cellsMap.set(1, { getOem: () => 'Apple' });
    cellsMap.set(2, { getOem: () => 'Samsung' });
    cellsMap.set(3, { getOem: () => 'Apple' });
    cellsMap.set(4, { getOem: () => 'Google' });

    const allOEMs = cell.allOEMs(cellsMap);

    // expect the count of each specific OEM is as expected
    expect(allOEMs).toEqual({
      'Apple': 2,
      'Samsung': 1,
      'Google': 1
    });
  });

});