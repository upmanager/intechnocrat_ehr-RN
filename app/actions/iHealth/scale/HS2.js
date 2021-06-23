import { DeviceEventEmitter } from 'react-native';
import {
    HS2Module,
    HSProfileModule,
} from '@ihealth/ihealthlibrary-react-native';

export const getOfflineData = (mac) => {
    return new Promise((resolve, reject) => {
        try {
            HS2Module.getOfflineData(mac);
            DeviceEventEmitter.addListener(HS2Module.Event_Notify, (event) => {
                if (event.action === HSProfileModule.ACTION_HISTORICAL_DATA_HS) {
                    let dataArray = event[HSProfileModule.HISTORDATA_HS];
                    resolve(dataArray);
                }
            });
        } catch (error) {
            reject(error);
        }
    })
}
export const startMeasure = (mac) => {
    return new Promise((resolve, reject) => {
        try {
            HS2Module.measureOnline(mac, 1, 1);
            DeviceEventEmitter.addListener(HS2Module.Event_Notify, resolve);
        } catch (error) {
            reject(error);
        }
    })
}