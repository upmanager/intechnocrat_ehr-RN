import { Dimensions } from "react-native";
export const getDeviceWidth = (windows) => {
  return Dimensions.get(windows ? 'window' : 'screen').width;
}
export const getDeviceHeight = (windows) => {
  return Dimensions.get(windows ? 'window' : 'screen').height;
}
export const convertUnits = (value, { unit, default: isDefault }, maxPoint = 2, toDef = false) => {
  if (!value) return '';
  if (!isDefault || toDef) {
    switch (unit) {
      // BP
      case "kPa":
        if (toDef) value = value * 7.501;
        else value = value / 7.501;
        break;
      // weight
      case "lbs":
        if (toDef) value = value / 2.205;
        else value = value * 2.205;
        break;
      // distance
      case "miles":
        if (toDef) value = value / 1.609;
        else value = value / 1.609;
        break;
      // height
      case "feet":
        if (toDef) {
          const { feet, inches } = value;
          value = feet * 30.48 + inches * 2.54;
        } else {
          var realFeet = ((value * 0.393700) / 12);
          var feet = Math.floor(realFeet);
          var inches = Math.round((realFeet - feet) * 12);
          return { feet, inches };
        }
        break;
      // temperature
      case "°F":
        if (toDef) value = (value - 32) * 5 / 9;
        else value = (value * 9 / 5) + 32;
        break;
    }
  }
  let str = String(value).split(".");
  if (str.length > 1 && str[1].length > maxPoint) {
    value = `${str[0]}.${str[1].slice(0, maxPoint)}`;
  }
  return value;
}