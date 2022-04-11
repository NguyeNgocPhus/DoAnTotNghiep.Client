import React, { useState, useEffect, useCallback } from 'react';
import { Cols } from 'ui-source/column';
import { FormItem } from 'ui-source/form';
import { InputText } from 'ui-source/input';
import { NormalText } from 'ui-source/text';
import { Rows } from 'ui-source/row';
import { BoldText } from 'ui-source/text';
import { LabelUI } from 'ui-source/label';
import { itemRender } from 'ui-view/pages/bom-manage/item-render';
import { MessageError } from 'ui-source/message-error';
import { ATTRIBUTE_CODE_CHART } from 'app-configs/constants';

export const FText = ({
    data,
    setData,
    validated,
    required,
    typePath,
    nameChart,
    submittedTime,
    productData,
}) => {
    const [value, setValue] = useState("");
    const [errorValue, setErrorValue] = useState(false);
    
    const onChange = (e) => {
        if (!e.target.value) {
            setErrorValue(true);
            setValue("");
            return;
        }
        setValue(e.target.value);
        setErrorValue(false);
        
    };

    useEffect(() => {
        if (data) {
            setValue(data?.value || "");
        }
    }, [data]); 

    useEffect(() => {
        if (nameChart) {
            if (data.attribute_code === ATTRIBUTE_CODE_CHART.NAME) {
                setValue(nameChart.value);
                setErrorValue(false);
            }
        }
      
    }, [nameChart, data]);

    useEffect(() => {
      
        if (data.attribute_code === ATTRIBUTE_CODE_CHART.VERSION_NAME) {
            if(productData) {
                setValue(productData.version_name);
                setErrorValue(false);
            }
        }
        if (data.attribute_code === ATTRIBUTE_CODE_CHART.TOTAL_AMOUNT_INGREDIENT) {
            if(productData) {
                setValue(productData.total_amount_ingredient);
                setErrorValue(false);
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
            <Rows>
                <LabelUI data={data}/>
                <Cols span={16}>
                    <InputText  
                        value={value}
                        disabled={
                            (productData?.read_only || (data.attribute_code === ATTRIBUTE_CODE_CHART.NAME && nameChart?.visible) ) ? 
                                true 
                                : 
                                data.read_only
                        }
                        onChange={(e) => onChange(e)}
                    />
                    <MessageError errorValue={errorValue} validated={validated}/>
                </Cols>
            </Rows>
        </FormItem>
    );
} 