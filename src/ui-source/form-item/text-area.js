import React, { useState, useEffect, useCallback } from 'react';
import { Cols } from 'ui-source/column';
import { FormItem } from 'ui-source/form';
import { InputText, TextAreaUI } from 'ui-source/input';
import { NormalText } from 'ui-source/text';
import { Rows } from 'ui-source/row';
import { BoldText } from 'ui-source/text';
import { LabelUI } from 'ui-source/label';
import { MessageError } from 'ui-source/message-error';
import { ATTRIBUTE_CODE_CHART } from 'app-configs/constants';

export const FTextArea = ({
    setData,
    submittedTime,
    validated,
    clickMenu,
    data,
    productData,
}) => {
    const [value, setValue] = useState("");
    const [errorValue, setErrorValue] = useState(false);

    const onChange = (e) => {
        if (!e.currentTarget.value) {
            setErrorValue(true);
            setValue("");
            return;
        } 
        setValue(e.currentTarget.value);
        setErrorValue(false);
    };

    useEffect(() => {
        if (data) {
            setValue(data.value);
        }
    }, [data]);

    useEffect(() => {
        if (data.attribute_code === ATTRIBUTE_CODE_CHART.NOTES) {
            if(productData) {
                setValue(productData.notes)
            }
        }
    }, [productData, data]);

    useEffect(() => {
        setErrorValue(true);
        setData({
            [data.attribute_code]: value
        });
    }, [submittedTime, data]);

    return (
        <FormItem>
                {
                    (data.attribute_code === ATTRIBUTE_CODE_CHART.INGREDIENT_REQUIREMENTS || data.attribute_code === ATTRIBUTE_CODE_CHART.PACKAGING_STORAGE || data.attribute_code === ATTRIBUTE_CODE_CHART.ADDITIONAL_NOTES) ? 
                        <Rows className="row-text">
                            <NormalText id={clickMenu} className="title-request-text-area">{data.frontend_label}</NormalText>
                            <TextAreaUI
                                className="text-area"
                                value={value}
                                disabled={data.read_only}
                                onChange={(e) => onChange(e)}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                            <MessageError errorValue={errorValue} validated={validated}/>
                        </Rows>
                    :
                        <Rows>
                            <LabelUI data={data}/>
                            <Cols span={16}>
                                <TextAreaUI  
                                    value={value}
                                    disabled={(productData?.read_only === true) ? true : data.read_only}
                                    onChange={(e) => onChange(e)}
                                />
                                <MessageError errorValue={errorValue} validated={validated}/>
                            </Cols>
                        </Rows>
                }
        </FormItem>
    );
} 