import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getUsers } from "./share-state"
import { Auth } from "../../service/auth";




export const useGetUsers = () => {
    const [getUsersApiData, setGetUsersApiData] = useRecoilState(getUsers);

    const request = (params) => {
    
        Auth.getUsersAsync(params, setGetUsersApiData);
    }
    
    useEffect(() => {
        return () => {
            
            Auth.cancelApiGetUsers();
        }
    }, [])
    return [
        getUsersApiData,
        request
    ]

}