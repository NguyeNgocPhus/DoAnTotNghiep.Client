import React, { useState, useEffect, useCallback } from 'react';
import { Select } from 'antd';
import { Cols } from 'ui-source/column';
import { FormItem } from 'ui-source/form';
import { InputText } from 'ui-source/input';
import { Rows } from 'ui-source/row';
import { BoldText, NormalText } from 'ui-source/text';
import { LabelUI } from 'ui-source/label';
import { MessageError } from 'ui-source/message-error';
import { ATTRIBUTE_CODE_CHART } from 'app-configs/constants';

export const FSelect = ({
    data,
    setData,
    validated,
    productData,
    setChartType,
    submittedTime,
    issueUnit
}) => {
    const [value, setValue] = useState("");
    const [mode, setMode] = useState("");
    const [errorValue, setErrorValue] = useState(false);
    const onChange = (value) => {
        if (value !== null) {
            setValue(value);
            setErrorValue(false);
            if (data?.attribute_code === ATTRIBUTE_CODE_CHART.SAP_EXT_GROUP) {
                if (setChartType) {
                    setChartType(value);
                }
            }
        } else {
            setValue("");
            setErrorValue(true);
            if (data && data.length && data.attribute_code === ATTRIBUTE_CODE_CHART.SAP_EXT_GROUP) {
                if (setChartType) {
                    setChartType('');
                }
                 
            }
        }
       
    }

    useEffect(() => {
        setErrorValue(true);
        setData({
            [data.attribute_code]: value
        });
    }, [submittedTime, data]);
    
    useEffect(() => {
        if (data.attribute_code === ATTRIBUTE_CODE_CHART.MENU_GROUP) {
            setMode("multiple");
            if (productData) {
                setValue(productData[data.attribute_code] || []);
                setErrorValue(false);

            } else {
                setValue(data.value || []);
            }
        }
        
        if (data.attribute_code === ATTRIBUTE_CODE_CHART.SAP_EXT_GROUP) {
            if (productData) {
                setValue(productData[data.attribute_code]);
                setErrorValue(false);
            } else {
                setValue(data.value || "");
                if (setChartType) {
                    setChartType(data.value || "");
                }
            }
        }

    }, [productData, data]);
    
    useEffect(() => {
        if (data.value) {
            setValue(data.value);
        }
    }, [data]);

    useEffect(() => {
        if (data.attribute_code === ATTRIBUTE_CODE_CHART.ISSUE_UNIT) {
            if (issueUnit) {
                setValue(issueUnit.value);
            } else {
                setValue(data.value);
            }
        }
    }, [issueUnit, data]);
    
    return (
        <FormItem>
            <Rows>
                <LabelUI data={data}/>
                <Cols span={8}>
                    <Select
                        mode={mode}
                        disabled={
                            (productData?.read_only === true || (data.attribute_code === ATTRIBUTE_CODE_CHART.ISSUE_UNIT && issueUnit?.visible))?
                                true 
                            : 
                                data.read_only
                        }
                        className="form-project full-width"
                        showSearch
                        allowClear
                        showArrow
                        size="midlle"
                        value={value}
                        onChange={onChange}
                        getPopupContainer={trigger => trigger.parentNode}
                        filterOption={(input, option) => {
                                if(option.title) {
                                    return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            }
                        }
                    >
                        {
                            data.select_source  && data.select_source.length && data.select_source.map((item, index) => {
                                return (
                                    <Select.Option key={index} value={item.value} title={item.label}>
                                        {item.label}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                    <MessageError errorValue={errorValue} validated={validated}/>
                </Cols>
            </Rows>
        </FormItem>

    );
} 