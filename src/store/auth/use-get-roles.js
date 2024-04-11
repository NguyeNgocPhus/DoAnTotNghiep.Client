import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { Auth } from "../../service/auth";
import { getRoles } from "./share-state";




export const useGetRoles = () =>{
    const [roles,setRoles] = useRecoilState(getRoles);

    const request = () =>{
       
        Auth.getRolesAsync(setRoles);
    }
    useEffect(()=>{
        return ()=>{
        
            Auth.cancelGetRoles();
        }
    },[])
    return [
        roles,
        request
    ]
}