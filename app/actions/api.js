import { store } from "@store";
import { BaseConfig } from "@config";

const _REQUEST2SERVER = (url, isGet = true, params = null, isFormdata = false) => {
    if (isGet && params) {
        url += _GETURLPARAMS(params);
    }
    return new Promise(function (resolve, reject) {
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
    if (__DEV__) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const res = {
                    "AuthenticateUserResult": [
                        {
                            "CellPhone": "403-200-4444",
                            "CityID": 1953019,
                            "ContactTitle": "Ceo",
                            "Country": "Canada",
                            "CountryID": 38,
                            "IsRecipientDifferent": 0,
                            "Latitude": 51.503364562988281,
                            "LoginStatus": "Login Success",
                            "ProvinceStateID": 467,
                            "RecipientAddress": "",
                            "RecipientCity": "",
                            "RecipientCountry": "",
                            "RecipientEmail": "",
                            "RecipientFirstName": "",
                            "RecipientLastName": "",
                            "RecipientPhone": "",
                            "RecipientPostCode": "",
                            "RecipientStateProvince": "",
                            "ResturanteTypeid": 0,
                            "UserCity": "Calgary",
                            "UserCompanyName": "",
                            "UserProfileID": 1884302,
                            "UserProvinceState": "Alberta",
                            "UserStreetAddress": "216-30 Country Hills Landing NW Calgary",
                            "UserZipPostalCode": null,
                            "WebURL": "http://www.itechnocrat.com",
                            "longitude": -0.1276250034570694,
                            "userEmail": "wkangong@itechnocrat.com",
                            "userFirstName": "Wilfred",
                            "userLastName": "Kangong",
                            "userMiddleName": "M",
                            "userName": null,
                            "userPhoneNumber": "403-719-5644",
                            "userType": 2
                        }
                    ]
                };
                resolve(res);
            }, 3000);
        })
    }
    return _REQUEST2SERVER(BaseConfig.APIURLS.LOGIN, true, data);
}
const register = (data) => {
    return _REQUEST2SERVER(BaseConfig.APIURLS.REGISTER, true, data);
}
export {
    login,
    register,
};
