
import {
    SETGLOBAL
} from "@constants";

export const setGlobal = (data) => {
    return { type: SETGLOBAL, data }
}