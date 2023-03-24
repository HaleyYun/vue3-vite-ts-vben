import { FormSchema } from '/@/components/Form'
import {
    getColumnsOptiosFunc,
    getCategoryOptiosFunc,
} from '/@/modules/ContentModule/api/basicFormApis'

// categoryId: '[142660496502423552, 124582557818945547, 143397014250586112, 143397050120273920, 143397060337598464, 143397147600093184]'
// categoryInfo: '油品-一次性手套、点火系统-火花塞、车身附件-测试数据16、车身附件-测试数据18、车身附件-测试数据17、车身附件-测试数据19'
// createTime: '2022-07-07 10:49:02'
// id: '145480870831194112'
// orderProperty: null
// orderType: null
// pageNo: 1
// pageSize: 10
// phoneNum: '15812344321'
// reason: 'NULL'
// shopId: '145479831864344576'
// shopName: '店铺名称'
// status: 1
export const BrandContainerData = [
    {
        title: '供应商名称',
        dataIndex: 'shopName',
        width: '200px',
    },
    {
        title: '手机号',
        dataIndex: 'phoneNum',
        width: '120px',
    },
    {
        title: '申请品类',
        dataIndex: 'categoryInfo',
        width: '200px',
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: '120px',
    },
    {
        title: '申请时间',
        dataIndex: 'createTime',
        width: '220px',
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
    },
]

export const opFormConfig: FormSchema[] = [
    {
        field: 'title',
        component: 'Input',
        label: '标题',
        colProps: {
            span: 8,
        },
        defaultValue: '',
        componentProps: {
            placeholder: '请输入标题',
            onChange: (e) => {
                console.log(e)
            },
        },
        rules: [{ required: true, message: '请输入标题' }],
        slot: 'titleSlot',
    },
    {
        field: 'categoryId',
        component: 'ApiSelect',
        label: '请选择品类',
        colProps: {
            span: 8,
        },
        defaultValue: '',
        componentProps: {
            placeholder: '请选择商品类别',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'columnId',
        component: 'ApiSelect',
        label: '请选择栏目',
        colProps: {
            span: 8,
        },
        defaultValue: '',
        componentProps: {
            placeholder: '请选择栏目',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'content',
        component: 'Input',
        label: '请输入想法',
        slot: 'contentSlot',
    },
    {
        field: 'resource',
        component: 'Input',
        label: '图片/视频',
        slot: 'resourceSlot',
    },
    {
        field: 'allow',
        component: 'Input',
        label: '可见权限',
        slot: 'allowSlot',
    },
    {
        field: 'prise',
        component: 'InputNumber',
        label: '点赞数',
        colProps: {
            span: 8,
        },
        defaultValue: parseInt(Math.random() * 90) + 10,
        componentProps: {
            placeholder: '请输入点赞数',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'authId',
        component: 'ApiSelect',
        label: '请选择作者',
        colProps: {
            span: 8,
        },
        defaultValue: '',
        componentProps: {
            placeholder: '请选择作者',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
]

export const filterFormSchemasByAwait: FormSchema[] = [
    {
        field: 'shopName',
        component: 'Input',
        label: '供应商名称',
        defaultValue: '',
        componentProps: {
            placeholder: '请输入供应商名称',
            onChange: (e) => {
                console.log(e)
            },
        },
        // slot: 'keyWordsSlot',
    },

    {
        label: '申请时间',
        field: 'searchTime',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%'
          },
        },
    },


]

export const accessGoneData: FormSchema[] = [
    {
        label: '推荐内容',
        component: 'Checkbox',
        field: 'tuijian',
        defaultValue: false,
        componentProps: ({ schema, tableAction, formActionType, formModel }) => {
            return {
                onChange: (e) => {
                    console.log(e)
                    // const { reload } = tableAction
                    // reload()
                    // or
                    // formModel.onlyDeleted = true
                },
            }
        },
    },
    {
        label: '平台发布',
        component: 'Checkbox',
        field: 'isPlatrom',
        defaultValue: false,
        componentProps: ({ schema, tableAction, formActionType, formModel }) => {
            return {
                onChange: (e) => {
                    console.log(e)
                    // const { reload } = tableAction
                    // reload()
                    // or
                    // formModel.onlyDeleted = true
                },
            }
        },
    },
]

export const hasNoneData: FormSchema[] = [
    {
        label: '仅删除数据',
        component: 'Checkbox',
        field: 'onlyDeleted',
        defaultValue: false,
        // slot: 'onlyDeletedSlot',
        // schema: 表单的整个 schemas
        // formActionType: 操作表单的函数。与 useForm 返回的操作函数一致
        // formModel: 表单的双向绑定对象，这个值是响应式的。所以可以方便处理很多操作
        // tableAction: 操作表格的函数，与 useTable 返回的操作函数一致。注意该参数只在表格内开启搜索表单的时候有值，其余情况为null,
        componentProps: ({ schema, tableAction, formActionType, formModel }) => {
            return {
                onChange: (e) => {
                    console.log(e)
                    // const { reload } = tableAction
                    // reload()
                    // or
                    // formModel.onlyDeleted = true
                },
            }
        },
    },
]
