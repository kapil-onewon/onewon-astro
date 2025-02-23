import swe from './swe.js';
import tools from './tools.js';
import angle from '../app-utils/angle-utils.js';
import consts from '../app-utils/constants.js';

// === Objects === //
function getObject(ID, jd, lat, lon) {
    let obj;
    if (ID === consts.SOUTH_NODE) {
        obj = swe.sweObject(consts.NORTH_NODE, jd);
        obj.id = consts.SOUTH_NODE;
        obj.lon = angle.norm(obj.lon + 180);
    } else if (ID === consts.PARS_FORTUNA) {
        const pflon = tools.pfLon(jd, lat, lon);
        obj = {
            id: ID,
            lon: pflon,
            lat: 0,
            lonspeed: 0,
            latspeed: 0
        };
    } else if (ID === consts.SYZYGY) {
        const szjd = tools.syzygyJD(jd);
        obj = swe.sweObject(consts.MOON, szjd);
        obj.id = consts.SYZYGY;
    } else {
        obj = swe.sweObject(ID, jd);
    }

    _signInfo(obj);
    return obj;
}

// === Houses === //
function getHouses(jd, lat, lon, hsys) {
    const housesResponse = swe.sweHouses(jd, lat, lon, hsys);
    // console.log(housesResponse);
    const [houses, angles] = housesResponse;
    houses.forEach(house => _signInfo(house));
    angles.forEach(angle => _signInfo(angle));
    return { houses, angles };
}

// === Fixed stars === //
function getFixedStar(ID, jd) {
    const star = swe.sweFixedStar(ID, jd);
    _signInfo(star);
    return star;
}

// === Solar returns === //
function nextSolarReturn(jd, lon) {
    return tools.solarReturnJD(jd, lon, true);
}

function prevSolarReturn(jd, lon) {
    return tools.solarReturnJD(jd, lon, false);
}

// === Sunrise and sunsets === //
function nextSunrise(jd, lat, lon) {
    return swe.sweNextTransit(consts.SUN, jd, lat, lon, 'RISE');
}

function nextSunset(jd, lat, lon) {
    return swe.sweNextTransit(consts.SUN, jd, lat, lon, 'SET');
}

function lastSunrise(jd, lat, lon) {
    return nextSunrise(jd - 1.0, lat, lon);
}

function lastSunset(jd, lat, lon) {
    return nextSunset(jd - 1.0, lat, lon);
}

// === Stations === //
function nextStation(ID, jd) {
    return tools.nextStationJD(ID, jd);
}

// === Other functions === //
function _signInfo(obj) {
    const lon = obj.lon;
    obj.sign = consts.SIGNS[Math.floor(lon / 30)];
    obj.signlon = lon % 30;
}

export default {
    getObject,
    getHouses,
    getFixedStar,
    nextSolarReturn,
    prevSolarReturn,
    nextSunrise,
    nextSunset,
    lastSunrise,
    lastSunset,
    nextStation
};