import { storage,VoHttp } from '@/common/unifyGlobalReg.js'

/**
 * 基本数据，用来存储变量
 * @type {{roleArr: null}}
 */
const state = {
  roleArr: [{"roleCode":"supplier","roleName":"供应商","url":null,"licenseId":"133960256299597825"},{"roleCode":"agent","roleName":"服务商","url":null,"licenseId":"133960256299597825"},{"roleCode":"garage","roleName":"修理厂","url":null,"licenseId":"133960256299597825"},{"roleCode":"investmentManager","roleName":"招商经理","url":null,"licenseId":"133960256299597825"},{"roleCode":"channelManager","roleName":"渠道经理","url":null,"licenseId":"133960256299597825"},{"roleCode":"skilledWorker","roleName":"集师傅","url":null,"licenseId":"133960256299597825"},{"roleCode":"recycling","roleName":"回收公司","url":null,"licenseId":"133960256299597825"},{"roleCode":"oldMachine","roleName":"旧机买家","url":null,"licenseId":"133960256299597825"}],
}
/**
 * 函数，更改state，同步操作
 * @type {{SET_ROLEARR(*, *=): void}}
 */
const mutations = {
  SET_ROLEARR(state, value) {
    state.roleArr = value
    storage.set('roleArr', value)
  },
}
/**
 * 函数，提交mutation，异步操作
 * @type {{setRoleArr({commit: *, state: *}, *=): Promise<void>}}
 */
const actions = {
  async setRoleArr({ commit, state }, data) {
    commit('SET_ROLEARR', data)
  },
  async getRoleArr({ commit, state },opts ={isOnLine:0}) {
    let roleArr=state.roleArr || storage.get('roleArr')
    if(!roleArr||opts.isOnLine===1){
      roleArr=await  VoHttp.role({},{noLoading:true, noError: true}).then(res=>res.data)
    }
    commit('SET_ROLEARR', roleArr)
    return roleArr
  },
}
/**
 * state的计算属性
 * @type {{roleArrGetter: (function(*))}}
 */
const getters = {
  roleArrGetter: (state) => {
    return state.roleArr || storage.get('roleArr')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
