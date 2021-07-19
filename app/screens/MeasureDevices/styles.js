import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BaseColor.whiteColor
  },
  shadow: {
    backgroundColor: BaseColor.whiteColor,
    shadowColor: BaseColor.blackColor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  basicResult: {
    borderRadius: 12,
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
