import AdminHttp from '/@/utils/http/adminHttp'

// enum Api {
//   Login = '/login',
//   Logout = '/logout',
//   GetUserInfo = '/getUserInfo',
//   GetPermCode = '/getPermCode',
// }

/**
 * @description: user login api
 */
export function loginApi(params) {
  return AdminHttp.$service.apiPost({
    data: params,
    url: `${import.meta.env.VITE_USER_SERVICE_URL}/login`,
    options: {
      noAutoAddDomain: true,
    },
  })
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  // return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export function getPermCode() {
  // return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  // return defHttp.get({ url: Api.Logout })
}
