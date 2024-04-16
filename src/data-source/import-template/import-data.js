import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { getTokenSource, POST } from "../fetch";



let source = null;

export const cancelApiImportData = () => cancel(source);

export const apiImportData = async (params) => {

    cancelApiImportData();

    source = getTokenSource();
 
    try {
        const response = await POST(`/Api/ImportTemplate/ImportData`, {...params}, {
            cancelToken: source.token
        })
        // console.log("response",response)
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