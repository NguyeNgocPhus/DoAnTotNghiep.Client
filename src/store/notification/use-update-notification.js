
import { useEffect } from "react";
import { useRecoilState } from "recoil"
import {  updateNotificationState } from "./share-state"
import { NOTIFICATION } from "../../service/notification";


export const useUpdateNotification = () => {
    const [updateNotificationData, setUpdateNotificationData] = useRecoilState(updateNotificationState);

    const request = (params) => {
        NOTIFICATION.updateNotification(params, setUpdateNotificationData);
    }

    useEffect(() => {
        return () => {

            NOTIFICATION.cancelApiUpdateNotification();
        }
    }, [])
    return [
        updateNotificationData,
        request
    ]

}