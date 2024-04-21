import { Cell } from "../main";

describe('findMinMaxDisplaySize method', () => {
  test('should return the largest and smallest display size with their respective models', () => {
    const cell = new Cell();

    const cellsMap = new Map();
    cellsMap.set(1, { getDisplaySize: () => '5.8 inches', getModel: () => 'Model A' });
    cellsMap.set(2, { getDisplaySize: () => '6.1 inches', getModel: () => 'Model B' });
    cellsMap.set(3, { getDisplaySize: () => '6.5 inches', getModel: () => 'Model C' });
    cellsMap.set(4, { getDisplaySize: () => '6.1 inches', getModel: () => 'Model D' });

    const { largestDisplaySize, smallestDisplaySize } = cell.findMinMaxDisplaySize(cellsMap);

    // expect the method returns the expected largest and smallest display sizes with their respective models
    expect(largestDisplaySize.size).toBe(6.5);
    expect(largestDisplaySize.model).toBe('Model C');
    expect(smallestDisplaySize.size).toBe(5.8);
    expect(smallestDisplaySize.model).toBe('Model A');
  });
});