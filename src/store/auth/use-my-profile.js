import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { Auth } from "../../service/auth";
import { myProfileState } from "./share-state";




export const useProfile = () =>{
    const [myprofile,setMyprofile] = useRecoilState(myProfileState);

    const request = () =>{
       
        Auth.getMyprofileAsync(setMyprofile);
    }
    useEffect(()=>{
        return ()=>{
            Auth.cancelGetMyprofile();
        }
    },[])
    return [
        myprofile,
        request
    ]
}