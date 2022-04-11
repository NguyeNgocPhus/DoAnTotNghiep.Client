import React from "react";
import { STATUS } from "app-configs/constants";


export const StatusUI = ({status}) => {

    function format (status) {
        switch(status) {
            case STATUS.REJECT.value:
                return <a className= {"status-refuse"}>{STATUS.REJECT.text}</a>;
            case STATUS.PROCESSING.value:
                return <a className= {"status-pending"}>{STATUS.PROCESSING.text}</a>;
            case STATUS.DRAFT.value: 
                return <a className={"status-pending"}>{STATUS.DRAFT.text}</a>;
            case STATUS.SUCCESS.value:
                return <a className={"status-success"}>{STATUS.SUCCESS.text}</a>;
            case STATUS.ACTIVE.value:
                return <a className={"status-success"}>{STATUS.ACTIVE.text}</a>;
            case STATUS.CANCEL.value:
                return <a className={"status-refuse"}>{STATUS.CANCEL.text}</a>;
            default:
                return <a className= {"status-pending"}>{STATUS.PROCESSING.text}</a>;
        }
    }
    return format(status);
};