import {atom} from "recoil";

export const typeProductState = atom({
    key:"TYPE-PRODUCT-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})