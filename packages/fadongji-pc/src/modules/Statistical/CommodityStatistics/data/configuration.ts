
import { AreaDataApi } from '/@/api/model/dictionaryApi'
import { getBrandFunc, getAgentData, getModelQueryFunc } from '/@/modules/ContentModule/api/basicFormApis'

//商品销量
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
            showSearch: true,
            filterOption: (input, option) => {
                return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            },
            placeholder: '请输入品牌名称搜索',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'modelId',
        component: 'ApiSelect',
        label: '型号',
        colProps: {
            span: 8,
        },
        componentProps: {
            api: getModelQueryFunc,
            showSearch: true,
            filterOption: (input, option) => {
                return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            },
            placeholder: '请输入型号名称搜索',
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
            showSearch: true,
            filterOption: (input, option) => {
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
            showSearch: true,
            filterOption: (input, option) => {
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



//商品销量
export const customerColumns = [
    {
        title: '排名',
        dataIndex: 'rankNumber',
    },
    {
        title: '品牌',
        dataIndex: 'brandName',
    },
    {
        title: '型号',
        dataIndex: 'model',
    },
    {
        title: '销量',
        dataIndex: 'salesCount',
        key: 'investment'
    },
    {
        title: '销售额（元）',
        dataIndex: 'salesAmount',
        sorter: (a, b) => a.salesAmount - b.salesAmount,
        
    },

];
//型号
export const CustomerInvestmentColumns = [
    {
        title: '排名',
        dataIndex: 'rankNumber',
    },

    {
        title: '商品名称',
        dataIndex: 'goodsName',
    },
    {
        title: '型号',
        dataIndex: 'model',
    },
    {
        title: '价格',
        dataIndex: 'originalPrice',
        sorter: (a, b) => a.originalPrice - b.originalPrice,
    },
    {
        title: '销量',
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
        dataIndex: 'modelName',
    },
];
//投资
export const CustomerSales = [
    {
        title: '排名',
        dataIndex: 'rankNumber',
    },
    {
        title: '品牌',
        dataIndex: 'brandName',
    },
    {
        title: '型号量',
        dataIndex: 'modelCount',
    },
    {
        title: '服务商名称',
        dataIndex: 'shopName',
    },
    {
        title: '投资覆盖量',
        dataIndex: 'investCount',
    },
    {
        title: '投资覆盖率',
        dataIndex: 'investCoverage',
        sorter: (a, b) => a.investCoverage - b.investCoverage,
    },
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
    }
    return columns;
}

