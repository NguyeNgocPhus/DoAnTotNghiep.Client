import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { createUser } from "./share-state"
import { Auth } from "../../service/auth";




export const useCreateUser = () => {
    const [createUserApiData, setCreateUserApiData] = useRecoilState(createUser);

    const request = (params) => {
        console.log("params", params)
        Auth.createUserAsync(params, setCreateUserApiData);
    }
    
    useEffect(() => {
        return () => {
            
            Auth.cancelApiCreateUser();
        }
    }, [])
    return [
        createUserApiData,
        request
    ]

}