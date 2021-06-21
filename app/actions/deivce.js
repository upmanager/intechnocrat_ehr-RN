
import {
    ADDDEVICE,
    REMOVEDEVICE
} from "@constants";

export const addDevice = (data) => {
    return { type: ADDDEVICE, data }
}
export const removeDevice = (data) => {
    return { type: REMOVEDEVICE, data }
}