import consts from "./constants.js";
import angle from "./angle-utils.js";
import utils from './utils.js';
import props from './props.js';

// ------------------ //
//   Generic Object   //
// ------------------ //

class GenericObject {
    constructor() {
        this.id = consts.NO_PLANET;
        this.type = consts.OBJ_GENERIC;
        this.lon = 0.0;
        this.lat = 0.0;
        this.sign = consts.ARIES;
        this.signlon = 0.0;
    }

    static fromDict(_dict) {
        let obj = new this(); // Creates a new instance of GenericObject
        if (typeof _dict === "object" && _dict !== null) {
            global.Object.assign(obj, _dict);// Assigns properties from _dict to obj
        } else {
          console.error("Invalid _dict:", _dict);
        }
        return obj;
      }

    copy() {
        return GenericObject.fromDict(this);
    }

    toString() {
        return `<${this.id} ${this.sign} ${angle.toString(this.signlon)}>`;
    }

    orb() {
        return -1.0;
    }

    isPlanet() {
        return this.type === consts.OBJ_PLANET;
    }

    eqCoords(zerolat = false) {
        const lat = zerolat ? 0.0 : this.lat;
        return utils.eqCoords(this.lon, lat);
    }

    relocate(lon) {
        this.lon = angle.norm(lon);
        this.signlon = this.lon % 30;
        this.sign = consts.LIST_SIGNS[Math.floor(this.lon / 30)];
    }

    antiscia() {
        const obj = this.copy();
        obj.type = consts.OBJ_GENERIC;
        obj.relocate(360 - obj.lon + 180);
        return obj;
    }

    cantiscia() {
        const obj = this.copy();
        obj.type = consts.OBJ_GENERIC;
        obj.relocate(360 - obj.lon);
        return obj;
    }
}

// -------------------- //
//   Astrology Object   //
// -------------------- //

class Object extends GenericObject {
    constructor() {
        super();
        this.type = consts.OBJ_PLANET;
        this.lonspeed = 0.0;
        this.latspeed = 0.0;
    }

    toString() {
        return `${super.toString().slice(0, -1)} ${angle.toString(this.lonspeed)}>`;
    }

    orb() {
        return props.object.orb[this.id];
    }

    meanMotion() {
        return props.object.meanMotion[this.id];
    }

    movement() {
        if (Math.abs(this.lonspeed) < 0.0003) return consts.STATIONARY;
        return this.lonspeed > 0 ? consts.DIRECT : consts.RETROGRADE;
    }

    gender() {
        return props.object.gender[this.id];
    }

    faction() {
        return props.object.faction[this.id];
    }

    element() {
        return props.object.element[this.id];
    }

    isDirect() {
        return this.movement() === consts.DIRECT;
    }

    isRetrograde() {
        return this.movement() === consts.RETROGRADE;
    }

    isStationary() {
        return this.movement() === consts.STATIONARY;
    }

    isFast() {
        return Math.abs(this.lonspeed) >= this.meanMotion();
    }
}

// ------------------ //
//     House Cusp     //
// ------------------ //

class House extends GenericObject {
    static OFFSET = -5.0;

    constructor() {
        super();
        this.type = consts.OBJ_HOUSE;
        this.size = 30.0;
    }

    toString() {
        return `${super.toString().slice(0, -1)} ${this.size}>`;
    }

    num() {
        return parseInt(this.id.slice(5));
    }

    condition() {
        return props.house.condition[this.id];
    }

    gender() {
        return props.house.gender[this.id];
    }

    isAboveHorizon() {
        return props.house.aboveHorizon.includes(this.id);
    }

    inHouse(lon) {
        const dist = angle.distance(this.lon + House.OFFSET, lon);
        return dist < this.size;
    }

    hasObject(obj) {
        return this.inHouse(obj.lon);
    }
}

// ------------------ //
//     Fixed Star     //
// ------------------ //

class FixedStar extends GenericObject {
    static ORBS = [[2, 7.5], [3, 5.5], [4, 3.5], [5, 1.5]];

    constructor() {
        super();
        this.type = consts.OBJ_FIXED_STAR;
        this.mag = 0.0;
    }

    toString() {
        return `${super.toString().slice(0, -1)} ${this.mag}>`;
    }

    orb() {
        for (const [mag, orb] of FixedStar.ORBS) {
            if (this.mag < mag) return orb;
        }
        return 0.5;
    }

    aspects(obj) {
        const dist = angle.closestdistance(this.lon, obj.lon);
        return Math.abs(dist) < this.orb();
    }
}

export { GenericObject, Object, House, FixedStar };
