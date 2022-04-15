import { REQUEST_STATE } from "../../app-config/constants"
import { apiGetAllTypeProduct,cancelapiGetAllTypeProduct } from "../../data-source/type-product/get-all-type-product"



export const TYPE_PRODUCT = {
    cancelapiGetAllTypeProduct:cancelapiGetAllTypeProduct,
    getAllTypeProduct: function(setListTypeProduct){
        setListTypeProduct({
            message:"",
            state:REQUEST_STATE.REQUEST,
            loading:true
        })
        apiGetAllTypeProduct().then(response=>{
            if(response && response.state !== REQUEST_STATE.UNMOUNT){
                setListTypeProduct(response)
            }
        })
    }
}