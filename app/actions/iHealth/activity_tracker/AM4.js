import { DeviceEventEmitter } from 'react-native';
import {
    AM4Module,
    AMProfileModule
} from '@ihealth/ihealthlibrary-react-native';
import { BaseConfig } from "@config";

export default (eventtype, callback) => {
    if (BaseConfig.TETSTING) {
        const result = {
            weight: 188
        }
        setTimeout(() => {
            callback(result);
        }, 3000);
        return;
    }
    DeviceEventEmitter.addListener(AM4Module.Event_Notify, event => {
        let data = {};
        if (eventtype && event.action != eventtype) return;
        switch (event.action) {
            case AMProfileModule:
                break;
            default:
                break;
        }
        callback(data);
    });
}