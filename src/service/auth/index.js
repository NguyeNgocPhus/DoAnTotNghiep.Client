import { REQUEST_STATE } from "../../app-config/constants"
import { apiGetRolesAsync, cancelGetRoles } from "../../data-source/auth/get-roles";
import { apiGetMyprofileAsync, cancelGetMyprofile } from "../../data-source/auth/my-profile";
import { apiUserLogin, cancelApiUserLogin } from "../../data-source/auth/user-login"




export const Auth = {
    cancelUserLogin: cancelApiUserLogin,
    userLoginAsync: function (params, setUserLoginDate) {
        setUserLoginDate({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true,
        })
        apiUserLogin(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setUserLoginDate(response);
            }
        });
    },

    cancelGetMyprofile: cancelGetMyprofile,
    getMyprofileAsync: function (setMyprofile) {
        setMyprofile({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetMyprofileAsync().then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setMyprofile(response);
            }
        })
    },

    
    cancelGetRoles: cancelGetRoles,
    getRolesAsync: function (setRoles) {
        setRoles({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetRolesAsync().then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setRoles(response);
            }
        })
    }

}