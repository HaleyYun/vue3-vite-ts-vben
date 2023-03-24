import { storage } from '@/common/unifyGlobalReg.js'

// 基本数据，用来存储变量
const state = {
  appTheme: 'blue',
}
// 函数，更改state，同步操作
const mutations = {
  TOGGLE_APP_THEME(state, color = 'blue') {
    //你可以传入一个颜色参数(需要上面公共css中含有,如果不传入默认为粉色)
    state.appTheme = color
    storage.set('appTheme', color)
  },
}
// 函数，提交mutation，异步操作
const actions = {
  async toggleAppTheme({ commit, state }, data) {
    commit('TOGGLE_APP_THEME', data)
  },
}
// state的计算属性
const getters = {
  /**
   *
   * @param state
   * @returns {string|*}
   */
  appThemeGetter: (state) => {
    return state.appTheme || storage.get('appTheme')
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
