import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";



let source = null;

export const cancelapiGetAllProduct = () => cancel(source);

export const apiGetAllProduct = async(params) =>{

    // console.log(query);
    cancelapiGetAllProduct();

    source = getTokenSource();
    // console.log(source);
    try {
        const response = await GET(`/type-product/${params}`,{},{
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