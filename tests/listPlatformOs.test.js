import { Cell } from "../main";

describe('listPlatformOs method', () => {
  test('should list platform OS and their totals', () => {
    const cell = new Cell();

    const cellsMap = new Map();
    cellsMap.set(1, { getPlatformOs: () => 'iOS' });
    cellsMap.set(2, { getPlatformOs: () => 'Android' });
    cellsMap.set(3, { getPlatformOs: () => 'iOS' });
    cellsMap.set(4, { getPlatformOs: () => 'Android' });
    cellsMap.set(5, { getPlatformOs: () => 'iOS' });

    console.log = jest.fn();

    cell.listPlatformOs(cellsMap);

    // expect that console.log was called with the correct output
    expect(console.log).toHaveBeenCalledWith('Platform OS and their totals:');
    expect(console.log).toHaveBeenCalledWith('iOS: 3');
    expect(console.log).toHaveBeenCalledWith('Android: 2');
  });

});