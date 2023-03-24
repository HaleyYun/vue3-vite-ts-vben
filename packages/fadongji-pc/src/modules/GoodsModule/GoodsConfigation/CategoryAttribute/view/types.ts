export interface DataItem {
  key: number
  name: string
  age: number
  address: string
  children?: DataItem[]
}

export interface attributeDataItem {
  code?: string
  categoryId?: string
  id?: string
  isEnable?: string | boolean
  categoryName?: string
  name?: string
  type?: string
  unit?: string
  value?: string[] | string
  children?: attributeDataItem[]
  hierarchy?: string | number
  isInUse?: boolean
}
