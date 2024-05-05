import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { userId } from "../../app-helper/jwtHepler";
import { GET, getTokenSource } from "../fetch";






let source = null;
export const cancelGetMyprofile = () => cancel(source);
export const apiGetMyprofileAsync = async () => {

    cancelGetMyprofile();
    source = getTokenSource();
    const id = userId();
    try {
        const response = await GET(`/api/user/${id}`, {}, {
            cancelToken: source.token
        });

        if(response?.data?.isSuccess === true){
            return {
                message: "",
                loading: false,
                data: response?.data.value,
                state: REQUEST_STATE.SUCCESS
            }
        }if(response?.data?.isFailure === true) {
            return {
                message: response?.data?.error.message,
                loading: false,
                token: response?.data?.error.code,
                state: REQUEST_STATE.ERROR
            }
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