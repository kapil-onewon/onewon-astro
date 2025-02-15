import eph from './eph.js';
import swe from './swe.js';
import Datetime from '../app-utils/date-time.js';
import { GenericObject, Object, House, FixedStar } from '../app-utils/object.js';
import { GenericList, ObjectList, HouseList, FixedStarList } from '../app-utils/lists.js';

// === Objects === //
function getObject(ID, date, pos) {
    const obj = eph.getObject(ID, date.jd, pos.lat, pos.lon);
    return Object.fromDict(obj);
}

function getObjectList(IDs, date, pos) {
    const objList = IDs.map(ID => getObject(ID, date, pos));
    return new ObjectList(objList);
}

// === Houses and angles === //
function getHouses(date, pos, hsys) {
    const { houses, angles } = eph.getHouses(date.jd, pos.lat, pos.lon, hsys);
    const hList = houses.map(house => House.fromDict(house));
    const aList = angles.map(angle => GenericObject.fromDict(angle));
    return { houses: new HouseList(hList), angles: new GenericList(aList) };
}

function getHouseList(date, pos, hsys) {
    return getHouses(date, pos, hsys).houses;
}

function getAngleList(date, pos, hsys) {
    return getHouses(date, pos, hsys).angles;
}

// === Fixed stars === //
function getFixedStar(ID, date) {
    const star = eph.getFixedStar(ID, date.jd);
    return FixedStar.fromDict(star);
}

function getFixedStarList(IDs, date) {
    const starList = IDs.map(ID => getFixedStar(ID, date));
    return new FixedStarList(starList);
}

// === Solar returns === //
function nextSolarReturn(date, lon) {
    const jd = eph.nextSolarReturn(date.jd, lon);
    return Datetime.fromJD(jd, date.utcoffset);
}

function prevSolarReturn(date, lon) {
    const jd = eph.prevSolarReturn(date.jd, lon);
    return Datetime.fromJD(jd, date.utcoffset);
}

// === Sunrise and sunsets === //
function nextSunrise(date, pos) {
    const jd = eph.nextSunrise(date.jd, pos.lat, pos.lon);
    return Datetime.fromJD(jd, date.utcoffset);
}

function nextSunset(date, pos) {
    const jd = eph.nextSunset(date.jd, pos.lat, pos.lon);
    return Datetime.fromJD(jd, date.utcoffset);
}

function lastSunrise(date, pos) {
    return nextSunrise({ ...date, jd: date.jd - 1.0 }, pos);
}

function lastSunset(date, pos) {
    return nextSunset({ ...date, jd: date.jd - 1.0 }, pos);
}

// === Station === //
function nextStation(ID, date) {
    const jd = eph.nextStation(ID, date.jd);
    return Datetime.fromJD(jd, date.utcoffset);
}

// === Eclipses === //
function prevSolarEclipse(date) {
    const eclipse = swe.solarEclipseGlobal(date.jd, true);
    return Datetime.fromJD(eclipse.maximum, date.utcoffset);
}

function nextSolarEclipse(date) {
    const eclipse = swe.solarEclipseGlobal(date.jd, false);
    return Datetime.fromJD(eclipse.maximum, date.utcoffset);
}

function prevLunarEclipse(date) {
    const eclipse = swe.lunarEclipseGlobal(date.jd, true);
    return Datetime.fromJD(eclipse.maximum, date.utcoffset);
}

function nextLunarEclipse(date) {
    const eclipse = swe.lunarEclipseGlobal(date.jd, false);
    return Datetime.fromJD(eclipse.maximum, date.utcoffset);
}

export default {
    getObject,
    getObjectList,
    getHouses,
    getHouseList,
    getAngleList,
    getFixedStar,
    getFixedStarList,
    nextSolarReturn,
    prevSolarReturn,
    nextSunrise,
    nextSunset,
    lastSunrise,
    lastSunset,
    nextStation,
    prevSolarEclipse,
    nextSolarEclipse,
    prevLunarEclipse,
    nextLunarEclipse
};

export {
    getObject,
    getObjectList,
    getHouses,
    getHouseList,
    getAngleList,
    getFixedStar,
    getFixedStarList,
    nextSolarReturn,
    prevSolarReturn,
    nextSunrise,
    nextSunset,
    lastSunrise,
    lastSunset,
    nextStation,
    prevSolarEclipse,
    nextSolarEclipse,
    prevLunarEclipse,
    nextLunarEclipse
};