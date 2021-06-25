// forgot password link
export const FORGOTPASSWORDLINK = `https://cloud.ihealthlabs.com/UserAuthWeb/password_find.aspx?NotJump`;

// ihealth api
export const CLIENTID = 'b619c60bdc7942d693f14d1d8cda16f3';
export const CLIENTSECURITY = '9a41ec10e873496791bd331525b2f457';
export const IHEALTHAPIURL = 'https://api.ihealthlabs.com:8443/OpenApiV2/';
export const TETSTING = false;
export const UNITS = {
    bp: [
        { unit: "mmHg", default: true },
        { unit: "kPa" }
    ],
    weight: [
        { unit: "kg", default: true },
        { unit: "lbs" }
    ],
    distance: [
        { unit: "km", default: true },
        { unit: "miles" }
    ],
    height: [
        { unit: "cm", default: true },
        { unit: "feet" }
    ],
    temperature: [
        { unit: "°C", default: true },
        { unit: "°F" }
    ],
}


export const APIURLS = {
    BASE: `https://ws.360kmall.com:8000/ws/GetCloseByServices.svc/json/`,
    LOGIN: "checkLogin",
    BUYERTYPE: "buyertypes",
    REGISTER: "Create360kmallUser",
    HEALTHPROFILE:"getuserhealthprofile",
    FORGOTPASSWORD: "validateuseraccount",
    UPDATE_GEOLATLONG: "geolatlongdata",
    UPDATE_COUNTRIES: "countries",
    WORKING_HOURS: "kfsoperatinghours",
    UPDATE_ACCOUNT: "updatebusinessuser",
    CREATE_WEIGHT: "createkfsmealsuserweightdairly",
    UPDATE_WEIGHT: "updatekfsmealsuserweightdairly",
    GET_WEIGHT: "getkfsmealsuserweightdairly",
};