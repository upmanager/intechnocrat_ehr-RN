import { DeviceEventEmitter } from 'react-native';
import {
    // scale
    HS2Module,
    HS2SModule,
    HS4SModule,

    BG5Module,
    BG5SModule,

    BP3LModule,
    BP5Module,
    BP5SModule,

    iHealthDeviceManagerModule,
} from '@ihealth/ihealthlibrary-react-native';
import _HEALTHEVENTEMITTER from "./iHealth/index";
import { store } from "@store";
const AUTH_USER = (key) => {
    if (key) return store.getState().auth.user[key];
    return store.getState().auth.user;
}
export const startDiscover = (type, callback) => {
    DeviceEventEmitter.removeAllListeners();
    DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Device, callback);
    DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Scan_Finish, callback);
    iHealthDeviceManagerModule.startDiscovery(type);
}
export const stopDiscover = () => {
    iHealthDeviceManagerModule.stopDiscovery();
}
export const authenConfigureInfo = (userName, clientID, clientSecret) => {
    return new Promise((resolve, reject) => {
        DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Authenticate_Result, resolve);
        iHealthDeviceManagerModule.authenConfigureInfo(userName, clientID, clientSecret);
    });
}
export const connectDevice = (mac, type) => {
    console.log(mac, type);
    return new Promise((resolve, reject) => {
        DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connected, resolve);
        DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connect_Failed, reject);
        DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, reject);
        iHealthDeviceManagerModule.connectDevice(mac, type);
    });
}
export const disconnectDevice = (mac, type) => {
    return new Promise((resolve, reject) => {
        DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, resolve);
        iHealthDeviceManagerModule.disconnectDevice(mac, type);
    });
}
export const startMeasure = ({ mac, type }) => {
    const userid = AUTH_USER("UserProfileID");
    const str_userid = (`${userid}_${Math.random() * 99999999 + 100000000}`).substr(0, 16);
    console.log("str", str_userid, str_userid.length);
    switch (type) {
        case "HS2":
            HS2Module.measureOnline(mac, 0, str_userid);
            break;
        case "HS2S":
            HS2SModule.setUnit(mac, 0);
            HS2SModule.measure(mac, 0, str_userid, 0, 150, 30, 180, 0, 0, 0);
            break;
        case "HS4S":
            HS4SModule.measureOnline(mac, 0, str_userid);
            break;
        case "BG5":
            BG5Module.startMeasure(mac, 1);
            break;
        case "BG5S":
            var formatted = ("2021-06-25 12:25:20");
console.log(mac, formatted, (new Date()).getTimezoneOffset());
            BG5SModule.setTime(mac, formatted, (new Date()).getTimezoneOffset());
            BG5SModule.setUnit(mac, 1);
            BG5SModule.startMeasure(mac, 1);
            break;
        case "BP3L":
            BP3LModule.startMeasure(mac);
            break;
        case "BP5":
            BP5Module.startMeasure(mac);
            break;
        case "BP5S":
            BP5SModule.startMeasure(mac);
            break;
        default:
            break;
    }
}
export const stopMeasure = ({ mac, type }) => {
    switch (type) {
        case "BP3L":
            BP3LModule.stopMeasure(mac);
            break;
        case "BP5":
            BP5Module.stopMeasure(mac);
            break;
        case "BP5S":
            BP5SModule.stopMeasure(mac);
            break;
        default:
            break;
    }
}
export const deviceEmitter = (type, eventType, callback) => {
    return _HEALTHEVENTEMITTER[type](eventType, callback);
}