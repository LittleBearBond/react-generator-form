import React, { Component } from 'react'
import ItemGenerator from '../../index';
import { Form, Card, Row, Col, Button } from 'antd';
import { items } from './config';

class GeneratorForm extends Component {
    submitForm = () => {
        this.props.form.validateFields(console.log)
    }
    render() {
        const { form } = this.props;

        return (
            <Card title="ItemGenerator Form">
                <Form style={{ background: '#fff', padding: '10px' }}>
                    <Row>
                        <ItemGenerator form={form}
                            options={{
                                items
                            }} />
                        <Col offset={20} span={24}><Button onClick={this.submitForm} type="primary">提交</Button></Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(GeneratorForm)
