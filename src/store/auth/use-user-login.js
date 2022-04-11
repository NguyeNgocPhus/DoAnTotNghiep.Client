import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { Auth } from "../../service/auth";
import { userInfoState } from "./share-state"






export const useUserLogin = () =>{
    const [userLoginData,setUserLoginDate] = useRecoilState(userInfoState);
   
    const request = (params) =>{
        Auth.userLoginAsync(params,setUserLoginDate);
    }
    useEffect(()=>{

        return ()=>{
            Auth.cancelUserLogin();
        }
    })

    return [
        userLoginData,
        request

    ]

}