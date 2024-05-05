import {atom} from "recoil";

export const getListApproveState = atom({
    key:"GET-LIST-APPROVE-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
