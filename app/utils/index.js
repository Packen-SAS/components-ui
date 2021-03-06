import moment from "moment";
import deepEqual from "deep-equal";

export const genKey = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const objectsEqual = (obj1, obj2) => deepEqual(obj1, obj2);

export const arraysEqual = (_arr1, _arr2) => {
  if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) {
    return false;
  }
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();
  for (let i = 0; i < arr1.length; i += 1) {
    if (typeof arr1[i] === "object" && typeof arr2[i] === "object") {
      if (!objectsEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

const localtime = {
  0: "00", 1: "01", 2: "02", 3: "03",
  4: "04", 5: "05", 6: "06", 7: "07",
  8: "08", 9: "09", 10: "10", 11: "11",
  12: "12", 13: "01", 14: "02", 15: "03",
  16: "04", 17: "05", 18: "06", 19: "07",
  20: "08", 21: "09", 22: "10", 23: "11"
}

const datetime_locale = {
  "es": {
    months: {
      0: "Enero", 1: "Febrero", 2: "Marzo", 3: "Abril",
      4: "Mayo", 5: "Junio", 6: "Julio", 7: "Agosto",
      8: "Septiembre", 9: "Octubre", 10: "Noviembre", 11: "Diciembre"
    },
    days: {
      0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles",
      4: "Jueves", 5: "Viernes", 6: "Sábado"
    }
  },
  "en": {
    months: {
      0: "January", 1: "Febrary", 2: "March", 3: "April",
      4: "May", 5: "June", 6: "July", 7: "August",
      8: "September", 9: "October", 10: "November", 11: "December"
    },
    days: {
      0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday",
      4: "Thursday", 5: "Friday", 6: "Saturday"
    }
  }
}

export const getTime = date => {
  date = date instanceof Date ? date : new Date(date);
  const HH = localtime[date.getHours()];
  const MM = zeroPaddingForDate(date.getMinutes());
  const SS = zeroPaddingForDate(date.getSeconds());
  const TZ = (date.getHours() < 12 ? "AM" : "PM");
  return `${HH}:${MM}:${SS} ${TZ}`;
}

const zeroPaddingForDate = day => (day < 10 ? `0${day}` : day);

export const getDate = time => {
  const date = time instanceof Date ? time : new Date(time);
  const DD = zeroPaddingForDate(date.getUTCDate());
  const MO = zeroPaddingForDate(date.getUTCMonth() + 1);
  const YYYY = date.getFullYear();
  const result = `${DD}/${MO}/${YYYY} ${getTime(date)}`;
  return result;
}

export const getDateByChunks = (d, locale = "es") => {
  const date = d instanceof Date ? d : new Date(d);
  const lang = locale;
  const date_local = datetime_locale[lang];
  return {
    month: date_local.months[date.getMonth()],
    day: date_local.days[date.getDay()],
    nday: zeroPaddingForDate(date.getDate()),
    year: date.getUTCFullYear(),
    time: getTime(date),
    locale: lang,
    unix: date.getTime()
  }
}

export const removeTimezone = (str) => {
  if (typeof str !== 'string') { return str; }
  if (!str.includes('T')) {
    return (str.includes(' -05') ? str.split(' -05')[0] : str).replace(/-/g, '/');
  } return str;
};

export const datetime = () => {
  return {
    plain: time => getDate(time),
    parts: (time, locale) => getDateByChunks(time, locale),
    obj: o => moment(removeTimezone(o)),
    diff: (a, b, mode) => (a.diff(b, mode))
  }
}

export const toMomentObject = date => moment(date != null ? date : Date.now());

export const formatDateSimple = (date, format) => {
  if (!date) { return null; }
  return moment(date).format(format);
}

export const isNumber = (number) => {
  if (!number) { return false; }
  const rx = /^(\d+)$/g;
  return rx.exec(number) != null;
}

export const isNumberStr = number => {
  return /^\d+$/.test(number.toString());
}

export const isOnlyLetters = string => {
  return /^[A-Za-z ]+$/.test(string.toString());
}

export const isEmail = email => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toString());
}

export const isURL = url => {
  return /^http(s?):\/\/(.*)$/.test(url.toString());
}

export const isOnlySpecial = string => {
  return /^[!¡´°¬@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?¿]*$/.test(string.toString());
}

export const isLettersSpecial = string => {
  return /^[A-Za-z!¡´°¬@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?¿]*$/.test(string.toString());
}

export const isLettersNumbers = string => {
  return /^[A-Za-z0-9 ]+$/.test(string.toString());
}

export const validators = {
  number: isNumberStr,
  url: isURL,
  email: isEmail,
  letters: isOnlyLetters,
  special: isOnlySpecial,
  lettersSpecial: isLettersSpecial,
  lettersNumbers: isLettersNumbers
}

export const toTitleCase = (str) => {
  if (typeof str !== 'string') { return str; }
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const toCapitalCase = (str) => {
  if (typeof str !== 'string') { return str; }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getNdayFormat = (locale, nday) => {
  let ndayFormat = '';
  if (locale === 'es') {
    ndayFormat = ' de';
  } else {
    switch (nday.toString()) {
      case '1':
      case '01':
        ndayFormat = 'st';
        break;
      case '2':
      case '02':
        ndayFormat = 'nd';
        break;
      case '3':
      case '03':
        ndayFormat = 'rd';
        break;
      default:
        ndayFormat = 'th';
        break;
    }
  }
  return ndayFormat;
};

export const num2ltr = (num) => {
  if (!num) { return null; }
  return String.fromCharCode(num + 64);
};

export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const getPerpendicularBisectorCoords = (p1, p2) => {
  const p1x = parseFloat(p1.x);
  const p1y = parseFloat(p1.y);
  const p2x = parseFloat(p2.x);
  const p2y = parseFloat(p2.y);

  const mpx = (p2x + p1x) * 0.5;
  const mpy = (p2y + p1y) * 0.5;

  const distance = Math.sqrt(((p2x - p1x) * (p2x - p1x)) + ((p2y - p1y) * (p2y - p1y)));
  const theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

  const offset = -0.5 * distance;

  const c1x = mpx + offset * Math.cos(theta);
  const c1y = mpy + offset * Math.sin(theta);

  return { x: c1x, y: c1y };
};

export const getQuadraticXY = (t, start, cp, end) => ({
  x: (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * cp.x + t * t * end.x,
  y: (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * cp.y + t * t * end.y
});

export const getCurveCoordsBetween2Points = (pairCoords) => {
  const start = { x: pairCoords[0].latitude, y: pairCoords[0].longitude };
  const end = { x: pairCoords[1].latitude, y: pairCoords[1].longitude };
  const perpBisectPoint = getPerpendicularBisectorCoords(
    { x: start.x, y: start.y },
    { x: end.x, y: end.y }
  );
  const finalCurveCoords = [];
  for (let i = 0; i <= 1; i += 0.01) {
    const { x, y } = getQuadraticXY(i, start, perpBisectPoint, end);
    finalCurveCoords.push({ latitude: x, longitude: y });
  }
  return finalCurveCoords;
};