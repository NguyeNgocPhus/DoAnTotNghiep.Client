import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource, POST } from "../fetch";



let source = null;

export const cancelApiCreateWorkflow = () => cancel(source);

export const apiCreateWorkflow = async (params) => {

    cancelApiCreateWorkflow();

    source = getTokenSource();
 
    try {
        const response = await POST('/Workflow/Create', {...params}, {
            //cancelToken: source.token
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