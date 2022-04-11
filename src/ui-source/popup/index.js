import React, { useState } from 'react';
import "./styles.css";
import { ModalUI } from "ui-source/modal"
import { ButtonBasic, ButtonWarning } from "ui-source/button"
import { Rows } from 'ui-source/row';
import { Cols } from 'ui-source/column';
import { NormalText } from 'ui-source/text';
import { InputText, TextAreaUI } from 'ui-source/input';
import { BUTTON_NAME, LABEL_POPUP } from 'app-configs/constants';

export const Popup = ({
    title,
    visible,
    onSave,
    onCancel,
    isRequired = false,
    sendRequest = false
}) => {

    return(
        <ModalUI
            className="modal-approval"
            title={title}
            centered
            closable={false}
            visible={visible}
            footer={[
                <ButtonBasic 
                    key="1" 
                    className={"btn-dialog"}
                    onClick={() => onCancel()}
                >
                    {BUTTON_NAME.CANCEL}
                </ButtonBasic>,
                <ButtonWarning 
                    className={"btn-dialog"}
                    key="2" 
                    onClick={onSave}
                >
                    {BUTTON_NAME.ACCEPT}
                </ButtonWarning>,
            ]}
        >
            <Rows>
                <Cols span={6}>
                    <NormalText>{LABEL_POPUP.SEND_TO_EMAIL} </NormalText>
                    <NormalText className={"color-text"}>*</NormalText>
                </Cols>
                <Cols span={18}>
                    <InputText/>
                </Cols>
            </Rows>

            <Rows className={"margin-top"}>
                <Cols span={6}>
                    <NormalText>{LABEL_POPUP.EMAIL_CC}</NormalText>
                </Cols>
                <Cols span={18}>
                    <InputText/>
                </Cols>
            </Rows>
            {
                sendRequest === false ?
                    <Rows className={"margin-top"}>
                        <Cols span={6}>
                            { isRequired === true ?
                                <>
                                    <NormalText>{LABEL_POPUP.REASON}</NormalText>
                                    <NormalText className={"color-text"}>*</NormalText>
                                </>
                                :
                                <NormalText >{LABEL_POPUP.REASON}</NormalText>
                            }
                            
                        </Cols>
                        <Cols span={18}>
                            { isRequired === false ?
                                <TextAreaUI autoSize={{ minRows: 4, maxRows: 6 }}/>
                                :
                                <TextAreaUI
                                    autoSize={{ minRows: 4, maxRows: 6 }}
                                />
                            }
                        </Cols>
                    </Rows>
                    :
                    null

            }
            
        </ModalUI>
    );
};