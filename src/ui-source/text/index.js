import { Typography } from 'antd';
import React from 'react';
import './styles.css';

const { Text, Title, Link } = Typography;

export const NormalText = ({ className, children, ...props }) => {
    const cssClass = [className, "font", "size-text"];
    return (
        <Text className={cssClass.join(" ")} {...props}>
            {children}
        </Text>
    );
};

export const BoldText = ({ className, children, ...props }) => {
    const cssClass = [className, "font", "size-text", "bold"];
    return (
        <Text className={cssClass.join(" ")} {...props}>
            {children}
        </Text>
    );
};

export const LinkText = ({className, href, children, ...props }) => {
    const cssClass = [className, "font", "size-text"];
    return (
        <Link href={href} className={cssClass.join(" ")} {...props}>
            {children}
        </Link>
    );
};

export const TitleText = ({ className, level= 5, children, ...props }) => {
    const cssClass = [className];
    return (
        <Title level={level} className={cssClass} {...props}>
            {children}
        </Title>
    );
};

export const HeadText = ({ className, level= 5, children, ...props }) => {
    const cssClass = [className];
    return (
        <Title level={1} className={cssClass} {...props}>
            {children}
        </Title>
    );
};
