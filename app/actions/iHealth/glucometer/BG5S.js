import { DeviceEventEmitter } from 'react-native';
import {
    BG5SModule,
    BG5SProfileModule
} from '@ihealth/ihealthlibrary-react-native';
import { BaseConfig } from "@config";

export default (eventtype, callback) => {
    if (BaseConfig.TETSTING) {
        const result = {
            bp: 188
        }
        setTimeout(() => {
            callback(result);
        }, 3000);
        return;
    }
    console.log("gluco", "event");
    DeviceEventEmitter.addListener(BG5SModule.Event_Notify, event => {
        let data = {};
        console.log("gluco", event);
        if (eventtype && event.action != eventtype) return;
        switch (event.action) {
            case BG5SProfileModule.ACTION_ONLINE_RESULT_BG:
                data = event[BG5SProfileModule.ONLINE_RESULT_BG]
                break;
            default:
                break;
        }
        callback(data);
    });
}