import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as extend from 'extend';

import Item from './src/item';

import { formItemStyle, colProps } from './src/layout'

// interface
import { ItemGeneratorProp, OptionsConfigType } from './src/interface';

const defaultOptions = {
    colProps: {
        show: true,
        props: { ...colProps.props }
    },
    formItemProps: { ...formItemStyle },
    items: []
};
/**
 * 动态表单组件、用来动态生成基于antd的表单项。
 *
 * @export
 * @class ItemGenerator
 * @extends {React.PureComponent<ItemGeneratorProp, any>}
 */
class ItemGenerator extends React.PureComponent<ItemGeneratorProp, any> {
    /**
     * 类型校验
     *
     * @static
     * @memberof ItemGenerator
     */
    static propTypes = {
        options: PropTypes.shape({
            formItemProps: PropTypes.object,
            colProps: PropTypes.shape({
                show: PropTypes.bool,
                props: PropTypes.object
            }),
            items: PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.array
            ]).isRequired
        })
    };
    /**
     * 默认值
     *
     * @static
     * @memberof ItemGenerator
     */
    static defaultProps = {
        // 默认设置为空object ，不然空置会覆盖默认的props值，下面通过extend 深拷贝来处理默认值
        options: {}
    }

    render() {
        const { props } = this;
        const { options = {} } = props;
        const extendOptions = extend(true, {}, defaultOptions, options) as OptionsConfigType;

        let { formItemProps = {}, colProps = {}, items } = extendOptions;
        // empty items
        if (!Array.isArray(items) || !items.length) {
            return null;
        }
        return items.map((data: any, index: number) => <Item {...props}
            config={{
                ...data,
                formItemProps: extend(true, {}, formItemProps, data.formItemProps || {}),
                colProps: extend(true, {}, colProps, data.colProps || {})
            }}
            key={typeof data.key !== 'undefined' ? data.key : index}
        />)
    }
}

export * from './src/layout'
export * from './src/buildOptions'
export default ItemGenerator
