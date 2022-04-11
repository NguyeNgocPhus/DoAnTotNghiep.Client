import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { Auth } from "../../service/auth";
import { myProfileState } from "./share-state";




export const useProfile = () =>{
    const [myprofile,setMyprofile] = useRecoilState(myProfileState);

    const request = () =>{
        // console.log(11231233333333333);
        Auth.getMyprofileAsync(setMyprofile);
    }
    useEffect(()=>{
        Auth.cancelGetMyprofile();
    })
    return [
        myprofile,
        request
    ]
}