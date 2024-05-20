
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getCoutUnreadNotificationState } from "./share-state"
import { NOTIFICATION } from "../../service/notification";


export const useCountUnreadNotification = () => {
    const [countUnreadNotificationData, setCountUnreadNotificationData] = useRecoilState(getCoutUnreadNotificationState);

    const request = (params) => {
        NOTIFICATION.getCountUnreadtNotification(params, setCountUnreadNotificationData);
    }

    useEffect(() => {
        return () => {
            setCountUnreadNotificationData({});
            NOTIFICATION.cancelApiGetCountUnreadNotification();
        }
    }, [])
    return [
        countUnreadNotificationData,
        request
    ]

}