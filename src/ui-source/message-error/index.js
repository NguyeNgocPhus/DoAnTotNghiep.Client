import { Modal } from 'antd';
import React from 'react';
import { Cols } from 'ui-source/column';
import { BoldText, NormalText } from 'ui-source/text';

export const MessageError = ({errorValue, validated}) => {
    return (
        <>
            {
                errorValue === true && validated && validated.length ?
                    <NormalText style={{color: "#FD5202"}}>{validated}</NormalText>
                    :
                    null
            }
        </>
    );
};
