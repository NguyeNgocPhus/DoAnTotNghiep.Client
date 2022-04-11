import { Modal } from 'antd';
import React from 'react';


export const ModalUI = ({icon, title, className, visible, children, ...props}) => {
    return (
        <Modal 
            title={title}
            visible={visible}
            className={className}
            {...props}
        >
            {children}
        </Modal>
    );
};
