import moment from "moment";

export const genKey = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const arraysEqual = (_arr1, _arr2) => {
  if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) {
    return false;
  }
  var arr1 = _arr1.concat().sort();
  var arr2 = _arr2.concat().sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export const datetime = () => {
  return {
    plain: (time) => getDate(time),
    parts: time => getDateByChunks(time),
    obj: o => moment(o),
    diff: (a, b, mode) => (a.diff(b, mode))
  }
}

export const toMomentObject = date => moment(date != null ? date : Date.now());

export const formatDateSimple = (date, format) => {
  if (!date) { return null; }
  return moment(date).format(format);
}

export const isNumber = number => {
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
  number: isNumber,
  url: isURL,
  email: isEmail,
  letters: isOnlyLetters,
  special: isOnlySpecial,
  lettersSpecial: isLettersSpecial,
  lettersNumbers: isLettersNumbers
}