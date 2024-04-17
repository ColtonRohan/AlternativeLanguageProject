//!!WARNING!! - If you are grading only the main.js using REPLIT make sure that the imports are commented out and the 
// class is defined as 'class Cell' not 'export class Cell' with 
// module.exports = Cell uncommented on line 317 

// if you are running the project from a local copy pulled from github with the package.json included uncomment the imports and comment out the requires
// change the 'class Cell' to 'export class Cell' 
// make sure and comment out module.exports = Cell on line 317 


// This is purly for testing purposes 

const fs = require("fs");
const path = require("path");
const parse = require("csv-parse").parse;
const readline = require("readline");

// import fs from 'fs'
// import path from 'path'
// import {parse} from 'csv-parse'
// import readline from 'readline'


// export class Cell {
class Cell {
  constructor() {
    this._oem = null;
    this._model = null;
    this._launch_announced = null;
    this._launch_status = null;
    this._body_dimensions = null;
    this._body_weight = null;
    this._body_sim = null;
    this._display_type = null;
    this._display_size = null;
    this._display_resolution = null;
    this._features_sensors = null;
    this._platform_os = null;
  }

  // getters
  getOem() {
    return this._oem;
  }
  getModel() {
    return this._model;
  }
  getLaunchAnnounced() {
    return this._launch_announced;
  }
  getLaunchStatus() {
    return this._launch_status;
  }
  getBodyDimensions() {
    return this._body_dimensions;
  }
  getBodyWeight() {
    return this._body_weight;
  }
  getBodySim() {
    return this._body_sim;
  }
  getDisplayType() {
    return this._display_type;
  }
  getDisplaySize() {
    return this._display_size;
  }
  getDisplayResolution() {
    return this._display_resolution;
  }
  getFeaturesSensors() {
    return this._features_sensors;
  }
  getPlatformOs() {
    return this._platform_os;
  }

  // setters
  setOem(value) {
    this._oem = value || null;
  }
  setModel(value) {
    this._model = value || null;
  }
  setLaunchAnnounced(value) {
    this._launch_announced = value || null;
  }
  setLaunchStatus(value) {
    this._launch_status = value || null;
  }
  setBodyDimensions(value) {
    this._body_dimensions = value || null;
  }
  setBodyWeight(value) {
    this._body_weight = value || null;
  }
  setBodySim(value) {
    this._body_sim = value || null;
  }
  setDisplayType(value) {
    this._display_type = value || null;
  }
  setDisplaySize(value) {
    this._display_size = value || null;
  }
  setDisplayResolution(value) {
    this._display_resolution = value || null;
  }
  setFeaturesSensors(value) {
    this._features_sensors = value || null;
  }
  setPlatformOs(value) {
    const osRegex = /^[^,]+/;
    const match = osRegex.exec(value);
    this._platform_os = match ? match[0] : null;
  }

  toString() {
    return `Cell Details:
        OEM: ${this.getOem() || "N/A"},
        Model: ${this.getModel() || "N/A"},
        Launch Announced: ${this.getLaunchAnnounced() || "N/A"},
        Launch Status: ${this.getLaunchStatus() || "N/A"},
        Body Dimensions: ${this.getBodyDimensions() || "N/A"},
        Body Weight: ${this.getBodyWeight() || "N/A"},
        SIM: ${this.getBodySim() || "N/A"},
        Display Type: ${this.getDisplayType() || "N/A"},
        Display Size: ${this.getDisplaySize() || "N/A"},
        Display Resolution: ${this.getDisplayResolution() || "N/A"},
        Sensors: ${this.getFeaturesSensors() || "N/A"},
        OS: ${this.getPlatformOs() || "N/A"}`;
  }

  mostCommonOEM(cellsMap) {
    const oemCounts = {};
    let mostCommonOEM = null;
    let maxCount = 0;

    cellsMap.forEach((cell) => {
      const oem = cell.getOem();
      if (oem) {
        oemCounts[oem] = (oemCounts[oem] || 0) + 1;
        if (oemCounts[oem] > maxCount) {
          maxCount = oemCounts[oem];
          mostCommonOEM = oem;
        }
      }
    });

    return mostCommonOEM;
  }

  allOEMs(cellsMap) {
    const oemCounts = {};
    cellsMap.forEach((cell) => {
      const oem = cell.getOem();
      if (oem) {
        oemCounts[oem] = (oemCounts[oem] || 0) + 1;
      }
    });
    return oemCounts;
  }

  averageWeight(cellsMap) {
    let totalWeight = 0;
    let count = 0;

    cellsMap.forEach((cell) => {
      const weight = cell.getBodyWeight();
      if (weight) {
        const numericWeight = parseFloat(weight);
        if (!isNaN(numericWeight)) {
          totalWeight += numericWeight;
          count++;
        }
      }
    });

    if (count === 0) {
      console.log("No valid body weight found.");
      return null;
    }

    return totalWeight / count;
  }

  listPlatformOs(cellsMap) {
    const platformCounts = {};
    cellsMap.forEach((cell) => {
      const platform = cell.getPlatformOs();
      if (platform) {
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
      }
    });

    const sortedPlatforms = Object.keys(platformCounts).sort(
      (a, b) => platformCounts[b] - platformCounts[a],
    );

    console.log("Platform OS and their totals:");
    sortedPlatforms.forEach((platform) => {
      console.log(`${platform}: ${platformCounts[platform]}`);
    });
  }

  findMinMaxDisplaySize(cellsMap) {
    let largestDisplaySize = { size: 0, model: null };
    let smallestDisplaySize = { size: Infinity, model: null };

    cellsMap.forEach((cell) => {
      const displaySize = cell.getDisplaySize();
      const model = cell.getModel();
      if (displaySize) {
        const size = parseFloat(displaySize);
        if (!isNaN(size)) {
          if (size > largestDisplaySize.size) {
            largestDisplaySize = { size, model };
          }
          if (size < smallestDisplaySize.size) {
            smallestDisplaySize = { size, model };
          }
        }
      }
    });

    return { largestDisplaySize, smallestDisplaySize };
  }

  countDiscontinuedOrCancelled(cellsMap) {
    let count = 0;

    cellsMap.forEach((cell) => {
      const status = cell.getLaunchStatus();
      if (status === "Discontinued" || status === "Cancelled") {
        count++;
      }
    });

    return count;
  }

  static findCompanyWithHighestAverageWeight(cellsMap) {
    const oemWeights = {};

    cellsMap.forEach((cell) => {
      const oem = cell.getOem();
      const weight = parseFloat(cell.getBodyWeight());
      if (!isNaN(weight)) {
        if (oem in oemWeights) {
          oemWeights[oem].totalWeight += weight;
          oemWeights[oem].count++;
        } else {
          oemWeights[oem] = { totalWeight: weight, count: 1 };
        }
      }
    });

    let highestAverageWeight = 0;
    let highestAverageOem = null;

    for (const oem in oemWeights) {
      const averageWeight = oemWeights[oem].totalWeight / oemWeights[oem].count;
      if (averageWeight > highestAverageWeight) {
        highestAverageWeight = averageWeight;
        highestAverageOem = oem;
      }
    }

    return { highestAverageOem, highestAverageWeight };
  }

  listAnnouncedReleasedDifferentYears(cellsMap) {
    const phones = [];
    cellsMap.forEach((cell) => {
      const announcedYear = parseInt(cell.getLaunchAnnounced());
      const releasedYear = parseInt(cell.getLaunchStatus());
      if (
        !isNaN(announcedYear) &&
        !isNaN(releasedYear) &&
        announcedYear !== releasedYear
      ) {
        phones.push({ oem: cell.getOem(), model: cell.getModel() });
      }
    });
    return phones;
  }

  static countPhonesWithOneSensor(cellsMap) {
    let count = 0;
    cellsMap.forEach((cell) => {
      const sensors = cell.getFeaturesSensors();
      if (sensors && sensors.split(",").length === 1) {
        count++;
      }
    });
    return count;
  }

  static findYearWithMostPhonesLaunched(cellsMap) {
    const yearCounts = {};
    cellsMap.forEach((cell) => {
      const launchYear = parseInt(cell.getLaunchAnnounced());
      if (!isNaN(launchYear) && launchYear > 1999) {
        if (yearCounts[launchYear]) {
          yearCounts[launchYear]++;
        } else {
          yearCounts[launchYear] = 1;
        }
      }
    });

    let maxYear = null;
    let maxCount = 0;
    for (const year in yearCounts) {
      if (yearCounts[year] > maxCount) {
        maxCount = yearCounts[year];
        maxYear = year;
      }
    }

    return maxYear;
  }
}

module.exports = Cell;

function parseCSVData(csvData, callback) {
  parse(
    csvData,
    {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      skip_lines_with_empty_values: true,
      delimiter: ",",
      relax_column_count: true,
      relax: true,
    },
    (err, records) => {
      if (err) {
        console.error("Error parsing CSV:", err);
        return;
      }

      const map = new Map();

      records.forEach((record) => {
        const cell = new Cell();

        cell.setOem(record.oem);
        cell.setModel(record.model);

        const yearRegex = /\b(19|20)\d{2}\b/;
        cell.setLaunchAnnounced(
          yearRegex.test(record.launch_announced)
            ? yearRegex.exec(record.launch_announced)[0]
            : null,
        );

        if (!["Discontinued", "Cancelled"].includes(record.launch_status)) {
          cell.setLaunchStatus(
            yearRegex.test(record.launch_status)
              ? yearRegex.exec(record.launch_status)[0]
              : null,
          );
        } else {
          cell.setLaunchStatus(record.launch_status);
        }

        const weightRegex = /^(\d+\s*g)/;
        cell.setBodyWeight(
          weightRegex.test(record.body_weight)
            ? weightRegex.exec(record.body_weight)[0]
            : null,
        );

        cell.setBodyDimensions(record.body_dimensions);
        cell.setBodySim(
          record.body_sim !== "Yes" && record.body_sim !== "No"
            ? record.body_sim
            : null,
        );
        cell.setDisplayType(record.display_type);
        cell.setDisplaySize(record.display_size);
        cell.setDisplayResolution(record.display_resolution);
        cell.setFeaturesSensors(record.features_sensors);
        cell.setPlatformOs(record.platform_os);

        const uniqueId = `${cell.getOem()}_${cell.getModel()}_${Math.random().toString(16).substr(2)}`;
        map.set(uniqueId, cell);
      });

      callback(map);
    },
  );
}

function loadAndProcessCSV(callback) {
  const filePath = "cells.csv";
  fs.readFile(filePath, "utf8", (error, csvData) => {
    if (error) {
      console.error("Error reading the CSV file:", error);
      return;
    }

    parseCSVData(csvData, callback);
  });
}

// functions to call the Cell methods within the console display
function displayCellDetails(cellsMap) {
  cellsMap.forEach((cell, key) => {
    console.log(cell.toString());
  });
}

function displayMostCommonOEM(cellsMap) {
  const cell = new Cell();
  const mostCommonOEM = cell.mostCommonOEM(cellsMap);
  console.log("Most Common OEM:", mostCommonOEM);
}

function displayAllOEMs(cellsMap) {
  const cell = new Cell();
  const totalCount = cell.allOEMs(cellsMap);

  console.log("Total count of all specific OEMs:", totalCount);
}

function displayAverageWeight(cellsMap) {
  const cell = new Cell();
  const averageWeight = cell.averageWeight(cellsMap);
  if (averageWeight !== null) {
    console.log("Average Weight:", averageWeight.toFixed(2), "g");
  }
}

function displayPlatformOs(cellsMap) {
  const cell = new Cell();
  cell.listPlatformOs(cellsMap);
}

function displayDisplaySize(cellsMap) {
  const cell = new Cell();
  const { largestDisplaySize, smallestDisplaySize } =
    cell.findMinMaxDisplaySize(cellsMap);
  console.log(
    "Largest Display Size:",
    `${largestDisplaySize.size} inches - Model Name: ${largestDisplaySize.model}`,
  );
  console.log(
    "Smallest Display Size:",
    `${smallestDisplaySize.size} inches - Model Name: ${smallestDisplaySize.model}`,
  );
}

function displayDiscontinuedOrCancelled(cellsMap) {
  const cell = new Cell();
  const count = cell.countDiscontinuedOrCancelled(cellsMap);
  console.log("Count of Discontinued or Cancelled:", count);
}

function displayHighestAverageWeight(cellsMap) {
  const { highestAverageOem, highestAverageWeight } =
    Cell.findCompanyWithHighestAverageWeight(cellsMap);
  console.log(
    `Company with highest average weight: ${highestAverageOem} (${highestAverageWeight.toFixed(2)} g)`,
  );
}

function displayAnnouncedReleasedDifferentYears(cellsMap) {
  const cell = new Cell();
  const phones = cell.listAnnouncedReleasedDifferentYears(cellsMap);
  if (phones.length > 0) {
    console.log("Phones announced in one year and released in another:");
    phones.forEach((phone) => {
      console.log(`OEM: ${phone.oem}, Model: ${phone.model}`);
    });
  } else {
    console.log(
      "No phones were announced in one year and released in another.",
    );
  }
}

function displayPhonesWithOneSensorCount(cellsMap) {
  const count = Cell.countPhonesWithOneSensor(cellsMap);
  console.log(`Number of phones with only one feature sensor: ${count}`);
}

function displayYearWithMostPhonesLaunched(cellsMap) {
  const year = Cell.findYearWithMostPhonesLaunched(cellsMap);
  if (year !== null) {
    console.log(`Year with the most phones launched (after 1999): ${year}`);
  } else {
    console.log("No phones were launched after 1999.");
  }
}

// console display
function startCLI() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Welcome to Cell Details CSV Reader!");
  console.log("1. Display cell details");
  console.log("2. Most common OEM");
  console.log("3. List all OEMs and their totals");
  console.log("4. Display average weight of phones");
  console.log("5. List all platform totals in order");
  console.log("6. Display largest and smallest display size");
  console.log("7. Display Discontinued/Cancelled launches");
  console.log(
    "8. What company (oem) has the highest average weight of the phone body?",
  );
  console.log("9. List phones announced in one year and released in another");
  console.log("10. How many phones have only one feature sensor?");
  console.log(
    "11. What year had the most phones launched in any year later than 1999?",
  );
  console.log("12. Exit");

  rl.question("Select an option (1-12): ", (answer) => {
    switch (answer) {
      case "1":
        loadAndProcessCSV(displayCellDetails);
        break;
      case "2":
        loadAndProcessCSV(displayMostCommonOEM);
        break;
      case "3":
        loadAndProcessCSV(displayAllOEMs);
        break;
      case "4":
        loadAndProcessCSV(displayAverageWeight);
        break;
      case "5":
        loadAndProcessCSV(displayPlatformOs);
        break;
      case "6":
        loadAndProcessCSV(displayDisplaySize);
        break;
      case "7":
        loadAndProcessCSV(displayDiscontinuedOrCancelled);
        break;
      case "8":
        loadAndProcessCSV(displayHighestAverageWeight);
        break;
      case "9":
        loadAndProcessCSV(displayAnnouncedReleasedDifferentYears);
        break;
      case "10":
        loadAndProcessCSV(displayPhonesWithOneSensorCount);
        break;
      case "11":
        loadAndProcessCSV(displayYearWithMostPhonesLaunched);
        break;
      case "12":
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid option. Please select a number from 1 to 7.");
        startCLI();
        break;
    }
  });
}

// begin the program with console display
startCLI();
