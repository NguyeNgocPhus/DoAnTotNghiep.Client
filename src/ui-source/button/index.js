import { Button } from 'antd';
import React from 'react';
import './index.css';

export const ButtonH56Orange = ({className="", ...props}) => {
    const cssClass = [className, "button-h56", "orange", "solid"];
    return <Button className={cssClass.join(" ")} {...props}/>;
};

export const ButtonH44Red = ({className="", ...props}) => {
    const cssClass = [className, "button-h44", "red", "solid"];
    return <Button className={cssClass.join(" ")} {...props}/>;
};

export const ButtonH44Orange = ({className="", ...props}) => {
    const cssClass = [className, "button-h44", "orange", "solid"];
    return <Button className={cssClass.join(" ")} {...props}/>;
};

export const ButtonH44kBlueDark = ({className="", ...props}) => {
  const cssClass = [className, "button-h44", "blue-dark", "solid"];
  return <Button className={cssClass.join(" ")} {...props}/>;
};

export const ButtonH44White = ({className="", ...props}) => {
    const cssClass = [className, "button-h44", "white", "solid"];
    return <Button className={cssClass.join(" ")} {...props}/>;
};
