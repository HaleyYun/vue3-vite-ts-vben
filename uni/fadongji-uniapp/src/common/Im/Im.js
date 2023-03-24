import { storage } from '@/common/unifyGlobalReg'
import devConf from '@/common/env'
import Bus from '@/common/Bus'
import { VoHttp } from '@/common/unifyGlobalReg'
import store from '@/store'
import ProductMessage from '@/common/Im/Message/ProductMessage'
import TextMessage from '@/common/Im/Message/TextMessage'
import MediaMessage from '@/common/Im/Message/MediaMessage'
import OrderMessage from '@/common/Im/Message/OrderMessage'

/**
 *
 * @param type 消息类型(0:文本  1:图片  2:视频 3:订单 4:商品)
 * @param content 消息体  如果是订单，商品信息  为json串
 * @param out_uid 发送人id
 * @param to 接收人id
 * @param toPlatformCode 接收人角色
 * @param isCompany 是否是店铺
 * @param messageId 本条消息的唯一id（前端同事发送时生成）
 * @return {Promise<unknown>}
 */
const sendMsg = ({ type, content, out_uid, to, toPlatformCode, messageId = null, isCompany = false }) => {
  const currentTimeStamp = Number(new Date())
  if (!messageId) messageId = `${currentTimeStamp}`
  return new Promise((resolve, reject) => {
    //Body: 名称	类型	是否必须	默认值	备注	其他信息 friendId	integer 非必须 聊天对象id format: int64
    //orderProperty	string 非必须 排序属性 orderType	string 非必须 排序类型 枚举: ASC,DESC
    //pageNo	integer 非必须 页数，默认值 1 最小值: 1 format: int32
    //pageSize	integer 非必须 每页条数，默认值 10 最小值: 1 format: int32

    //messageType	integer
    //非必须
    //消息类型(0:文本  1:图片  2:视频 3:订单 4:商品,5语音，6订单发货提醒，7代课下单)
    const messageTypeDict = {
      text: 0,
      image: 1,
      video: 2,
      order: 3,
      prod: 4,
      voice: 5,
      confirmOrder:6,
      substituteOrder: 7,
      garageCancelInstallation:8,  // 安装订单取消
      garageCancelRecovery:9,   //回收订单取消
      masterInstallation:10,  //安装订单接单
      masterRecovery:11,     // 回收订单接单
      masterCancelInstallation:12, //安装订单取消接单
      masterCancelRecovery:13,  //回收订单取消接单
      rollbackText:14,  //撤回文本
      rollbackPic:15, //撤回图片
      rollbackVideo:16, //撤回视频
      rollbackOrder:17, // 撤回订单
      rollbackGoods:18, //撤回商品
      rollbackMusic:19, // 撤回语音
    };

    let api = ''
    if (isCompany) {
      //联系店铺api
      api = 'apiMessageRecordCompanySendMessage'
    } else {
      api = 'apiMessageRecordRecordSendMessage'
    }

    VoHttp.IM[api](
      {
        messageId,
        recipientId: out_uid,
        recipientPlatformCode: toPlatformCode,
        message: content,
        messageType: messageTypeDict[type],
      },
      { noLoading: true },
    )
      .then((res) => {
        console.log({
          apiMessageRecordRecordSendMessage: res,
        })
        console.log('发送消息回执', res)
        if (res && res.code === '20001') {
          resolve(res)
        }else {
          reject(Error(`消息发送错误:${res.message}`))
        }
      })
      .catch((err) => {
        if(err.code === 'R5000') {
          console.log(2222222)
          resolve({isBlack:1})
        }else {
          reject(Error('发送消息错误'))
        }
      })
  })
}

class IM {
  /**
   * 初始化Im类
   * @param productId 产品id
   * @param orderId 订单id
   * @param origin 来源
   * @param extConf 额外配置
   * @param identityType 身份信息
   * @param dentityId 信息id
   */
  constructor({ friendId, productId, orderId, origin, ...extConf } = {}) {
    // this.createInstance = false
    // this.productId = productId
    // this.orderId = orderId
    // 发送人的消息
    this.sendName = ''
    this.sendAvatar = ''
    this.sendIdentity = ''
    this.sendId = friendId

    this.origin = origin
    this.extConf = extConf
    this.page = 1 // 初始化页码

    this.chatList = []

    // 队列
    this.msgQueue = []
    this.socketOpen = false

    // 注意销毁
    this.task = null

    this.intervalInstance = null
    this.heartBeatFailNum = 0 // 心跳丢失次数
    this.connectFailNum = 0 // 连接失败次数
    this.heartBeatSuccessNum = 0 // 正确心跳次数
    // console.log(extConf)

    this.listenStatus = 0
  }

  /**
   * 获取以往信息
   */
  async getHistory(friendId, friendPlatformCode, pageNo, pageSize) {
    // const pageSize = this.historyPageSize;
    // const page = this.page;

    const out_uid = this.getOutUid();
    let total = 0
    const historyList = await VoHttp.IM.apiMessageRecordGetMessage({
      pageSize: pageSize,
      pageNo: pageNo,
      friendId: friendId,
      friendPlatformCode: friendPlatformCode,
    }).then((res) => {
        console.log("socket消息", res);
        total = res.data.total
        //消息类型(0:文本  1:图片  2:视频 3:订单 4:商品,5语音，6发货推送订单,7代客下单订单)
        const messageTypeDict = ['text','image','video','order',"prod",'voice','confirmOrder','substituteOrder','garageCancelInstallation','garageCancelRecovery','masterInstallation','masterRecovery','masterCancelInstallation','masterCancelRecovery','rollbackText','rollbackPic','rollbackVideo','rollbackOrder','rollbackGoods','rollbackMusic'];
        return res.data.records.map((row) => {
          // 消息方式（0:接收   1:发送）
          row.direction = row.messageStyle === 1 ? 'to' : 'from'; // 标记哪些是自己的
          // messageType 消息类型(0:文本  1:图片  2:视频)
          row.type = messageTypeDict[row.messageType]
          row.content = (row.messageType == 0||row.messageType == 14||row.messageType == 15||row.messageType == 16||row.messageType == 17||row.messageType == 18||row.messageType == 19)? row.message:JSON.parse(row.message);
          // readNot 是否已读（0:未读 1:已读）

          return row
        })
      })
      .catch((err) => {
        throw Error(err.msg || '获取历史消息失败')
      });
    if (historyList.length > 0) {
      this.chatList = historyList.concat(this.chatList);
      this.page++
    }
    let returnData = {
      historyList: historyList,
      total: total,
    }
    return returnData
  }

  /**
   * 设置本地用户信息
   * @param type
   * @param id
   * @param ext
   */
  setSendInfo({ type, id, ...ext }) {
    // 获取发送人的信息要用的
    this.setIdentity({ type, id })

    const { name = '', avatar = '' } = ext
    this.sendName = name
    this.sendAvatar = avatar
  }

  getSendInfo() {
    return { name: this.sendName, avatar: this.sendAvatar }
  }

  /**
   * 设置接受人信息
   * @param type
   * @param id
   * @param ext
   */
  setReceiveInfo({ type, id, ...ext }) {
    this.receiveIdentity = type
    this.receiveId = id
  }

  clearReceiveInfo() {
    this.receiveIdentity = null
    this.receiveId = null
  }

  /**
   *
   * @param type system user biz store 分别代表系统 用户、商家、门店
   * @param id 身份id
   */
  setIdentity({ type = 'user', id }) {
    this.sendIdentity = type
    this.sendId = id

  }

  setClientId(val) {
    this.clientId = val
  }

  getClientId() {
    if (!this.clientId) throw Error('获取client_id失败')
    return this.clientId
  }

  /**
   * 获取发送消息的id
   * 用户、商家、门店分别用前缀+id的方式来拼凑 user_xxx  biz_xxx store_xxx
   * system 平台，直接使用平台的appid值
   * @returns {string}
   */
  getOutUid() {
    if (this.sendIdentity === 'system') {
      return this.appid
    } else {
      //if (!this.sendIdentity || !this.sendId) throw Error('获取out_uid失败')
      //return this.sendIdentity + '_' + this.sendId
      if (!this.sendId) throw Error('获取out_uid失败')
      return this.sendId
    }
  }

  /**
   * 获取接收人
   * @returns {string}
   */
  getToUid() {
    if (this.receiveIdentity === 'system') {
      return this.appid
    } else {
      if (!this.receiveId) throw Error('获取out_uid失败')
      return this.receiveId
      //if (!this.receiveIdentity || !this.receiveId) throw Error('获取out_uid失败')
      //return this.receiveIdentity + '_' + this.receiveId
    }
  }

  get token() {
    const { expires_at, token } = this.accessToken
    // 看是否过期
    if (expires_at && uni.$moment(expires_at * 1000).isAfter()) {
      return token
    }

    return false
  }

  set token(val) {
    const { expires_at, token } = val
    if (!token) return
    this.accessToken = { expires_at, token }
  }

  // 启动的
  async start() {
    // 对于发消息就不要阻塞了
    await this._craeteSocket()
    this.heartBeatSuccessNum = 0;
    console.log('socket 启动了',this.intervalInstance)
    // 心跳
    this.intervalInstance = setInterval(this._holdHeartBeat.bind(this), this.heartBeatTimout)
    console.log(this.intervalInstance)
  }

  // 清空之前的聊天记录
  clearHistory() {
    this.chatList = [] // 清空记录
    this.page = 1 // 重置页码
  }

  close() {
    uni.closeSocket()
    this.clearIntervalFn()
    console.log('socket 前端关闭了')
  }

  /**
   * 获取未读消息总数
   */
  async getNoReadMsgCount() {
    const total = await getNoReadMsg({ out_uid: this.getOutUid() }, { errtip: false })
      .then((res) => res.totalCount)
      .catch((err) => {
        console.log(err.msg || '获取未读记录失败')
        // 处理token错误
        if (err.errorCode === 66000) {
          this._getAccessToken()
        }
        return 0
      })
    console.log(total)
    // store.commit('system/SET_TABBAR_TAG', { idx: 1, num: total })
    return total
  }

  /**
   * 打开监听
   */
  openListen() {
    uni.$emit('IM_EVENT', 'im listern start')
    this.listenStatus = 1 // 开启监听
    storage.set('listenStatus', 1)
  }

  cancalListen() {
    uni.$off('IM_EVENT')
    this.listenStatus = 0 // 开启监听
    storage.set('listenStatus', 0)
  }

  chatListAddMsg(msg) {
    this.chatList.push(msg)
     if (this.listenStatus) {
       uni.$emit('showMessageListAdd', { msg })
     }
  }
// 消息撤回方法处理
  chatListRollbackMsg(msg){

    this.chatList.map(item=>{
      if(item.id==msg.id){
        item.messageType=msg.messageType
        item.type=msg.type

      }
    })
    if (this.listenStatus) {
      uni.$emit('showMessageListRollback', { msg })
    }
  }






  /**
   * 发送之前，需要先检查token是否过期，过期则刷新token
   * @param content
   * @param type
   * @param isCompany 是否是店铺
   */
  async sendImMessage({ content, type = 'text', leixing, proPrice, activeId, isCompany = false, ...ext }) {
    console.log('isCompany', isCompany)
    var message = null
    switch (type) {
      case 'image':
        message = new MediaMessage(type, content, ext);
        break;
      case 'video':
        message = new MediaMessage(type, content, ext);
        break;
      case 'voice':
        message = new MediaMessage(type, content, ext);
        break;
      case 'prod':
        message = new ProductMessage(type, content, leixing, proPrice, activeId, ext);
        break;
      case 'order':
        message = new OrderMessage(type, content, leixing, proPrice, activeId, ext);
        break;
      default:
        message = new TextMessage(type, content, ext);
        break
    }



    // if (type === 'image'||type === 'video') {
    //    await message.getImgInfo()
    // }
    console.log('发送消息', message)

     if (message) {
      const currentTimeStamp = Number(new Date())
      let chatMessage = { ...message, direction: 'to', sendStatus: 0,isblack:0,createTime: currentTimeStamp }
      this.chatListAddMsg(chatMessage)
      //this.chatList.push()

      //showMessageListAdd
      // 不需要发送
      //if (message.type === 'prod' && message.isTip) return

      const chatIdx = this.chatList.length - 1

      // 为了预防有需要异步上传的情况
      const content = await message.getContent(chatIdx, this.chatList)

      const messageTypeDict = {
        text: 0,
        image: 1,
        video: 2,
        order: 3,
        prod: 4,
        voice: 5,
        confirmOrder: 6,
        substituteOrder: 7,
        garageCancelInstallation:8,
        garageCancelRecovery:9,
        masterInstallation:10,
        masterRecovery:11,
        masterCancelInstallation:12,
        masterCancelRecovery:13,
        rollbackText:14,  //撤回文本
        rollbackPic:15, //撤回图片
        rollbackVideo:16, //撤回视频
        rollbackOrder:17, // 撤回订单
        rollbackGoods:18, //撤回商品
        rollbackMusic:19, // 撤回语音

      };
      // checkOnline({ out_uid: this.getOutUid() })
      console.log(this.sendIdentity)
      sendMsg({
        type,
        content,
        out_uid: this.getOutUid(),
        to: this.getToUid(),
        toPlatformCode: this.sendIdentity,
        isCompany,
      })
        .then((res) => {
          // 追加发送成功返回的信息  没办法完全结构复制 会影响发送的状态  导致数据无法更新
          this.chatList[chatIdx]['createTime']=res.data['createTime']
          this.chatList[chatIdx]['messageId']=res.data['messageId']
          this.chatList[chatIdx]['messageType']=res.data['messageType']
          this.chatList[chatIdx]['friendId']=res.data['recipientId']
          this.chatList[chatIdx]['friendPlatformCode']=res.data['recipientPlatformCode']
          this.chatList[chatIdx]['otherId']=res.data['otherId']
          this.chatList[chatIdx]['userId']=res.data['userId']
          this.chatList[chatIdx]['id']=res.data['id']



          // 被拉黑了
          console.log(this.chatList,chatIdx,"*************")
          if(res.isBlack){
            this.chatList[chatIdx].isblack = 1;
          }
          console.log(this.chatList[chatIdx])
          this.chatList[chatIdx].sendStatus = 1 // 标记成功
          console.log({...message,notReadNum:null})
          store.dispatch('im/setMessageItem', {
            messageType:messageTypeDict[type],
            message:content,
            senderId:this.getToUid(),
            type:1,
            senderPlatformCode:this.sendIdentity,
            notReadNum:null,
            id:res.data['id'],
            messageStyle:1
          })
          return res.data
        })
        .catch((err) => {
          console.log('消息发送失败',err)
          console.log(this.chatList[chatIdx])

          this.chatList[chatIdx].sendStatus = -1 // 标记失败
          this.msgQueue.push(message)
          //重发先不考虑
          // 重连啊
          //if (err.errorCode === 66000) {
          //  this._getAccessToken()
          //    .then((res) => {
          //      sendMsg({ type, content, out_uid: this.getOutUid(), to: this.getToUid() })
          //        .then((res) => {
          //          console.log('发送成功', res)
          //          this.chatList[chatIdx].sendStatus = 1 // 标记成功
          //          return res.data
          //        })
          //        .catch(() => {
          //          console.log('消息重发失败')
          //        })
          //    })
          //    .catch(() => {})
          //}
          // Exception.handle(Error(err.msg))
        })
     }
  }

  // 重新发送
  async resendMessage (data){
    this.sendImMessage(data.info);
    if(data.index != null){
      this.chatList.splice(data.index,1)
    }
  }

  /**
   * 维持心跳
   * @private
   */
  _holdHeartBeat() {
    const message = JSON.stringify({ type: 0 })
    if(this.heartBeatFailNum < this.tryRequestFailMax){
      this.task.send({
        data: message,
        success: () => {
          this.heartBeatFailNum = 0 // 重置心跳错误次数
          this.heartBeatSuccessNum++ // 正确心跳次数
          console.log('socket 心跳成功',this.heartBeatSuccessNum,new Date())
          // 最大重连心跳次数，超过就不链接了
          if((this.heartBeatSuccessNum >=this.heartBeatSuccessNumMax) &&(this.heartBeatFailNum < this.tryRequestFailMax)){
            this.heartBeatSuccessNum = 0; // 重置正确心跳
            console.log('socket 重新链接',
                (new Date().getMinutes().toString().padStart(2, '0'))+'--'+new Date().getSeconds().toString().padStart(2, '0'))
            // 重连吧
            this.start()
          }

        },
        fail: () => {
          console.log('socket 心跳请求错误')
          this.heartBeatFailNum++
          // 丢失心跳达到最大次数之后需要重连
          if ((this.heartBeatFailNum < this.heartBeatFailMax) && (this.heartBeatFailNum < this.tryRequestFailMax)  ) {
            console.log('心跳请求超过阈值:' + this.heartBeatFailMax)
            // 重连吧
            this.start()
          }
        },
      })
    }else {
      console.log('心跳重连，自动关闭close')
      this.close()
    }
  }

  clearIntervalFn() {
    if(this.intervalInstance){
      // for (let i=1;i<=this.intervalInstance;i++ ){
      //
      // }
      clearInterval(this.intervalInstance)
      this.intervalInstance = null;
      console.log('清除intervalInstance',this.intervalInstance)
    }
  }

  //message: "范德萨发生大三"
  //messageId: 1656823758805
  //messageType: 0
  //senderId: 144046832958439420
  //type: 1
  //uuid: "c2e65e63-821a-4b79-88c3-06a42456533c"
  _takeMessage(messageObj) {
    console.log(messageObj,"11111111111111111111");
    try {
      const { messageType, message: content, from } = messageObj

      const messageTypeDictFormat = {
        0: 'text',
        1: 'image',
        2: 'video',
        3: 'order',
        4: 'prod',
        5:'voice',
        6:'confirmOrder',
        7:'substituteOrder',
        8:'garageCancelInstallation',  // 安装订单取消
        9:'garageCancelRecovery',   //回收订单取消
        10:'masterInstallation',  //安装订单接单
        11:'masterRecovery',     // 回收订单接单
        12:'masterCancelInstallation', //安装订单取消接单
        13:'masterCancelRecovery',  //回收订单取消接单
        14:'rollbackText',  //撤回文本
        15:'rollbackPic', //撤回图片
        16:'rollbackVideo', //撤回视频
        17:'rollbackOrder', // 撤回订单
        18:'rollbackGoods', //撤回商品
        19:'rollbackMusic', // 撤回语音
      }
      const type = messageTypeDictFormat[messageType]

      // 只允许限定的类别
      if (!this.allowMsgType.includes(type)) {
        throw Error('类型不被允许')
      }
      //console.log(String(messageObj.senderId), String(this.getToUid()))
      // 只有IM详情页才需要

      //先去掉这个严格校验String(messageObj.senderId) === String(this.getToUid())
        console.log('socket', this.receiveIdentity,this.receiveId)
      if (this.receiveIdentity&&this.receiveId &&(String(messageObj.senderId) == this.receiveId) ) {
        // 标记为已读
        // readMsg({
        //   msg_id: messageObj.id,
        //   to: this.getToUid(),
        //   out_uid: this.getOutUid()
        // }).catch(err => {
        //   console.log(err.msg || '消息设置已读失败')
        // })
        const currentTimeStamp = Number(new Date())
        // 如果是撤回相关的websocket 特殊处理  其他走else

        if(String(type)==='rollbackText'||String(type)==='rollbackPic'||String(type)==='rollbackVideo'||String(type)==='rollbackOrder'||String(type)==='rollbackGoods'||String(type)==='rollbackMusic'){
          this.chatListRollbackMsg({ ...messageObj,type, direction: 'from',createTime:currentTimeStamp })
          store.dispatch('im/setMessageRollbackFn', {...messageObj})
        }else{
          this.chatListAddMsg({ ...messageObj,type,content:type == 'text'?content:JSON.parse(content), direction: 'from',createTime:currentTimeStamp })
          store.dispatch('im/setMessageItem', {...messageObj,notReadNum:0})
        }

      }else{
        store.dispatch('im/setMessageItem', messageObj)
      }

      //uni.$emit('getMsg', { ...messageObj })
      //if (this.listenStatus) {
      //  uni.$emit('IM_TAKE_MSG', { ...messageObj })
      //}
    }catch (e) {
      console.log(e,"**********")
    }
  }

  // 建立连接
  async _craeteSocket() {
    await this.close()
    /** add event listen **/
    console.log('socket 开始拉',(new Date().getMinutes().toString().padStart(2, '0'))+'--'+new Date().getSeconds().toString().padStart(2, '0'))

    // 好像对异步的uni.connectSocket没什么作用

    //storage.get('userInfo')
    const userInfo = await store.getters['user/getUserInfo']();
    let SocketTask = null
    await new Promise((resolve) => {

      SocketTask = uni.connectSocket({
        url: devConf.imConnectUrl + '?userId=' + userInfo.id + '&platformCode=' + userInfo.roleCode
            +'&accountId='+(userInfo.accountId)+'&token='+userInfo.access_token,
        complete: () => {
          // this.createInstance = true // 标记为创建成功
          resolve(true)
        },
      })
    })

    SocketTask.onOpen((res) => {
      this.socketOpen = true
      for (var i = 0; i < this.msgQueue.length; i++) {
        this.sendImMessage(this.msgQueue[i])
      }
      this.msgQueue = []
    })
    SocketTask.onMessage((res) => {
      this.connectFailNum = 0 // 重置错误次数
      if(res.data){
        this._takeMessage(JSON.parse(res.data))
      }
    })
    SocketTask.onError((error) => {
      this.connectFailNum++ // 累计错误次数
      console.log(error, this.connectFailNum)
      if (this.connectFailNum < this.tryRequestMax  ) {
        // 重连吧
        this.start()
      }else {
        console.log('SocketTask.onError链接超过最大失败值')
        this.close()
      }
    })
    SocketTask.onClose((res) => {
       console.log('WebSocket关闭')
       console.log(res)
      console.log('关闭拉',(new Date().getMinutes().toString().padStart(2, '0'))+'--'+new Date().getSeconds().toString().padStart(2, '0'))
      // 取消心跳
      //this.clearIntervalFn()
      // 取消监听和重置
      if (Bus.imInstance) {
        console.log('一并取消Bus')
        Bus.imInstance.cancalListen()
        Bus.imInstance = null
      }


    })

    this.task = SocketTask

    return SocketTask
    /** add event listen end **/
  }
}

// 还是放到类上面，这样就每个项目用工程文件就好了
IM.prototype.heartBeatTimout = 1000*5 //30 * 1000 // 心跳保持时间，默认5秒
IM.prototype.heartBeatFailMax = 3 // 最大心跳丢失次数，错误3次重新建立socket请求
IM.prototype.heartBeatSuccessNumMax = 102 // 后端600秒自动断开，因为后端只能发送600秒，咱们这边要500秒之后重新连接
IM.prototype.tryRequestMax = 5 // 最大重连次数，重连超过5次不成功，就直接报错提醒用户洗洗睡
IM.prototype.tryRequestFailMax = 60 // 最大错误心跳重连
IM.prototype.historyPageSize = 100 // 一次加载以往消息20条

IM.prototype.allowMsgType = ['text', 'image', 'video', 'prod', 'order', 'voice','confirmOrder','substituteOrder','garageCancelInstallation','garageCancelRecovery','masterInstallation','masterRecovery','masterCancelInstallation','masterCancelRecovery','rollbackText','rollbackPic','rollbackVideo','rollbackOrder','rollbackGoods','rollbackMusic'] // 目前只handler这几种，不允许其他的
// 1.创建实例
// 2.拿到token(阻塞操作，带mask的全屏loading)
// 3.获取最近的20条信息
// 4.建立socket连接
// 5.显示推荐信息（从某个订单或者某个商品进来)
// 6.各种响应（客户主动发信息、客服回复消息)

export default IM
