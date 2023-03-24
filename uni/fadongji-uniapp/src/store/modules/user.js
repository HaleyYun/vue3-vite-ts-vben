import { storage } from '@/common/unifyGlobalReg.js'
import { VoHttp, vocenApi } from '../../common/unifyGlobalReg'

const getUserProfileInfoFunc = () => {
    return new Promise((resolve) => {
        VoHttp.USER.getUserProfileInfo({}, { noLoading: true })
          .then((res) => {
              if (res&&!vocenApi.VoUtils.checkIsEmpty(res.data)) {
                  resolve(res.data)
              }
              resolve({})
          })
          .catch((err) => {
              resolve({})
          })
    })
}

/**
 * 基本数据，用来存储变量
 * @type {{userInfo: null}}
 */
const state = {
    extInfo: {}, //额外属性
    userInfo: null,
}
/**
 * 函数，更改state，同步操作
 * @type {{SET_USERINFO(*, *=): void}}
 */
const mutations = {
    SET_EXT_INFO(state, value) {
        if (!vocenApi.VoUtils.checkIsEmpty(value)) {
            state.extInfo = value
            storage.set('userExtInfo', value)
        } else {
            state.extInfo = value
            storage.remove('userExtInfo')
        }
    },
    SET_USERINFOITEM(state, value) {
        const keysArr = Object.keys(value)

        let userInfo = storage.get('userInfo')
        keysArr.map((item) => {
            userInfo[item] = value[item]
        })
        state.userInfo = userInfo
        storage.set('userInfo', userInfo)
        if (userInfo && userInfo.access_token) {
            storage.set('access_token', userInfo.access_token)
            storage.set('refresh_token', userInfo.refresh_token)
        } else {
            storage.remove('access_token')
            storage.remove('refresh_token')
        }
    },
    SET_USERINFO(state, value) {
        state.userInfo = value
        storage.set('userInfo', value)
        if (value && value.access_token) {
            storage.set('access_token', value.access_token)
            storage.set('refresh_token', value.refresh_token)
        } else {
            storage.remove('access_token')
            storage.remove('refresh_token')
        }
    },
}
/**
 * 函数，提交mutation，异步操作
 * @type {{setUseInfo({commit: *, state: *}, *=): Promise<void>}}
 */
const actions = {
    // 更新某个
    async setUseInfoItem({ commit, state }, data) {
        commit('SET_USERINFOITEM', data)
        //登录或者刷新了用户状态
        if (!data || !data.access_token) {
            commit('SET_EXT_INFO', null)
        }
    },
    // 更新全部
    async setUseInfo({ commit, state }, data) {
        let roleCode=storage.get('last_role')||null
        if(state.userInfo&&state.userInfo.roleCode){
             roleCode=state.userInfo.roleCode

        }

        commit('SET_USERINFO', data)
        if (roleCode) {
            storage.set('last_role', roleCode)
        }
        //登录或者刷新了用户状态
        if (!data || !data.access_token) {
            commit('SET_EXT_INFO', null)
        }
    },
    /**
     * 获取基础信息与额外信息的合集
     * @return {Promise<void>}
     */
    async getFullUserInfo({ commit, state }) {
        let accountInfo = state.userInfo || storage.get('userInfo')
        if (vocenApi.VoUtils.checkIsEmpty(accountInfo)) accountInfo = {}
        const extInfo = await getUserProfileInfoFunc()
        const resultInfoData=Object.assign({}, accountInfo, extInfo)
        commit('SET_USERINFO', resultInfoData)
        return resultInfoData
    },
    async getUserExtInfo({ commit, state }) {
        const extInfo = await getUserProfileInfoFunc()
        commit('SET_EXT_INFO', res.data)
        return extInfo
    },
}
/**
 * state的计算属性
 * @type {{userInfoGetter: (function(*))}}
 */
const getters = {
    getUserInfo: (state) => () => {
        try {
            // 第一次是在内存里
            const data = state.userInfo || storage.get('userInfo')
            if (!data || typeof data !== 'object') throw Error('获取用户信息失败')
            return data
        } catch (e) {
            return {}
        }
    },
    userInfoGetter: (state) => {
        return state.userInfo || storage.get('userInfo')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
