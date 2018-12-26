/* {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
*/
// 1:2 拆分布局，占24
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

// 三分之一，三分页面
export const colProps = {
    props: {
        xl: 8, lg: 12, sm: 24
    }
};

/* 一直都独占一行 */
export const colOneLineProps = {
    props: {
        xl: 24, lg: 24, sm: 24
    }
};

// 1:10 拆分布局,占24
export const LEFT_RIGHT = {
    labelCol: {
        md: { span: 6 },
        lg: { span: 4 },
        xl: { span: 2 },
    },
    wrapperCol: {
        md: { span: 16 },
        lg: { span: 20 },
        xl: { span: 22 },
    }
};

/* 对半分 */
export const twoColProps = {
    lg: 12,
    md: 24
}

// 0:24 拆分布局
export const NO_LABEL = {
    labelCol: {
        md: { span: 0 },
        lg: { span: 0 },
    },
    wrapperCol: {
        md: { span: 24 },
        lg: { span: 24 },
    }
};
