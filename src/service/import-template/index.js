import { REQUEST_STATE } from "../../app-config/constants"
import { apiCreateImportTemplate, cancelApiCreateImportTemplate } from "../../data-source/import-template/create-import-template";
import { apiDeleteImportTemplate, cancelApiDeleteImportTemplate } from "../../data-source/import-template/delete-import-template";
import { apiGetImportTemplate, cancelApiGetImportTemplate } from "../../data-source/import-template/get-import-template";
import { apiGetListImportTemplate, cancelApiGetListImportTemplate } from "../../data-source/import-template/get-list-import-template";
import { apiImportData, cancelApiImportData } from "../../data-source/import-template/import-data";
import { apiUpdateImportTemplate, cancelApiUpdateImportTemplate } from "../../data-source/import-template/update-import-template";



export const IMPORT_TEMPLATE = {
    // create
    cancelApiCreateImportTemplate: cancelApiCreateImportTemplate,
    createImportTempateAsync: function (params, setCreateImportTempateData) {
        setCreateImportTempateData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiCreateImportTemplate(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setCreateImportTempateData(response);
            }
        });
    },

    // update 
    cancelUpdateImportTempate: cancelApiUpdateImportTemplate,
    updateImportTempateAsync: function (params, setUpdateImportTemplateData) {
        setUpdateImportTemplateData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiUpdateImportTemplate(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setUpdateImportTemplateData(response);
            }
        });
    },

    // import 
    cancelApiImportData: cancelApiImportData,
    importDataAsync: function (params, setImportData) {
        setImportData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiImportData(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setImportData(response);
            }
        });
    },
    // delete 
    cancelDeleteImportTempate: cancelApiDeleteImportTemplate,
    deleteImportTempateAsync: function (params, setDeleteImportTemplateData) {
        setDeleteImportTemplateData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiDeleteImportTemplate(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setDeleteImportTemplateData(response);
            }
        });
    },


    // get list 
    cancelGetListImportTempate: cancelApiGetListImportTemplate,
    getListImportTempateAsync: function (params, setListImportTemplateData) {
        setListImportTemplateData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetListImportTemplate(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setListImportTemplateData(response);
            }
        });
    },

    // get one
    cancelGetImportTempate: cancelApiGetImportTemplate,
    getImportTempateAsync: function (params, setImportTemplateData) {
        setImportTemplateData({
            state: REQUEST_STATE.REQUEST,
            message: "",
            loading: true
        })
        apiGetImportTemplate(params).then((response) => {
            if (response && response.state !== REQUEST_STATE.UNMOUNT) {
                setImportTemplateData(response);
            }
        });
    },



}