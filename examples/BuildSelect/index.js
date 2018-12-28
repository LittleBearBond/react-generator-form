import React from 'react'
import ReactDOM from 'react-dom'
import ItemGenerator, { buildSelect } from '../../index'
import { Card, Form, Row, Col } from 'antd';

import 'antd/dist/antd.css';

const initArr = [...new Array(8).keys()];
const arrItem = initArr.map((val) => `选项${val}`);

const arrIdValItem = initArr.map((val) => ({
    id: val,
    value: `选项${val}`,
}));

const arrKeyNameItem = initArr.map((val) => ({
    key: val,
    name: `选项${val}`,
}));

const selectProps = {
    defaultValue: '',
    style: {
        width: 200
    }
}

const requiredRules = {
    rules: [
        { required: true, message: '请选择' }
    ]
}

const items = [
    {
        item: {
            id: 'select1',
            type: 'select',
            label: 'arr select',
            options: {
                initialValue: '',
                ...requiredRules
            },
            // 直接使用数组，数组的index 会作为value提交到后端
            data: arrItem,
        }
    },
    {
        item: {
            id: 'select2',
            type: 'select',
            label: 'arrIdValueItem',
            options: {
                initialValue: '',
                ...requiredRules
            },
            // 直接使用数组，数组的index 会作为value提交到后端
            data: arrIdValItem,
        }
    },
    {
        item: {
            id: 'select3',
            type: 'select',
            label: 'arrKeyNameItem',
            options: {
                initialValue: '',
                ...requiredRules
            },
            data: arrKeyNameItem,
            params: {
                key: 'key',
                value: 'name'
            }
        }
    },
    {
        item: {
            id: 'select3',
            type: 'select',
            label: 'disableSelect',
            options: {
                initialValue: '',
                ...requiredRules
            },
            data: arrKeyNameItem,
            params: {
                key: 'key',
                value: 'name',
                disableSelect: [3, 5]
            }
        }
    },
]

class TestBuildOption extends React.Component {
    render() {
        return <Card title="buildSelect demo">
            <Form>
                <Row>
                    <Col>
                        <h1>buildSelect</h1>
                        {
                            /**直接初始话一个数组，数组里面的值是显示项，索引是选择的值 */
                            buildSelect(arrItem, selectProps)
                        }
                    </Col>
                    <Col>
                        <h1>buildSelect</h1>
                        {
                            /**直接初始话一个数组Object，数组里面item的value值是显示项，id是选择的值 */
                            buildSelect(arrIdValItem, { ...selectProps, mode: 'multiple', defaultValue: [], placeholder: '请选择，可多选' })
                        }
                        <br />
                    </Col>
                    <Col>
                        <h1>buildSelect disableSelect</h1>
                        {
                            /**直接初始话一个数组Object，数组里面item的value值是显示项，id是选择的值 */
                            buildSelect(arrIdValItem, { ...selectProps, mode: 'multiple', defaultValue: [], placeholder: '请选择，可多选', disableSelect: [3, 5] })
                        }
                        <br />
                    </Col>
                    <Col>
                        <h1>buildSelect ; key:'key'  value:'name'</h1>
                        {
                            /**直接初始话一个数组Object，数组里面item的value值是显示项，key是选择的值 */
                            /** 默认id是选之后提交的值，但是可以指定相应的key*/
                            buildSelect(arrKeyNameItem, selectProps, { key: 'key', value: 'name' })
                        }
                        <br />
                    </Col>
                    <Col>
                        <h1>buildSelect = buildSelect；key:'key'  value:'name'</h1>
                        {
                            /**直接初始话一个数组Object，数组里面item的value值是显示项，key是选择的值 */
                            /** 默认id是选之后提交的值，但是可以指定相应的key*/
                            buildSelect(arrKeyNameItem, selectProps, { key: 'key', value: 'name' })
                        }
                        <br />
                        <br />
                    </Col>

                    <ItemGenerator
                        form={this.props.form}
                        options={{
                            items
                        }}
                    />
                </Row>
            </Form>
        </Card>
    }
}
TestBuildOption = Form.create()(TestBuildOption)
ReactDOM.render(<TestBuildOption />, document.getElementById('root'));



