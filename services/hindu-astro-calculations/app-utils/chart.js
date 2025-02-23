// Import necessary modules
import { getObjectList, getHouses, getFixedStar, getFixedStarList, nextSolarReturn } from '../epham/ephem.js';
import { HOUSES_DEFAULT, LIST_OBJECTS_TRADITIONAL, ANGLES, LIST_FIXED_STARS, HOUSE1, HOUSE10, ASC, MC, SUN, MOON, MOON_FIRST_QUARTER, MOON_SECOND_QUARTER, MOON_THIRD_QUARTER, MOON_LAST_QUARTER } from './constants.js';
import { closestDistance, distance } from './angle-utils.js';
import { eqCoords, isAboveHorizon } from './utils.js';
import Datetime from './date-time.js';

class Chart {
    constructor(date, pos, options = {}) {
        this.date = date;
        this.pos = pos;
        this.hsys = options.hsys || HOUSES_DEFAULT;
        
        const IDs = options.IDs || LIST_OBJECTS_TRADITIONAL;
        this.objects = getObjectList(IDs, date, pos);
        const { houses, angles } = getHouses(date, pos, this.hsys);
       
        this.houses = houses.content;
        this.angles = angles.content;
    }

    copy() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    getObject(ID) {
        return this.objects.content[ID] || null;
    }

    getHouse(ID) {
        return this.houses[ID] || null;
    }

    getAngle(ID) {
        return this.angles[ID] || null;
    }

    get(ID) {
        if (ID.startsWith('House')) {
            return this.getHouse(ID);
        } else if (ANGLES.includes(ID)) {
            return this.getAngle(ID);
        } else {
            return this.getObject(ID);
        }
    }

    getFixedStar(ID) {
        return getFixedStar(ID, this.date);
    }

    getFixedStars() {
        return getFixedStarList(LIST_FIXED_STARS, this.date);
    }

    isHouse1Asc() {
        const house1 = this.getHouse(HOUSE1);
        const asc = this.getAngle(ASC);
        return Math.abs(closestDistance(house1.lon, asc.lon)) < 0.0003;
    }

    isHouse10MC() {
        const house10 = this.getHouse(HOUSE10);
        const mc = this.getAngle(MC);
        return Math.abs(closestDistance(house10.lon, mc.lon)) < 0.0003;
    }

    isDiurnal() {
        const sun = this.getObject(SUN);
        const mc = this.getAngle(MC);
        const lat = this.pos.lat;
        const [sunRA, sunDecl] = eqCoords(sun.lon, sun.lat);
        const [mcRA, mcDecl] = eqCoords(mc.lon, 0);
        return isAboveHorizon(sunRA, sunDecl, mcRA, lat);
    }

    getMoonPhase() {
        const sun = this.getObject(SUN);
        const moon = this.getObject(MOON);
        const dist = distance(sun.lon, moon.lon);
        if (dist < 90) return MOON_FIRST_QUARTER;
        if (dist < 180) return MOON_SECOND_QUARTER;
        if (dist < 270) return MOON_THIRD_QUARTER;
        return MOON_LAST_QUARTER;
    }

    solarReturn(year) {
        const sun = this.getObject(SUN);
        const date = new Datetime(`${year}/01/01`, '00:00', this.date.utcoffset);
        const srDate = nextSolarReturn(date, sun.lon);
        return new Chart(srDate, this.pos, { hsys: this.hsys });
    }
}

export default Chart;
