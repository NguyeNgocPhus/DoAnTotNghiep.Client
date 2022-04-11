import React from "react";
import { ButtonBasic, ButtonWarning } from "ui-source/button";
import { ModalUI } from "ui-source/modal";
import { BoldText, NormalText } from "ui-source/text";
import {
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { ActionsDialog } from "./constants";
import { Rows } from "ui-source/row";
import "./styles.css";

export const ConfirmationDialog = ({
    onCancel,
    onSave,
    title,
    message,
    visible,
    code = ''
}) => {
    
    return (
        <Rows key={code}>
            <ModalUI
                className={"confirm-dialog"}
                title={[
                    <div key={code} className={"title-dialog"}>
                        <ExclamationCircleOutlined className={"icon-dialog"} key="t-1"/>
                        <BoldText key="t-2">{title}</BoldText>
                    </div>
                ]}
                centered
                closable={false}
                visible={visible}
                footer={[
                    <div key={code}>
                        <ButtonBasic className={"btn-dialog"} key="f-1" onClick={() => onCancel()}>{ActionsDialog.CANCEL}</ButtonBasic>
                        <ButtonWarning className={"btn-dialog"} key="f-2" onClick={() => onSave()}>{ActionsDialog.ACCEPT}</ButtonWarning>
                    </div>
                ]}
            >
                <NormalText className={"mess-content"} key="3" >{message}</NormalText>
            </ModalUI>
        </Rows>

    );
}