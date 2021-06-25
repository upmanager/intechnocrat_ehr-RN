import { DeviceEventEmitter } from 'react-native';
import {
    HS2SModule,
    iHealthDeviceManagerModule,
} from '@ihealth/ihealthlibrary-react-native';
import HS2SEvents from "./iHealth/scale/HS2S";
import HS2SProfileModule from '@ihealth/ihealthlibrary-react-native/module/HS2SProfileModule';

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
    HS2SModule.setUnit(mac, 0);
    HS2SModule.measure(mac, 0, "4777777777777777", 0, 150, 30, 180, 0, 0, 0);
}
export const deviceEmitter = (type, eventType, callback) => {
    switch (type) {
        case "HS2S":
            return HS2SEvents(eventType, callback);
        default:
            break;
    }
}