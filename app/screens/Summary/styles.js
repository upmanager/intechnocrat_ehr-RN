import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contain: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginTop: 15,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingBottom: 10,

    // shadow
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 8,
    shadowColor: BaseColor.blackColor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
  },
  chart: {
    height: 200,
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  badgeStyle: {
    width: 16,
    height: 16,
    borderRadius: 99,
    backgroundColor: BaseColor.primary2Color,
    marginRight: 5
  },
  contain_title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 5
  },
  history: {
    flexDirection: "row",
    alignItems: "center"
  }
});
