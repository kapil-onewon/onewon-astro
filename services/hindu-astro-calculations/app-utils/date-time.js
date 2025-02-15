import angle from './angle-utils.js';

// Calendar types
const GREGORIAN = 0;
const JULIAN = 1;

// === Julian Day Number conversions === //

function dateJDN(year, month, day, calendar) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    
    if (calendar === GREGORIAN) {
        return day + Math.floor((153 * m + 2) / 5) + 365 * y + 
               Math.floor(y / 4) - Math.floor(y / 100) + 
               Math.floor(y / 400) - 32045;
    } else {
        return day + Math.floor((153 * m + 2) / 5) + 365 * y + 
               Math.floor(y / 4) - 32083;
    }
}

function jdnDate(jdn) {
    const a = jdn + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    const c = a - Math.floor((146097 * b) / 4);
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const day = e + 1 - Math.floor((153 * m + 2) / 5);
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = 100 * b + d - 4800 + Math.floor(m / 10);
    return [year, month, day];
}

class Date {
    static GREGORIAN = GREGORIAN;
    static JULIAN = JULIAN;

    constructor(value, calendar = GREGORIAN) {
        if (typeof value === 'string') {
            value = value.split('/').map(Number);
            value = dateJDN(value[0], value[1], value[2], calendar);
        } else if (Array.isArray(value)) {
            value = dateJDN(value[0], value[1], value[2], calendar);
        }
        this.jdn = Math.floor(value);
    }

    dayofweek() {
        return (this.jdn + 1) % 7;
    }

    date() {
        return jdnDate(this.jdn);
    }

    toList() {
        const date = this.date();
        const sign = date[0] >= 0 ? '+' : '-';
        date[0] = Math.abs(date[0]);
        return [sign, ...date];
    }

    toString() {
        const slist = this.toList();
        const sign = slist[0] === '+' ? '' : '-';
        const string = slist.slice(1).map(v => v.toString().padStart(2, '0')).join('/');
        return sign + string;
    }
}

class Time {
    constructor(value) {
        this.value = angle.toFloat(value);
    }

    getUTC(utcoffset) {
        const newTime = (this.value - utcoffset.value) % 24;
        return new Time(newTime);
    }

    time() {
        const slist = this.toList();
        if (slist[0] === '-') {
            slist[1] *= -1;
            // Handle negative zero
            if (slist[1] === -0) {
                slist[1] = -0;
            }
        }
        return slist.slice(1);
    }

    toList() {
        const slist = angle.toList(this.value);
        slist[1] = slist[1] % 24;
        return slist;
    }

    toString() {
        const slist = this.toList();
        const string = angle.slistStr(slist);
        return slist[0] === '-' ? string : string.slice(1);
    }
}

class Datetime {
    static GREGORIAN = GREGORIAN;
    static JULIAN = JULIAN;

    constructor(date, time = 0, utcoffset = 0, calendar = GREGORIAN) {
        this.date = date instanceof Date ? date : new Date(date, calendar);
        this.time = time instanceof Time ? time : new Time(time);
        this.utcoffset = utcoffset instanceof Time ? utcoffset : new Time(utcoffset);

        this.jd = this.date.jdn + this.time.value / 24.0 - 
                  this.utcoffset.value / 24.0 - 0.5;
    }

    static fromJD(jd, utcoffset) {
        if (!(utcoffset instanceof Time)) {
            utcoffset = new Time(utcoffset);
        }
        const localJD = jd + utcoffset.value / 24.0;
        const date = new Date(Math.round(localJD));
        const time = new Time((localJD + 0.5 - date.jdn) * 24);
        return new Datetime(date, time, utcoffset);
    }

    getUTC() {
        const timeUTC = this.time.getUTC(this.utcoffset);
        const dateUTC = new Date(Math.round(this.jd));
        return new Datetime(dateUTC, timeUTC);
    }

    toString() {
        return `<${this.date.toString()} ${this.time.toString()} ${this.utcoffset.toString()}>`;
    }
}

export default { Date, Time, Datetime, GREGORIAN, JULIAN };
export { Date, Time, Datetime, GREGORIAN, JULIAN };