/**
 * @author xiongjian
 * @create date 2017-08-22 05:30:53
 * @modify date 2017-08-22 05:30:53
 * @desc [description]
*/
import * as React from 'react';
import { Select } from 'antd';
const { Option } = Select;

/**
 *
 * @param {Array}} data 构建Options
 */
const buildOptions = (data: Array<any>, { key = 'id', value = 'value', disableSelect = [] } = {}) => {
    const disableKeyValues = disableSelect.reduce((obj: any, next) => {
        obj[next] = true;
        return obj;
    }, {});
    return data.map((item, index) => {
        return <Option key={`${index}`} value={`${item[key]}`} disabled={item[key] in disableKeyValues}>{item[value]}</Option>
    });
}

/**
 *
 * @param {Object} data Object的key对应下拉框的value,Object的value对应下拉框的label
 * @param {Object}} props 下拉框props配置
 * @param {Bool} isShowPleaseSel 是显示请选择，默认显示
 */
export const wrapBuildOptions = (data: Array<any> = [], props: any = {}, { isShowPleaseSel = true, ...otherProps } = {}) => {
    const { length } = data
    if (!Array.isArray(data) || !length) {
        return <Select {...props} >
            <Option value="" key="">请选择</Option>
        </Select>
    }
    if (length >= 5 && props.isShowSearch !== false) {
        props = {
            optionFilterProp: 'children',
            showSearch: true,
            filterOption: (input: any, option: any): boolean => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            ...props
        }
    }
    // 多选的时候请选择要去掉 不然会报错
    if (props.mode === 'multiple') {
        return <Select {...props}>
            {buildOptions(data, otherProps)}
        </Select>
    }
    return (
        <Select {...props}>
            {isShowPleaseSel && <Option value="" key="">请选择</Option>}
            {buildOptions(data, otherProps)}
        </Select>
    )
}

/**
 * 构建数组类型的Select 的 Options
 * @param {Object} data 下来框数据，是一个数组，数组的单个值是Object,这里默认去key为id的设置为下拉框value，去key为value 设置为下拉框label
 * @param {Object} props 下拉框props配置
 * @param {Object} 可以手动设置数组单个值里面那个key对应option的value,哪个value key对应option的label
       */
export const buildIdValueOptions = wrapBuildOptions

type valueType = number | string
type objType = { id: valueType, value: valueType }

/**
 * 构建数组类型的Select 的 Options
* @param {Array} data 下来框数据，是一个数组，label是数组的值，value是下标值
* @param {Object}} props 下拉框props配置
* @param {Bool} isShowPleaseSel 是显示请选择，默认显示
*/
export const buildArrOptions = (data: any = [], props = {}, options: any) => {
    const arrData: Array<objType> = data.reduce((arr: Array<objType>, val: valueType, index: number) => {
        const obj: objType = Object.create(null)
        obj['id'] = index;
        obj['value'] = val;
        arr.push(obj)
        return arr;
    }, []);
    return wrapBuildOptions(arrData, props, options);
}

export default buildOptions;
