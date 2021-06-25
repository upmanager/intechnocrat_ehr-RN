import { store } from "@store";
import { BaseConfig } from "@config";

const _REQUEST2SERVER = (url, isGet = true, params = null, isFormdata = false) => {
    if (isGet && params) {
        url += _GETURLPARAMS(params);
    }
    return new Promise(function (resolve, reject) {
        console.log(`${BaseConfig.APIURLS.BASE}${url}`, isGet, isFormdata);
        fetch(`${BaseConfig.APIURLS.BASE}${url}`, {
            method: isFormdata ? "post" : isGet ? 'get' : 'post',
            headers: {
                'content-type': isFormdata ? 'multipart/form-data' : 'application/json'
            },
            ...(!isGet && { body: isFormdata ? params : JSON.stringify(params) })
        })
            .then(res => res.json())
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
const getHealthUser = (userid) => {
    return _REQUEST2SERVER(BaseConfig.APIURLS.HEALTHPROFILE, true, { userprofileid: userid, Restaurantid: 1884581 });
}
export {
    login,
    register,
    getHealthUser,
};
