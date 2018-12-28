import * as React from 'react';
import { Col, Form, Input, InputNumber, Slider, Switch, Checkbox, Radio, DatePicker, TimePicker } from 'antd';
import { buildSelect } from './buildSelect';
import * as extend from 'extend';
import { ItemProps } from './interface';

const { TextArea } = Input
const { Group: CheckboxGroup } = Checkbox
const { Group: RadioGroup } = Radio
const FormItem = Form.Item;

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
            return buildSelect(data, {
                placeholder: label,
                ...props
            }, params);
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
