 
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getListApproveState } from "./share-state"
import { APPROVE } from "../../service/approve";


export const useGetListApprove  = () => {
    const [listApproveData, setListApproveData] = useRecoilState(getListApproveState);

    const request = (params) => {
        APPROVE.getListApproveAsync(params, setListApproveData);
    }
    
    useEffect(() => {
        return () => {
            APPROVE.cancelApiGetListApprove();
        }
    }, [])
    return [
        listApproveData,
        request
    ]

}