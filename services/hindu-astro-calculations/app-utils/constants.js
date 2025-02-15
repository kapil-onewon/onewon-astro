/**
 * This file is part of flatlib - (C) FlatAngle
 * Author: João Ventura (flatangleweb@gmail.com)
 *
 * This module defines the names of signs, objects, angles, 
 * houses, and fixed stars used in the library.
 */

// === Base constants ===

// Four primitive qualities
const HOT = "Hot";
const COLD = "Cold";
const DRY = "Dry";
const HUMID = "Humid";

// Four Elements
const FIRE = "Fire";
const EARTH = "Earth";
const AIR = "Air";
const WATER = "Water";

// Four Temperaments
const CHOLERIC = "Choleric";
const MELANCHOLIC = "Melancholic";
const SANGUINE = "Sanguine";
const PHLEGMATIC = "Phlegmatic";

// Genders
const MASCULINE = "Masculine";
const FEMININE = "Feminine";
const NEUTRAL = "Neutral";

// Factions
const DIURNAL = "Diurnal";
const NOCTURNAL = "Nocturnal";

// Sun seasons
const SPRING = "Spring";
const SUMMER = "Summer";
const AUTUMN = "Autumn";
const WINTER = "Winter";

// Moon Quarters
const MOON_FIRST_QUARTER = "First Quarter";
const MOON_SECOND_QUARTER = "Second Quarter";
const MOON_THIRD_QUARTER = "Third Quarter";
const MOON_LAST_QUARTER = "Last Quarter";

// === Signs ===

const SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra",
    "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const SIGN_MODES = {
    CARDINAL: "Cardinal",
    FIXED: "Fixed",
    MUTABLE: "Mutable"
};

const SIGN_FIGURES = {
    NONE: "None",
    BEAST: "Beast",
    HUMAN: "Human",
    WILD: "Wild"
};

const SIGN_FERTILITIES = {
    FERTILE: "Fertile",
    STERILE: "Sterile",
    MODERATELY_FERTILE: "Moderately Fertile",
    MODERATELY_STERILE: "Moderately Sterile"
};

// === Objects ===

// # Names
const SUN = 'Sun';
const MOON = 'Moon'
const MERCURY = 'Mercury'
const VENUS = 'Venus'
const MARS = 'Mars'
const JUPITER = 'Jupiter'
const SATURN = 'Saturn'
const URANUS = 'Uranus'
const NEPTUNE = 'Neptune'
const PLUTO = 'Pluto'
const CHIRON = 'Chiron'
const NORTH_NODE = 'North Node'
const SOUTH_NODE = 'South Node'
const SYZYGY = 'Syzygy'
const PARS_FORTUNA = 'Pars Fortuna'
const NO_PLANET = 'None'

const OBJECTS = {
    SUN: "Sun", MOON: "Moon", MERCURY: "Mercury", VENUS: "Venus", MARS: "Mars", JUPITER: "Jupiter", SATURN: "Saturn",
    URANUS: "Uranus", NEPTUNE: "Neptune", PLUTO: "Pluto", CHIRON: "Chiron", NORTH_NODE: "North Node", SOUTH_NODE: "South Node",
    SYZYGY: "Syzygy", PARS_FORTUNA: "Pars Fortuna"
};

const OBJECT_MOVEMENTS = {
    DIRECT: "Direct",
    RETROGRADE: "Retrograde",
    STATIONARY: "Stationary"
};

const MEAN_DAILY_MOTIONS = {
    SUN: 0.9833,
    MOON: 13.1833
};

// === Houses ===

const HOUSES = Array.from({ length: 12 }, (_, i) => `House${i + 1}`);

const HOUSE_CONDITIONS = {
    ANGULAR: "Angular",
    SUCCEDENT: "Succedent",
    CADENT: "Cadent"
};

const HOUSES_BENEFIC = ["House1", "House5", "House11"];
const HOUSES_MALEFIC = ["House6", "House12"];

// === Angles ===

const ANGLES = ["Asc", "Desc", "MC", "IC"];

// === Fixed Stars ===

const FIXED_STARS = [
    "Algenib", "Alpheratz", "Algol", "Alcyone", "Aldebaran", "Rigel", "Capella",
    "Betelgeuse", "Sirius", "Canopus", "Castor", "Pollux", "Procyon", "Regulus",
    "Spica", "Arcturus", "Antares", "Vega", "Altair", "Deneb Algedi", "Fomalhaut"
];

// === Aspects ===

const MAJOR_ASPECTS = {
    NO_ASPECT: -1,
    CONJUNCTION: 0,
    SEXTILE: 60,
    SQUARE: 90,
    TRINE: 120,
    OPPOSITION: 180
};
const MINOR_ASPECTS = {
    SEMISEXTILE: 30,
    SEMIQUINTILE: 36,
    SEMISQUARE: 45,
    QUINTILE: 72,
    SESQUIQUINTILE: 108,
    SESQUISQUARE: 135,
    BIQUINTILE: 144,
    QUINCUNX: 150
};
const ALL_ASPECTS = [MAJOR_ASPECTS, MINOR_ASPECTS];

const ASPECT_MOVEMENT = {
    APPLICATIVE: "Applicative",
    SEPARATIVE: "Separative",
    EXACT: "Exact",
    NO_MOVEMENT: "None"
};

const ASPECT_DIRECTION = {
    DEXTER: "Dexter",
    SINISTER: "Sinister"
};

const ASPECT_PROPERTIES = {
    ASSOCIATE: "Associate",
    DISSOCIATE: "Dissociate"
};

const HOUSES_PLACIDUS = 'Placidcus';
const HOUSES_KOCH = 'Koch'
const HOUSES_PORPHYRIUS = 'Porphyrius'
const HOUSES_REGIOMONTANUS = 'Regiomontanus'
const HOUSES_CAMPANUS = 'Campanus'
const HOUSES_EQUAL = 'Equal'
const HOUSES_EQUAL_2 = 'Equal 2'
const HOUSES_VEHLOW_EQUAL = 'Vehlow Equal'
const HOUSES_WHOLE_SIGN = 'Whole Sign'
const HOUSES_MERIDIAN = 'Meridian'
const HOUSES_AZIMUTHAL = 'Azimuthal'
const HOUSES_POLICH_PAGE = 'Polich Page'
const HOUSES_ALCABITUS = 'Alcabitus'
const HOUSES_MORINUS = 'Morinus'
const HOUSES_DEFAULT = HOUSES_ALCABITUS;


const ASC = 'Asc'
const DESC = 'Desc'
const MC = 'MC'
const IC = 'IC'


const HOUSE1 = 'House1'
const HOUSE2 = 'House2'
const HOUSE3 = 'House3'
const HOUSE4 = 'House4'
const HOUSE5 = 'House5'
const HOUSE6 = 'House6'
const HOUSE7 = 'House7'
const HOUSE8 = 'House8'
const HOUSE9 = 'House9'
const HOUSE10 = 'House10'
const HOUSE11 = 'House11'
const HOUSE12 = 'House12'

// stars -----

const STAR_ALGENIB = 'Algenib'
const STAR_ALPHERATZ = 'Alpheratz'
const STAR_ALGOL = 'Algol'
const STAR_ALCYONE = 'Alcyone'
const STAR_PLEIADES = STAR_ALCYONE
const STAR_ALDEBARAN = 'Aldebaran'
const STAR_RIGEL = 'Rigel'
const STAR_CAPELLA = 'Capella'
const STAR_BETELGEUSE = 'Betelgeuse'
const STAR_SIRIUS = 'Sirius'
const STAR_CANOPUS = 'Canopus'
const STAR_CASTOR = 'Castor'
const STAR_POLLUX = 'Pollux'
const STAR_PROCYON = 'Procyon'
const STAR_ASELLUS_BOREALIS = 'Asellus Borealis'
const STAR_ASELLUS_AUSTRALIS = 'Asellus Australis'
const STAR_ALPHARD = 'Alphard'
const STAR_REGULUS = 'Regulus'
const STAR_DENEBOLA = 'Denebola'
const STAR_ALGORAB = 'Algorab'
const STAR_SPICA = 'Spica'
const STAR_ARCTURUS = 'Arcturus'
const STAR_ALPHECCA = 'Alphecca'
const STAR_ZUBEN_ELGENUBI = 'Zuben Elgenubi'
const STAR_ZUBEN_ELSCHEMALI = 'Zuben Eshamali'
const STAR_UNUKALHAI = 'Unukalhai'
const STAR_AGENA = 'Agena'
const STAR_RIGEL_CENTAURUS = 'Rigel Kentaurus'
const STAR_ANTARES = 'Antares'
const STAR_LESATH = 'Lesath'
const STAR_VEGA = 'Vega'
const STAR_ALTAIR = 'Altair'
const STAR_DENEB_ALGEDI = 'Deneb Algedi'
const STAR_FOMALHAUT = 'Fomalhaut'
const STAR_DENEB_ADIGE = 'Deneb'  // Alpha-Cygnus
const STAR_ACHERNAR = 'Achernar'

const LIST_FIXED_STARS = [
    STAR_ALGENIB, STAR_ALPHERATZ, STAR_ALGOL, STAR_ALCYONE,
    STAR_PLEIADES, STAR_ALDEBARAN, STAR_RIGEL, STAR_CAPELLA,
    STAR_BETELGEUSE, STAR_SIRIUS, STAR_CANOPUS, STAR_CASTOR,
    STAR_POLLUX, STAR_PROCYON, STAR_ASELLUS_BOREALIS,
    STAR_ASELLUS_AUSTRALIS, STAR_ALPHARD, STAR_REGULUS,
    STAR_DENEBOLA, STAR_ALGORAB, STAR_SPICA, STAR_ARCTURUS,
    STAR_ALPHECCA, STAR_ZUBEN_ELSCHEMALI, STAR_UNUKALHAI,
    STAR_AGENA, STAR_RIGEL_CENTAURUS, STAR_ANTARES,
    STAR_LESATH, STAR_VEGA, STAR_ALTAIR, STAR_DENEB_ALGEDI,
    STAR_FOMALHAUT, STAR_DENEB_ADIGE, STAR_ACHERNAR,
]

const LIST_OBJECTS_TRADITIONAL = [
    SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN,
    NORTH_NODE, SOUTH_NODE, SYZYGY, PARS_FORTUNA
]

const LIST_SIGNS = [
   "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra",
    "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

const LIST_HOUSES = [
    HOUSE1, HOUSE2, HOUSE3, HOUSE4, HOUSE5, HOUSE6,
    HOUSE7, HOUSE8, HOUSE9, HOUSE10, HOUSE11, HOUSE12,
]

// # === Signs === */

const ARIES = 'Aries'
const TAURUS = 'Taurus'
const GEMINI = 'Gemini'
const CANCER = 'Cancer'
const LEO = 'Leo'
const VIRGO = 'Virgo'
const LIBRA = 'Libra'
const SCORPIO = 'Scorpio'
const SAGITTARIUS = 'Sagittarius'
const CAPRICORN = 'Capricorn'
const AQUARIUS = 'Aquarius'
const PISCES = 'Pisces'

// # Object type
const OBJ_PLANET = 'Planet'
const OBJ_HOUSE = 'House'
const OBJ_MOON_NODE = 'Moon Node'
const OBJ_ARABIC_PART = 'Arabic Part'
const OBJ_FIXED_STAR = 'Fixed Star'
const OBJ_ASTEROID = 'Asteroid'
const OBJ_LUNATION = 'Lunation'
const OBJ_GENERIC = 'Generic'

// Export all constants
const consts = {
    HOT, COLD, DRY, HUMID, FIRE, EARTH, AIR, WATER,
    CHOLERIC, MELANCHOLIC, SANGUINE, PHLEGMATIC,
    MASCULINE, FEMININE, NEUTRAL, DIURNAL, NOCTURNAL,
    SPRING, SUMMER, AUTUMN, WINTER, MOON_FIRST_QUARTER,
    MOON_SECOND_QUARTER, MOON_THIRD_QUARTER, MOON_LAST_QUARTER,
    SIGNS, SIGN_MODES, SIGN_FIGURES, SIGN_FERTILITIES,
    OBJECTS, OBJECT_MOVEMENTS, MEAN_DAILY_MOTIONS,
    HOUSES, HOUSE_CONDITIONS, HOUSES_BENEFIC, HOUSES_MALEFIC,
    ANGLES, FIXED_STARS, MAJOR_ASPECTS, MINOR_ASPECTS,
    ALL_ASPECTS, ASPECT_MOVEMENT, ASPECT_DIRECTION, ASPECT_PROPERTIES,
    HOUSES_PLACIDUS, HOUSES_KOCH, HOUSES_PORPHYRIUS, HOUSES_REGIOMONTANUS,
    HOUSES_CAMPANUS, HOUSES_EQUAL, HOUSES_EQUAL_2, HOUSES_VEHLOW_EQUAL,
    HOUSES_WHOLE_SIGN, HOUSES_MERIDIAN, HOUSES_AZIMUTHAL, HOUSES_POLICH_PAGE,
    HOUSES_ALCABITUS, HOUSES_MORINUS, HOUSES_DEFAULT,
    SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, URANUS, NEPTUNE,
    LIST_FIXED_STARS, LIST_OBJECTS_TRADITIONAL, NO_PLANET,
    LIST_SIGNS,LIST_HOUSES, ARIES, TAURUS, GEMINI, CANCER, LEO, VIRGO, LIBRA, SCORPIO, SAGITTARIUS, CAPRICORN, AQUARIUS, PISCES,
    ASC, DESC, MC, IC, HOUSE1, HOUSE10, HOUSE12, HOUSE2, HOUSE3, HOUSE4, HOUSE5, HOUSE6, HOUSE7, HOUSE8, HOUSE9, HOUSE11,
    OBJ_PLANET, OBJ_HOUSE, OBJ_MOON_NODE, OBJ_ARABIC_PART, OBJ_FIXED_STAR, OBJ_ASTEROID, OBJ_LUNATION, OBJ_GENERIC
};




export default consts;

export {
    HOT, COLD, DRY, HUMID, FIRE, EARTH, AIR, WATER,
    CHOLERIC, MELANCHOLIC, SANGUINE, PHLEGMATIC,
    MASCULINE, FEMININE, NEUTRAL, DIURNAL, NOCTURNAL,
    SPRING, SUMMER, AUTUMN, WINTER, MOON_FIRST_QUARTER,
    MOON_SECOND_QUARTER, MOON_THIRD_QUARTER, MOON_LAST_QUARTER,
    SIGNS, SIGN_MODES, SIGN_FIGURES, SIGN_FERTILITIES,
    OBJECTS, OBJECT_MOVEMENTS, MEAN_DAILY_MOTIONS,
    HOUSES, HOUSE_CONDITIONS, HOUSES_BENEFIC, HOUSES_MALEFIC,
    ANGLES, FIXED_STARS, MAJOR_ASPECTS, MINOR_ASPECTS,
    ALL_ASPECTS, ASPECT_MOVEMENT, ASPECT_DIRECTION, ASPECT_PROPERTIES,
    HOUSES_PLACIDUS, HOUSES_KOCH, HOUSES_PORPHYRIUS, HOUSES_REGIOMONTANUS,
    HOUSES_CAMPANUS, HOUSES_EQUAL, HOUSES_EQUAL_2, HOUSES_VEHLOW_EQUAL,
    HOUSES_WHOLE_SIGN, HOUSES_MERIDIAN, HOUSES_AZIMUTHAL, HOUSES_POLICH_PAGE,
    HOUSES_ALCABITUS, HOUSES_MORINUS, HOUSES_DEFAULT,
    SUN, MOON, MERCURY, VENUS, MARS, JUPITER, SATURN, URANUS, NEPTUNE,
    NO_PLANET,
    LIST_FIXED_STARS, LIST_OBJECTS_TRADITIONAL, LIST_SIGNS, LIST_HOUSES,
    ASC, DESC, MC, IC, HOUSE1, HOUSE10, HOUSE12, HOUSE2, HOUSE3, HOUSE4, HOUSE5, HOUSE6, HOUSE7, HOUSE8, HOUSE9, HOUSE11,
    ARIES, TAURUS, GEMINI, CANCER, LEO, VIRGO, LIBRA, SCORPIO, SAGITTARIUS, CAPRICORN, AQUARIUS, PISCES,
    OBJ_PLANET, OBJ_HOUSE, OBJ_MOON_NODE, OBJ_ARABIC_PART, OBJ_FIXED_STAR, OBJ_ASTEROID, OBJ_LUNATION, OBJ_GENERIC
}
