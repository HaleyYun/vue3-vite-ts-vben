import { reactive, ref } from 'vue'
import { FormSchema } from '/@/components/Form'
import { motorcycleTypeList, motorcycleTypeListMap, motorcycleSeriesList, motorcycleModelList, motorcycleEngineList, motorcycleFuelList, displacementList, inductionList, powerKwList, yearList, emissionStandardList } from '/@/api/data/ModelFormApis'
import { any, object } from 'vue-types'

const baseColumns = ref<any>([])
const dataKey = {
  brandList: 'brand',
  displacementList: 'displacement',
  emissionStandardList: 'emissionStandard',
  engineModelList: 'engineModel',
  fuelTypeList: 'fuelType',
  inductionList: 'induction',
  modelList: 'model',
  powerKwList: 'powerKw',
  seriesList: 'series',
  transmissionTypeList: 'transmissionType',
  yearList: 'year',
}
// resettingTypeList()
// 重置
const queryParams = ref({})

const changeQuery = (key, value) => {
  if (!value) return
  queryParams.value[key] = value
  initData()
}
const initData = () => {
  motorcycleTypeListMap(queryParams.value).then((res) => {
    baseColumns.value = [
      {
        label: '品牌',
        field: 'brand',
        component: 'ApiSearchSelect',
        componentProps: () => {  
                  
          return {           
            api: motorcycleTypeList,
            // options: res.brandList,
            placeholder: '请选择',
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('brand', e)
            },
            style:{
              width:'100%'
            }
          }
          
        },
      },
      {
        field: 'series',
        component: 'ApiSearchSelect',
        label: '车系',
        componentProps: () => {
          return {
            api: motorcycleSeriesList,
            placeholder: '请选择',
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('series', e)
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'model',
        component: 'ApiSearchSelect',
        label: '车型',
        componentProps: () => {
          return {
            api: motorcycleModelList,
            placeholder: '请选择',
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('model', e)
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'engineModel',
        component: 'ApiSearchSelect',
        label: '发动机型号',
        componentProps: () => {
          return {
            api: motorcycleEngineList,
            placeholder: '请选择',
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('engineModel', e)
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'fuelType',
        component: 'ApiSearchSelect',
        label: '燃油类型',
        componentProps: () => {
          return {
            api: motorcycleFuelList,
            placeholder: '请选择',
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('fuelType', e)
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'displacement',
        component: 'ApiSearchSelect',
        label: '排量',
        componentProps: () => {
          return {
            api: displacementList,
            placeholder: '请选择',
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('displacement', e)
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'induction',
        component: 'ApiSearchSelect',
        label: '进气形式',
        componentProps: ({ formActionType, formModel }) => {
          return {
            api: inductionList,
            placeholder: '请选择',
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('induction', e)
              if (e) {
                const target = e
                const ret: any = await motorcycleTypeListMap({ induction: target })
                const { updateSchema } = formActionType
                Object.keys(dataKey).forEach((key) => {
                  updateSchema({
                    field: dataKey[key],
                    componentProps: {
                      options: ret[key],
                    },
                  })
                })
              }
    
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'powerKw',
        component: 'ApiSearchSelect',
        label: '功率',
        componentProps: () => {
          return {
            api: powerKwList,
            // immediate: false,
            // options: res.powerKwList,
            placeholder: '请选择',
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('powerKw', e)
              
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'year',
        component: 'ApiSearchSelect',
        label: '年款',
        componentProps: () => {
          return {
            api: yearList,
            // options: res.yearList,
            // immediate: false,
            placeholder: '请选择',
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('year', e)
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'emissionStandard',
        component: 'ApiSearchSelect',
        label: '排放标准',
        componentProps: () => {
          return {
            placeholder: '请选择',
            // options: res.emissionStandardList,
            api: emissionStandardList,
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('emissionStandard', e)
            },
            style:{
              width:'100%'
            }
          }
        },
      },
      {
        field: 'transmissionType',
        component: 'ApiSearchSelect',
        label: '变速器类型',
        componentProps: () => {
          return {
            placeholder: '请选择',
            showSearch:false,
            options: res.transmissionTypeList,
            // api: transmissionTypeList,
            // immediate: false,
            onChange: async (e: any) => {
              if (e === undefined) {
                resettingTypeList()
              }
              changeQuery('transmissionType', e)
            },
          }
        },
      },

      {
        field: 'correlationFlag',
        component: 'Select',
        label: '是否关联型号',
        componentProps: {
          options: [
            {
              label: '是',
              value: '1',
              key: '1',
            },
            {
              label: '否',
              value: '0',
              key: '0',
            },
          ],
        },
      },
    ]
  })
}
export const resettingTypeList = () => {
  queryParams.value = {}
  initData()
}
resettingTypeList()

const accessColumns: FormSchema[] = []

const rejectColumns: FormSchema[] = [
  {
    label: '仅删除数据',
    component: 'Checkbox',
    field: 'isDeleted',
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
// code: "100011"
// createTime: "2022-05-27 10:22:56"
// creator: "1"
// id: "125270718630985212"
// isEnable: false
// isHot: false
// licenseId: "1212"
// logoUrl: "url"
// name: "阿迪达斯"
// updateTime: "2022-05-27 10:22:56"
const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'levelid',
    width: '130px',
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    width: '120px',
  },
  {
    title: '车系',
    dataIndex: 'series',
    width: '180px',
  },

  {
    title: '年款',
    dataIndex: 'year',
    width: '65px',
  },
  {
    title: '驱动方式',
    dataIndex: 'driveMode',
    width: '90px',
  },
  {
    title: '排放标准',
    dataIndex: 'emissionStandard',
    width: '90px',
  },
  {
    title: '发动机型号',
    dataIndex: 'engineModel',
    width: '120px',
  },
  {
    title: '排量(L)',
    dataIndex: 'displacement',
    width: '80px',
  },
  {
    title: '变速器类型',
    dataIndex: 'transmissionType',
    width: '120px',
  },
  {
    title: '车型',
    dataIndex: 'model',
    width: '100px',
  },
  {
    title: '燃油类型',
    dataIndex: 'fuelType',
    width: '100px',
  },
  {
    title: '功率(kw)',
    dataIndex: 'powerKw',
    width: '100px',
  },
  {
    title: '进气方式',
    dataIndex: 'induction',
    width: '100px',
  },
  {
    title: '车型关联商品数量',
    dataIndex: 'goodsNumber',
    width: '150px',
  },
  {
    title: '关联型号',
    dataIndex: 'modelCorrelation',
    width: '100px',
    // fixed: 'right',
  },
  // {
  //   title: '随车备注',
  //   dataIndex: 'remark',
  //   width: 120,
  //   fixed: 'right',
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '65px',
    // fixed: 'right',
  },
  //   field: 'brand',
  //   component: 'ApiSearchSelect',
  //   label: '品牌',
  //   componentProps: {
  //     api: motorcycleTypeList,
  //     placeholder: '请选择',
  //     onChange: (e) => {
  //       console.log(e)
  //     },
  //   },
  // },
]

export const containerConfig = {
  tableColumns,
}

export const filterFormConfig = {
  baseColumns,
  accessColumns,
  rejectColumns,
}
