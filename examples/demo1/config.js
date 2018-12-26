import React from 'react'
import { colOneLineProps, LEFT_RIGHT } from '../../src/layout'
import { Rate } from 'antd';

const requiredRules = {
    rules: [
        { required: true, message: '请选择' }
    ]
}

export const items = [
    {
        item: {
            id: 'mjId',
            label: '工单id',
            options: {
                initialValue: '',
                rule: [
                    {
                        type: 'number',
                        message: '请输入数字'
                    }
                ]
            },
            type: 'number'
        }
    },
    {
        item: {
            id: 'orderId',
            label: '订单id',
            options: {
                // 设置初始值
                initialValue: '222', // 只针对input
            }
        }
    },
    {
        item: {
            id: 'rate',
            label: '评级',
            options: {
                initialValue: 3,
            },
            // 自定义模板
            template: <Rate />
        }
    },
    {
        item: {
            id: 'cityId',
            type: 'select',
            label: '城市',
            options: {
                initialValue: [],
                ...requiredRules
            },
            // 下拉框默认渲染id value [{id:'',value:''}]
            // 如果不是id value 需要手动指定相应的key
            data: [
                {
                    id: 22,
                    name: '上海'
                },
                {
                    id: 33,
                    name: '广州'
                },
                {
                    id: 11,
                    name: '北京'
                },
            ],
            params: {
                value: 'name',
                isShowPleaseSel: true
            },
            props: {
                mode: 'multiple'
            }
        }
    },
    {
        item: {
            id: 'carType',
            type: 'select',
            label: '车辆类型',
            options: {
                initialValue: '',
                ...requiredRules
            },
            // 下拉框默认渲染id value [{id:'',value:''}]
            // 如果不是id value 需要手动指定相应的key
            data: [
                {
                    uid: 22,
                    name: '货车'
                },
                {
                    uid: 33,
                    name: '小汽车'
                },
                {
                    uid: 11,
                    name: '大卡车'
                },
            ],
            params: {
                value: 'name',
                id: 'uid',
                isShowPleaseSel: true
            }
        }
    },
    {
        item: {
            id: 'status',
            type: 'select',
            label: '状态',
            options: {
                initialValue: '',
                ...requiredRules
            },
            // 直接使用数组，数组的index 会作为value提交到后端
            data: ['未处理', '已处理', '处理中'],
        }
    },
    {
        item: {
            id: 'startAndEndTime',
            label: '起始时间',
            options: {
                initialValue: '',
            },
            type: 'rangepicker',
            props: {
                showTime: {
                    defaultValue: ''
                },
                placeholder: ['开始时间', '结束时间'],
                style: {
                    width: 'auto'
                },
                format: 'YYYY-MM-DD HH:mm:ss',
                // disabledDate: (current) => current && current.valueOf() >= Date.now(),
            }
        }
    },
    {
        item: {
            id: 'comment',
            label: '备注',
            options: {
                initialValue: '',
            },
            type: 'textarea',
            props: {
                rows: 3,
                placeholder: '请输入备注',
            }
        },
        // 单独设置布局效果
        // 独占一行
        colProps: colOneLineProps,
        // 左右布局按相关比例
        formItemProps: LEFT_RIGHT
    },
];
