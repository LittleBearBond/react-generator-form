import React, { Component } from 'react'

import { Button, Form, Card, Row, Col, Input, InputNumber, Select, Rate, DatePicker } from 'antd';

const { Item: FormItem } = Form
const { Option } = Select
const { RangePicker } = DatePicker;
const { TextArea } = Input
const colProps = {
    xl: 8, lg: 12, sm: 24
}
export const formItemStyle = {
    labelCol: {
        md: { span: 6 },
        lg: { span: 8 },
        xl: { span: 6 }
    },
    wrapperCol: {
        md: { span: 18 },
        lg: { span: 16 },
        xl: { span: 18 }

    }
};

const requiredRules = {
    rules: [
        { required: true, message: '请选择' }
    ]
}

class OldForm extends Component {
    submitForm = () => {
        this.props.form.validateFields(console.log)
    }
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Card title="old Form">
                <Form style={{ background: '#fff', padding: '10px' }}>
                    <Row>
                        <Col {...colProps}>
                            <FormItem {...formItemStyle} label="工单id">
                                {
                                    getFieldDecorator('mjid-old', {
                                        initialValue: '',
                                        rules: [{
                                            type: 'number',
                                            message: '请输入数字'
                                        }],
                                    })(<InputNumber placeholder="工单id" style={{ width: '100%' }} />)
                                }
                            </FormItem>
                        </Col>
                        <Col {...colProps}>
                            <FormItem {...formItemStyle} label="订单id">
                                {
                                    getFieldDecorator('orderId-old', {
                                        initialValue: '666',
                                    })(<Input placeholder="订单id" />)
                                }
                            </FormItem>
                        </Col>
                        <Col {...colProps}>
                            <FormItem {...formItemStyle} label="评级">
                                {
                                    getFieldDecorator('rate-old', {
                                        initialValue: 3,
                                    })(<Rate />)
                                }
                            </FormItem>
                        </Col>
                        <Col {...colProps}>
                            <FormItem {...formItemStyle} label="城市">
                                {
                                    getFieldDecorator('cityId-old', {
                                        ...requiredRules
                                    })(<Select mode="multiple" placeholder='请选择，可多选'>
                                        <Option value='22'>上海</Option>
                                        <Option value='33'>广州</Option>
                                        <Option value='11'>北京</Option>
                                    </Select>)
                                }
                            </FormItem>
                        </Col>
                        <Col {...colProps}>
                            <FormItem {...formItemStyle} label="车辆类型">
                                {
                                    getFieldDecorator('carType-old', {
                                        initialValue: '',
                                        ...requiredRules
                                    })(<Select>
                                        <Option value=''>请选择</Option>
                                        <Option value='22'>货车</Option>
                                        <Option value='33'>小汽车</Option>
                                        <Option value='11'>大卡车</Option>
                                    </Select>)
                                }
                            </FormItem>
                        </Col>
                        <Col {...colProps}>
                            <FormItem {...formItemStyle} label="状态">
                                {
                                    getFieldDecorator('status-old', {
                                        initialValue: '',
                                        ...requiredRules
                                    })(<Select>
                                        <Option value=''>请选择</Option>
                                        <Option value='0'>未处理</Option>
                                        <Option value='1'>处理中</Option>
                                        <Option value='2'>已处理</Option>
                                    </Select>)
                                }
                            </FormItem>
                        </Col>
                        <Col {...colProps}>
                            <FormItem {...formItemStyle} label="起始时间">
                                {
                                    getFieldDecorator('startAndEndTime-old', {
                                        initialValue: [],
                                    })(<RangePicker
                                        placeholder={['开始时间', '结束时间']}
                                        showTime={{ defaultValue: '' }}
                                        style={{
                                            width: 'auto'
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />)
                                }
                            </FormItem>
                        </Col>
                        <Col xs={24} lg={24} sm={24}>
                            <FormItem
                                labelCol={
                                    {
                                        md: { span: 6 },
                                        lg: { span: 4 },
                                        xl: { span: 2 },
                                    }
                                }
                                wrapperCol={{
                                    md: { span: 16 },
                                    lg: { span: 20 },
                                    xl: { span: 22 },
                                }}
                                label="备注">
                                {
                                    getFieldDecorator('comment-old', {
                                        initialValue: [],
                                    })(<TextArea
                                        placeholder='请输入备注'
                                        rows={3}
                                    />)
                                }
                            </FormItem>
                        </Col>
                        <Col offset={20} span={24}><Button onClick={this.submitForm} type="primary">提交</Button></Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(OldForm)
