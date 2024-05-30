import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource, POST } from "../fetch";



let source = null;

export const cancelApiGetNodeDefinition = () => cancel(source);

export const apiGetNodeDefinition = async (params) => {

    // cancelApiGetNodeDefinition();

    source = getTokenSource();
 
    try {
        const response = await GET(`/Api/WorkflowDefinition/${params.id}/node/${params.type}?activityId=${params.activityId}`, {}, {
            //  cancelToken: source.token
        })
        
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