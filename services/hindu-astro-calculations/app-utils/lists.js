import aspects from './aspects-util.js';

class GenericList {
    constructor(values = []) {
        this.content = {};
        for (const obj of values) {
            this.content[obj.id] = obj;
        }
    }

    add(obj) {
        this.content[obj.id] = obj;
    }

    get(ID) {
        return this.content[ID];
    }

    copy() {
        const values = Array.from(this).map(obj => obj.copy());
        return new GenericList(values);
    }

    *[Symbol.iterator]() {
        yield* Object.values(this.content);
    }
}

class ObjectList extends GenericList {
    getObjectsInHouse(house) {
        const res = Array.from(this).filter(obj => house.hasObject(obj));
        return new ObjectList(res);
    }

    getObjectsAspecting(point, aspList) {
        const res = Array.from(this).filter(obj => 
            obj.isPlanet() && aspects.isAspecting(obj, point, aspList)
        );
        return new ObjectList(res);
    }
}

class HouseList extends GenericList {
    getHouseByLon(lon) {
        for (const house of this) {
            if (house.inHouse(lon)) {
                return house;
            }
        }
        return null;
    }

    getObjectHouse(obj) {
        return this.getHouseByLon(obj.lon);
    }
}

class FixedStarList extends GenericList {
    // Pass through implementation from parent
}

export { GenericList, ObjectList, HouseList, FixedStarList };