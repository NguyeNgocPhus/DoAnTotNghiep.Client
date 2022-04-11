import Modal from "antd/lib/modal/Modal";
import { CONST_FILE } from "app-configs/constants";
import React from "react";
import { Cols } from "ui-source/column";
import { Rows } from "ui-source/row";
import "./styles.css";

export const ModalFile = ({
    visible,
    title,
    onCancel,
    checkType,
    src,
    code
}) => {
    return (
        <Rows key={code}>
            <Modal
                className="modal-sync-file"
                visible={visible}
                title={[
                    <Rows key={code}>
                        <Cols span={20}>
                            {title}
                        </Cols>
                    </Rows>
                ]}
                footer={null}
                onCancel={onCancel}
            >
                <div key={code}>
                    {
                        checkType === CONST_FILE.Video ?
                            <video className="full-width" src={src} controls/>
                            :
                            //image
                            <img alt={title} className="full-width" src={src} />
                    }
                </div>
            </Modal>
        </Rows>
    );
};