import { defHttp } from '/@/utils/http'
import { getMenuListResultModel } from './model/menuModel'

enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.apiGet<getMenuListResultModel>({ url: Api.GetMenuList })
}
