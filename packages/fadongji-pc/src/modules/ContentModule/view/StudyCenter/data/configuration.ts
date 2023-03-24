import { FormSchema } from '/@/components/Form'
import { classificationEvent } from '/@/modules/ContentModule/view/StudyCenter/data/StudyCenterApi'

export const filterFormSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '课程标题',
    componentProps: {
      placeholder: '请输入课程标题搜索',
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  // 所属角色，supplier=供应商；agent=服务商；garage=修理厂；op=运营平台
  {
    field: 'platformCode',
    component: 'Select',
    label: '所属角色',
    componentProps: {
      placeholder: '请选择所属角色',
      options: [
        {
          label: '供应商',
          value: 'supplier',
        },
        {
          label: '服务商',
          value: 'agent',
        },
        {
          label: '修理厂',
          value: 'garage',
        },
        {
          label: '集师傅',
          value: 'skilledWorker',
        },
      ],
    },
  },
  {
    field: 'categoryId',
    component: 'ApiSelect',
    label: '分类名称',
    componentProps: {
      placeholder: '请选择',
      api: classificationEvent,
      onChange: (e) => {
        console.log(e)
      },
    },
  },
  {
    field: 'type',
    component: 'Select',
    label: '内容选择',

    componentProps: {
      placeholder: '请选择',
      options: [
        {
          label: '图文',
          value: 1,
        },
        {
          label: '视频',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'searchTime',
    label: '修改时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
      style: {
        width: '100%',
      },
    },
  },
]

/**
 *@desc 改变状态 table Column 配置
 */

export const tableColumns = [
  {
    title: '课程标题',
    dataIndex: 'name',
    width: '250px',
  },
  {
    title: '所属角色',
    dataIndex: 'platformCode',
    width: '100px',
  },
  {
    title: '分类',
    dataIndex: 'categoryName',
    width: '250px',
  },
  {
    title: '内容类型',
    dataIndex: 'type',
    width: '100px',
  },
  {
    title: '是否启用',
    dataIndex: 'isEnable',
    width: '100px',
  },
  {
    title: '是否精选',
    dataIndex: 'isRecommend',
    width: '100px',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    width: '180px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '150px',
    fixed: 'right',
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
    createTime: '2022-03-28 11:11:11',
  },
]
//分类管理
export const Classification = [
  {
    title: '所属角色',
    dataIndex: 'platformCode',
    width: '120px',
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    width: '250px',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: '120px',
  },
  {
    title: '是否启用',
    dataIndex: 'isEnable',
    width: '100px',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '160px',
  },
]
