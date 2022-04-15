import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource, POST } from "../fetch";



let source = null;

export const cancelapiGetAllTypeProduct = () => cancel(source);

export const apiGetAllTypeProduct = async() =>{

    // console.log(query);
    cancelapiGetAllTypeProduct();

    source = getTokenSource();
    // console.log(source);
    try {
        const response = await GET('/type-product',{},{
            // cancelToken: source.token
        })
        
        return {
            message:"",
            loading:false,
            data:response?.data,
            state:REQUEST_STATE.SUCCESS
        }
    } catch (error) {
        
        return {
            message:error?.response?.data?.message,
            loading:false,
            token:"",
            state:REQUEST_STATE.ERROR
        }
    }
}