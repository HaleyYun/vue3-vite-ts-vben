import { storage,VoHttp,utils } from '@/common/unifyGlobalReg.js'

// 基本数据，用来存储变量
const state = {
  targetInfo: {
    photoUrl:'',
    nickName:'',
    targetId:''

  },
  imCtx:null, // im监听数据
  messageList:null,
  notReadNum: 0,


}
// 函数，更改state，同步操作
const mutations = {
  setTargetInfo(state, value) {
    state.targetInfo = value
    storage.set('targetInfo', value)
  },
  SET_IMCTX(state, value){
    state.imCtx = value
    storage.set('imCtx', value)
  },
  SET_MESSAGE(state, value){
    state.messageList = value
    storage.set('messageList', value)
  },
  SET_NOTREADNUM(state, value) {
    state.notReadNum = value
    storage.set('notReadNum', value)
  },
}
// 函数，提交mutation，异步操作
const actions = {
  // 更新未读消息数量
  async setNotReadNum({ commit, state }, data) {
    commit('SET_NOTREADNUM', data)
  },
  // 更新某个聊天列表状态
  async setMessageItem({ commit, state }, data) {
    //登录或者刷新了用户状态
    if (data.message && data.senderId) {
      let messageList =  storage.get('messageList');

      let messageItem = messageList.find(item=>item.targetId == data.senderId&&(item.targetPlatformCode == data.senderPlatformCode) )
      if(messageItem){


        console.log(data.messageStyle,"messageStylemessageStylemessageStyle");
        messageItem.recordLast = {
          messageType:data.messageType,
          messageStyle:data.messageStyle||0,
          message:data.message,
          type:data.type,
          id:data.id
        }
        messageItem.recordLast = JSON.stringify(messageItem.recordLast)
        messageItem.recordTimeLast = utils.timeFormat(new Date(),'yyyy-mm-dd hh:MM:ss')
        messageItem.notReadNum = data.notReadNum;
        commit('SET_MESSAGE', messageList)

      }
    }
  },
  // 更新某个聊天列表撤回状态
  async setMessageRollbackFn({ commit, state }, data) {
    console.log(data,"dddddddddddd");
    //登录或者刷新了用户状态
    if (data.id ) {
      let messageList =  storage.get('messageList');

      let messageItem = messageList.find(item=>{
        const recordLast=JSON.parse(item.recordLast)
        return recordLast.id==data.id
      } )


      console.log(messageItem,data.id,messageList,"messageListmessageList");

      if(messageItem){
        messageItem.recordLast = {
          messageType:data.messageType,
          messageStyle:data.messageStyle||0,
          message:data.message,
          type:data.type,
          id:data.id
        }
        messageItem.recordLast = JSON.stringify(messageItem.recordLast)
        messageItem.recordTimeLast = utils.timeFormat(new Date(),'yyyy-mm-dd hh:MM:ss')
        messageItem.notReadNum = data.notReadNum;
        commit('SET_MESSAGE', messageList)

      }
    }
  },
  // 点击进去消息列表 清空消息未读状态
  async clearNotReadNum({ commit, state }, data={targetId:'',targetRoleCode:''}) {
    try {
      let readDate = utils.timeFormat(new Date(),'yyyy-mm-dd hh:MM:ss')
      let params = {readDate:readDate,recipientId:data.targetId,recipientPlatformCode:data.targetRoleCode}
      const {code } = await VoHttp.IM.apiMessageRecordReadMessage(params)
      //apiMessageRecordReadMessage
      //登录或者刷新了用户状态
      let messageList = storage.get('messageList');
      if (data.targetId && messageList && messageList.length > 0) {
        let messageItem = messageList.find(item=>item.targetId == data.targetId)
        if(messageItem){
          messageItem.notReadNum = 0;
          commit('SET_MESSAGE', messageList)
        }
      }
    }catch (e) {
      console.log(e)
    }

  },

  // 更新某个用户的备注  好友聊天页面  好友聊天列表页 都得更新
  async updateTargetInfo({ commit, state },data = {targetNickName: ''}){
    let targetInfo = state.targetInfo?state.targetInfo: storage.get('targetInfo')
    targetInfo.nickName = data.targetNickName;
    let messageList =  storage.get('messageList');
    let messageItem = messageList.find(item=>item.targetId == targetInfo.targetId)
    if(messageItem){
      messageItem.targetNickName = data.targetNickName;
      commit('SET_MESSAGE', messageList)
      commit('setTargetInfo', targetInfo)
    }

  },
  // 更新免打扰状态   disturb
  async updateDisturb({ commit, state },data={updateDisturb:false,udateTop:false} ){
    if ( data.targetId) {
      let messageList =  storage.get('messageList');
      let messageItem = messageList.find(item=>item.targetId == data.targetId&&(item.targetPlatformCode == data.targetPlatformCode))
      if(messageItem){
        data.updateDisturb &&(messageItem.disturb = data.disturb);
        data.udateTop &&(messageItem.top = data.top);
        commit('SET_MESSAGE', messageList)
      }
    }
  },
  // 关闭im this.$store.commit('im/SET_IMCTX', imCtx)
  async closeIMCTX({ commit, state }){
    let imCtx = state.imCtx || storage.get('imCtx')
    if(imCtx){
      imCtx.close()
    }
  }


}
// state的计算属性
const getters = {
  /**
   *
   * @param state
   * @returns {string|*}
   */
  getTargetInfo: (state) => {
    return state.targetInfo.nickName?state.targetInfo: storage.get('targetInfo')
  },
  GET_IMCTX:(state) =>{
    return state.imCtx || storage.get('imCtx')
  },
  GET_MESSAGE(state){
    return state.messageList || storage.get('messageList')
  },
  GET_ALLNOMESSAGE(state){
    // let messageList = state.messageList || storage.get('messageList');
    //
    // if(messageList.length > 0){
    //   let noMessageNumber = messageList.reduce((total, cur)=>{
    //     return total + cur.notReadNum;
    //   },0)
    //   return noMessageNumber;
    // }else {
    //   return 0
    // }
    return state.notReadNum || storage.get('notReadNum')
  }


}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
