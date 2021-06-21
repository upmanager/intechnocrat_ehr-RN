import { DeviceEventEmitter } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';
// export const healthDeviceEmitter = () => dispatch => {
//     DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connected, res => {
//         console.log("Event_Device_Connected", res);
//     });
//     DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Connect_Failed, res => {
//         console.log("Event_Device_Connect_Failed", res);
//     });
//     DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Device_Disconnect, res => {
//         console.log("Event_Device_Disconnect", res);
//     });
//     DeviceEventEmitter.addListener(iHealthDeviceManagerModule.Event_Authenticate_Result, res => {
//         console.log("Event_Authenticate_Result", res);
//         iHealthDeviceManagerModule.authenAppSecret('9a41ec10e873496791bd331525b2f457', res => {
//             console.log("security res", res);
//         })
//     });
// }
const deviceLinster = (type, callback) => {
    DeviceEventEmitter.removeAllListeners();
    DeviceEventEmitter.addListener(type, res => {
        console.log(type, res);
        callback(res);
        DeviceEventEmitter.removeAllListeners();
    });
}
const emitterTimeout = (callback) => {
    setTimeout(() => {
        callback("timeout");
    }, 10000);
}
export const startDiscover = (...params) => {
    return new Promise((resolve, reject) => {
        deviceLinster(iHealthDeviceManagerModule.Event_Scan_Device, reject);
        deviceLinster(iHealthDeviceManagerModule.Event_Scan_Finish, resolve);
        emitterTimeout(reject);
        iHealthDeviceManagerModule.startDiscovery(...params);
    });
}
export const authenConfigureInfo = (...params) => {
    return new Promise((resolve, reject) => {
        deviceLinster(iHealthDeviceManagerModule.Event_Authenticate_Result, resolve);
        emitterTimeout(reject);
        iHealthDeviceManagerModule.authenConfigureInfo(...params);
    });
}