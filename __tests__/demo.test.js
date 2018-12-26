// import React from 'react';
// // import renderer from 'react-test-renderer';
// import { Form } from 'antd';
// import { arrayItems, formItemStyle, colProps } from '../demo/config';
// import ItemGenerator from '../index';

// const ItemDemo = Form.create()(({ form }) => {
//     return (
//         <ItemGenerator form={form} options={{
//             formItemProps: formItemStyle,
//             colProps,
//             config: arrayItems
//         }} />
//     );
// });



const add = (num1, num2) => (num1 + num2);

// todo: 快照无法测试

// test('itemGenerator 快照', () => {
//     const component = renderer.create(<ItemDemo />);
//     let snapshot = component.toJSON();
//     expect(snapshot).toMatchSnapshot();
// });

// test('itemGenerator Demo交互', () => {
//     const checkbox = shallow(<ItemDemo />);
//     // 模拟input 的 发生change事件
//     checkbox.find('input').simulate('change');
//     // expect(checkbox.text()).toEqual('On<Tooltip /><Tooltip />');
// });

test('haha', () => {
    expect(add(1, 2)).toEqual(3);
});