import { FormSchema } from '/@/components/Form'
import { AreaDataApi } from '/@/api/model/dictionaryApi'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'realName',
    component: 'Input',
    label: '集师傅名称',
    componentProps: {
      placeholder: '名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '集师傅手机号',
    componentProps: {
      placeholder: '手机号',
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
      api: AreaDataApi,
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
  //     field: 'level',
  //     component: 'ApiSelect',
  //     label: '集师傅等级',
  //     componentProps: {
  //         options:[],
  //         placeholder: '请选择等级',
  //         onChange: (e) => {
  //             console.log(e)
  //         },
  //     },
  // },
  {
    field: 'searchTime',
    label: '注册时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
  {
    field: 'source',
    component: 'Select',
    label: '渠道类型',
    componentProps: {
      options: [
        { label: 'APP注册', value: '1' },
        { label: 'H5邀请', value: '2' },
        { label: '运营添加', value: '3' },
      ],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
]

export const tableColumns = [
  {
    title: '注册手机号',
    dataIndex: 'userName',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '接单资质',
    dataIndex: 'qualify',
    ellipsis: true,
    width: '150px',
  },
  {
    title: '推广扩客功能',
    dataIndex: 'showStatus',
    width: '150px',
  },
  {
    title: '集师傅拓客',
    dataIndex: 'skilledWorkerNum',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '修理厂拓客',
    dataIndex: 'garageNum',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '集师傅手机号',
    dataIndex: 'userName',
    width: '150px',
  },
  {
    title: '集师傅名称',
    dataIndex: 'realName',
    width: '120px',
    ellipsis: true,
  },
  // {
  //   title: '集师傅等级',
  //   dataIndex: 'level',
  //   width: '120px',
  //   ellipsis: true,
  // },
  {
    title: '所在地区',
    dataIndex: 'areaCodeStr',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '主修车系',
    dataIndex: 'carSeriesStr',
    width: '150px',
    ellipsis: true,
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: '200px',
    ellipsis: true,
  },
  {
    title: '渠道类型',
    dataIndex: 'sourceStr',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '渠道',
    dataIndex: 'inviteUserName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
]

// 这是mock 数据以后对接口会删掉
export const mockTableData = [
  {
    id: 1,
    registeredPhone: '15738839332',
    qualification: '安装|回收|售后',
    technicalWorkersTalk: 10,
    repair_shop_customer: 10,
    status: 1,
    phone: '1568888888',
    name: '张三',
    label: 10,
    address: '河南省郑州市',
    majorCars: '德系',
    mainStatus: 1,
    channelType: 'App注册',
    channel: '李海',
    createTime: '2022-03-28 11:11:11',
  },
  {
    id: 1,
    registeredPhone: '15738839332',
    qualification: '安装|回收|售后',
    technicalWorkersTalk: 10,
    repair_shop_customer: 10,
    status: 3,
    phone: '1568888888',
    name: '张三',
    label: 10,
    address: '河南省郑州市',
    majorCars: '德系',
    mainStatus: 1,
    channelType: 'App注册',
    channel: '李海',
    createTime: '2022-03-28 11:11:11',
  },
  {
    id: 1,
    registeredPhone: '15738839332',
    qualification: '安装|回收|售后',
    technicalWorkersTalk: 10,
    repair_shop_customer: 10,
    status: 5,
    phone: '1568888888',
    name: '张三',
    label: 10,
    address: '河南省郑州市',
    majorCars: '德系',
    mainStatus: 1,
    channelType: 'App注册',
    channel: '李海',
    createTime: '2022-03-28 11:11:11',
  },
]
