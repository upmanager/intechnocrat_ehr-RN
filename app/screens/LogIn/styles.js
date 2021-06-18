import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BaseColor.whiteColor
  },
  contain: {
    width: "80%",
  },
  logo: {
    width: "100%",
    height: 200
  },
  passwordAction: {
    position: "absolute",
    right: 0,
    padding: 5
  },
  p_10: {
    padding: 10
  },
  m_10: {
    margin: 10
  },
  actions: {
    backgroundColor: BaseColor.primaryColor
  }
});
