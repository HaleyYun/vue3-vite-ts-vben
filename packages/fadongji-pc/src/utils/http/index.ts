// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged
import { ContentTypeEnum } from '/@/enums/httpEnum'
import HttpHooks from '/@/utils/http/src/httpHooks'
import { CreateAxiosOptions } from '/@/utils/http/types'
import Request from '/@/utils/http/lib/Request'
import { deepMerge } from '/@/utils'
import { useGlobSetting } from '/@/hooks/setting'

const globSetting = useGlobSetting()

const defaultConfig = {
  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
  // authentication schemes，e.g: Bearer
  // authenticationScheme: 'Bearer',
  authenticationScheme: '',
  timeout: 100 * 1000,
  // 基础接口地址
  // baseURL: globSetting.apiUrl,

  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // 如果是form-data格式
  // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
  // 数据处理方式
  transform: HttpHooks,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: 'none',
    // 接口地址
    apiUrl: globSetting.apiUrl,
    // 接口拼接地址
    urlPrefix: globSetting.urlPrefix,
    //  是否加入时间戳
    joinTime: true,
    // 忽略重复请求
    ignoreCancelToken: true,
    // 是否携带token
    withToken: true,
  },
}

function createHttpInstance(opt?: Partial<CreateAxiosOptions>) {
  const mergeConfigs = deepMerge(defaultConfig, opt || {})
  return new Request(mergeConfigs)
}

export const defHttp = createHttpInstance()
