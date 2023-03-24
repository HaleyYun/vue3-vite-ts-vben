
import { AreaDataApi } from '/@/api/model/dictionaryApi'
import { getBrandFunc, getAgentData } from '/@/modules/ContentModule/api/basicFormApis'

export const filterFormSchemas = [

    {
        field: 'brandId',
        component: 'ApiSelect',
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
        field: 'agentId',
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
export const modelFormSchemas = [

    {
        field: 'brandId',
        component: 'ApiSelect',
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
        field: 'agentId',
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
    // {
    //     field: 'agentId',
    //     component: 'Select',
    //     label: '退货类型',
    //     defaultValue: '全部',
    //     componentProps: {
    //         placeholder: '请选择退货类型',
    //         options: [
    //             {
    //                 label: '全部',
    //                 value: 1,
    //             },
    //             {
    //                 label: '仅退款',
    //                 value: 2,
    //             },
    //             {
    //                 label: '退货退款',
    //                 value: 3,
    //             },
    //         ],
    //     },
    // },
    // {
    //     field: 'agentId',
    //     component: 'Select',
    //     label: '退货仓库',
    //     defaultValue: '全部',
    //     componentProps: {
    //         placeholder: '请选择退货退货仓库',
    //         options: [
    //             {
    //                 label: '全部',
    //                 value: 1,
    //             },
    //             {
    //                 label: '退到平台仓',
    //                 value: 2,
    //             },
    //             {
    //                 label: '退到我家',
    //                 value: 3,
    //             },
    //         ],
    //     },
    // },
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

//投资订单
export const customerColumns = [
    {
        title: '品牌',
        dataIndex: 'brandName',
    },
    {
        title: '商品名称',
        dataIndex: 'goodsName',
    },
    {
        title: '投资量(台)',
        dataIndex: 'salesCount',
        key: 'investment',
        sorter: (a, b) => a.salesCount - b.salesCount,
    },
    {
        title: '投资额（元）',
        dataIndex: 'salesAmount',
    },
    {
        title: '服务商名称',
        dataIndex: 'buyerName',
    },

];
//销售订单
export const CustomerInvestmentColumns = [
    {
        title: '品牌',
        dataIndex: 'brandName',
    },
    {
        title: '商品名称',
        dataIndex: 'goodsName',
    },
    {
        title: '销售量(台)',
        dataIndex: 'salesCount',
        key: 'sales',
        sorter: (a, b) => a.salesCount - b.salesCount,
    },
    {
        title: '销售额（元）',
        dataIndex: 'salesAmount',
        sorter: (a, b) => a.salesAmount - b.salesAmount,
    },
    {
        title: '服务商名称',
        dataIndex: 'salesName',
    },
];
//超时订单
export const CustomerSales = [
    {
        title: '服务商编号',
        dataIndex: 'buyerId',
    },
    {
        title: '服务商名称',
        dataIndex: 'overTimeName',
    },
    {
        title: '超时订单数量',
        dataIndex: 'overTimeOrderCount',
        key: 'overtime',
        sorter: (a, b) => a.overTimeOrderCount - b.overTimeOrderCount,
    },
];
//退货订单
export const AssociatedRepairShopColumns = [
    {
        title: '服务商名称',
        dataIndex: 'repairShopName',
    },
    {
        title: '品牌',
        dataIndex: 'brandName',
    },
    {
        title: '退货/退款订单量',
        dataIndex: 'salesCount',
        key: 'retreat',
        sorter: (a, b) => a.salesCount - b.salesCount,
    },
    // {
    //     title: '退货/退款率',
    //     dataIndex: 'salesCount',
    //     key: 'retreat'
    // },
];

export const getColumns = (key) => {
    let columns = []
    switch (key) {
        case '1':
            columns = customerColumns
            break;
        case '2':
            columns = CustomerInvestmentColumns
            break;
        case '3':
            columns = CustomerSales
            break;
        case '4':
            columns = AssociatedRepairShopColumns
            break;
    }
    return columns;
}

