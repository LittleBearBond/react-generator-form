import * as React from 'react';
import { Col, Form, Input, InputNumber, Slider, Switch, Checkbox, Radio, DatePicker, TimePicker } from 'antd';
import { buildArrOptions, buildIdValueOptions } from './buildOptions';
import * as extend from 'extend';
import { ItemProps } from './interface';

const toString = Object.prototype.toString;
const class2type: any = {};
const { TextArea } = Input
const { Group: CheckboxGroup } = Checkbox
const { Group: RadioGroup } = Radio
const FormItem = Form.Item;

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(val => {
    class2type['[object ' + val + ']'] = val.toLowerCase();
});

const isType = (obj: any) => {
    if (obj == null) {
        return String(obj);
    }
    return typeof obj === 'object' || typeof obj === 'function' ?
        class2type[toString.call(obj)] || 'object' :
        typeof obj;
};

const getStyle = (props: ItemProps = {}, style: React.CSSProperties = {}) => {
    return extend(true, {}, {
        width: '100%'
    }, style, props.style || {});
};

const getTemplate = (config: any) => {
    const { type = 'input', label = 'title', props = {}, data = [], params = {} } = config;
    const TypeMap: any = {
        // placeholder default  label
        number: <InputNumber placeholder={label} {...props} style={getStyle(props)} />,

        input: <Input placeholder={label} {...props} />,

        textarea: <TextArea placeholder={label} {...props} />,

        checkbox: <Checkbox {...props}>{props.content}</Checkbox>,

        checkboxgroup: <CheckboxGroup {...props} />,

        radio: <Radio {...props}>{props.content}</Radio>,

        radiogroup: <RadioGroup {...props} />,

        select: (() => {
            if (Array.isArray(data)) {
                if (data.length > 0 && isType(data[0]) === 'object') {
                    return buildIdValueOptions(data, {
                        placeholder: label,
                        ...props
                    }, params);
                }
                return buildArrOptions(data, {
                    placeholder: label,
                    ...props
                }, { ...params, isShowPleaseSel: params.isShowPleaseSel !== false });
            }
        })(),

        switch: <Switch {...props} />,

        slider: <Slider {...props} />,

        datepicker: <DatePicker {...props} style={getStyle(props)} />,

        monthpicker: <DatePicker.MonthPicker {...props} style={getStyle(props)} />,

        rangepicker: <DatePicker.RangePicker {...props} style={getStyle(props)} />,

        timepicker: <TimePicker {...props} style={getStyle(props)} />
    };

    return TypeMap[type.toLowerCase()];
}

const Factory = (config: any): JSX.Element => {
    if (config.template) {
        return config.template
    }
    return getTemplate(config);
};

const render = (obj: any): JSX.Element | null => {
    const { form, config } = obj.props;
    const { getFieldDecorator } = form;
    const { colProps = {}, item } = config;
    const { id, label, options = {} } = item;

    // whether show element
    if (colProps.show === false) {
        return null;
    }

    return <Col {...colProps.props}>
        <FormItem {...config.formItemProps} label={label}>
            {
                getFieldDecorator(id, options)(Factory(item))
            }
        </FormItem>
    </Col>;
};

export default render;
