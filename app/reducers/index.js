import { combineReducers } from "redux";
import auth from "./auth";
import units from "./units";
import devices from "./devices";
import global from "./global";

export default combineReducers({
  auth,
  units,
  devices,
  global
});
