import { Dimensions } from "react-native";
export const getDeviceWidth = (windows) => {
    return Dimensions.get(windows ? 'window' : 'screen').width;
  }
  export const getDeviceHeight = (windows) => {
    return Dimensions.get(windows ? 'window' : 'screen').height;
  }