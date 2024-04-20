import { REQUEST_STATE } from "../../app-config/constants"
import { apiCreateUser, cancelApiCreateUser } from "../../data-source/auth/create-user";
import { apiGetRolesAsync, cancelGetRoles } from "../../data-source/auth/get-roles";
import { apiGetUsersAsync, cancelGetUsers } from "../../data-source/auth/get-users";
import { apiGetMyprofileAsync, cancelGetMyprofile } from "../../data-source/auth/my-profile";
import { apiUserLogin, cancelApiUserLogin } from "../../data-source/auth/user-login"




export const Auth = {
    // login
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

    // get my profile
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

// get roles
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
    // create user
    ,
    cancelApiCreateUser: cancelApiCreateUser,
    createUserAsync: function (params, setCreateUserData) {
        setCreateUserData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiCreateUser(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setCreateUserData(response);
            }
        })
    }
    ,
    // get list user
    cancelApiGetUsers: cancelGetUsers,
    getUsersAsync: function (params, setUsers) {
        setUsers({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetUsersAsync(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setUsers(response);
            }
        })
    }
}