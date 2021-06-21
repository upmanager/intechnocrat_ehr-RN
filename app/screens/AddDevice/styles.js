import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  device_categories: {
    flex: 1,
    backgroundColor: BaseColor.whiteColor,
    borderRadius: 8,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14
  },
  flex: {
    flex: 1,
    width: "100%"
  },
  category_img: {
    width: 100,
    height: 60,
    marginHorizontal: 15
  },
  device_item: {
    width: "33.33%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  device_img: {
    width: 80,
    height: 80,
    marginHorizontal: 15,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10
  },
  setup_guide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BaseColor.whiteColor,
    padding: 30
  },
  qrcode_img: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  guide_img: {
    width: 200,
    height: 200,
    marginTop: 20
  },
  guide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%"
  },
  connection_guide: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  guide_numbers: {
    backgroundColor: BaseColor.primaryColor,
    width: 20,
    height: 20,
    textAlign: "center",
    marginRight: 20
  },
  next_button: {
    paddingHorizontal: 60,
    backgroundColor: BaseColor.whiteColor
  },
  next_button_txt: {
    color: BaseColor.grayColor
  },
  mt20: {
    marginTop: 20
  }
});
