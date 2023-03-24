import { reactive } from 'vue'

export const searchList = reactive([
    {
        label: '商品名称',
        name: 'GoodsName',
        value: '',
        placeholder: '请输入关键字',
    },
    {
        label: '商品类别',
        name: 'Category',
        value: '',
        placeholder: '请输入关键字',
    },
    {
        label: '商品品牌',
        name: 'Brand',
        value: '',
        placeholder: '请输入商品品牌',
    },
    {
        label: '注册时间',
        name: 'Brand',
        value: '',
        placeholder: '请输入商品品牌',
    },
])
export const goodsList = reactive([
    {
        label: '商品名称',
        name: 'attibuteName',
        value: '',
        placeholder: '请输入商品名称',
    },
    {
        label: '商品类别',
        name: 'goodsCategory',
        type: 'select',
        value: '',
        placeholder: '请选择商品类别',
        slots: { customRender: 'column' },
        options: [
            { label: '全部', value: '0' },
            { label: '汽修', value: '1' },
            { label: '技术专区', value: '2' },
        ],
    },
    {
        label: '商品品牌',
        name: 'goodsCategory',
        type: 'select',
        value: '',
        placeholder: '请选择商品品牌',
        slots: { customRender: 'column' },
        options: [
            { label: '发动机', value: '0' },
            { label: '发动机', value: '1' },
            { label: '发动机', value: '2' },
        ],
    },
    {
        label: '注册时间',
        name: 'goodsCategory',
        type: 'select',
        value: '',
        placeholder: '请选择起止时间',
        slots: { customRender: 'column' },
        options: [
            { label: '发动机', value: '0' },
            { label: '发动机', value: '1' },
            { label: '发动机', value: '2' },
        ],
    },
    // {
    //     label: '昵称',
    //     name: 'event',
    //     value: '',
    //     placeholder: '请输入用户昵称',
    // },
])
