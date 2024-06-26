import * as axios from "axios";
import { Configs } from "../app-config/api";
import { getToken } from "../app-helper";

export const getOptions = (option) => {
    const userInfo = getToken();

    const opts = {
        ...option,
        headers: {
            'Content-Type': 'application/json'
        },

    };

    if (userInfo) {
        opts.headers['Authorization'] = `Bearer ${userInfo.accessToken}`;
    }

    if (option.cancelToken) {
        opts.cancelToken = option.cancelToken
    }
    delete option.useLocalAPI;
    return opts;
}


export const getTokenSource = () => {
    return axios.CancelToken.source();
}


export const POST = async (path, params, option = {}) => {
    const _url = Configs.BASE_API + path;
    const _option = getOptions(option);

    return await axios.post(_url, params, _option);


}
export const PUT = async (path, params, option = {}) => {
    const _url = Configs.BASE_API + path;
    const _option = getOptions(option);

    return await axios.put(_url, params, _option);


}

export const DELETE = async (path, params, option = {}) => {
    const _url = Configs.BASE_API + path;
    const _option = getOptions(option);

    return await axios.delete(_url, params, _option);


}
export const GET = async (path, params = {}, option = {}) => {
    const _params = params ? Object.keys(params).map(key => {
        let valueParam = params[key];
        let adjustParam = "";
        if (Array.isArray(valueParam)) {
            // TODO with "all" value;
            adjustParam = valueParam.map(paramDetail => `${key}=${encodeURIComponent(paramDetail != "all" ? paramDetail : "")}`).join("&")
        } else {
            // TODO with "all" value;
            valueParam = valueParam != "all" ? valueParam : "";
            adjustParam = `${key}=${encodeURIComponent(valueParam)}`;
        }
        return adjustParam;
    }).join("&") : "";

    const _url = Configs.BASE_API + path + (_params === "" ? "" : "?" + _params);

    const _option = getOptions(option);
    return await axios.get(_url, _option);

}