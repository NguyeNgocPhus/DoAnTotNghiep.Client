import { CONST_FILE } from "app-configs/constants";
import React from "react";
import {
    DeleteOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import './styles.css';

export const ImageVideoUI = ({
    src,
    onRemove = () => {},
    onPreview,
    isRemove = true
    // type = CONST_FILE.Image
}) => {
    return (
        <div className="parent-image-video">
            <div className="background-image"></div>
            <div className="icon-async">
                <EyeOutlined className="cursor-pointer" onClick={onPreview}/>
                {
                    isRemove &&
                    <DeleteOutlined className="cursor-pointer" onClick={onRemove}/>
                }
            </div>
            <img className="image-video-size"  alt="" src={src} />
        </div>
    );
};