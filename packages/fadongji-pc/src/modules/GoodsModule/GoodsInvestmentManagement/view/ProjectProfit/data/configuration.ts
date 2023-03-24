import {FormSchema} from '/@/components/Form'

import {getInvestmentSellerData} from '/@/api/model/dictionaryApi'

export const filterFormSchemas: FormSchema[] = [

  {
    field: 'goodsName',
    component: 'Input',
    label: '项目名称',

    componentProps: {
      placeholder: '请输入项目名称',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'shopId',
    component: 'ApiSearchSelect',
    label: '卖家',
    componentProps: {
      allowClear: true,
      placeholder: '请选择卖家',
      immediate: true,
      api: getInvestmentSellerData,
      resultField: 'data',
    },
  },
  {
    // 0：全部 1：待审核 2：审核不通过 3：待售 4：在售 5：违规下架 6：违规审核 7：已完成
    field: 'type',
    component: 'Select',
    label: '项目状态',
    componentProps: {
      options: [
        {label: "全部", value: 0},
        {label: "待审核", value: 1},
        {label: "审核不通过", value: 2},
        {label: "待售", value: 3},
        {label: "在售", value: 4},
        {label: "违规下架", value: 5},
        {label: "违规审核", value: 6},
        {label: "已完成", value: 7}
      ],
      placeholder: '请选择项目状态',
      onChange: (e) => {
        console.log(e)
      },
    },
  },


]
export const classFormSchemas: FormSchema[] = [
  {
    field: 'userName',
    component: 'Select',
    label: '所属角色',
    componentProps: {
      placeholder: '请选择角色',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'shortName',
    component: 'Select',
    label: '分类名称',

    componentProps: {
      placeholder: '请选择',
      onChange: (e) => {
        console.log(e)
      },
    },
  },


]

/**
 *@desc 改变状态 table Column 配置
 */
export const tableColumns = [
  {
    title: '编码',
    dataIndex: 'code',
    width: 120,
    fixed: 'left',
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    width: 350,
  },
  {
    title: '卖家',
    dataIndex: 'shopName',
    width: 250,
  },
  {
    title: '投资价格',
    dataIndex: 'cashPrice',
    width: 200,
  },
]


// 这是mock 数据以后对接口会删掉
export const MockTableData = [
  {
    id: 29903,
    shortName: '长葛姜天龙',
    status: 1,
    userName: '1568888888',
    shopName: '长葛某某汽修',
    statusStr: '正常',
    checkStatusStr: '已认证',
    logoffStatusStr: '待审核',
    level: 'LV5',
    createTime: '2022-03-28 11:11:11'
  }
];




