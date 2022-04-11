import {atom} from "recoil";


export const defaultUserInfo = {
    token:''
}

export const userInfoState = atom({
    key:'USER-INFO-STATE',
    default:{
        ...defaultUserInfo
    }
})
export const myProfileState = atom({
    key:"MY-PROFILE-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})