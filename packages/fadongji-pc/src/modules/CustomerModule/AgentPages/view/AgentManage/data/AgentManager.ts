import { FormSchema } from '/@/components/Form'
import { sourceList } from '/@/utils/dict'
import { CascaderDataApi } from '/@/modules/CustomerModule/Garage/view/GarageList/view/data/GarageListApi'

export const filterAgentForm: FormSchema[] = [
  {
    field: 'storeName',
    component: 'Input',
    label: '店铺名称',
    componentProps: {
      placeholder: '请输入店铺名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'shortName',
    component: 'Input',
    label: '服务商名称',
    componentProps: {
      placeholder: '请输入服务商名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '服务商手机号',
    componentProps: {
      placeholder: '请输入服务商手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    label: '所属地区',
    field: 'areaCode',
    component: 'ApiCascader',
    componentProps: {
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
    },
  },
  // {
  //     field: 'source',
  //     component: 'Select',
  //     label: '服务商等级',
  //     colProps: {
  //         span: 6,
  //     },
  //     componentProps: {
  //         placeholder: '请选择用户来源',
  //         options: [
  //             {
  //                 label: '意见',
  //                 value: '1',
  //             },
  //             {
  //                 label: '质量问题',
  //                 value: '2',
  //             },
  //         ],
  //     },
  // },
  {
    label: '注册时间',
    field: 'searchTime',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'terminalSource',
    component: 'Select',
    label: '用户来源',
    componentProps: {
      placeholder: '请选择用户来源',
      options: sourceList,
    },
  },
]
export const agentTableColumn = [
  {
    title: '服务商名称',
    dataIndex: 'fullName',
    width: '200px',
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    width: '150px',
  },
  {
    title: '所在地区',
    dataIndex: 'areaStr',
    width: '150px',
  },
  {
    title: '店铺状态',
    dataIndex: 'statusStr',
    width: '150px',
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
    width: '150px',
  },
  {
    title: '店铺名称',
    dataIndex: 'storeName',
    width: '200px',
  },
  {
    title: '渠道经理',
    dataIndex: 'channelManagerName',
    width: '150px',
  },
  {
    title: '推广扩客功能',
    dataIndex: 'showStatus',
    width: '150px',
  },
  // {
  //     title: '等级',
  //     dataIndex: 'level',
  // },
  {
    title: '关联修理厂',
    dataIndex: 'garageNum',
    width: '180px',
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: '250px',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    fixed: 'right',
  },
]
