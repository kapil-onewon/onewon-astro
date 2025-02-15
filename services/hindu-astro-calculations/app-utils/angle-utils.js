// === Angular utilities === //

function norm(angle) {
    // Normalizes an angle between 0 and 360
    return ((angle % 360) + 360) % 360;
}

function znorm(angle) {
    // Normalizes an angle between -180 and 180
    angle = norm(angle);
    return angle <= 180 ? angle : angle - 360;
}

function distance(angle1, angle2) {
    // Angular distance from angle1 to angle2 (ccw)
    return norm(angle2 - angle1);
}

function closestDistance(angle1, angle2) {
    // Closest distance from angle1 to angle2 (ccw is positive)
    return znorm(angle2 - angle1);
}

// === Signed Lists utilities === //

function fixSlist(slist) {
    // Guarantees that a signed list has exactly four elements
    while (slist.length < 4) {
        slist.push(0);
    }
    return slist.slice(0, 4);
}

function roundSlist(slist) {
    // Rounds a signed list over the last element and removes it
    slist[slist.length - 1] = slist[slist.length - 1] >= 30 ? 60 : 0;
    for (let i = slist.length - 1; i > 1; i--) {
        if (slist[i] === 60) {
            slist[i] = 0;
            slist[i - 1] += 1;
        }
    }
    return slist.slice(0, -1);
}

// === Base conversions === //

function strSlist(string) {
    // Converts angle string to signed list
    const sign = string[0] === '-' ? '-' : '+';
    const values = string.replace('-', '').split(':').map(Number);
    return fixSlist([sign, ...values]);
}

function slistStr(slist) {
    // Converts signed list to angle string
    slist = fixSlist(slist);
    const string = slist.slice(1).map(x => String(x).padStart(2, '0')).join(':');
    return slist[0] + string;
}

function slistFloat(slist) {
    // Converts signed list to float
    const values = slist.slice(1).map((v, i) => v / Math.pow(60, i));
    const value = values.reduce((a, b) => a + b, 0);
    return slist[0] === '-' ? -value : value;
}

function floatSlist(value) {
    // Converts float to signed list
    let slist = ['+', 0, 0, 0, 0];
    if (value < 0) slist[0] = '-';
    value = Math.abs(value);
    for (let i = 1; i < 5; i++) {
        slist[i] = Math.floor(value);
        value = (value - slist[i]) * 60;
    }
    return roundSlist(slist);
}

function strFloat(string) {
    // Converts angle string to float
    return slistFloat(strSlist(string));
}

function floatStr(value) {
    // Converts angle float to string
    return slistStr(floatSlist(value));
}

// === Direct conversions === //

function toFloat(value) {
    // Converts string or signed list to float
    if (typeof value === 'string') {
        return strFloat(value);
    } else if (Array.isArray(value)) {
        return slistFloat(value);
    }
    return value;
}

function toList(value) {
    // Converts angle float to signed list
    return floatSlist(value);
}

function toString(value) {
    // Converts angle float to string
    return floatStr(value);
}

// Export functions if using modules
// module.exports = { norm, znorm, distance, closestDistance, strSlist, slistStr, slistFloat, floatSlist, strFloat, floatStr, toFloat, toList, toString };
export default { norm, znorm, distance, closestDistance, strSlist, slistStr, slistFloat, floatSlist, strFloat, floatStr, toFloat, toList, toString };
export { norm, znorm, distance, closestDistance, strSlist, slistStr, slistFloat, floatSlist, strFloat, floatStr, toFloat, toList, toString };