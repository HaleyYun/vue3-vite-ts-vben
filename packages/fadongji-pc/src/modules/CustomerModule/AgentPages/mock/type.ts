import { reactive } from 'vue'
export const goodsEvaluatioForm = reactive([
    {
        label: '用户名称',
        name: 'goodsName',
        value: '',
        placeholder: '用户名称',
    },
    {
        label: '手机号码',
        name: 'phone',
        value: '',
        placeholder: '请输入手机号',
    },
    {
        // id: 6,
        // label: '账号状态',
        // vaule: '',
        // placeholderText: '账号状态',
        // name: 'nickPhone',
        //
        label: '账号状态',
        name: 'accountStatus',
        value: '',
        placeholder: '请输入账号状态',
    },
    // {
    //     id: 5,
    //     name: '查询',
    //     reset: '重置',
    //     slot: 'slot',
    // },
])
