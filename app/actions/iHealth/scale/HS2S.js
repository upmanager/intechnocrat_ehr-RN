import { DeviceEventEmitter } from 'react-native';
import {
    HS2SModule,
    HS2SProfileModule,
} from '@ihealth/ihealthlibrary-react-native';

export default (callback) => {
    DeviceEventEmitter.addListener(HS2SModule.Event_Notify, event => {
        let data = {};
        switch (event.action) {
            case HS2SProfileModule.ACTION_GET_DEVICE_INFO:
                data = {
                    unit_current: event[HS2SProfileModule.HS_UNIT_CURRENT],
                    user_count: event[HS2SProfileModule.HS_USER_COUNT],
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
            case HS2SProfileModule.ACTION_MEASURE_FINISH_AT_CRITICAL:
            case HS2SProfileModule.ACTION_RESTORE_FACTORY_SETTINGS:
                console.log("EVENT", event);
                return;
            case HS2SProfileModule.ACTION_GET_USER_INFO:
                data = {
                    user_info_count: event[HS2SProfileModule.USER_INFO_COUNT],
                    user_infos: event[HS2SProfileModule.USER_INFO_ARRAY],
                };
                // let array = event[HS2SProfileModule.USER_INFO_ARRAY];
                // console.log(array["body_building"]);
                // console.log(array["impedance"]);
                // console.log(array["height"]);
                // console.log(array["age"]);
                // console.log(array["gender"]);
                // console.log(array["weight"]);
                // console.log(array["create_time"]);
                // console.log(array["user_id"]);
                break;
            case HS2SProfileModule.ACTION_HISTORY_DATA:
                data = {
                    history: event['history_data']
                }
                // let arr = event["history_data"];
                // arr.forEach(function (result) {
                //     console.log(result["fat_weight"]);
                //     console.log(result["fat_control"]);
                //     console.log(result["weight_control"]);
                //     console.log(result["standard_weight"]);
                //     console.log(result["skeletal_muscle_mass"]);
                //     console.log(result["body_water_rate"]);
                //     console.log(result["muscle_mas"]);
                //     console.log(result["instruction_type"]);
                //     console.log(result["body_building"]);
                //     console.log(result["height"]);
                //     console.log(result["gender"]);
                //     console.log(result["muscle_control"]);
                //     console.log(result["physical_age"]);
                //     console.log(result["visceral_fat_grade"]);
                //     console.log(result["protein_rate"]);
                //     console.log(result["bone_salt_content"]);
                //     console.log(result["visceral_fat_grade"]);
                //     console.log(result["measure_time"]);
                //     console.log(result["age"]);
                //     console.log(result["impedance"]);
                //     console.log(result["weight"]);
                // })
                break;
            case HS2SProfileModule.ACTION_ONLINE_REAL_TIME_WEIGHT:
                data = {
                    realtime_weight: event["weight"]
                }
                break;
            case HS2SProfileModule.ACTION_ONLINE_RESULT:
                data = {
                    weight: event["weight"]
                }
                break;
            case HS2SProfileModule.ACTION_BODY_FAT_RESULT:
                data = event[HS2SProfileModule.DATA_BODY_FAT_RESULT];
                // let fat_weight = data["fat_weight"];
                // let fat_control = data["fat_control"];
                // let weight_control = data["weight_control"];
                // let standard_weight = data["standard_weight"];
                // let skeletal_muscle_mass = data["skeletal_muscle_mass"];
                // let body_water_rate = data["body_water_rate"];
                // let muscle_mas = data["muscle_mas"];
                // let instruction_type = data["instruction_type"];
                // let body_building = data["body_building"];
                // let height = data["height"];
                // let gender = data["gender"];
                // let muscle_control = data["muscle_control"];
                // let physical_age = data["physical_age"];
                // let visceral_fat_grade = data["visceral_fat_grade"];
                // let protein_rate = data["protein_rate"];
                // let bone_salt_content = data["bone_salt_content"];
                // let visceral_fat_grade = data["visceral_fat_grade"];
                // let measure_time = data["measure_time"];
                // let age = data["age"];
                // let impedance = data["impedance"];
                // let weight = data["weight"];
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