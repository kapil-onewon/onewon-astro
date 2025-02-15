import swisseph from 'swisseph';
import angle from '../app-utils/angle-utils.js';
import consts from "../app-utils/constants.js";

// Map objects
const SWE_OBJECTS = {
    [consts.OBJECTS.SUN]: 0,
    [consts.OBJECTS.MOON]: 1,
    [consts.OBJECTS.MERCURY]: 2,
    [consts.OBJECTS.VENUS]: 3,
    [consts.OBJECTS.MARS]: 4,
    [consts.OBJECTS.JUPITER]: 5,
    [consts.OBJECTS.SATURN]: 6,
    [consts.OBJECTS.URANUS]: 7,
    [consts.OBJECTS.NEPTUNE]: 8,
    [consts.OBJECTS.PLUTO]: 9,
    [consts.OBJECTS.CHIRON]: 15,
    [consts.OBJECTS.NORTH_NODE]: 10
};

// Map house systems
const SWE_HOUSESYS = {
    [consts.HOUSES_PLACIDUS]: 'P',
    [consts.HOUSES_KOCH]: 'K',
    [consts.HOUSES_PORPHYRIUS]: 'O',
    [consts.HOUSES_REGIOMONTANUS]: 'R',
    [consts.HOUSES_CAMPANUS]: 'C',
    [consts.HOUSES_EQUAL]: 'A',
    [consts.HOUSES_EQUAL_2]: 'E',
    [consts.HOUSES_VEHLOW_EQUAL]: 'V',
    [consts.HOUSES_WHOLE_SIGN]: 'W',
    [consts.HOUSES_MERIDIAN]: 'X',
    [consts.HOUSES_AZIMUTHAL]: 'H',
    [consts.HOUSES_POLICH_PAGE]: 'T',
    [consts.HOUSES_ALCABITUS]: 'B',
    [consts.HOUSES_MORINUS]: 'M'
};

// Internal functions
function setPath(path) {
    swisseph.swe_set_ephe_path(path);
}

// Object functions
function sweObject(obj, jd) {
    const sweObj = SWE_OBJECTS[obj];
    const [sweList, flg] = swisseph.swe_calc_ut(jd, sweObj);
    return {
        id: obj,
        lon: sweList[0],
        lat: sweList[1],
        lonspeed: sweList[3],
        latspeed: sweList[4]
    };
}

function sweObjectLon(obj, jd) {
    const sweObj = SWE_OBJECTS[obj];
    const [sweList, flg] = swisseph.swe_calc_ut(jd, sweObj);
    return sweList[0];
}

function sweNextTransit(obj, jd, lat, lon, flag) {
    const sweObj = SWE_OBJECTS[obj];
    const transitFlag = flag === 'RISE' ? swisseph.SE_CALC_RISE : swisseph.SE_CALC_SET;
    const trans = swisseph.swe_rise_trans(jd, sweObj, lon, lat, 0, 0, 0, transitFlag);
    return trans[1][0];
}

// Houses and angles
function sweHouses(jd, lat, lon, hsys) {
    const houseSystem = SWE_HOUSESYS[hsys];
    const [hlist, ascmc] = swisseph.swe_houses(jd, lat, lon, houseSystem);
    hlist.push(hlist[0]);  // Add first house to the end of 'hlist'

    const houses = hlist.slice(0, 12).map((lon, i) => ({
        id: consts.LIST_HOUSES[i],
        lon,
        size: angle.distance(lon, hlist[i + 1])
    }));

    const angles = [
        { id: consts.ASC, lon: ascmc[0] },
        { id: consts.MC, lon: ascmc[1] },
        { id: consts.DESC, lon: angle.norm(ascmc[0] + 180) },
        { id: consts.IC, lon: angle.norm(ascmc[1] + 180) }
    ];

    return { houses, angles };
}

function sweHousesLon(jd, lat, lon, hsys) {
    const houseSystem = SWE_HOUSESYS[hsys];
    const [hlist, ascmc] = swisseph.swe_houses(jd, lat, lon, houseSystem);

    const angles = [
        ascmc[0],
        ascmc[1],
        angle.norm(ascmc[0] + 180),
        angle.norm(ascmc[1] + 180)
    ];

    return { hlist, angles };
}

// Fixed stars
function sweFixedStar(star, jd) {
    const [sweList, stnam, flg] = swisseph.swe_fixstar2_ut(star, jd);
    const mag = swisseph.swe_fixstar2_mag(star);
    return {
        id: star,
        mag,
        lon: sweList[0],
        lat: sweList[1]
    };
}

// Eclipses
function solarEclipseGlobal(jd, backward) {
    const [sweList] = swisseph.swe_sol_eclipse_when_glob(jd, backward);
    return {
        maximum: sweList[1][0],
        begin: sweList[1][2],
        end: sweList[1][3],
        totality_begin: sweList[1][4],
        totality_end: sweList[1][5],
        center_line_begin: sweList[1][6],
        center_line_end: sweList[1][7]
    };
}

function lunarEclipseGlobal(jd, backward) {
    const [sweList] = swisseph.swe_lun_eclipse_when(jd, backward);
    return {
        maximum: sweList[1][0],
        partial_begin: sweList[1][2],
        partial_end: sweList[1][3],
        totality_begin: sweList[1][4],
        totality_end: sweList[1][5],
        penumbral_begin: sweList[1][6],
        penumbral_end: sweList[1][7]
    };
}

export default {
    setPath,
    sweObject,
    sweObjectLon,
    sweNextTransit,
    sweHouses,
    sweHousesLon,
    sweFixedStar,
    solarEclipseGlobal,
    lunarEclipseGlobal
};


export {
    setPath,
    sweObject,
    sweObjectLon,
    sweNextTransit,
    sweHouses,
    sweHousesLon,
    sweFixedStar,
    solarEclipseGlobal,
    lunarEclipseGlobal
}
