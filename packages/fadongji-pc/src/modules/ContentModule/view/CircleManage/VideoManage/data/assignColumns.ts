import { FormSchema } from '/@/components/Form'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

export const filterFormSchemas: FormSchema[] = [
    {
        field: 'searchTime',
        label: '请选择时间',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            style: {
                width: '100%',
            },
        },
    },

    {
        field: 'nickName',
        component: 'Input',
        label: '评论人信息',
        componentProps: {
            placeholder: '评论人信息',
            onChange: (e) => {
                console.log(e)
            },
        },
    },

]

const commentColumns = [
     {
        title: '评论内容',
        dataIndex: 'comment',
    },
    {
        title: '评论人',
        dataIndex: 'nickName',
        width: '180px',
    },
    {
        title: '回复给',
        dataIndex: 'answerStr',
    },
    {
        title: '评论时间',
        dataIndex: 'createTime',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    },
]
export const commentConfig = {
    commentColumns,
}