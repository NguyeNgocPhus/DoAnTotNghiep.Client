import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getUserDetail } from "./share-state"
import { Auth } from "../../service/auth";




export const useGetUserDetail = () => {
    const [getUserDetailApiData, setGetUserDetailApiData] = useRecoilState(getUserDetail);

    const request = (params) => {
    
        Auth.getUserDetailAsync(params, setGetUserDetailApiData);
    }
    
    useEffect(() => {
        return () => {           
            Auth.cancelApiGetDetail();
        }
    }, [])
    return [
        getUserDetailApiData,
        request
    ]

}