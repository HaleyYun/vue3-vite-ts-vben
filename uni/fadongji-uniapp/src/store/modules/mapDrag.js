import { storage } from '@/common/unifyGlobalReg.js'
import { getLocation } from '@/common/helper'

/**
 * 基本数据，用来存储变量
 * @type {{roleArr: null}}
 */
const state = {
  mapData: null,
  locationInfo: null,
}
/**
 * 函数，更改state，同步操作
 * @type {{SET_MAP(*, *=): void}}
 */
const mutations = {
  SET_MAP(state, value) {
    state.mapData = value
    storage.set('mapData', value)
  },
  SET_LOCATION(state, value) {
    state.locationInfo = value
  },
}
/**
 * 函数，提交mutation，异步操作
 * @type {{setMapData({commit: *, state: *}, *=): void}}
 */
const actions = {
  async setMapData({ commit, state }, data) {
    commit('SET_MAP', data)
  },
  async setLocation({ commit, state }, data) {
    console.log(data)
    commit('SET_LOCATION', data)
  },
}
/**
 * state的计算属性
 * @type {{roleArrGetter: (function(*))}}
 */
const getters = {
  mapData: (state) => {
    return state.mapData
  },
  getLocationInfo: (state) => {
    return state.locationInfo
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
