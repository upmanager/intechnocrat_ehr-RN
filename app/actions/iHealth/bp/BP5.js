import { DeviceEventEmitter } from 'react-native';
import {
    BP5Module,
    BPProfileModule
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
    DeviceEventEmitter.addListener(BP5Module.Event_Notify, event => {
        let data = {};
        if (eventtype && event.action != eventtype) return;
        
        if (event.action === BPProfileModule.ACTION_ONLINE_PULSEWAVE_BP) {
            data = event;
            // data = event[BPProfileModule.BLOOD_PRESSURE_BP];
            // data = event[BPProfileModule.FLAG_HEARTBEAT_BP];
            // data = event[BPProfileModule.PULSEWAVE_BP];
        }
        callback(data);
    });
}