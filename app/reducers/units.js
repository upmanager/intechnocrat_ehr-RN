import {
    UPDATEUNITS
} from "@constants";
const initialState = {
    bp: 0,
    weight: 0,
    distance: 0,
    height: 0,
    temperature: 0
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATEUNITS:
            return { ...state, ...action.data };
        default:
            return state;
    }
};
