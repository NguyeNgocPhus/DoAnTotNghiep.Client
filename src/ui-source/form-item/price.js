import React, { useState, useEffect } from 'react';
import { Cols } from 'ui-source/column';
import { FormItem } from 'ui-source/form';
import { InputNumberUI } from 'ui-source/input';
import { NormalText } from 'ui-source/text';
import { Rows } from 'ui-source/row';
import { BoldText } from 'ui-source/text';
import { LabelUI } from 'ui-source/label';
import { log } from 'helper';
import { MessageError } from 'ui-source/message-error';
import { ATTRIBUTE_CODE_CHART } from 'app-configs/constants';

//form price
export const FormPrice = ({
    setData,
    submittedTime,
    validated,
    data,
    productData
}) => {
    const [value, setValue] = useState(null);
    const [errorValue, setErrorValue] = useState(false);

    const onChange = (e) => {
        setValue(e);
    };
 
    useEffect(() => {
        setData({
            [data.attribute_code]: value? value.toString() : ""
        });
    }, [submittedTime]);

    useEffect(() => {
        if (data) {
            setValue(data?.value || "");
        }
    }, [data]);

    useEffect(() => {
        if (data.attribute_code === ATTRIBUTE_CODE_CHART.PRICE_PRODUCT) {
            if(productData) {
                setValue(productData.price_product)
            }
        }
    }, [productData, data]);

    return (
        <FormItem>
            <Rows>
                <LabelUI data={data}/>
                <Cols span={8}>
                    <InputNumberUI
                        disabled={data.read_only}
                        className="f-number"
                        value={value}
                        min={0}
                        onChange={(e) => onChange(e)}
                    />
                    <MessageError errorValue={errorValue} validated={validated}/>
                </Cols>
            </Rows>
        </FormItem>
    );
}; 