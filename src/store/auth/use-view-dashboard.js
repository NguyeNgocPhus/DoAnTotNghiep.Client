import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { Auth } from "../../service/auth";
import { viewDashboardState } from "./share-state"






export const useViewDashboard = () => {
    const [viewDashboardData, setViewDashboardData] = useRecoilState(viewDashboardState);

    const request = (params) => {
        Auth.viewDashboardAsync(params, setViewDashboardData);
    }
    useEffect(() => {

        return () => {
            setViewDashboardData({});
            Auth.cancelApiViewDashboard();
        }
    }, [])

    return [
        viewDashboardData,
        request

    ]

}