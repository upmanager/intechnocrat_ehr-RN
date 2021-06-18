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
    flex: 1,
    padding:40,
    paddingTop: 60,
  },
  m_10: {
    margin: 10
  },
  m_20: {
    margin: 20
  },
  actions: {
    backgroundColor: BaseColor.primaryColor
  },
  forgotPassword: {
    fontSize: 18,
    color: BaseColor.primaryColor
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
