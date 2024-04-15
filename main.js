const fs = require('fs');
const path = require('path');
const parse = require('csv-parse').parse;


class Cell {
    constructor(data) {
        this.oem = data.oem;
        this.model = data.model;
        this.launch_announced = data.launch_announced;
        this.launch_status = data.launch_status;
        this.body_dimensions = data.body_dimensions;
        this.body_weight = data.body_weight;
        this.body_sim = data.body_sim;
        this.display_type = data.display_type;
        this.display_size = data.display_size;
        this.display_resolution = data.display_resolution;
        this.features_sensors = data.features_sensors;
        this.platform_os = data.platform_os;
    }

    // getters
    getOem() { return this.oem; }
    getModel() { return this.model; }
    getLaunchAnnounced() { return this.launch_announced; }
    getLaunchStatus() { return this.launch_status; }
    getBodyDimensions() { return this.body_dimensions; }
    getBodyWeight() { return this.body_weight; }
    getBodySim() { return this.body_sim; }
    getDisplayType() { return this.display_type; }
    getDisplaySize() { return this.display_size; }
    getDisplayResolution() { return this.display_resolution; }
    getFeaturesSensors() { return this.features_sensors; }
    getPlatformOs() { return this.platform_os; }

    // setters
    setOem(newOem) { this.oem = newOem; }
    setModel(newModel) { this.model = newModel; }
    setLaunchAnnounced(newLaunchAnnounced) { this.launch_announced = newLaunchAnnounced; }
    setLaunchStatus(newLaunchStatus) { this.launch_status = newLaunchStatus; }
    setBodyDimensions(newBodyDimensions) { this.body_dimensions = newBodyDimensions; }
    setBodyWeight(newBodyWeight) { this.body_weight = newBodyWeight; }
    setBodySim(newBodySim) { this.body_sim = newBodySim; }
    setDisplayType(newDisplayType) { this.display_type = newDisplayType; }
    setDisplaySize(newDisplaySize) { this.display_size = newDisplaySize; }
    setDisplayResolution(newDisplayResolution) { this.display_resolution = newDisplayResolution; }
    setFeaturesSensors(newFeaturesSensors) { this.features_sensors = newFeaturesSensors; }
    setPlatformOs(newPlatformOs) { this.platform_os = newPlatformOs; }
}

function parseCSVData(csvData, callback) {
    parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        skip_lines_with_empty_values: true,
        delimiter: ',',
        relax_column_count: true,
        relax: true, 
    }, (err, records) => {
        if (err) {
            console.error('Error parsing CSV:', err);
            return;
        }

        const map = new Map();

        records.forEach(record => {
            for (const key in record) {
                if (record[key] === '-' || record[key] === '') {
                    record[key] = null;
                } else if (record[key] === 'V1' && key !== 'features_sensors') {
                    record[key] = null;
                }
            }

            const yearRegex = /\b(19|20)\d{2}\b/;
            const weightRegex = /^(\d+\s*g)/; 

            const announcedYearMatch = yearRegex.exec(record.launch_announced);
            record.launch_announced = announcedYearMatch ? announcedYearMatch[0] : null;

            if (record.launch_status !== 'Discontinued' && record.launch_status !== 'Cancelled') {
                const statusYearMatch = yearRegex.exec(record.launch_status);
                record.launch_status = statusYearMatch ? statusYearMatch[0] : null;
            }

            const weightMatch = weightRegex.exec(record.body_weight);
            record.body_weight = weightMatch ? weightMatch[0] : null;

            const cell = new Cell(record);
            const uniqueId = `${record.oem}_${record.model}_${Math.random().toString(16).substr(2)}`;
            map.set(uniqueId, cell);
        });

        callback(map);
    });
}

console.log("sssss")

function loadAndProcessCSV() {
    const filePath = path.join(__dirname, 'cells.csv'); 
    fs.readFile(filePath, 'utf8', (error, csvData) => {
        if (error) {
            console.error('Error reading the CSV file:', error);
            return;
        }

        parseCSVData(csvData, cellsMap => {
            console.log(cellsMap); 
        });
    });
}

loadAndProcessCSV();