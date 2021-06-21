import {
    ADDDEVICE,
    REMOVEDEVICE
} from "@constants";
const initialState = {
    devices: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADDDEVICE:
            return { ...state, devices: [...state.devices, action.data] };
        case REMOVEDEVICE:
            let devices = state.devices;
            devices = devices.filter(item => item.mac = action.data);
            return { ...state, devices };
        default:
            return state;
    }
};
