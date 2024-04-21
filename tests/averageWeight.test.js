import { Cell } from "../main";

describe('averageWeight method', () => {
  test('should return the average weight of phones from the provided cells map', () => {
    const cell = new Cell();

    const cellsMap = new Map();
    cellsMap.set(1, { getBodyWeight: () => '150 g' }); // valid weight
    cellsMap.set(2, { getBodyWeight: () => '200 g' }); // valid weight
    cellsMap.set(3, { getBodyWeight: () => 'invalid' }); // invalid weight
    cellsMap.set(4, { getBodyWeight: () => '180 g' }); // valid weight

    const averageWeight = cell.averageWeight(cellsMap);

    // expect the average weight is calculated correctly
    expect(averageWeight).toBe(177.5); // (150 + 200 + 180) / 3 = 530 / 3 = 177.5
  });

});