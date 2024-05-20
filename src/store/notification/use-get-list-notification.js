
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import { getListNotificationState } from "./share-state"
import { NOTIFICATION } from "../../service/notification";


export const useGetListNotification = () => {
    const [listNotificationData, setListNotificationData] = useRecoilState(getListNotificationState);

    const request = (params) => {
        NOTIFICATION.getListNotificationAsync(params, setListNotificationData);
    }

    useEffect(() => {
        return () => {
            setListNotificationData({});
            NOTIFICATION.cancelApiGetListNotification();
        }
    }, [])
    return [
        listNotificationData,
        request
    ]

}