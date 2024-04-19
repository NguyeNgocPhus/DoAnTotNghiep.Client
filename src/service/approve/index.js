import { REQUEST_STATE } from "../../app-config/constants"
import { apiGetListApprove, cancelApiGetListApprove } from "../../data-source/approve/get-list-import-template";

export const APPROVE = {
    // create
    cancelApiGetListApprove: cancelApiGetListApprove,
    getListApproveAsync: function (params, setGetListApproveData) {
        setGetListApproveData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetListApprove(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setGetListApproveData(response);
            }
        });
    },



}