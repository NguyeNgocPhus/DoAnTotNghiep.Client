import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import "./index.css";

export const Loading = ({color="#DBAC17", size="large", ...rest}) => {
    return (
        <Spin
            indicator={<LoadingOutlined spin/>}
            style={{color: color}}
            size={size}
            {...rest}
        />
    );
};


export const LoadingPage = ({loading, ...rest}) => {
    return loading === true ?
            <div className="full-page-loading" {...rest}>
                <Loading/>
            </div>
            :
            null
};


export const LoadingContainer = ({loading, ...rest}) => {
    return loading === true ?
            <div className="container-loading" {...rest}>
                <Loading/>
            </div>
            :
            null
};