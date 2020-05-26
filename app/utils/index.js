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