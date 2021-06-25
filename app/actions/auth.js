
import {
    GETUSERFAILED, GETUSERSUCCESS, UPDATEUSER, LOGOUT
} from "@constants";
import { ApiActions } from "@actions";

export const login = (data, callback) => dispatch => {
    ApiActions.login(data)
        .then(async res => {
            const user = res.AuthenticateUserResult[0];
            if (user?.LoginStatus == "Login Success") {
                let health_profile = {};
                try {
                    health_profile = await ApiActions.getHealthUser(user.UserProfileID);
                    health_profile = health_profile.GetUserHealthProfileResult[0] || {};
                } catch (error) {
                    health_profile = {};
                }

                dispatch({ type: GETUSERSUCCESS, data: { user, health_profile, login: true } });
                callback({ ...data, success: true });
            } else {
                throw new Error("")
            }
        })
        .catch(err => {
            dispatch({ type: GETUSERFAILED });
            callback({ ...err, success: false });
        })
}
export const register = (data, callback) => dispatch => {
    ApiActions.register(data)
        .then(res => {
            const CreateUserResult = res.CreateUserResult[0];
            const success = !!CreateUserResult?.WelcomeMessage;
            callback({ ...CreateUserResult, success });
        })
        .catch(err => {
            callback({ ...err, success: false });
        })
}
export const updateUser = (user) => (
    { type: UPDATEUSER, data: user }
)
export const logout = () => (
    { type: LOGOUT }
)