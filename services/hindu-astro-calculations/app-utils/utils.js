/**
 * This file is part of flatlib - (C) FlatAngle
 * Author: João Ventura (flatangleweb@gmail.com)
 * 
 * This module provides generic utility functions.
 */

import angle from './angle-utils.js';

// === Diurnal and nocturnal arcs === //

/**
 * Returns the Ascensional Difference of a point.
 * @param {number} decl - Declination
 * @param {number} lat - Latitude
 * @returns {number}
 */
function ascdiff(decl, lat) {
    const delta = (decl * Math.PI) / 180;
    const phi = (lat * Math.PI) / 180;
    const ad = Math.asin(Math.tan(delta) * Math.tan(phi));
    return (ad * 180) / Math.PI;
}

/**
 * Returns the diurnal and nocturnal arcs of a point.
 * @param {number} decl - Declination
 * @param {number} lat - Latitude
 * @returns {[number, number]} Tuple of [diurnal arc, nocturnal arc]
 */
function dnarcs(decl, lat) {
    const dArc = 180 + 2 * ascdiff(decl, lat);
    const nArc = 360 - dArc;
    return [dArc, nArc];
}

// === Above horizon === //

/**
 * Returns if an object's 'ra' and 'decl' is above the horizon 
 * at a specific latitude, given the MC's right ascension.
 * @param {number} ra - Right Ascension
 * @param {number} decl - Declination
 * @param {number} mcRA - MC's Right Ascension
 * @param {number} lat - Latitude
 * @returns {boolean}
 */
function isAboveHorizon(ra, decl, mcRA, lat) {
    // This function checks if the equatorial distance from 
    // the object to the MC is within its diurnal semi-arc.
    const [dArc] = dnarcs(decl, lat);
    const dist = Math.abs(angle.closestDistance(mcRA, ra));
    return dist <= dArc / 2.0 + 0.0003; // 1 arc-second
}

// === Coordinate systems === //

/**
 * Converts from ecliptical to equatorial coordinates.
 * This algorithm is described in book 'Primary Directions', pp. 147-150.
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @returns {[number, number]} Tuple of [right ascension, declination]
 */
function eqCoords(lon, lat) {
    // Convert to radians
    const lambda = (lon * Math.PI) / 180;
    const beta = (lat * Math.PI) / 180;
    const epson = (23.44 * Math.PI) / 180; // The earth's inclination

    // Declination in radians
    const decl = Math.asin(
        Math.sin(epson) * Math.sin(lambda) * Math.cos(beta) +
        Math.cos(epson) * Math.sin(beta)
    );

    // Equatorial Distance in radians
    const ED = Math.acos(
        Math.cos(lambda) * Math.cos(beta) / Math.cos(decl)
    );

    // RA in radians
    let ra = lon < 180 ? ED : (2 * Math.PI) - ED;

    // Correctness of RA if longitude is close to 0º or 180º in a radius of 5º
    if (Math.abs(angle.closestDistance(lon, 0)) < 5 ||
        Math.abs(angle.closestDistance(lon, 180)) < 5) {
        const a = Math.sin(ra) * Math.cos(decl);
        const b = Math.cos(epson) * Math.sin(lambda) * Math.cos(beta) -
                 Math.sin(epson) * Math.sin(beta);
        
        if (Math.abs(a - b) > 0.0003) {
            ra = (2 * Math.PI) - ra;
        }
    }

    return [(ra * 180) / Math.PI, (decl * 180) / Math.PI];
}

export default {
    ascdiff,
    dnarcs,
    isAboveHorizon,
    eqCoords
};
export {
    ascdiff,
    dnarcs,
    isAboveHorizon,
    eqCoords
};