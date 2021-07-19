import { DeviceEventEmitter } from 'react-native';
import {
    HS4SModule,
    HSProfileModule,
} from '@ihealth/ihealthlibrary-react-native';
import { BaseConfig } from "@config";

export default (callback) => {
    if (BaseConfig.TETSTING) {
        const result = {
            weight: 188
        }
        setTimeout(() => {
            callback(result);
        }, 3000);
        return;
    }
    DeviceEventEmitter.addListener(HS4SModule.Event_Notify, event => {
        let data = {};
        switch (event.action) {
            case HSProfileModule.ACTION_BATTERY_HS:
                break;
            default:
                break;
        }
        callback(data);
    });
}