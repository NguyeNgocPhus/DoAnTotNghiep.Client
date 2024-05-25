import { REQUEST_STATE } from "../app-config/constants";

export function log(...params) {
	// console.log(...params);
}

export function cancel(source) {
    source && source.cancel && source.cancel(REQUEST_STATE.UNMOUNT);
}

export function getToken() {
    const userInfo = localStorage.getItem("TOKEN");
    if (userInfo && userInfo.length) {
        return JSON.parse(userInfo);
    }

    return null;
}

export function removeToken() {
    localStorage.removeItem("TOKEN");
}

export function saveTokenToStore(userInfo) {
    if (userInfo) {
        localStorage.setItem("TOKEN", JSON.stringify(userInfo));
    }
}
export function saveUserToStore(userInfo) {
    if (userInfo) {
        localStorage.setItem("USER", JSON.stringify(userInfo));
    }
}
export function getUser() {
    const userInfo = localStorage.getItem("USER");
    if (userInfo && userInfo.length) {
        return JSON.parse(userInfo);
    }

    return null;
}
export function removeUser() {
    localStorage.removeItem("USER");
}