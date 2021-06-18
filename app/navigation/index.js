import Loading from "@screens/Loading";
import LogIn from "@screens/LogIn";
import SignUp from "@screens/SignUp";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Main from "./main";

const AppNavigator = createSwitchNavigator(
  {
    Loading: Loading,
    LogIn: LogIn,
    SignUp: SignUp,
    Main: Main,
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(AppNavigator);
