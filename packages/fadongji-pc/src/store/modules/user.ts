import type { UserInfo } from '/#/store'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { RoleEnum } from '/@/enums/roleEnum'
import { PageEnum } from '/@/enums/pageEnum'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { GetUserInfoModel } from '/@/api/sys/model/userModel'
import { loginApi } from '/@/api/sys/user'
import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'
import { router } from '/@/router'
import { usePermissionStore } from '/@/store/modules/permission'
import { RouteRecordRaw } from 'vue-router'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { isArray } from '/@/utils/is'
import { h } from 'vue'
// 缓存 ，此处为清除 缓存的 token Refresh token的内容
import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, VOCEN_USERINFO } from '/@/enums/VoCacheEnum'
import AdminHttp from '/@/utils/http/adminHttp'

// 用户状态
interface UserState {
  // 用户信息
  userInfo: Nullable<UserInfo>
  // token
  token?: string
  // 角色列表
  roleList: RoleEnum[]
  // 登录是否过期
  sessionTimeout?: boolean
  // 最后获取时间
  lastUpdateTime: number
}

// 存储用户状态
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    // 用户信息
    userInfo: null,
    // token
    token: undefined,
    // roleList
    // 角色列表
    roleList: [],
    // Whether the login expired
    // 登录是否过期
    sessionTimeout: false,
    // Last fetch time
    // 最后获取时间
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '' // for null or undefined value
      setAuthCache(TOKEN_KEY, info)
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setUserInfo(info: any | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    /**
     * @description: login
     */
    async login(params): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, ...loginParams } = params
        const { data, code } = await loginApi(loginParams)
        if (+code === 20001 && data) {
          const { access_token } = data
          storage.set(ACCESS_TOKEN_KEY, data.access_token)
          storage.set(REFRESH_TOKEN_KEY, data.refresh_token)
          storage.set(VOCEN_USERINFO, data)

          // 登录之后，默认获取用户信息 并存储到本地
          // save token
          this.setToken(access_token)
          return this.afterLoginAction(goHome)
        }
        return null
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean) {
      if (!this.getToken) return null
      // get user info
      const userInfo = await this.getUserInfoAction()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
          permissionStore.setDynamicAddedRoute(true)
        }
        // 跳转默认页面-待办
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
        if (!goHome) {
          // 兼容登录后返回到上一次页面
          router.currentRoute.value.path !== '/' && router.go(0)
        }
      }
      return userInfo
    },

    // 获取用户信息
    async getUserInfoAction(): Promise<any | null> {
      if (!this.getToken) return null
      const loginInfo = storage.get(VOCEN_USERINFO) ? JSON.parse(storage.get(VOCEN_USERINFO)) : null
      if (!loginInfo) return null
      const { data } = await AdminHttp.USER.userInfoOpDetail({
        userId: loginInfo.id,
      })
      const userInfo = data
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map((item: any) => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout() {
      AdminHttp.$service
        .apiGet({
          //'http://devgate.vocen.com.cn/
          url: `${import.meta.env.VITE_USER_SERVICE_URL}/logoff`,
          options: {
            noAutoAddDomain: true,
          },
        })
        .then(() => {
          storage.remove(ACCESS_TOKEN_KEY)
          storage.remove(REFRESH_TOKEN_KEY)
          this.resetState()
          router.replace(PageEnum.BASE_LOGIN)
        })
        .catch((error) => {
          console.warn(error)
          // console.log('error==', error)
          storage.remove(ACCESS_TOKEN_KEY)
          storage.remove(REFRESH_TOKEN_KEY)
          router.replace(PageEnum.BASE_LOGIN)
        })

      // AdminHttp.logoff()
      //   .then((res) => {
      //     storage.remove(ACCESS_TOKEN_KEY)
      //     storage.remove(REFRESH_TOKEN_KEY)
      //     router.replace(PageEnum.BASE_LOGIN)
      //   })
      //   .catch((error) => {
      //     console.log('error==', error)
      //   })
      // console.log(goLogin)
      // storage.remove(ACCESS_TOKEN_KEY)
      // storage.remove(REFRESH_TOKEN_KEY)
      // const loginOut = {
      //   Authorization:
      // }
      // globInstance?.$VoHttp.login(userInfos).then((res) => {
      //   storage.remove(ACCESS_TOKEN_KEY)
      //   storage.remove(REFRESH_TOKEN_KEY)
      // })

      // if (this.getToken) {
      //   try {
      //     await doLogout()
      //   } catch {
      //     console.log('注销Token失败')
      //   }
      // }
      // this.setToken(undefined)
      // this.setSessionTimeout(false)
      // this.setUserInfo(null)
      // goLogin && router.push(PageEnum.BASE_LOGIN)
      // await router.replace(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout()
        },
      })
    },
  },
})

// Need to be used outside the setup
// 需要在设置之外使用
export function useUserStoreWithOut() {
  return useUserStore(store)
}
