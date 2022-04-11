import { REQUEST_STATE } from "../app-config/constants";

export function log(...params) {
	console.log(...params);
}

export function cancel(source) {
    source && source.cancel && source.cancel(REQUEST_STATE.UNMOUNT);
}

export function getUserInfo() {
    const userInfo = sessionStorage.getItem("USER_INFO");
    if (userInfo && userInfo.length) {
        return JSON.parse(userInfo);
    }

    return null;
}

export function saveUserInfoToStore(userInfo) {
    if (userInfo) {
        sessionStorage.setItem("USER_INFO", JSON.stringify(userInfo));
    }
}