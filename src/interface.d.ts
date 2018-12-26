export interface ColProps {
    /** 隐藏表单域  */
    show?: boolean;
    /** 整个分为几列 */
    props?: ColBaseSpan;
}

interface ColBase {
    /** x<768px */
    xs?: ColBaseSpan;
    /** 768<x<998px */
    sm?: ColBaseSpan;
}

interface ColBaseSpan {
    /** 整体24等分，6则宽度为，6/24=25% */
    span?: number;
}

export interface ItemsBase {
    item?: ItemType;
}

export interface OptionsConfigType {
    /*** 表单项的样式配置  */
    formItemProps?: FormItemProps;
    /*** 表单项整体的样式配置  */
    colProps?: ColProps;
    /*** 内容配置  */
    items: ItemsBase[] | ItemsBase;
}

// 实现type接口类型、类型别名
type ItemTypeEnum = 'text' | 'number' | 'textarea' | 'checkbox' | 'checkboxgroup' | 'radio' | 'radiogroup' | 'select' | 'switch' | 'slider' | 'datepicker' | 'monthpicker' | 'rangepicker' | 'timepicker';

export interface ItemType {
    /*** 字段名称  */
    id?: string;
    /*** 标签名称  */
    label?: string;
    /*** 表单项类型  */
    type?: ItemTypeEnum;
    /*** 模板  */
    template?: string | Element | Node | JSX.Element;
    /*** 单项配置  */
    options?: ItemOptions;
    props?: any;
    params?: ItemParams;
    /*** 数据入口  */
    data?: Array<any>;
}

interface ItemParams {
    value: string;
    /** 是否展示"请选择"  */
    isShowPleaseSel?: boolean;
}

interface ItemOptions {
    /** 默认值,多选为数组、其他则为string  */
    initialValue: any[] | string;
    /** antd校验规则  */
    rules: any[];
}

export interface ItemProps {
    content?: any;
    /*** 选择模式，包含单项、多选  */
    mode?: string;
    style?: React.CSSProperties;
}

export interface FormItemProps {
    /** 标签的横向宽度比  */
    labelCol: ColBase;
    /** 表单项标签的横向宽度比  */
    wrapperCol: ColBase;
}

export interface ItemGeneratorProp {
    /** antd form自带的方法 */
    form?: any;
    options: OptionsConfigType;
    /*** 整体样式  */
    style?: React.CSSProperties;
}
