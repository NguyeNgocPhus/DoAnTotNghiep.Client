import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { getTokenSource, POST } from "../fetch";



let source = null;

export const cancelApiUserLogin = () => cancel(source);

export const apiUserLogin = async (params) => {
    const body = {
        "email": params.email,
        "password": params.password
    };
    // console.log(query);
    cancelApiUserLogin();

    source = getTokenSource();
    // console.log(source);
    try {
        const response = await POST('/api/login', body, {
            cancelToken: source.token
        })

        return {
            message: "",
            loading: false,
            data: response?.data,
            state: REQUEST_STATE.SUCCESS
        }
    } catch (error) {

        return {
            message: error?.response?.data?.message,
            loading: false,
            token: "",
            state: REQUEST_STATE.ERROR
        }
    }
}