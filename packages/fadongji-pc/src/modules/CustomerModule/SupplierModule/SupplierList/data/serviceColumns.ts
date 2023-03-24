import { FormSchema } from '/@/components/Form'


export const filterFormSchemas: FormSchema[] = [
    {
        field: 'storeName',
        label: '店铺名称',
        component: 'Input',
        componentProps: {
            placeholder: '输入店铺名称查询',
            onChange: (e) => {
                console.log(e)
            },
        },
    },

    {
        field: 'realName',
        component: 'Input',
        label: '姓名',
        componentProps: {
            placeholder: '输入姓名查询',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'phoneNumber',
        component: 'Input',
        label: '手机号',
        componentProps: {
            placeholder: '输入手机号查询',
            onChange: (e) => {
                console.log(e)
            },
        },
    },

]

const commentColumns = [
     {
        title: '序号',
        dataIndex: 'index',
    },
    {
        title: '店铺名称',
        dataIndex: 'storeName',
        width: '180px',
    },
    {
        title: '姓名',
        dataIndex: 'realName',
    },
    {
        title: '手机号',
        dataIndex: 'userName',
    },
    {
        title: '所在地区',
        dataIndex: 'areaCodeStr',
    },
]
export const commentConfig = {
    commentColumns,
}