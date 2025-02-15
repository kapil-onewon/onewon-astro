import angle from "./angle-utils.js";
import consts from './constants.js';

// Orb for minor and exact aspects
const MAX_MINOR_ASP_ORB = 3;
const MAX_EXACT_ORB = 0.3;

// === Private functions === //

function _orbList(obj1, obj2, aspList) {
    const sep = angle.closestDistance(obj1.lon, obj2.lon);
    const absSep = Math.abs(sep);
    return aspList.map(asp => ({
        type: asp,
        orb: Math.abs(absSep - asp),
        separation: sep,
    }));
}

function _aspectDict(obj1, obj2, aspList) {
    if (obj1 === obj2 || obj1.id === consts.OBJECTS.SYZYGY) {
        return null;
    }

    const orbs = _orbList(obj1, obj2, aspList);
    for (const aspDict of orbs) {
        const { type, orb } = aspDict;

        if (consts.MAJOR_ASPECTS.includes(type)) {
            if (obj1.orb() < orb && obj2.orb() < orb) continue;
        } else {
            if (MAX_MINOR_ASP_ORB < orb) continue;
        }

        if ([consts.OBJECTS.PARS_FORTUNA, consts.OBJECTS.NORTH_NODE, consts.OBJECTS.SOUTH_NODE].includes(obj1.id) &&
            type !== consts.MAJOR_ASPECTS.CONJUNCTION) {
            continue;
        }

        return aspDict;
    }
    return null;
}

function _aspectProperties(obj1, obj2, aspDict) {
    const { orb, type, separation: sep } = aspDict;

    const prop1 = { id: obj1.id, inOrb: false, movement: consts.ASPECT_MOVEMENT.NO_MOVEMENT };
    const prop2 = { id: obj2.id, inOrb: false, movement: consts.ASPECT_MOVEMENT.NO_MOVEMENT };
    const prop = { type, orb, direction: -1, condition: -1, active: prop1, passive: prop2 };

    if (type === consts.MAJOR_ASPECTS.NO_ASPECT) return prop;

    prop1.inOrb = orb <= obj1.orb();
    prop2.inOrb = orb <= obj2.orb();

    prop.direction = sep <= 0 ? consts.ASPECT_DIRECTION.DEXTER : consts.ASPECT_DIRECTION.SINISTER;

    const orbDir = sep - type;
    const offset = obj1.signlon + orbDir;
    prop.condition = (0 <= offset && offset < 30) ? consts.ASPECT_PROPERTIES.ASSOCIATE : consts.ASPECT_PROPERTIES.DISSOCIATE;

    if (Math.abs(orbDir) < MAX_EXACT_ORB) {
        prop1.movement = prop2.movement = consts.ASPECT_MOVEMENT.EXACT;
    } else {
        prop1.movement = consts.ASPECT_MOVEMENT.SEPARATIVE;
        if ((orbDir > 0 && obj1.isDirect()) || (orbDir < 0 && obj1.isRetrograde())) {
            prop1.movement = consts.ASPECT_MOVEMENT.APPLICATIVE;
        } else if (obj1.isStationary()) {
            prop1.movement = consts.OBJECT_MOVEMENTS.STATIONARY;
        }

        prop2.movement = consts.ASPECT_MOVEMENT.NO_MOVEMENT;
        if (obj2.isPlanet() && obj1.lonspeed * obj2.lonspeed < 0) {
            prop2.movement = prop1.movement;
        }
    }

    return prop;
}

function _getActivePassive(obj1, obj2) {
    const speed1 = obj1.isPlanet() ? Math.abs(obj1.lonspeed) : -1.0;
    const speed2 = obj2.isPlanet() ? Math.abs(obj2.lonspeed) : -1.0;
    return speed1 > speed2 ? { active: obj1, passive: obj2 } : { active: obj2, passive: obj1 };
}

// === Public functions === //

function aspectType(obj1, obj2, aspList) {
    const ap = _getActivePassive(obj1, obj2);
    const aspDict = _aspectDict(ap.active, ap.passive, aspList);
    return aspDict ? aspDict.type : consts.MAJOR_ASPECTS.NO_ASPECT;
}

function hasAspect(obj1, obj2, aspList) {
    return aspectType(obj1, obj2, aspList) !== consts.MAJOR_ASPECTS.NO_ASPECT;
}

function isAspecting(obj1, obj2, aspList) {
    const aspDict = _aspectDict(obj1, obj2, aspList);
    return aspDict ? aspDict.orb < obj1.orb() : false;
}

function getAspect(obj1, obj2, aspList) {
    const ap = _getActivePassive(obj1, obj2);
    let aspDict = _aspectDict(ap.active, ap.passive, aspList);
    if (!aspDict) {
        aspDict = { type: consts.MAJOR_ASPECTS.NO_ASPECT, orb: 0, separation: 0 };
    }
    const aspProp = _aspectProperties(ap.active, ap.passive, aspDict);
    return new Aspect(aspProp);
}

// ---------------- //
//   Aspect Class   //
// ---------------- //

class AspectObject {
    constructor(properties) {
        Object.assign(this, properties);
    }
}

class Aspect {
    constructor(properties) {
        Object.assign(this, properties);
        this.active = new AspectObject(this.active);
        this.passive = new AspectObject(this.passive);
    }

    exists() {
        return this.type !== consts.MAJOR_ASPECTS.NO_ASPECT;
    }

    movement() {
        let mov = this.active.movement;
        if (this.orb < 1 && mov === consts.ASPECT_MOVEMENT.SEPARATIVE) {
            mov = consts.ASPECT_MOVEMENT.EXACT;
        }
        return mov;
    }

    mutualAspect() {
        return this.active.inOrb && this.passive.inOrb;
    }

    mutualMovement() {
        return this.active.movement === this.passive.movement;
    }

    getRole(ID) {
        if (this.active.id === ID) {
            return { role: 'active', inOrb: this.active.inOrb, movement: this.active.movement };
        } else if (this.passive.id === ID) {
            return { role: 'passive', inOrb: this.passive.inOrb, movement: this.passive.movement };
        }
        return null;
    }

    inOrb(ID) {
        const role = this.getRole(ID);
        return role ? role.inOrb : null;
    }

    toString() {
        return `<${this.active.id} ${this.passive.id} ${this.type} ${this.active.movement} ${angle.toString(this.orb)}>`;
    }
}

export default { aspectType, hasAspect, isAspecting, getAspect, Aspect };
