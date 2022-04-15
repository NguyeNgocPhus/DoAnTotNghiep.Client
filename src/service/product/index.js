import { REQUEST_STATE } from "../../app-config/constants"
import { apiGetAllProduct,cancelapiGetAllProduct } from "../../data-source/product/get-all-product"





export const PRODUCT = {
    cancelapiGetAllProduct:cancelapiGetAllProduct,
    getAllProduct:async function(param,setListProduct){
        apiGetAllProduct(param).then((response ) =>{
            if(response && response.state !== REQUEST_STATE.UNMOUNT){
                setListProduct(response);
            }
        })
    }
}