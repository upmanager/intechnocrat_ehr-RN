import { BaseConfig } from "@config";
import * as logger from "./logger";

const _REQUEST2SERVER = (url, isGet = true, params = null, isFormdata = false) => {
    if (isGet && params) {
        url += _GETURLPARAMS(params);
    }
    return new Promise(function (resolve, reject) {
        logger.log(`${BaseConfig.APIURLS.BASE}${url}`);
        fetch(`${BaseConfig.APIURLS.BASE}${url}`, {
            method: isFormdata ? "post" : isGet ? 'get' : 'post',
            headers: {
                'content-type': isFormdata ? 'multipart/form-data' : 'application/json'
            },
            ...(!isGet && { body: isFormdata ? params : JSON.stringify(params) })
        })
            .then(res => {
                logger.log(res);
                return res.json();
            })
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}
const _GETURLPARAMS = (data) => {
    const url = Object.keys(data).map(key => {
        return `${key}=${encodeURIComponent(data[key])}`;
    }).join("&");
    return `?${url}`;
}
const login = (data) => {
    return _REQUEST2SERVER(BaseConfig.APIURLS.LOGIN, true, data);
}
const register = (data) => {
    return _REQUEST2SERVER(BaseConfig.APIURLS.REGISTER, true, data);
}
const getHealthUser = (userid, Restaurantid) => {
    return _REQUEST2SERVER(BaseConfig.APIURLS.HEALTHPROFILE, true, { userprofileid: userid, Restaurantid });
}
const getScaleDiary = (userid, restaurantid) => {
    return _REQUEST2SERVER(BaseConfig.APIURLS.GET_WEIGHT, true, { userprofileid: userid });
}
const createScaleDiary = (data) => {
    return _REQUEST2SERVER(BaseConfig.APIURLS.CREATE_WEIGHT, true, data);
}
export {
    login,
    register,
    getHealthUser,
    getScaleDiary,
    createScaleDiary
};
