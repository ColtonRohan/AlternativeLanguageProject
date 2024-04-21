import { Cell } from "../main";

describe('Cell Class', () => {
  let cell;

  beforeEach(() => {
    cell = new Cell();
  });

  test('toString method should return cell details string', () => {
    cell.setOem('Apple');
    cell.setModel('iPhone 12');
    cell.setLaunchAnnounced('2020');
    cell.setLaunchStatus('2020');
    cell.setBodyDimensions('146.7 x 71.5 x 7.4 mm');
    cell.setBodyWeight('164 g');
    cell.setBodySim('Nano-SIM and/or eSIM');
    cell.setDisplayType('Super Retina XDR OLED');
    cell.setDisplaySize('6.1 inches');
    cell.setDisplayResolution('1170 x 2532 pixels');
    cell.setFeaturesSensors('Face ID, accelerometer, gyro, proximity, compass, barometer');
    cell.setPlatformOs('iOS 14.1');

    const expectedOutput = `Cell Details:
        OEM: Apple,
        Model: iPhone 12,
        Launch Announced: 2020,
        Launch Status: 2020,
        Body Dimensions: 146.7 x 71.5 x 7.4 mm,
        Body Weight: 164 g,
        SIM: Nano-SIM and/or eSIM,
        Display Type: Super Retina XDR OLED,
        Display Size: 6.1 inches,
        Display Resolution: 1170 x 2532 pixels,
        Sensors: Face ID, accelerometer, gyro, proximity, compass, barometer,
        OS: iOS 14.1`;

    expect(cell.toString()).toEqual(expectedOutput);
  });

});