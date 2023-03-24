import {FormSchema} from '/@/components/Form'
import {AreaDataApi} from '/@/api/model/dictionaryApi'

// 修理厂拓客
export const filterFormSchemas: FormSchema[] = [
  {
    field: 'keywords',
    component: 'Input',
    label: '修理厂信息',
    componentProps: {
      placeholder: '修理厂ID/账号/名称/手机号',
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
    // 认证状态（0-未认证；1-待审核；4-已认证；5-审核拒绝
    field: 'checkStatus',
    component: 'Select',
    label: '认证状态',
    componentProps: {
      options:[
        {label:'未认证',value:0},
        {label:'待审核',value:1},
        {label:'已认证',value:4},
        {label:'审核拒绝',value:5}
      ],
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },



];


export const tableColumns = [
  {
    title: '修理厂ID' ,
    dataIndex: 'id',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '修理厂信息',
    dataIndex: 'info',
    ellipsis: true,
    width: '120px',
  },
  {
    title: '所属地区',
    dataIndex: 'areaCodeStr',
    width: '120px',
    ellipsis: true,
  },
  // {
  //   title: '等级',
  //   dataIndex: 'level',
  //   width: '120px',
  //
  // },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: '180px',
    ellipsis: true,
  },
  {
    title: '注册认证状态',
    dataIndex: 'checkStatusStr',
    width: '100px',
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
    id:29903,
    name: '长葛姜天龙',
    status: 1,
    phone: '1568888888',
    shopName:'长葛某某汽修',
    certification_status:'未认证',
    area: '河南省-郑州市-金水区',
    level: 'LV5',
    createTime: '2022-03-28 11:11:11'
  }
];
