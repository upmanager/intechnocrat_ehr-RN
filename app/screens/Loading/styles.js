import { getDeviceWidth } from "@utils";
import { BaseColor } from "@config";
import { StyleSheet } from "react-native";
const logoWidth = getDeviceWidth() * .9;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BaseColor.whiteColor
  },
  logo: {
    width: logoWidth,
    height: 300,
  },
  loading: {
    position: "absolute",
    top: 160,
    bottom: 0,
  }
});
