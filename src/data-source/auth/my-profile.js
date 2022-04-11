import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";






let source = null;
export const cancelGetMyprofile = () => cancel(source);
export const apiGetMyprofileAsync = async() =>{

    cancelGetMyprofile();
    source = getTokenSource();

    try {
        const response =  await GET("/auth/profile",{},{});

        return {
            data:response.data.data,
            message:"",
            state:REQUEST_STATE.SUCCESS,
            loading:false,
        }
    } catch (error) {
        return {
            data:{},
            message:error.response.data.message,
            state:REQUEST_STATE.ERROR,
            loading:false,
        }
    }
} 