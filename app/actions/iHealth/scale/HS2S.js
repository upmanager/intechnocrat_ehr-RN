import { DeviceEventEmitter } from 'react-native';
import {
    HS2SModule,
    HS2SProfileModule,
} from '@ihealth/ihealthlibrary-react-native';
import { BaseConfig } from "@config";
export default (callback) => {
    if (BaseConfig.TETSTING) {
        const result = {
            fat_weight: 100,
            fat_control: "",
            weight_control: "",
            standard_weight: "",
            skeletal_muscle_mass: "",
            body_water_rate: 50,
            muscle_mas: "",
            instruction_type: "",
            body_building: 7.9,
            height: "",
            gender: "",
            muscle_control: "",
            physical_age: "",
            visceral_fat_grade: "",
            protein_rate: "",
            bone_salt_content: "",
            measure_time: "",
            age: "",
            impedance: "",
            weight: 188
        }
        setTimeout(() => {
            callback(result);
        }, 3000);
        return;
    }
    DeviceEventEmitter.addListener(HS2SModule.Event_Notify, event => {
        let data = {};
        console.log(event);
        switch (event.action) {
            case HS2SProfileModule.ACTION_GET_DEVICE_INFO:
                data = {
                    unit_current: event[HS2SProfileModule.HS_UNIT_CURRENT],
                    user_count: event[HS2SProfileModule.HS_USER_COUNT],
                    battery: event[HS2SProfileModule.BATTERY_HS]
                };
                break;
            case HS2SProfileModule.ACTION_BATTERY_HS:
                data = {
                    battery: event[HS2SProfileModule.BATTERY_HS],
                };
            case HS2SProfileModule.ACTION_SET_UNIT_SUCCESS:
            case HS2SProfileModule.ACTION_CREATE_OR_UPDATE_USER_INFO:
            case HS2SProfileModule.ACTION_DELETE_USER_INFO:
            case HS2SProfileModule.ACTION_DELETE_HISTORY_DATA:
            case HS2SProfileModule.ACTION_SPECIFY_USERS:
            case HS2SProfileModule.ACTION_RESTORE_FACTORY_SETTINGS:
                console.log("EVENT", event);
                return;
            case HS2SProfileModule.ACTION_GET_USER_INFO:
                data = {
                    user_info_count: event[HS2SProfileModule.USER_INFO_COUNT],
                    user_infos: event[HS2SProfileModule.USER_INFO_ARRAY],
                };
                // body_building, impedance, height, age, gender, weight, create_time, user_id
                break;
            case HS2SProfileModule.ACTION_HISTORY_DATA:
                data = {
                    history: event['history_data']
                }
                break;
            case HS2SProfileModule.ACTION_ONLINE_REAL_TIME_WEIGHT:
                data = {
                    realtime_weight: event["weight"]
                }
                break;
            case HS2SProfileModule.ACTION_ONLINE_RESULT:
                data = {
                    weight: event["weight"],
                }
                break;
            case HS2SProfileModule.ACTION_BODY_FAT_RESULT:
                data = {
                    body_fat: event[HS2SProfileModule.DATA_BODY_FAT_RESULT]
                };
                break;
            case HS2SProfileModule.ACTION_MEASURE_FINISH_AT_CRITICAL:
                data = {
                    body_fat: "body fat",
                    error: true
                };
                break;
            case HS2SProfileModule.ACTION_HS2S_MEASURE_HEARTRATE:
                console.log("heart rate", event);
                break;
            case HS2SProfileModule.ACTION_HS2S_EXIT_MEASURE_HEARTRATE_STATUS:
                // {"status":0,"heartrate":78}
                data = event[HS2SProfileModule.HS2S_MEASURE_HEARTRATE_RESULT]
                break;
            default:
                break;
        }
        callback(data);
    });
}