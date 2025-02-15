import c from './constants.js';

// Base Properties
const base = {
    // The four elements
    elements: [
        c.FIRE,
        c.EARTH,
        c.AIR,
        c.WATER
    ],

    // The four temperaments
    temperaments: [
        c.CHOLERIC,
        c.MELANCHOLIC,
        c.SANGUINE,
        c.PHLEGMATIC
    ],

    // Genders
    genders: [
        c.MASCULINE,
        c.FEMININE
    ],

    // Factions
    factions: [
        c.DIURNAL,
        c.NOCTURNAL
    ],

    // Sun seasons
    sunseasons: [
        c.SPRING,
        c.SUMMER,
        c.AUTUMN,
        c.WINTER
    ],

    // Element to Temperament
    elementTemperament: {
        [c.FIRE]: c.CHOLERIC,
        [c.EARTH]: c.MELANCHOLIC,
        [c.AIR]: c.SANGUINE,
        [c.WATER]: c.PHLEGMATIC
    },

    // Temperament to Element
    temperamentElement: {
        [c.CHOLERIC]: c.FIRE,
        [c.MELANCHOLIC]: c.EARTH,
        [c.SANGUINE]: c.AIR,
        [c.PHLEGMATIC]: c.WATER
    },

    // Qualities of elements
    elementQuality: {
        [c.FIRE]: [c.HOT, c.DRY],
        [c.EARTH]: [c.COLD, c.DRY],
        [c.AIR]: [c.HOT, c.HUMID],
        [c.WATER]: [c.COLD, c.HUMID]
    },

    // Qualities of temperaments
    temperamentQuality: {
        [c.CHOLERIC]: [c.HOT, c.DRY],
        [c.MELANCHOLIC]: [c.COLD, c.DRY],
        [c.SANGUINE]: [c.HOT, c.HUMID],
        [c.PHLEGMATIC]: [c.COLD, c.HUMID]
    },

    // Moon Phase Elements
    moonphaseElement: {
        [c.MOON_FIRST_QUARTER]: c.AIR,
        [c.MOON_SECOND_QUARTER]: c.FIRE,
        [c.MOON_THIRD_QUARTER]: c.EARTH,
        [c.MOON_LAST_QUARTER]: c.WATER
    },

    // Sun Season Elements
    sunseasonElement: {
        [c.SPRING]: c.AIR,
        [c.SUMMER]: c.FIRE,
        [c.AUTUMN]: c.EARTH,
        [c.WINTER]: c.WATER
    }
};

// Sign Properties
const sign = {
    _signs: c.LIST_SIGNS,
    _modes: [c.CARDINAL, c.FIXED, c.MUTABLE],

    // Initialize mode property
    mode: (() => {
        const modes = {};
        c.LIST_SIGNS.forEach((sign, i) => {
            modes[sign] = [c.CARDINAL, c.FIXED, c.MUTABLE][i % 3];
        });
        return modes;
    })(),

    // Initialize sun season property
    sunseason: (() => {
        const seasons = {};
        c.LIST_SIGNS.forEach((sign, i) => {
            seasons[sign] = base.sunseasons[Math.floor(i / 3)];
        });
        return seasons;
    })(),

    // Initialize simple properties
    gender: (() => {
        const genders = {};
        c.LIST_SIGNS.forEach((sign, i) => {
            genders[sign] = base.genders[i % 2];
        });
        return genders;
    })(),

    faction: (() => {
        const factions = {};
        c.LIST_SIGNS.forEach((sign, i) => {
            factions[sign] = base.factions[i % 2];
        });
        return factions;
    })(),

    element: (() => {
        const elements = {};
        c.LIST_SIGNS.forEach((sign, i) => {
            elements[sign] = base.elements[i % 4];
        });
        return elements;
    })(),

    temperament: (() => {
        const temps = {};
        c.LIST_SIGNS.forEach((sign, i) => {
            temps[sign] = base.temperaments[i % 4];
        });
        return temps;
    })(),

    // Fertilities
    fertility: {
        [c.ARIES]: c.SIGN_MODERATELY_STERILE,
        [c.TAURUS]: c.SIGN_MODERATELY_FERTILE,
        [c.GEMINI]: c.SIGN_STERILE,
        [c.CANCER]: c.SIGN_FERTILE,
        [c.LEO]: c.SIGN_STERILE,
        [c.VIRGO]: c.SIGN_STERILE,
        [c.LIBRA]: c.SIGN_MODERATELY_FERTILE,
        [c.SCORPIO]: c.SIGN_FERTILE,
        [c.SAGITTARIUS]: c.SIGN_MODERATELY_FERTILE,
        [c.CAPRICORN]: c.SIGN_MODERATELY_STERILE,
        [c.AQUARIUS]: c.SIGN_MODERATELY_STERILE,
        [c.PISCES]: c.SIGN_FERTILE
    },

    // Sign number
    number: (() => {
        const numbers = {};
        c.LIST_SIGNS.forEach((sign, i) => {
            numbers[sign] = i + 1;
        });
        return numbers;
    })(),

    // Sign figure properties
    figureBestial: [
        c.ARIES,
        c.TAURUS,
        c.LEO,
        c.SAGITTARIUS,
        c.CAPRICORN
    ],

    figureHuman: [
        c.GEMINI,
        c.VIRGO,
        c.LIBRA,
        c.AQUARIUS
    ],

    figureWild: [
        c.LEO
    ]
};

// Object Properties
const object = {
    // Mean daily motions
    meanMotion: {
        [c.NO_PLANET]: 0,
        [c.SUN]: 0.9833,
        [c.MOON]: 13.1833,
        [c.MERCURY]: 0.9833,
        [c.VENUS]: 0.9833,
        [c.MARS]: 0.5166,
        [c.JUPITER]: 0.0833,
        [c.SATURN]: 0.0333,
        [c.URANUS]: 0.001,
        [c.NEPTUNE]: 0.0001,
        [c.PLUTO]: 0.00001,
        [c.CHIRON]: 0.00001,
        [c.NORTH_NODE]: 13.1833,
        [c.SOUTH_NODE]: 13.1833,
        [c.SYZYGY]: 0.0
    },

    // Object orbs
    orb: {
        [c.NO_PLANET]: 0,
        [c.SUN]: 15,
        [c.MOON]: 12,
        [c.MERCURY]: 7,
        [c.VENUS]: 7,
        [c.MARS]: 8,
        [c.JUPITER]: 9,
        [c.SATURN]: 9,
        [c.URANUS]: 5,
        [c.NEPTUNE]: 5,
        [c.PLUTO]: 5,
        [c.CHIRON]: 5,
        [c.NORTH_NODE]: 12,
        [c.SOUTH_NODE]: 12,
        [c.SYZYGY]: 0,
        [c.PARS_FORTUNA]: 0
    },

    // Planet properties
    element: {
        [c.SATURN]: c.EARTH,
        [c.JUPITER]: c.AIR,
        [c.MARS]: c.FIRE,
        [c.SUN]: c.FIRE,
        [c.VENUS]: c.AIR,
        [c.MERCURY]: c.EARTH,
        [c.MOON]: c.WATER
    },

    temperament: {
        [c.SATURN]: c.MELANCHOLIC,
        [c.JUPITER]: c.SANGUINE,
        [c.MARS]: c.CHOLERIC,
        [c.SUN]: c.CHOLERIC,
        [c.VENUS]: c.SANGUINE,
        [c.MERCURY]: c.MELANCHOLIC,
        [c.MOON]: c.PHLEGMATIC
    },

    gender: {
        [c.SATURN]: c.MASCULINE,
        [c.JUPITER]: c.MASCULINE,
        [c.MARS]: c.MASCULINE,
        [c.SUN]: c.MASCULINE,
        [c.VENUS]: c.FEMININE,
        [c.MERCURY]: c.NEUTRAL,
        [c.MOON]: c.FEMININE
    },

    faction: {
        [c.SATURN]: c.DIURNAL,
        [c.JUPITER]: c.DIURNAL,
        [c.MARS]: c.NOCTURNAL,
        [c.SUN]: c.DIURNAL,
        [c.VENUS]: c.NOCTURNAL,
        [c.MERCURY]: c.NEUTRAL,
        [c.MOON]: c.NOCTURNAL
    },

    signJoy: {
        [c.SATURN]: c.AQUARIUS,
        [c.JUPITER]: c.SAGITTARIUS,
        [c.MARS]: c.SCORPIO,
        [c.SUN]: c.LEO,
        [c.VENUS]: c.TAURUS,
        [c.MERCURY]: c.VIRGO,
        [c.MOON]: c.CANCER
    },

    houseJoy: {
        [c.SATURN]: c.HOUSE12,
        [c.JUPITER]: c.HOUSE11,
        [c.MARS]: c.HOUSE6,
        [c.SUN]: c.HOUSE9,
        [c.VENUS]: c.HOUSE5,
        [c.MERCURY]: c.HOUSE1,
        [c.MOON]: c.HOUSE3
    }
};

// House Properties
const house = {
    _houses: c.LIST_HOUSES,
    _conditions: [c.ANGULAR, c.SUCCEDENT, c.CADENT],

    // Initialize condition property
    condition: (() => {
        const conditions = {};
        c.LIST_HOUSES.forEach((house, i) => {
            conditions[house] = [c.ANGULAR, c.SUCCEDENT, c.CADENT][i % 3];
        });
        return conditions;
    })(),

    // Initialize gender property
    gender: (() => {
        const genders = {};
        c.LIST_HOUSES.forEach((house, i) => {
            genders[house] = base.genders[i % 2];
        });
        return genders;
    })(),

    aboveHorizon: [
        c.HOUSE7, c.HOUSE8, c.HOUSE9,
        c.HOUSE10, c.HOUSE11, c.HOUSE12
    ],

    belowHorizon: [
        c.HOUSE1, c.HOUSE2, c.HOUSE3,
        c.HOUSE4, c.HOUSE5, c.HOUSE6
    ]
};

// Aspect Properties
const aspect = {
    name: {
        // Major Aspects
        [c.NO_ASPECT]: 'None',
        [c.CONJUNCTION]: 'Conjunction',
        [c.SEXTILE]: 'Sextile',
        [c.SQUARE]: 'Square',
        [c.TRINE]: 'Trine',
        [c.OPPOSITION]: 'Opposition',

        // Minor Aspects
        [c.SEMISEXTILE]: 'Semisextile',
        [c.SEMIQUINTILE]: 'Semiquintile',
        [c.SEMISQUARE]: 'Semisquare',
        [c.QUINTILE]: 'Quintile',
        [c.SESQUIQUINTILE]: 'Sesquiquintile',
        [c.SESQUISQUARE]: 'Sesquisquare',
        [c.BIQUINTILE]: 'Biquintile',
        [c.QUINCUNX]: 'Quincunx'
    }
};

// Fixed Star Properties
const fixedStar = {};

// House System Properties
const houseSystem = {};

export default {
    base,
    sign,
    object,
    house,
    aspect,
    fixedStar,
    houseSystem
};