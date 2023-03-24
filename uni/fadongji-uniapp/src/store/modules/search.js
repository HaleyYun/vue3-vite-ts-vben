import { storage, VoHttp } from '@/common/unifyGlobalReg.js'
const state = {
    searchGoodsResult: '',
    modelInformation: '',
    searchPostSaleResult: '',
}
const mutations = {
    SET_SEARCH_GOODS_RESULT(state, value) {
        storage.set('searchGoodsResult', value)
        state.searchGoodsResult = value
    },
    SET_MODEL_INFORMATION(state, value) {
        storage.set('modelInformation', value)
        state.modelInformation = value
    },
    SET_POST_SALE_RESULT(state, value) {
        storage.set('searchPostSaleResult', value)
        state.searchPostSaleResult = value
    },
}

const getters = {
    searchGoodsResultGetter: (state) => {
        return state.searchGoodsResult || storage.get('searchGoodsResult')
    },
    modelInformationGetter: (state) => {
        return state.modelInformation || storage.get('modelInformation')
    },
    searchPostSaleResultGetter: (state) => {
        return state.searchPostSaleResult || storage.get('searchPostSaleResult')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}
