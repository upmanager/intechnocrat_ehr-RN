import { DeviceEventEmitter } from 'react-native';
import {
    BG5Module,
    BGProfileModule
} from '@ihealth/ihealthlibrary-react-native';
import { BaseConfig } from "@config";

export default (callback) => {
    if (BaseConfig.TETSTING) {
        const result = {
            // bp: 188
        }
        setTimeout(() => {
            callback(result);
        }, 3000);
        return;
    }
    DeviceEventEmitter.addListener(BG5Module.Event_Notify, event => {
        let data = {};
        switch (event.action) {
            case BGProfileModule.ACTION_ONLINE_RESULT_BG:
                data = event[BGProfileModule.ONLINE_RESULT_BG]
                break;
            default:
                break;
        }
        callback(data);
    });
}