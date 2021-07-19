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

export const getBMI = (height, weight, iskg) => {
  if (!iskg) weight = lbs2kg(weight);
  if (height > 0 && weight > 0) {
    return (weight) / Math.pow((height / 100), 2);
  }
  return 20;
}
export const getBodyFat = (age, strGender, BMI) => {
  gender = strGender != null && strGender == "Male" ? 0 : 1;
  fat = -44.988 + (0.503 * age) + (10.689 * gender) + (3.172 * BMI) - (0.026 * Math.pow(BMI, 2)) + (0.181 * BMI * gender) - (0.02 * BMI * age) - (0.005 * Math.pow(BMI, 2) * gender) + (0.00021 * Math.pow(BMI, 2) * age);
  
  let str = String(fat).split(".");
  if (str.length > 1 && str[1].length > 2) {
    value = `${str[0]}.${str[1].slice(0, 2)}`;
  }
  return value;

}