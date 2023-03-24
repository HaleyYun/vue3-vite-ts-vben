<template>
  <view>
    <view class="chat flex flex-column">
      <VoBatteryBar />
      <view class="chat-nav flex flex-vertical-c">
        <VoIcon name="left-arrow" :opacity="0.45" @click="backFn" />
        <view class="chat-nav__note flex1 overEllipsis">
          <view class="overEllipsis nickName">{{ targetInfo.nickName }}</view>
          <view v-if="targetInfo.companyName" class="companyName overEllipsis">{{
            targetInfo.companyName
          }}</view>
        </view>
        <VoIcon name="more" :opacity="0.45" @click="goChatSettings" />
      </view>
      <!--:class="{'open-featur':featur||recording}"-->
      <scroll-view
        class="chat-middle"
        id="chat-middle"
        :scroll-top="scrollTop"
        :scroll-y="true"
        @scroll="OnScroll"
        scroll-with-animation
        @scrolltoupper="scrolltoupperMsg"
      >
        <view class="chat-middle-List" id="chat-middle-List">
          <RoomMessageItem
            :showMessageList="showMessageList"
            :head="head"
            @goUseSetting="goUseSetting"
            @resend="resend"
            @reEditFn="reEditFn"
          />
        </view>
      </scroll-view>

      <view class="chat-bottom" :style="{ 'padding-bottom': keyBordHeight }">
        <push-goods
          :is-show-push="isShowAssociatedGoods"
          @close="isShowAssociatedGoods = false"
          :roomInfo="recommendedGoods"
          :type="pushType"
          :garageInfo="garageInfo"
          @goGoodsDetail="goGoodsDetail"
          @sendService="sendService"
        />
        <view class="chat-flex flex flex-vertical-c">
          <VoIcon
            class="m-t-4 m-r-8"
            :name="!recording ? 'voice-line' : 'keyboard'"
            :size="36"
            @click="vocieFn"
          />
          <textarea
            @focus="focusFn"
            @blur="blurFn"
            class="chat-bottom__text"
            border="none"
            :maxlength="1500"
            v-model="valueText"
            :show-confirm-bar="false"
            :auto-height="true"
            confirm-type="send"
            @confirm="sendFn"
            :adjust-position="false"
            cursor-spacing="20"
          ></textarea>
          <!--          <VoIcon class="m-t-8 m-l-16" name="smile" :size="32" />-->
          <VoIcon class="m-r-16 m-l-16" name="add" :size="28" @click="addFeatur" />
          <view v-if="sys.osName !== 'ios'" class="send-text" @click="sendFn">发送</view>
        </view>
        <div class="safearea-box" :class="{ 'height-safearea': !safeareaShow || featur }"></div>
        <view v-if="featur" class="chat-add p-b-safe-area">
          <view class="chat-add__box flex flex-wrap">
            <view
              class="box-adds flex flex-column flex-vertical-c flex-wrap"
              v-for="(info, index) of addList"
              :key="index"
              @click="auxiliaryFunction(info)"
            >
              <image class="box-adds__block" :src="info.image" />
              <view class="box-adds__ann">{{ info.name }}</view>
            </view>
          </view>
        </view>
        <RecordingPanel
          v-show="recording"
          :maximum="60"
          :isImMessage="true"
          @confirm="recordConfirmFn"
          @close="recording = false"
        />
      </view>
    </view>
    <u-popup :show="goodsShow" :duration="300" mode="bottom" @close="close" @open="open" :round="10">

      <view class="goods-title flex flex-justify-between flex-vertical-c">
        <view class="fz-b fz-32 color-block">店铺商品</view>
        <VoIcon name="close" :size="20" @click="close" :opacity="0.85" />
      </view>
      <scroll-view
        class="substitute__scroll"
        scroll-top="0"
        :scroll-y="sendGoodsList.length === 0 ? false : true"
        @scrolltolower="scrolltolower"
        refresher-default-style="none"
      >
        <SendGoods @close="close" :goods-list="sendGoodsList" @sendShop="sendShop" />
        <VoNoData v-if="sendGoodsList.length == 0" no-data-tips="店铺内没有在售商品" />
      </scroll-view>
    </u-popup>
    <u-popup :show="orderShow" mode="right" :duration="300" @close="orderClose" bgColor="#F6F7F8">
      <select-order v-if="orderShow" :orderParams="prodParams" @selectOrder="selectOrder" />
    </u-popup>
  </view>
</template>

<script>
  import { chooseImageByPromise, chooseVideoByPromise } from '@/common/helper'
  import SendGoods from '@/pagesSupplier/ImMessage/components/SendGoods'
  import SelectOrder from './SelectOrder'
  import RoomMessageItem from '@/pagesSupplier/ImMessage/components/RoomMessageItem/RoomMessageItem'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import { uploadMp3, goOnlineCustomerFn } from '@/common/helper'
  import PushGoods from './components/pushGoods'
  import { mapGetters } from 'vuex'
  import permission from '@/common/permission'

  let imCtx = null
  export default {
    name: 'PersonalChat',
    components: {
      PushGoods,
      SelectOrder,
      RoomMessageItem,
      RecordingPanel,
      SendGoods,
    },
    data() {
      return {
        imCtxCopy: null,
        showMessageList: [],
        roomInfo: {}, // 房间信息
        currentUserInfo: {}, // 聊天对象信息
        title: '群聊',
        face: true,
        valueText: '',
        newMessage: [],
        featur: false,
        safeareaShow: true,
        addList: [
          {
            image: '/static/created/im/taking_pictures.png',
            name: '拍照',
            type: 1,
          },
          {
            image: '/static/created/im/photo.png',
            name: '相册',
            type: 2,
          },
          {
            image: '/static/created/im/video.png',
            name: '短视频',
            type: 3,
          },
          {
            image: '/static/created/im/goods.png',
            name: '商品',
            type: 4,
          },
          {
            image: '/static/created/im/order.png',
            name: '订单',
            type: 5,
          },
        ],
        recommendedGoods: {}, // 智能推荐商品
        goodsShow: false, // 商品弹框
        isSendGoods: false, // 发送商品 正在发送
        orderShow: false, // 订单弹出框
        scrollTop: 0, // 滚动的位置
        recording: false, // 发送语音
        isLoading: false, // 上传声音
        isShowAssociatedGoods: false,
        garageInfo: {},
        pushType: 'goods',
        prodParams: {},
        pages: {
          pageNo: 1,
          pageSize: 20,
        },
        head: { from: '', to: '' },
        sendGoodsList: [],
        pageNo: 1, //消息列表页数
        pageSize: 20,
        msgTotal: 0,
        sys: {},
        keyBordHeight: 0,
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
      targetInfo() {
        let nickName, companyName
        let TargetInfo = this.$store.getters['im/getTargetInfo']
        if (TargetInfo.nickName && TargetInfo.nickName.indexOf('(') > -1) {
          let startIndex = TargetInfo.nickName.indexOf('(')
          let endIndex = TargetInfo.nickName.indexOf(')')
          nickName = TargetInfo.nickName.slice(0, startIndex)
          companyName = TargetInfo.nickName.slice(startIndex + 1, endIndex)
        } else {
          nickName = TargetInfo.nickName
        }
        return {
          nickName,
          companyName,
          photoUrl: TargetInfo.photoUrl,
          targetId: TargetInfo.targetId,
        }
      },
    },
    methods: {
      /**
       * @description 重新编辑
       */
      reEditFn(data) {
        this.valueText = data.message
      },
      handlerRoomOut() {
        //取消心跳的定时器
        if (imCtx) {
          imCtx.clearIntervalFn()
          imCtx.close()
          imCtx = null
        }
      },
      backFn() {
        console.log('返回')
        // 清空接受人消息
        imCtx.clearReceiveInfo()
        // 设置未读消息为0
        let params = {
          targetId: this.roomInfo.id || this.roomInfo.targetId,
          targetRoleCode: this.roomInfo.platformCode,
          type: 0, // 聊天对象0：人  1：群
        }
        this.$store.dispatch('im/clearNotReadNum', params)
        this.$backFn()
      },
      /**
       * 去聊天设置页
       */
      goChatSettings() {
        this.$u.route({
          url: '/pagesSupplier/ImMessage/ChatSettings',
          params: {
            platformCode: this.roomInfo.platformCode, // 聊天对象用户角色
            friendId: this.roomInfo.id || this.roomInfo.targetId, // 聊天对象用户id
            note: this.roomInfo.note,
          },
        })
      },
      // 去用户设置页面
      goUseSetting(info) {
        let params = {
          platformCode:
            info.direction == 'from'
              ? this.roomInfo.platformCode
              : this.currentUserInfo.platformCode, // 聊天对象用户角色
          friendId:
            info.direction == 'from'
              ? this.roomInfo.id || this.roomInfo.targetId
              : this.currentUserInfo.id, // 聊天对象用户id
          isMe: info.direction == 'to' ? 1 : 0,
          sameRole: this.userInfo.roleCode === info.friendPlatformCode ? 1 : 0, // //聊天关系 0：普通聊天  1：我是买家  2：我是卖家
        }
        // 假如对方是商家跳转到商家详情 假如我自己是卖家不能看买家的详情 服务商与服务商都是卖家，都不能看对方的详情
        if (info.direction == 'from' && this.prodParams.businessCode == 1) {
          this.$u.route({ url: '/pagesSupplier/ImMessage/ShopSettings', params: params })
        } else if (this.prodParams.businessCode != 2 || info.direction == 'to') {
          this.$u.route({ url: '/pagesSupplier/ImMessage/FriendSettings', params: params })
        }
      },
      // 发送给客服
      sendService(goods) {
        this.isSendGoods = false
        console.log(goods)
        this.sendShop(goods)
        this.isShowAssociatedGoods = false
      },
      // 去立即购买
      goGoodsDetail() {
        // goodsType 商品类型 0：普通商品  1：投资项目 2:回收再销售
        console.log(this.recommendedGoods)
        if (this.recommendedGoods.goods.goodsType == 1) {
          // this.$u.route({
          //   url: '/pagesSupplier/InvestmentInfo/InvestmentDetail',
          //   params: { id: this.recommendedGoods.goods.id, wid: this.recommendedGoods.goods.wid },
          // })
          this.$u.route({
            url: '/pagesAgent/InvestmentList/ProjectDetails',
            params: { id: this.recommendedGoods.goods.id, queryType: 'L' },
          })
        } else {
          if (this.userInfo.platformCode === 'agent') {
            this.toOrder()
          } else if (this.userInfo.platformCode === 'garage') {
            this.goConfirmOrder()
          }else if (this.userInfo.platformCode === 'oldMachine') {
            this.goOldMachineOrder()
          }
        }
        this.isShowAssociatedGoods = false
      },
      //跳转投资提交订单
      async toOrder() {
        let res = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({
          id: this.recommendedGoods.goods.id,
          companyId: this.userInfo.companyId,
        })
        let dataObj = res.data
        dataObj.queryType = this.roomInfo.investType
        if (dataObj.isbuy === 1) {
          this.$u.toast('当前区域不支持投资，去看看其他项目吧')
          return
        }
        if (Number(dataObj.status) != 1) {
          this.$u.toast('商品已经抢光了，下次早点来哦')
          return
        }
        if (Number(dataObj.remainingAvailable) < 1) {
          this.$u.toast('库存不足，暂不支持参与')
          return
        }
        if (
          dataObj.alreadyInvestedNum >= dataObj.totalInvestment ||
          dataObj.remainingAvailable < dataObj.startNumber
        ) {
          this.$u.toast('库存不足')
          return
        }
        if (dataObj.remainingAvailable < 1) {
          uni.$u.toast('库存不足')
          return
        }
        if (dataObj.totalInvestment <= dataObj.alreadyInvestedNum) {
          uni.$u.toast('购买数量已经达到上限')
          return
        }
        //L本地投资A全国投资
        if (this.roomInfo.investType === 'L') {
          let data = [
            {
              shopUserId: dataObj.userId,
              platformCode: dataObj.platformCode,
              shopId: dataObj.goodsGoodsShopInfoVO.shopId,
              shopName: dataObj.goodsGoodsShopInfoVO.name,
              cartWarehouseList: [
                {
                  warehouseName: dataObj.warehouseName,
                  warehouseId: dataObj.warehouseId,
                  cartDetailstList: [
                    {
                      ...dataObj,
                      investmentNum: dataObj.startNumber || 1,
                      pricture: dataObj.detailPic,
                      isCash: true,
                      investmentId: dataObj.id,
                    },
                  ],
                },
              ],
            },
          ]
          this.$storage.set('investGoodsData', data)
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrders?queryType=L')
        } else {
          this.$storage.set('projectData', dataObj)
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrdersCountry')
        }
      },
      /**
       * @description 旧机买家商品详情
       */
      goOldMachineOrder(){
        console.log(this.recommendedGoods,"wwwwwwwwwwwwwww")
        this.$linkToEasy(`/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=`+this.recommendedGoods.goods.id+'&source=false')
      },
      /**
       * 去修理厂提交订单
       */
      goConfirmOrder() {
        console.log('recommendedGoods', this.recommendedGoods)
        this.$VoHttp.GOODS.apiGoodsGarageDetail({
          goodsId: this.recommendedGoods.goods.id,
          warehouseId: this.recommendedGoods.goods.warehouseId,
          companyId: this.userInfo.companyId,
        })
          .then((res) => {
            let goodsDetail = res.data
            // 组装需要的数据
            const orderProductInfo = {
              shopInfo: {
                shopName: goodsDetail.goodsGoodsShopInfoVO.name,
                buyerId: this.userInfo.companyId,
                userName: this.userInfo.userName,
              },
              goodsInfo: {
                orgGoodsId:goodsDetail.orgGoodsId,
                addedServices: [],
                goodsCount: 1,
                goodsId: this.recommendedGoods.goods.id,
                isCash: true,
                originalPrice: goodsDetail.cashPrice,
                projectId: '',
                shippingType: goodsDetail.shippingType || 2, // 1 包邮 2 到付
                periodDays: goodsDetail.accountPeriodDays || 0,
                codingPrice: goodsDetail.codingPrice,
                shopId: goodsDetail.goodsGoodsShopInfoVO.shopId,
                skuProperty: JSON.stringify(goodsDetail.skuProperty || {}),
                warehouseId: goodsDetail.warehouseId,
                warehouseName: goodsDetail.warehouseName,
                deliveryAreaName: goodsDetail.deliveryAreaName,
                arrivalTime: goodsDetail.arrivalTime,
                pic: goodsDetail.pic,
                name: goodsDetail.name,
                tradeInFee: goodsDetail.tradeInFee, //回收费用
                installationFee: goodsDetail.installationFee, //安装费用
                categoryType: goodsDetail.categoryType,
                installFee: goodsDetail.installFee, //安装费用
                isCoding: false,
                originCoding: goodsDetail.isCoding,
                isInstall: false,
                isNew: false,
                modelName: goodsDetail.modelName,
              },
            }
            this.$storage.set('ProductInfo', orderProductInfo)
            this.$linkToEasy(`/pagesGarage/ShopList/SubmitOrders`)
          })
          .catch((e) => {
            this.$u.toast(e?.message || '服务错误')
          })
      },
      OnScroll(e) {
        // this.scrollTop = e.detail.scrollTop
      },
      setScrollTo() {
        console.log('页面跳动')
        const query = uni.createSelectorQuery().in(this)
        let middleHight = ''
        query
          .select('.chat-middle')
          .boundingClientRect((data) => {
            middleHight = data.height
          })
          .exec()
        query
          .select('#chat-middle-List')
          .boundingClientRect((data) => {
            console.log(middleHight, data.height)
            if (this.scrollTop < data.height && data.height > middleHight) {
              this.$nextTick(() => {
                this.scrollTop = data.height
              })
            }
          })
          .exec()
      },
      /**
       * 点击查看
       */
      checkClick() {
        uni.$u.toast('查看')
      },
      focusFn(e) {
        console.log(e);
        this.safeareaShow = false
        this.featur = false
        //this.scrollTop = -1
        this.setScrollTo()
      },
      blurFn() {
        this.safeareaShow = true
        this.featur = false
      },
      sendFn(event) {
        console.log(this.valueText)
        //过滤空格
        let valueNew = this.valueText.replace(/\s+/g, '')
        console.log(valueNew)
        if (!valueNew) {
          return
        }
        const timestamp = (new Date().getTime() / 1000).toFixed(0)
        // console.log(this.$vocenApi.VoUtils.timeFormat(1648699440000), 'sss')
        const times = this.$vocenApi.VoUtils.timeTransfer(timestamp)
        console.log(this.$vocenApi.VoUtils.timeTransfer(timestamp), '5555')

        this.valueText = valueNew
        this.newMessage.push({
          time: times,
          msg: valueNew,
        })
        this.valueText = ''
        let data = {
          bubbleType: 'right',
          type: 'text',
          content: valueNew,
          photo: '/static/demo/IMG_9326.HEIC.JPG',
          isCompany: this.roomInfo.isCompany ? true : false,
        }

        console.log('sendFn', data,this.prodParams)
        imCtx.sendImMessage(data)
        if (this.prodParams.businessCode == 1) {
          this.intelligentMatching(valueNew)
        }
      },
      expression() {
        this.face = !this.face
      },
      addFeatur() {
        this.featur = !this.featur
        this.recording = false
        if (this.featur) {
          this.setScrollTo()


          //获取商品信息
          this.sendGoodsList = []
          this.pages.pageNo = 1
          this.getGoodsList()
        }

      },
      auxiliaryFunction(info) {
        switch (info.type) {
          case 4:
            this.goodsShow = true
            break
          case 5:
            this.orderShow = true
            break
          default:
            this.chooseImageVideo(info.type)
            break
        }
      },

      // 点击语音图标
      async vocieFn() {
        let a
        if (uni.getSystemInfoSync().platform == 'ios') {
          // console.log(permissionStatus)
          console.log(a)
          var avaudiosession = plus.ios.import('AVAudioSession')
          var avaudio = avaudiosession.sharedInstance()
          await avaudio.requestRecordPermission((res) => {
            console.log('回调完成', res)
            const status = avaudio.recordPermission()
            if (+status !== 1684369017 && +status !== 1970168948) {
              this.recording = !this.recording
              this.featur = false
              if (this.recording) {
                this.setScrollTo()
              }
            }
          })
          a = await permission.judgeIosPermission('record')
          if (!a) {
            return
          } else {
            this.recording = !this.recording
            this.featur = false
            if (this.recording) {
              this.setScrollTo()
            }
          }
        } else {
          a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
          console.log(a)
          if (!a) {
            return
          } else if (a === -1) {
            uni.showModal({
              title: '提示',
              content: '请去设置打开麦克风权限',
              success: function (res) {
                if (res.confirm) {
                  permission.gotoAppPermissionSetting()
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
            })
            return
          } else {
            this.recording = !this.recording
            this.featur = false
            if (this.recording) {
              this.setScrollTo()
            }
          }
        }
      },
      // 发送语音
      recordConfirmFn(path, duration) {
        if (this.isLoading) return
        this.isLoading = true
        console.log('duration', duration)
        uploadMp3({ url: path, name: 'audio.mp3', isPath: true }, { noLoading: true })
          .then((res) => {
            this.isLoading = false
            this.recording = false
            console.log(res)
            let shopInfo = {
              type: 'voice',
              content: res,
              id: new Date().getTime(),
            }
            console.log('shopInfo', shopInfo)
            imCtx.sendImMessage(shopInfo)
          })
          .catch((err) => {
            this.isLoading = false
            console.log('err', err)
          })
      },

      open() {
        // this.sendGoodsList = []
        // this.pages.pageNo = 1
        // this.getGoodsList()
      },
      close() {
        this.goodsShow = false
        // console.log('close');
      },
      // 选择商品 发送商品信息
      sendShop(info) {
        if (!this.isSendGoods && info) {
          this.isSendGoods = true
          console.log(info)
          let pic = info.pic
          let shopInfo = {
            type: 'prod',
            content: {
              prod_name: info.name,
              categoryType: info.categoryType,
              price: info.cashPrice,
              img: pic,
              id: info.id,
              type: 'goods',
              goodsType: info.goodsType,
              warehouseId: info.warehouseId,
              businessCode: this.prodParams.businessCode,
            },
          }
          imCtx.sendImMessage(shopInfo)
        }
      },
      // 商品模块下来加载
      scrolltolower() {
        this.pages.pageNo++
        this.getGoodsList()
      },
      orderClose() {
        this.orderShow = false
      },
      // 选择订单发送订单
      selectOrder(info) {
        if (info) {
          let pic = info.goodsDetail[0].pic ? info.goodsDetail[0].pic : []
          let shopInfo = {
            type: 'order',
            content: {
              prod_name: info.goodsDetail[0].goodsName,
              categoryType: info.goodsDetail[0].categoryType,
              price: info.goodsDetail[0].payPrice,
              img: pic[0],
              id: info.id,
              createTime: info.createTime,
              type: 'order',
              status: info.status,
              orderType: info.orderType,
              periodDays: info.goodsDetail[0].periodDays, // 账期天数
              goodsCount: info.goodsDetail.goodsCount,
              businessCode: this.prodParams.businessCode,
            },
            leixing:
              this.prodParams.businessCode == 2
                ? this.prodParams.friendPlatformCode
                : this.currentUserInfo.platformCode,
          }
          imCtx.sendImMessage(shopInfo)
        }
        this.orderClose()
      },
      async _init_func() {
        // 这个地方以后做本地缓存获取本地保存数据
        this.pageNo = 1
        this.showMessageList = []

        imCtx.setSendInfo({
          id: this.roomInfo.targetId,
          type: this.roomInfo.platformCode, //非同类不允许聊天，所以不需要对方的
          name: '',
          avatar: '',
        })
        console.log(imCtx)
        // 设置接受人的信息
        imCtx.setReceiveInfo({ id: this.roomInfo.targetId, type: this.roomInfo.platformCode })
        imCtx.clearHistory()
        imCtx
          .getHistory(
            this.roomInfo.targetId,
            this.roomInfo.platformCode,
            this.pageNo,
            this.pageSize,
          )
          .then((res) => {
            this.msgTotal = res.total
            //后台返回数据是倒序，前端改为正序
            let data = res.historyList.reverse()
            this.showMessageList = this.showMessageList.concat(data)

            this.$nextTick(() => {
              this.setScrollTo()

              // 如果进来需要发消息 多存一个字段就行了   shopInfo
              if (this.roomInfo.shopInfo) {
                imCtx.sendImMessage(this.roomInfo.shopInfo)
              }
              // 发送多个消息
              if (this.roomInfo.shopInfoTwo) {
                imCtx.sendImMessage(this.roomInfo.shopInfoTwo)
              }

              // 识别喊那边跳转过来的数据
              if (this.roomInfo.videoVoiceData) {
                let shopInfo = {
                  type: 'voice',
                  content: this.roomInfo.videoVoiceData,
                  id: new Date().getTime(),
                }
                console.log('shopInfo', shopInfo)
                imCtx.sendImMessage(shopInfo)
                // 一分钟没有新消息
                let time = 0
                let reply = false
                let interval = setInterval(() => {
                  time++
                  let lastMessage = this.showMessageList[this.showMessageList.length - 1]
                  if (lastMessage && lastMessage.direction === 'from') {
                    reply = true
                    clearInterval(interval)
                  }
                  console.log(time, lastMessage)
                  if (time == 60) {
                    clearInterval(interval)
                    console.log(reply)
                    if (!reply) {
                      goOnlineCustomerFn()
                    }
                  }
                }, 1000)
              } else if (this.roomInfo.picData) {
                let obj = Object.assign({}, this.roomInfo.picData)
                obj.fileNameUrl = this.roomInfo.picData.filePath
                let shopInfo = {
                  type: 'image',
                  content: obj,
                  id: new Date().getTime(),
                }
                console.log('shopInfo', shopInfo)
                imCtx.sendImMessage(shopInfo)
                // 五分钟没有新消息
                let time = 0
                let reply = false
                let interval = setInterval(() => {
                  time++
                  let lastMessage = this.showMessageList[this.showMessageList.length - 1]
                  if (lastMessage && lastMessage.direction === 'from') {
                    reply = true
                    clearInterval(interval)
                  }
                  if (time == 300) {
                    clearInterval(interval)
                    console.log(reply)
                    if (!reply) {
                      goOnlineCustomerFn()
                    }
                  }
                }, 1000)
              }
            })
          })
      },
      //顶部加载
      scrolltoupperMsg() {
        console.log('顶部加载')
        if (this.showMessageList.length >= this.msgTotal) {
          return false
        }
        this.pageNo++
        imCtx
          .getHistory(
            this.roomInfo.targetId,
            this.roomInfo.platformCode,
            this.pageNo,
            this.pageSize,
          )
          .then((res) => {
            this.msgTotal = res.total
            //后台返回数据是倒序，前端改为正序
            let data = res.historyList.reverse()
            //头部插入数据
            this.showMessageList.unshift.apply(this.showMessageList, data)
            console.log('showMessageList顶部加载', this.showMessageList)
          })
      },

      getBusinessCode(info) {
        // sellerOrBuyer //聊天关系 0：普通聊天  1：我是买家  2：我是卖家
        if (info.sellerOrBuyer == 0) {
          this.addList = this.addList.slice(0, 3)
        }
        if (
          info.platformCode == 'agent' &&
          info.targetPlatformCode == 'garage' &&
          !this.roomInfo.goods
        ) {
          this.getAgentShop()
        } else if (info.sellerOrBuyer != 2) {
          this.pushType = 'goods'
          //this.isShowAssociatedGoods = true;
        }
        this.prodParams = {
          businessCode: info.sellerOrBuyer, // //聊天关系 0：普通聊天  1：我是买家  2：我是卖家
          friendPlatformCode: info.targetPlatformCode, // 聊天对象用户角色
          friendId: info.targetId, // 聊天对象用户id
        }
        console.log(this.prodParams)
      },

      // 服务商跟修理厂聊天的时候 判断是否是所属的修理厂 服务商页面显示代客下单
      async getAgentShop() {
        try {
          let params = {
            targetPlatformCode: this.roomInfo.platformCode,
            targetUserId: this.roomInfo.targetId,
          }
          const { data, code } = await this.$VoHttp.IM.apiImMyAttentionAgentShop(params)
          if (code == '20001' && data.agentStatus) {
            this.pushType = 'order'
            this.isShowAssociatedGoods = true
            this.garageInfo = {
              targetCompanyId: data.targetCompanyId,
              areaCode: data.areaCode,
            }
          }
        } catch (e) {
          console.log(e)
        }
      },

      // 获取店铺商品信息
      async getGoodsList() {
        try {
          let tastParams = {
            ...this.prodParams,
            ...this.pages,
          }
          const { data, code } = await this.$VoHttp.IM.apiGoodsQueryGoodsByUser(tastParams, {
            noLoading: true,
          })
          if (code == '20001') {
            //后端说item.pic不存在JSON字符串
            // let list = data.records
            // list.forEach((item) => {
            //   if (item.pic && item.pic instanceof Array) {
            //     let arr = JSON.parse(item.pic)
            //     let str = arr[0].split('.').pop()
            //     if (str === 'mp4') {
            //       item.pic = arr[0] + '&type=3'
            //     } else {
            //       item.pic = arr[0]
            //     }
            //   }
            // })
            this.sendGoodsList = this.sendGoodsList.concat(data.records)
            console.log('data.sendGoodsList', sendGoodsList)
          }
        } catch (e) {}
      },

      // 商品智能匹配
      async intelligentMatching(goodsName) {
        try {
          let tastParams = {
            goodsName: goodsName,
            ...this.prodParams,
            pageNo: 1,
            pageSize: 10,
          }
          const { data, code } = await this.$VoHttp.IM.apiGoodsQueryGoodsByUser(tastParams, {
            noLoading: true,
          })
          if (code == '20001') {
            let list = data.records ? data.records : []
            if (list.length > 0) {
              list &&
                list.forEach((item) => {
                  if (item.pic) {
                    let str = item.pic.split('.').pop()
                    if (str === 'mp4') {
                      item.pic = item.pic + '&type=3'
                    } else {
                      item.pic = item.pic
                    }
                  }
                  console.log(item.pic)
                })
              this.recommendedGoods.goods = list[0]
              this.pushType = 'goods'
              this.isShowAssociatedGoods = true
            }
            console.log(this.recommendedGoods, list)
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 选择图片上传图片上传视频
      async chooseImageVideo(type) {
        // type  1 拍照 2相册 3短视频
        if (type == 1 || type === 2) {
          let sourceType = type == 1 ? 'camera' : 'album'
          const uploadData = await chooseImageByPromise({
            sourceType,
            isTencentCloud: false,
            count: 1,
          })
          console.log(uploadData, '这是图片信息')
          let shopInfo = {
            type: 'image',
            content: uploadData[0],
          }
          imCtx.sendImMessage(shopInfo)
        } else {
          const uploadData = await chooseVideoByPromise({
            camera: 'camera',
            isTencentCloud: false,
            count: 1,
          })
          let shopInfo = {
            type: 'video',
            content: uploadData[0],
          }
          imCtx.sendImMessage(shopInfo)
        }
      },
      // 添加进去聊天列表
      async addMessageListSave() {
        try {
          let params = {
            targetId: this.roomInfo.id || this.roomInfo.targetId,
            targetRoleCode: this.roomInfo.platformCode,
            type: 0, // 聊天对象0：人  1：群
          }
          const { code, data } = await this.$VoHttp.IM.apiImMessageListSave(params)
          if (code == '20001') {
            console.log(data, 'save的数据')
            this.$store.commit('im/setTargetInfo', {
              photoUrl: data.photoUrl,
              nickName: data.targetNickName || data.targetName,
              targetId: data.targetId,
            })
            this.head.from = this.targetInfo.photoUrl
            this.getBusinessCode(data)
            // 进入聊天列表，设置未读消息为0
            this.$store.dispatch('im/clearNotReadNum', params)
          }
        } catch (e) {
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
        }
      },

      async resend(data = { info: {}, index: null }) {
        // 重新发送消息
        console.log(data.index, this.showMessageList)
        if (data.index != null) {
          this.showMessageList.splice(data.index, 1)
        }
        imCtx.resendMessage({ info: data.info, index: data.index })
      },
    },
    onUnload() {
      // 清空接受人消息
      imCtx.clearReceiveInfo()
      // 设置未读消息为0
      let params = {
        targetId: this.roomInfo.id || this.roomInfo.targetId,
        targetRoleCode: this.roomInfo.platformCode,
        type: 0, // 聊天对象0：人  1：群
      }
      this.$store.dispatch('im/clearNotReadNum', params)
      uni.offKeyboardHeightChange((res) => {
        console.log(res);
      })
    },
    onLoad() {
      // 获取系统信息
      this.sys = uni.getSystemInfoSync()
      uni.onKeyboardHeightChange((res) => {
        console.log(res);
        if (res.height) {
          this.keyBordHeight = res.height + 'px'
        } else {
          this.keyBordHeight = 0
        }
      })
      //createTime	string 非必须 创建时间 format: date-time
      //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
      //id	integer 非必须 对话框id format: int64
      //targetId	integer 非必须 目标人id或者群id format: int64
      //userId	integer 非必须 用户id
      //version	integer 非必须 数据版本
      imCtx = this.$store.getters['im/GET_IMCTX'] // 获取im
      this.roomInfo = this.$storage.get('temp_im_room_info') // 对方的信息
      console.log('this.roomInfo', this.roomInfo)
      this.currentUserInfo = this.$store.getters['user/getUserInfo']() // 我的信息
      if (this.$utils.checkIsEmpty(this.roomInfo)) {
        return this.$alert('房间信息错误')
      }

      this.addMessageListSave()
      this._init_func()
      uni.$off('showMessageListAdd')
      uni.$on('showMessageListAdd', ({ msg }) => {
        if (msg.type == 'prod') {
          this.isSendGoods = false
          this.close()
        }
        this.showMessageList.push(msg)
        this.$nextTick(() => {
          setTimeout(() => {
            this.setScrollTo()
          }, 500)
        })
      })

      // 消息撤回处理
      uni.$off('showMessageListRollback')
      uni.$on('showMessageListRollback', ({ msg }) => {
        this.showMessageList.map((item) => {
          if (item.id == msg.id) {
            item.messageType = msg.messageType
            item.type = msg.type
          }
        })
      })

      // 重新选择
      uni.$on('toChoose', ({ type }) => {
        if (type == 'order') {
          this.orderShow = true
        } else {
          this.goodsShow = true
        }
      })
    },

    onShow() {},
  }
</script>

<style lang="scss" scoped>
  .chat {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    &-nav {
      height: 88rpx;
      background: #ffffff;
      padding: 0 32rpx;
      &__note {
        font-size: 32rpx;
        font-weight: bold;
        color: $v-c0-85;
        text-align: center;
      }
      .companyName {
        width: 100%;
        font-weight: 400;
        font-size: 20rpx;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
      }
      .nickName {
        width: 100%;
      }
    }
    &-middle {
      box-sizing: border-box;
      width: 100%;
      flex: 1;
      overflow: hidden;
      &-List {
        padding: 0 16rpx;
        padding-bottom: 40rpx;
      }
      &__bubble {
        margin-top: 40rpx;
        align-items: flex-start;
        &:last-child {
          margin-bottom: 40rpx;
        }
        &.align-items {
          align-items: center;
        }
      }
    }
    .open-featur {
      height: calc(100% - 640rpx);
    }
    &-icon {
      width: 56rpx;
      height: 56rpx;
      margin-right: 20rpx;
      margin-top: 8rpx;
      display: block;
    }
    &-bottom {
      //width: 750rpx;
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;

      position: relative;
      &__text {
        //width: 480rpx;
        flex: 1;
        background: #f7f7f8;
        padding: 18rpx;
        border-radius: 16rpx;
        border-top: 2rpx solid $v-bg-light;
        max-height: 240rpx;
        ::v-deep .uni-textarea-wrapper {
          max-height: 240rpx;
          .uni-textarea-textarea {
            overflow: auto !important;
          }
        }
      }
      &__fixed {
        height: 50rpx;
      }
    }
    &-flex {
      padding: 20rpx 24rpx;
    }
    &-add {
      &__top {
        height: 20rpx;
        background: #ffffff;
      }
      &__box {
        background: #fff;
        padding: 32rpx 0 0 48rpx;
        border-top: 2rpx solid $v-bg-light;
        .box-adds {
          margin-right: 40rpx;
          margin-bottom: 24rpx;
          //&:first-child {
          //  margin-left: 48rpx;
          //}
          &__block {
            width: 128rpx;
            height: 128rpx;
            border-radius: 16rpx;
            //background: #f6f7f8;
          }
          &__ann {
            font-size: 24rpx;
            margin-top: 14rpx;
            width: 100rpx;
            text-align: center;
            color: $v-c0-85;
          }
        }
      }
    }
    .send-text {
      width: 122rpx;
      height: 64rpx;
      line-height: 64rpx;
      font-size: 24rpx;
      text-align: center;
      color: #fff;
      background: #ff5319;
      border-radius: 30rpx;
    }
  }
  .height-safearea {
    height: 0rpx !important;
  }
  .padding-bottom {
    padding-bottom: 0;
  }
  .bottom-margin {
    margin-bottom: 30rpx;
  }
  .right-margin {
    margin-right: 30rpx;
  }
  .left-margin {
    margin-left: 20rpx;
  }

  .substitute__scroll {
    height: 800rpx;
  }

  // 安全区域
  .safearea-box {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    width: 100%;
    background: #ffffff;
  }
  .goods-title {
    padding: 24rpx 32rpx;
    border-bottom: 2rpx solid $v-bg-light;
  }
</style>
