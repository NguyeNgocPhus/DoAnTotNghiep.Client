import {atom} from "recoil";

export const getListNotificationState = atom({
    key:"GET-LIST-NOTIFICATION-STATE",
    default:{
        data:{},
        state:"",
        message:"",
        loading:false
    }
})

export const getCoutUnreadNotificationState = atom({
    key:"GET-COUNT-UNREAD-NOTIFICATION-STATE",
    default: 0
})
