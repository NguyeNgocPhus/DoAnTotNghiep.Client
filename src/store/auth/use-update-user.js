
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { updateUser } from "./share-state"
import { IMPORT_TEMPLATE } from "../../service/import-template";
import { Auth } from "../../service/auth";




export const useUpdateUser = () => {
    const [updateUserApiData, setUserApiData] = useRecoilState(updateUser);

    const request = (params) => {
        Auth.updateUserAsync(params, setUserApiData);
    }
    
    useEffect(() => {
        return () => {
            Auth.cancelApiUpdateUser();
        }
    }, [])
    return [
        updateUserApiData,
        request
    ]

}