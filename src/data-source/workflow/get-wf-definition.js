import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource, POST } from "../fetch";



let source = null;

export const cancelApiGetWfDefinition = () => cancel(source);

export const apiGetWfDefinition = async (params) => {

    cancelApiGetWfDefinition();

    source = getTokenSource();
 
    try {
        const response = await GET(`/Api/WorkflowDefinition/${params.id}`, {}, {
            cancelToken: source.token
        })
        console.log("response",response)
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