import { DeviceEventEmitter } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';

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