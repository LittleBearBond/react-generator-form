# buildOptions

## use Select

```js
<Select defaultValue="0" style={{ width: 120 }}>
    <Option value="0">全部</Option>
    <Option value="1">已处理</Option>
    <Option value="2">未处理</Option>
    <Option value="3">处理完成</Option>
</Select>

//or
const status = ['全部', '已处理', '未处理', '处理完成'];
<Select defaultValue="0" style={{ width: 120 }}>
    {
        status.map((val, index) => {
            return <Option value={index} key={val} disabled={'未处理' === val}> {val} </Option>
        })
    }
</Select>

const statusIdValue = [
    {
        id: 1,
        value: '小明'
    },
    {
        id: 2,
        value: '小李'
    },
    {
        id: 3,
        value: '小王'
    }
];

<Select defaultValue="0" style={{ width: 120 }}>
    {
        statusIdValue.map(({ id, value }) => <Option value={id} key={id} disabled={2 === value}> {value} </Option>)
    }
</Select>
]
```

## use buildOptions

```js
import { wrapBuildOptions, buildArrOptions } from './index'

const status = ['全部','已处理','未处理','处理完成']
{
    buildArrOptions(status, {defaultValue: '0',style:{ width: 120 }}, {disableSelect: [2]})
}
const statusIdValue = [
    {
        id: 1,
        value: '小明'
    },
    {
        id: 2,
        value: '小李'
    },
    {
        id: 3,
        value: '小王'
    }
];
wrapBuildOptions(statusIdValue, {defaultValue: '0',style:{ width: 120 }}, {disableSelect: [2]})
```

## [other examples](./examples/buildOptions/index.js)

```js
import { wrapBuildOptions, buildArrOptions } from './index'

// init data
const initArr = [...new Array(8).keys()];
const arrItem = initArr.map((val) => `选项${val}`);

// Array id value
const arrIdValItem = initArr.map((val) => ({
    id: val,
    value: `选项${val}`,
}));

// Array key name
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
```

### buildArrOptions

```js
// 直接初始话一个数组，数组里面的值是显示项，索引是选择的值
buildArrOptions(arrItem, selectProps)
```

### wrapBuildOptions

```js
// 直接初始话一个数组Object，数组里面item的value值是显示项，id是选择的值
// 第二个参数为select的 props
wrapBuildOptions(arrIdValItem, { ...selectProps, mode: 'multiple', defaultValue: [], placeholder: '请选择，可多选' })
```

### wrapBuildOptions key:key  value:name

```js
// 初始话一个数组Object，数组里面item的value值是显示项，key是选择的值
// 默认id是选之后提交的值，value是显示项，但是可以指定相应的key
wrapBuildOptions(arrKeyNameItem, selectProps, { key: 'key', value: 'name', disableSelect:[3,5]})
```
