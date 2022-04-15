import {atom} from "recoil";

export const productState = atom({
    key:"PRODUCT-STATE",
    default:{
        data:[],
        state:"",
        message:"",
        loading:false
    }
})