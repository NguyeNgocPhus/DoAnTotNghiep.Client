import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { deleteUser } from "./share-state"
import { Auth } from "../../service/auth";




export const useDeleteUser = () => {
    const [deleteUserApiData, setDeleteUserApiData] = useRecoilState(deleteUser);

    const request = (params) => {
        Auth.deleteUserAsync(params, setDeleteUserApiData);
    }
    
    useEffect(() => {
        return () => {
            
            Auth.cancelApiDeleteUser();
        }
    }, [])
    return [
        deleteUserApiData,
        request
    ]

}