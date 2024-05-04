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

export const getRoles = atom({
    key:"GET-ROLES-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})

export const createUser = atom({
    key:"CREATE-USER-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})

export const getUsers = atom({
    key:"GET-USERS-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const getUserDetail = atom({
    key:"GET-USER-DETAIL-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})
export const updateUser = atom({
    key:"UPDATE-USER-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})