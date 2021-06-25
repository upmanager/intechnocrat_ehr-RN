
import {
    ADDDEVICE,
    REMOVEDEVICE,
    SETWEIGHT
} from "@constants";
import { convertUnits } from "@utils";

export const addDevice = (data) => {
    return { type: ADDDEVICE, data }
}
export const removeDevice = (data) => {
    return { type: REMOVEDEVICE, data }
}
export const setWeight = (weight) => {
    const WeightIbs = convertUnits(weight, { unit: "lbs", default: false }, 1);
    return { type: SETWEIGHT, data: { WeightIbs, WeightKg: weight } }
}