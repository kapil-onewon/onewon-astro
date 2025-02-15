import swe from './swe.js';
import angle from '../app-utils/angle-utils.js';
import consts from '../app-utils/constants.js';
import utils from '../app-utils/utils.js';

// One arc-second error for iterative algorithms
const MAX_ERROR = 0.0003;

// === Object positions === //
function pfLon(jd, lat, lon) {
    const sun = swe.sweObjectLon(consts.SUN, jd);
    const moon = swe.sweObjectLon(consts.MOON, jd);
    const asc = swe.sweHousesLon(jd, lat, lon, consts.HOUSES_DEFAULT)[1][0];

    if (isDiurnal(jd, lat, lon)) {
        return angle.norm(asc + moon - sun);
    } else {
        return angle.norm(asc + sun - moon);
    }
}

// === Diurnal  === //
function isDiurnal(jd, lat, lon) {
    const sun = swe.sweObject(consts.SUN, jd);
    const mc = swe.sweHousesLon(jd, lat, lon, consts.HOUSES_DEFAULT)[1][1];
    const [ra, decl] = utils.eqCoords(sun.lon, sun.lat);
    const [mcRA] = utils.eqCoords(mc, 0.0);
    return utils.isAboveHorizon(ra, decl, mcRA, lat);
}

// === Iterative algorithms === //
function syzygyJD(jd) {
    let sun = swe.sweObjectLon(consts.SUN, jd);
    let moon = swe.sweObjectLon(consts.MOON, jd);
    let dist = angle.distance(sun, moon);

    const offset = dist >= 180 ? 180 : 0;
    while (Math.abs(dist) > MAX_ERROR) {
        jd = jd - dist / 13.1833; // Moon mean daily motion
        sun = swe.sweObjectLon(consts.SUN, jd);
        moon = swe.sweObjectLon(consts.MOON, jd);
        dist = angle.closestDistance(sun - offset, moon);
    }
    return jd;
}

function solarReturnJD(jd, lon, forward = true) {
    let sun = swe.sweObjectLon(consts.SUN, jd);
    let dist = forward ? angle.distance(sun, lon) : -angle.distance(lon, sun);

    while (Math.abs(dist) > MAX_ERROR) {
        jd = jd + dist / 0.9833; // Sun mean motion
        sun = swe.sweObjectLon(consts.SUN, jd);
        dist = angle.closestDistance(sun, lon);
    }
    return jd;
}

// === Other algorithms === //
function nextStationJD(ID, jd) {
    let speed = swe.sweObject(ID, jd).lonspeed;
    for (let i = 0; i < 2000; i++) {
        const nextjd = jd + i / 2;
        const nextspeed = swe.sweObject(ID, nextjd).lonspeed;
        if (speed * nextspeed <= 0) {
            return nextjd;
        }
    }
    return null;
}

export default {
    pfLon,
    isDiurnal,
    syzygyJD,
    solarReturnJD,
    nextStationJD
};