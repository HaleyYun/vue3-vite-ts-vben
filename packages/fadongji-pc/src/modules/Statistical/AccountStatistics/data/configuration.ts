import { FormSchema } from '/@/components/Form'
import { AreaDataApi } from '/@/api/model/dictionaryApi'
import { getBrandFunc,getAgentData,getModelQueryFunc } from '/@/modules/ContentModule/api/basicFormApis'
export const filterFormSchemas: FormSchema[] = [
    {
        field: 'storeName',
        component: 'Input',
        label: '服务商',
        componentProps: {
            placeholder: '输入服务商名称搜索',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
];
//型号销量
export const modelFormSchemas = [

    {
        field: 'modelId',
        component: 'ApiSelect',
        label: '型号',
        colProps: {
            span: 8,
        },
        componentProps: {
            api: getModelQueryFunc,
            showSearch:true,
            filterOption: (input, option)=> {
                return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            },
            placeholder: '请输入型号名称搜索',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        label: '服务商地区',
        field: 'areaCodeSub',
        component: 'ApiCascader',
        componentProps: {
            api: AreaDataApi,
            placeholder: '服务商地区',
            fieldNames: {
                children: 'children',
                label: 'name',
                value: 'id',
            },
            isLeaf: (record) => {
                return !record.children
            },
        },
    },

    {
        field: 'shopId',
        component: 'ApiSearchSelect',
        label: '服务商',
        componentProps: {
            api: getAgentData,
            placeholder: '请输入服务商名称搜索',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'searchTime',
        label: '日期',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%',
            }
        },
    },

];
//投资销量
export const investmentFormSchemas = [

    {
        field: 'brandId',
        component: 'ApiSearchSelect',
        label: '品牌',
        colProps: {
            span: 8,
        },
        componentProps: {
            api: getBrandFunc,
            showSearch:true,
            filterOption: (input, option)=> {
              return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            },
            placeholder: '请输入品牌名称搜索',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        label: '服务商地区',
        field: 'areaCodeSub',
        component: 'ApiCascader',
        componentProps: {
            api: AreaDataApi,
            placeholder: '服务商地区',
            fieldNames: {
                children: 'children',
                label: 'name',
                value: 'id',
            },
            isLeaf: (record) => {
                return !record.children
            },
        },
    },

    {
        field: 'shopId',
        component: 'ApiSearchSelect',
        label: '服务商',
        componentProps: {
            api: getAgentData,
            placeholder: '请输入服务商名称搜索',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'searchTime',
        label: '日期',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%',
            }
        },
    },

];

export const tableColumns = [
    {
        title: '服务商',
        dataIndex: 'storeName',
        width: '180px',
    },
    {
        title: '可提现金额（元）',
        dataIndex: 'canWithdrawAmount',
        width: '180px',
    },
    {
        title: '待结算金额（元）',
        dataIndex: 'awaitSettlementAmount',
        width: '150px',
    },
]


