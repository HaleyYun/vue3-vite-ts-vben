import {FormSchema} from "/@/components/Form";
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

export const filterAssociatedForm: FormSchema[] = [
    {
        field: 'companyName',
        component: 'Input',
        label: '修理厂信息',
        componentProps: {
            placeholder: '名称/手机号',
        },
    },
    {
        label: '所属地区',
        field: 'areaCode',
        component: 'ApiCascader',
        componentProps: ()=> {
            return {
                api: CascaderDataApi,
                resultField: 'data',
                placeholder: '所属地区',
                fieldNames: {
                    children: 'children',
                    label: 'name',
                    value: 'id',
                },
                isLeaf: (record) => {
                    return !record.children
                },

            }

        },
    },
    {
        label: '注册时间',
        field: 'searchTime',
        component: 'RangePicker',
        componentProps: {
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
    {
        field: 'checkStatus',
        component: 'Select',
        label: '认证状态',
        componentProps: {
          placeholder: '请选择',
          // 这个需要改，这块需要认证状态
          options:[
            {label:'未认证',value:0},
            {label:'待审核',value:1},
            {label:'已认证',value:4},
            {label:'审核拒绝',value:5}
          ],
        },
    },
];
export const agentTableColumn = [
    {
        title: '修理厂名称',
        dataIndex: 'storeName',
    },
    {
        title: '负责人手机号',
        dataIndex: 'contractPhone',
    },
    {
        title: '所属地区',
        dataIndex: 'areaCodeStr',
    },
    {
        title: '注册时间',
        dataIndex: 'createTime',
    },
    {
        title: '注册认证状态',
        dataIndex: 'checkStatusStr',
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 250
    },
];
