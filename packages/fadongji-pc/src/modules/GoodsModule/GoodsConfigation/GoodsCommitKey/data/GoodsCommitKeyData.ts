import adminHttp from '/@/utils/http/adminHttp'
import { FormSchema } from '/@/components/Form'
export const getCategoryOptiosFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsCategoryList({ pageSize: 999999 })
      .then((res) => {
        //id: '124582557818945540', name: '空调系统', parentId: '0', hierarchy: '1', sort: 6
        resolve(
          res.data.records.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

export const filterCommitForm: FormSchema[]  = [
  {
    field: 'categoryId',
    label: '商品类别',
    component: 'TreeSelect',
    slot: 'categorySlot',
    colProps: {
      span: 6,
    },
  },
]
