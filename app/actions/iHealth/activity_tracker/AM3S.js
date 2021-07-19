import { DeviceEventEmitter } from 'react-native';
import {
    AM3SModule,
    AMProfileModule
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
    DeviceEventEmitter.addListener(AM3SModule.Event_Notify, event => {
        let data = {};
        switch (event.action) {
            case AMProfileModule:
                break;
            default:
                break;
        }
        callback(data);
    });
}