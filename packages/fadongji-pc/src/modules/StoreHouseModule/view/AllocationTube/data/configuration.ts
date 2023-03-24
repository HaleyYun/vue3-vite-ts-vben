import { FormSchema } from '/@/components/Form'
import { getBrandFunc, getHousePageFunc } from '/@/modules/ContentModule/api/basicFormApis'

export const filterFormSchemas: FormSchema[] = [
    {
        field: 'goodsName',
        component: 'Input',
        label: '商品名称',

        componentProps: {
            placeholder: '请输入商品名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'goodsBrandId',
        component: 'ApiSelect',
        label: '商品品牌',
        componentProps: {
            placeholder: '请选择商品品牌',
            api: getBrandFunc,
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'inWarehouseId',
        component: 'ApiSelect',
        label: '调入仓库',
        componentProps: {
            placeholder: '请选择',
            api: getHousePageFunc,
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'outWarehouseId',
        component: 'ApiSelect',
        label: '调出仓库',
        componentProps: {
            placeholder: '请选择',
            api: getHousePageFunc,
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'searchTime',
        label: '调拨申请时间',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%',
            },
        },
    },
    {
        field: 'status',
        component: 'Select',
        label: '调拨状态',
        componentProps: {
            placeholder: '请选择',
            options: [
                {
                    label: '发起申请',
                    value: '0',
                    key: '0',
                },
                {
                    label: '出库成功',
                    value: '1',
                    key: '1',
                },
                {
                    label: '入库成功',
                    value: '2',
                    key: '2',
                },
            ],
        },
    }
]

/**
 *@desc 改变状态 table Column 配置
 */
export const tableColumns = [
    {
        title: '调拨单编号',
        dataIndex: 'id',
        width: '140px',
    },
    {
        title: '商品类别',
        dataIndex: 'goodsCategory',
        width: '180px',
    },
    {
        title: '商品名称',
        dataIndex: 'goodsName',
        width: '180px',
    },
    {
        title: '品牌',
        dataIndex: 'goodsBrandName',
        width: '120px',
    },
    {
        title: '调拨数量',
        dataIndex: 'changeNumber',
        width: '100px',
    },
    {
        title: '调出仓库',
        dataIndex: 'outWarehouseName',
        width: '250px',
    },
    {
        title: '调入仓库',
        dataIndex: 'inWarehouseName',
        width: '250px',
    },
    {
        title: '调拨申请方',
        dataIndex: 'companyName',
        width: '250px',
    },
    {
        title: '申请人',
        dataIndex: 'applyName',
        width: '200px',
    },
    {
        title: '调拨状态',
        dataIndex: 'statusName',
        width: '120px',
    },
    {
        title: '调拨申请时间',
        dataIndex: 'createTime',
        width: '190px',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
]






