import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    backgroundColor: BaseColor.whiteColor,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  account: {
    marginVertical: 15,
    borderBottomColor: BaseColor.grayColor,
    borderBottomWidth: .4
  },
  title: {
    flex: 1,
    paddingHorizontal: 10
  }
});
