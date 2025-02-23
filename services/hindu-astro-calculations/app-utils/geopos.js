import angle from "./angle-utils.js";

// Modes
const LAT = 0;
const LON = 1;

// Mappings
const SIGN = {
    'N': '+',
    'S': '-',
    'E': '+',
    'W': '-'
};

const CHAR = {
    [LAT]: {'+': 'N', '-': 'S'},
    [LON]: {'+': 'E', '-': 'W'}
};

// === Conversions === //

function toFloat(value) {
    if (typeof value === 'string') {
        // Find lat/lon char in string and insert angle sign
        value = value.toUpperCase();
        for (const char of ['N', 'S', 'E', 'W']) {
            if (value.includes(char)) {
                value = SIGN[char] + value.replace(char, ':');
                break;
            }
        }
    }
    return angle.toFloat(value);
}

function toList(value) {
    return angle.toList(value);
}

function toString(value, mode) {
    const string = angle.toString(value);
    const sign = string[0];
    const separator = CHAR[mode][sign];
    const newString = string.replace(':', separator, 1);
    return newString.slice(1);
}

class GeoPos {
    constructor(lat, lon) {
        this.lat =lat; // toFloat(lat);
        this.lon =lon; //toFloat(lon);
    }

    slists() {
        return [
            toList(this.lat),
            toList(this.lon)
        ];
    }

    strings() {
        return [
            toString(this.lat, LAT),
            toString(this.lon, LON)
        ];
    }

    toString() {
        const strings = this.strings();
        return `<${strings[0]} ${strings[1]}>`;
    }
}

export { GeoPos, LAT, LON, toFloat, toList, toString };