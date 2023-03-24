import {FormSchema} from '/@/components/Form'
import {AreaDataApi} from '/@/api/model/dictionaryApi'


export const filterFormSchemas: FormSchema[] = [
  {
    field: 'companyName',
    component: 'Input',
    label: '供应商名称',
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
    label: '供应商手机号',
    componentProps: {
      placeholder: '手机号',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'searchTime',
    label: '注册时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      }
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


];


export const tableColumns = [
  {
    title: '供应商名称',
    dataIndex: 'companyName',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'userName',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '地区',
    dataIndex: 'areaCodeStr',
    width: '120px',
    ellipsis: true,
  },
  {
    title: '认证状态',
    dataIndex: 'checkStatusStr',
    width: '100px',
    ellipsis: true,
  },
  {
    title: '店铺名称',
    dataIndex: 'storeName',
    width: '120px',

  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
  },
];

// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    name: '长葛姜天龙',
    status: 1,
    phone: '1568888888',
    area: '河南省郑州市',
    mainStatus: 1,
    certificationstatusStr: '未认证',
    operationsManager: '1',
    specificNumber: '11',
    storeNumber: '111',
    label: '一级',
    createTime: '2022-03-28 11:11:11'


  }
];
