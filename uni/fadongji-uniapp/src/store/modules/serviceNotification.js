/* eslint-disable prettier/prettier */
import { storage, VoHttp } from '@/common/unifyGlobalReg.js'
const state = {
    missMessage: {
        interactCount: 0, //互动消息数量(点赞收藏)
        logisticsCount: 0, //交易物流数量
        noticeCount: 0, //服务通知数量
        announcementCount: 0,
    },
    messageList: {
        noticeList: { total: 0, list: [], loading: false, pages: { pageNo: 1, pageSize: 20 } }, //服务通知列表
        commentList: { total: 0, list: [], loading: false, pages: { pageNo: 1, pageSize: 20 } }, //评论列表
        collectList: { total: 0, list: [], loading: false, pages: { pageNo: 1, pageSize: 20 } }, //点赞收藏列表
        logisticsList: { total: 0, list: [], loading: false, pages: { pageNo: 1, pageSize: 20 } }, //交易物流列表
        announcementList: { total: 0, list: [], loading: false, pages: { pageNo: 1, pageSize: 20 } }, //公告列表
        attentionList: { total: 0, list: [], loading: false, pages: { pageNo: 1, pageSize: 20 } }, //新增关注列表
    },
}
const mutations = {
    SET_MISS_MESSAGE(state, value) {
        state.missMessage = value
    },
    SET_MESSAGE_LIST(state, value) {
        state.messageList[value.key].total = value.total
        if (state.messageList[value.key].pageNo == 1) {
            state.messageList[value.key].list = value.list
            return
        }
        if (state.messageList[value.key].list.length < value.total) {
            state.messageList[value.key].list.push(...value.list)
        }
    },
    SET_MESSAGE_List_LOADING(state, value) {
        state.messageList[value.key].loading = value.loading
    },
    SET_MESSAGE_List_PAGE_NO(state, value) {
        state.messageList[value.key].pages.pageNo = value.pageNo

        if (value.pageNo == 1) {
            state.messageList[value.key].list = []
        }
    },
}

const getters = {
    getMissMessageCount: (state) => {
        return Object.values(state.missMessage).reduce((pre, cur) => pre + cur, 0)
    },
    getMessageCountList: (state) => {
        return state.missMessage
    },
    getMessageList: (state) => {
        return state.messageList
    },
}
const actions = {
    reqMissMessageCount({ commit }) {
        VoHttp.apiContentMessageLogCount({},{noLoading:true}).then((res) => {
            commit('SET_MISS_MESSAGE', res.data)
        })
    },
    reqNoticeList({ commit }, refresh) {
        commit('SET_MESSAGE_List_LOADING', { key: 'noticeList', loading: true })

        if (refresh) {
            commit('SET_MESSAGE_List_PAGE_NO', { key: 'noticeList', pageNo: 1 })
        }
        VoHttp.apiContentMessageLogNoticeList(state.messageList.noticeList.pages)
            .then((res) => {
                commit('SET_MESSAGE_LIST', {
                    key: 'noticeList',
                    list: res.data.records,
                    total: res.data.total,
                })
                if (state.messageList.noticeList.list.length < res.data.total) {
                    let pageNo = state.messageList.noticeList.pages.pageNo
                    commit('SET_MESSAGE_List_PAGE_NO', { key: 'noticeList', pageNo: ++pageNo })
                }
            })
            .finally((res) => {
                commit('SET_MESSAGE_List_LOADING', { key: 'noticeList', loading: false })
            })
    },
    reqCommentList({ commit, state }, refresh) {
        commit('SET_MESSAGE_List_LOADING', { key: 'commentList', loading: true })
        if (refresh) {
            commit('SET_MESSAGE_List_PAGE_NO', { key: 'commentList', pageNo: 1 })
        }
        VoHttp.apiContentMessageLogCommentList(state.messageList.commentList.pages)
            .then((res) => {
                commit('SET_MESSAGE_LIST', {
                    key: 'commentList',
                    list: res.data.records,
                    total: res.data.total,
                })
                if (state.messageList.commentList.list.length < res.data.total) {
                    let pageNo = state.messageList.commentList.pages.pageNo
                    console.log(pageNo)
                    commit('SET_MESSAGE_List_PAGE_NO', { key: 'commentList', pageNo: ++pageNo })
                }
            })
            .finally((res) => {
                commit('SET_MESSAGE_List_LOADING', { key: 'commentList', loading: false })
            })
    },
    reqCollectList({ commit, state }, refresh) {
        commit('SET_MESSAGE_List_LOADING', { key: 'collectList', loading: true })

        if (refresh) {
            commit('SET_MESSAGE_List_PAGE_NO', { key: 'collectList', pageNo: 1 })
        }
        VoHttp.apiContentMessageLogCollectList(state.messageList.collectList.pages)
            .then((res) => {
                if (state.messageList.collectList.list.length < res.data.total) {
                    let pageNo = state.messageList.collectList.pages.pageNo
                    commit('SET_MESSAGE_List_PAGE_NO', { key: 'collectList', pageNo: ++pageNo })
                }
                commit('SET_MESSAGE_LIST', {
                    key: 'collectList',
                    list: res.data.records,
                    total: res.data.total,
                })
            })
            .finally((res) => {
                commit('SET_MESSAGE_List_LOADING', { key: 'collectList', loading: false })
            })
    },
    reqLogisticsList({ commit, state }, refresh) {
        commit('SET_MESSAGE_List_LOADING', { key: 'logisticsList', loading: true })
        if (refresh) {
            commit('SET_MESSAGE_List_PAGE_NO', { key: 'logisticsList', pageNo: 1 })
        }
        VoHttp.apiContentMessageLogLogisticsList(state.messageList.logisticsList.pages)
            .then((res) => {
                commit('SET_MESSAGE_LIST', {
                    key: 'logisticsList',
                    list: res.data.records,
                    total: res.data.total,
                })
                if (state.messageList.logisticsList.list.length < res.data.total) {
                    let pageNo = state.messageList.logisticsList.pages.pageNo
                    commit('SET_MESSAGE_List_PAGE_NO', { key: 'logisticsList', pageNo: ++pageNo })
                }
            })
            .finally((res) => {
                commit('SET_MESSAGE_List_LOADING', { key: 'logisticsList', loading: false })
            })
    },
    reqAttentionList({ commit, state }, refresh) {
        commit('SET_MESSAGE_List_LOADING', { key: 'attentionList', loading: false })

        if (refresh) {
            commit('SET_MESSAGE_List_PAGE_NO', { key: 'attentionList', pageNo: 1 })
        }
        VoHttp.apiContentMessageLogAttentionList(state.messageList.attentionList.pages)
            .then((res) => {
                commit('SET_MESSAGE_LIST', {
                    key: 'attentionList',
                    list: res.data.records,
                    total: res.data.total,
                })
                if (state.messageList.attentionList.list.length < res.data.total) {
                    let pageNo = state.messageList.attentionList.pages.pageNo
                    commit('SET_MESSAGE_List_PAGE_NO', { key: 'attentionList', pageNo: ++pageNo })
                }
            })
            .finally((res) => {
                commit('SET_MESSAGE_List_LOADING', { key: 'attentionList', loading: false })
            })
    },
    reqAnnouncementList({ commit, state }, refresh) {
        commit('SET_MESSAGE_List_LOADING', { key: 'announcementList', loading: true })

        if (refresh) {
            commit('SET_MESSAGE_List_PAGE_NO', { key: 'announcementList', pageNo: 1 })
        }
        VoHttp.apiContentMessageLogAnnouncementList({
            type: 4,
            ...state.messageList.announcementList.pages,
        })
            .then((res) => {
                commit('SET_MESSAGE_LIST', {
                    key: 'announcementList',
                    list: res.data.records,
                    total: res.data.total,
                })
                if (state.messageList.announcementList.list.length < res.data.total) {
                    let pageNo = state.messageList.announcementList.pages.pageNo
                    commit('SET_MESSAGE_List_PAGE_NO', { key: 'announcementList', pageNo: ++pageNo })
                }
            })
            .finally((res) => {
                commit('SET_MESSAGE_List_LOADING', { key: 'announcementList', loading: false })
            })
    },
    reqAllList({ dispatch }) {
        const arr = [
            dispatch('reqNoticeList', true),
            dispatch('reqCommentList', true),
            dispatch('reqCollectList', true),
            dispatch('reqLogisticsList', true),
            dispatch('reqAnnouncementList', true),
        ]
        return Promise.all(arr)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
