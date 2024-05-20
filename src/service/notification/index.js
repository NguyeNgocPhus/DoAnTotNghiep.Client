import { REQUEST_STATE } from "../../app-config/constants"
import { apiCreateImportTemplate, cancelApiCreateImportTemplate } from "../../data-source/import-template/create-import-template";
import { apiDeleteImportTemplate, cancelApiDeleteImportTemplate } from "../../data-source/import-template/delete-import-template";
import { apiGetImportTemplate, cancelApiGetImportTemplate } from "../../data-source/import-template/get-import-template";
import { apiGetListImportTemplate, cancelApiGetListImportTemplate } from "../../data-source/import-template/get-list-import-template";
import { apiImportData, cancelApiImportData } from "../../data-source/import-template/import-data";
import { apiUpdateImportTemplate, cancelApiUpdateImportTemplate } from "../../data-source/import-template/update-import-template";
import { apiGetCountUnreadtNotification, cancelApiGetCountUnreadNotification } from "../../data-source/notification/count-unread-notification";
import { apiGetListNotification, cancelApiGetListNotification } from "../../data-source/notification/get-list-notification";
import { apiUpdateNotification, cancelApiUpdateNotification } from "../../data-source/notification/update-notification";



export const NOTIFICATION = {



    // get list 
    cancelApiGetListNotification: cancelApiGetListNotification,
    getListNotificationAsync: function (params, setListNotification) {
        setListNotification({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetListNotification(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setListNotification(response);
            }
        });
    },

    // get one
    cancelApiGetCountUnreadNotification: cancelApiGetCountUnreadNotification,
    getCountUnreadtNotification: function (params, setCountUnreadNotification) {
        setCountUnreadNotification({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetCountUnreadtNotification(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setCountUnreadNotification(response);
            }
        });
    },
    // update 
    cancelApiUpdateNotification: cancelApiUpdateNotification,
    updateNotification: function (params, setUpdateNotification) {
        setUpdateNotification({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiUpdateNotification(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setUpdateNotification(response);
            }
        });
    },



}