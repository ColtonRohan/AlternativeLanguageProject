import { Cell } from "../main";

describe('countDiscontinuedOrCancelled method', () => {
  test('should return the count of discontinued or cancelled phones', () => {
    const cell = new Cell();

    const cellsMap = new Map();
    cellsMap.set(1, { getLaunchStatus: () => 'Discontinued' });
    cellsMap.set(2, { getLaunchStatus: () => 'Cancelled' });
    cellsMap.set(3, { getLaunchStatus: () => 'Launched' }); 
    cellsMap.set(4, { getLaunchStatus: () => 'Discontinued' });

    const count = cell.countDiscontinuedOrCancelled(cellsMap);

    expect(count).toBe(2);
  });

});