<template>
  <view>
    <view v-if="orderData" class="detail flex flex-column color-block fz-28">
      <!-- 3210待付款,3230待接单,3231待指派 3240待安装,3250安装中,3260已完成 3270取消 3280关闭-->
      <VoNav is-fixed is-have-more>
        <view slot="title">
          <!-- 根据状态判断title -->
          <view class="flex flex-justify-c flex-vertical-c">
            <block v-if="type === 3210">
              <VoIcon :size="28" color="#FF5319" name="Wait-fill" />
              <text class="m-l-8 color-block-yellow">等待付款</text>
            </block>
            <block v-if="type === 3230">
              <VoIcon :opacity="0.85" :size="28" color="#fff" name="clock-new" />
              <text class="m-l-8">待接单</text>
            </block>
            <block v-if="type === 3231">
              <VoIcon :opacity="0.85" :size="28" color="#fff" name="clock-new" />
              <text class="m-l-8">待指派</text>
            </block>
            <block v-if="type === 3240">
              <VoIcon :opacity="0.85" :size="28" color="#fff" name="clock-new" />
              <text class="m-l-8">待安装</text>
            </block>
            <block v-if="type === 3250">
              <VoIcon :opacity="0.85" :size="28" color="#fff" name="clock-new" />
              <text class="m-l-8">安装中</text>
            </block>
            <block v-if="type === 3260">
              <VoIcon :opacity="0.85" :size="28" color="#fff" name="success-circle" />
              <text class="m-l-8 color-block-85">已完成</text>
            </block>
            <block v-if="type === 3270">
              <VoIcon :opacity="0.85" :size="28" color="#000" name="warning" />
              <text class="m-l-8">已取消</text>
            </block>
            <block v-if="type === 3280">
              <VoIcon :opacity="0.85" :size="28" color="#000" name="warning" />
              <text class="m-l-8">已关闭</text>
            </block>
          </view>
        </view>
      </VoNav>
      <view class="flex1 overflow-y">
        <!-- 待付款 -->
        <view v-if="type === 3210">
          <view class="m-t-24 m-b-16 flex flex-justify-c">
            <view>需付款:</view>
            <VoPointPrice :price="orderData.supportAmount" color="rgba(0, 0, 0, 0.85)" show-unit />
            <block v-if="orderData.supportSource === 1">
              <view class="m-l-32">剩余时间: </view>
              <u-count-down :time="downData" @change="onChange">
                <view class="time">
                  <text class="time__item">
                    <text v-if="timeData.hours">{{
                      timeData.hours > 10 ? timeData.hours : '0' + timeData.hours
                    }}</text>
                    <text v-else>00</text>
                    小时</text
                  >
                  <text class="time__item">{{ timeData.minutes || '00' }}分钟</text>
                </view>
              </u-count-down>
            </block>
          </view>
          <view v-if="orderData.supportSource === 1" class="flex flex-justify-c">
            <!--            <EraButton class="m-b-32 fz-24" size="mini" theme-type="Primary" @click="payClick"-->
            <!--              >去支付</EraButton-->
            <!--            >-->
            <view class="detail-button" @click="payClick">去支付</view>
          </view>
        </view>
        <!-- 待接单 -->
        <view v-if="type === 3230" class="m-t-24 m-b-48 flex flex-justify-c">
          等待集师傅接单中
        </view>
        <!-- 待指派 -->
        <view v-if="type === 3231" class="m-t-24 m-b-48 flex flex-justify-c">
          等待平台指派集师傅
        </view>
        <!-- 已取消 -->
        <view v-if="type === 3270" class="m-t-24 m-b-48 flex flex-justify-c px-32">
          取消原因：{{ orderData.cancelReason || '--' }}
        </view>
        <!-- 已关闭 -->
        <view v-if="type === 3280" class="m-t-24 m-b-48 flex flex-justify-c">
          关闭原因：安装未完成
        </view>
        <!--已取消,已关闭  -->
        <view
          v-if="(type === 3270 || type === 3280) && orderData.refundProgress"
          class="info bg-white m-t-16"
        >
          <view
            class="title fz-32 border-bottom p-b-24 flex flex-justify-between"
            @click="cancelProgress"
          >
            <view>退款进度</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="m-t-24">您的订单已取消，可查看退款进度详情</view>
        </view>
        <!-- 已完成 -->
        <view v-if="type === 3260" class="bg-white m-t-16">
          <view class="info flex flex-vertical-c p-b-24 border-bottom">
            <image class="sys-img m-r-8" src="/static/default_avatar.png" />
            <view class="flex1">
              <view class="font-weight-500">
                集师傅：{{ orderData.orderEvaluateVO.masterName }}
              </view>
              <view class="fz-24 color-block-45">
                好评率：{{ orderData.orderEvaluateVO.favorableComment }}
              </view>
            </view>
          </view>
        </view>
        <!-- 安装中 -->
        <view v-if="type === 3250" class="bg-white m-t-16">
          <view class="info flex flex-vertical-c p-b-24 border-bottom">
            <image class="sys-img m-r-8" src="/static/default_avatar.png" />
            <view class="flex1">
              <view class="font-weight-500">
                集师傅：{{ orderData.orderEvaluateVO.masterName }}
              </view>
              <view class="fz-24 color-block-45">
                好评率：{{ orderData.orderEvaluateVO.favorableComment }}
              </view>
            </view>
          </view>
          <view class="flex p-t-24 p-b-24">
            <view class="flex1 flex flex-justify-c" @click="callPhone()">
              <VoIcon :opacity="0.85" :size="20" class="m-r-8" color="#000000" name="mobile-new" />
              拨打电话
            </view>
            <view class="col-line" />
            <view class="flex1 flex flex-justify-c" @click="toConcat">
              <VoIcon :opacity="0.85" :size="24" color="#000000" name="smile-s" />
              发消息
            </view>
          </view>
        </view>
        <!-- 服务信息 -->
        <view class="info bg-white m-t-16">
          <view class="title fz-32 border-bottom p-b-24">服务信息</view>
          <view class="fz-b m-t-24 m-b-24 fz-28">{{ orderData.supportName }}</view>
          <view class="info-row flex">
            <view class="w140">服务金额：</view>
            <view class="red flex1 fz-b">
              {{ orderData.supportAmount }}元
              <!--              <VoPointPrice :price="orderData.supportAmount" color="#E50012" show-unit />-->
            </view>
          </view>
          <view class="info-row">
            <view>上门时间：{{ upTime }}</view>
          </view>
          <view class="info-row flex">
            <view class="flex1 p-r-24"
              >安装地址：{{ orderAddress.address }}{{ orderAddress.addressDetail }}</view
            >
            <view
              v-if="type !== 3250 && type !== 3270 && type !== 3260 && type !== 3280"
              class="color-blue w60"
              @click="toEdit()"
              >修改</view
            >
          </view>
        </view>
        <!-- 完成情况 安装中，已完成 -->
        <view
          v-if="(type === 3250 || type === 3260) && orderData.supportQuality"
          class="info bg-white m-t-16"
        >
          <view class="title fz-32 border-bottom p-b-24">完成情况</view>
          <view class="m-t-24 m-b-16">安装完成视频：</view>
          <view v-if="orderData.supportQuality" class="video-container">
            <view
              v-for="(item, index) in orderData.finishVideo.pic"
              :key="index + '1'"
              class="video-box"
              @click="choseVideo(item)"
            >
              <image :src="item.poster" class="video-box__img" />
              <image class="video-box__paly" src="/static/created/circle/circle_video_play.png" />
            </view>
          </view>
          <view v-if="hours > 0 || min > 0" class="info-row m-t-16">
            <view>安装时长：{{ hours || 0 }}小时{{ min }}分钟</view>
          </view>
        </view>

        <!--   服务评价start   -->
        <ServiceEvaluation v-if="orderData.installEvaluate" :info="orderData" class="m-t-16" />
        <!--   服务评价end   -->
        <!-- 购机订单 -->
        <view class="info bg-white m-t-16">
          <view
            class="title fz-32 border-bottom p-b-24 flex flex-justify-between"
            @click="toOrderDetail()"
          >
            <view>购机订单</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="info-row m-t-24">
            <view
              >商品名称：<text v-show="goodsDetail.categoryType" class="good-tips m-r-8">{{
                goodsDetail.categoryType
              }}</text
              >{{ goodsDetail.goodsName }}</view
            >
          </view>
          <!-- 待付款、已取消、已关闭三种状态没有 -->
          <view v-if="type !== 3210 && type !== 3270 && type !== 3280" class="info-row">
            <block v-if="orderData.engineNo && orderData.engineNo.length">
              <view>发动机识别码：{{ orderData.engineNo[0] }}</view>
            </block>
            <block v-else>发动机识别码：暂无</block>
          </view>
        </view>
        <!--   订单信息   -->
        <OrderInfo :info="orderData" />
      </view>
      <!-- 3210待付款,3230待接单,3231待指派 3240待安装,3250安装中,3260已完成 3270取消 3280关闭-->
      <view>
        <view :class="{ btm: type !== 3270 }" class="flex flex-justify-r bg-white">
          <!--待付款, 待接单, 待安装, 待指派-->
          <view
            v-if="
              type === 3210 ||
              type === 3230 ||
              type === 3231 ||
              (type === 3240 && orderData.homeStartTime > nowDate)
            "
            @click.stop="toCancel()"
          >
            <EraButton class="m-l-20" size="height-mini" theme-type="Default">取消订单</EraButton>
          </view>
          <!-- 待付款, 待接单, 待指派 -->
          <view v-if="type === 3210 || type === 3230 || type === 3231" @click.stop="toEdit()">
            <EraButton class="m-l-20" size="height-mini" theme-type="Default"> 修改订单 </EraButton>
          </view>
          <!-- 待付款 -->
          <view v-if="type === 3210 && orderData.supportSource === 1" @click.stop="payClick()">
            <EraButton class="m-l-20" size="height-mini">去支付</EraButton>
          </view>
          <!-- 待安装,待指派 -->
          <view
            v-if="(type === 3240 && orderData.homeStartTime > nowDate) || type === 3231"
            @click.stop="goImUrl()"
          >
            <EraButton class="m-l-20" size="height-mini" theme-type="Default">联系客服</EraButton>
          </view>
          <!-- 待安装超时 -->
          <view
            v-if="orderData.orderStatus === 3240 && orderData.homeStartTime <= nowDate"
            @click.stop="toWait()"
          >
            <EraButton class="m-l-20" size="height-mini" theme-type="Default">继续等待</EraButton>
          </view>
          <view
            v-if="orderData.orderStatus === 3240 && orderData.homeStartTime <= nowDate"
            @click.stop="toNoWait()"
          >
            <EraButton class="m-l-20" size="height-mini" theme-type="Default">不等待</EraButton>
          </view>
          <!--安装中,已完成  -->
          <view v-if="type === 3250 || type === 3260" @click.stop="goImUrl('1')">
            <EraButton class="m-l-20" size="height-mini" theme-type="Default">投诉</EraButton>
          </view>
          <!--安装中  -->
          <view v-if="type === 3250" @click.stop="toFinish()">
            <view class="long-button">确认安装完成</view>
            <!--   <EraButton class="m-l-20" size="height-mini" theme-type="Wire">确认安装完成</EraButton>-->
          </view>
          <!-- 已完成 -->
          <view v-if="type === 3260 && !orderData.installEvaluate" @click.stop="toEvaPage()">
            <EraButton class="m-l-20" size="height-mini" theme-type="Wire">评价</EraButton>
          </view>
        </view>
        <VoSafetyArea v-if="type !== 3270" :is-fixed="false"></VoSafetyArea>
      </view>
    </view>
    <CancelInstallOrder :show="showCancel" @close="showCancel = false" @confirm="cancelOrder">
      <view
        v-if="cancelData.penaltyAmount > 0"
        slot="msg"
        class="text-center m-t-40 fz-28 color-red"
      >
        {{ tipMsg }}
      </view>
    </CancelInstallOrder>
    <VoPayPopup :show.sync="showPay" :total-price="orderData.supportAmount" @confirm="payHandler" />
    <EraPreviewVideo ref="EraPreviewVideo" :poster="poster" :videoSrc="videoSrc" />
    <VoHelpAction ref="helpRef" />
    <!--  取消订单确认 -->
    <VoModal
      :show="showModalCancel"
      :showCancelButton="true"
      cancelText="我再想想"
      confirmText="取消订单"
      content="该安装订单为随新机购买生成的订单，如要取消，则将同步取消关联的购买订单"
      @cancel="showModalCancel = false"
      @confirm="confirmCancel"
    />
    <VoModal
      :show="showModalTip"
      :showCancelButton="false"
      confirmText="我知道了"
      content="该安装订单为随新机购买生成的订单，当前关联的购买订单已经发货，无法取消订单"
      @confirm="showModalTip = false"
    />
    <!-- 不等待  -->
    <VoModal
      :show="showModalWait"
      :showCancelButton="true"
      cancelText="取消订单"
      confirmText="需要指派"
      content="是否需要指派其他集师傅继续安装服务？"
      @cancel="waitCancel"
      @confirm="confirmWait"
    />
    <!-- 安装中  -->
    <VoModal
      :content="evaQuestion"
      :show="showModalSatrt"
      :showCancelButton="true"
      cancelText="否"
      confirmText="是"
      @cancel="toEvaPageConfirm(0)"
      @confirm="toEvaPageConfirm(1)"
    />
  </view>
</template>
<script>
  import CancelInstallOrder from './components/CancelInstallOrder'
  import OrderInfo from './components/OrderInfo'
  import {
    appSource,
    goOnlineCustomerFn,
    goWechat,
    hideLoading,
    showLoading,
  } from '@/common/helper'
  import ServiceEvaluation from './components/ServiceEvaluation'

  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'OrderDetail',
    components: { ServiceEvaluation, CancelInstallOrder, OrderInfo },
    data() {
      return {
        //顶部倒计时
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        showCancel: false,
        showPay: false,
        showModalCancel: false,
        showModalTip: false,
        showModalWait: false,
        showModalSatrt: false,

        totalPrice: 0,
        type: '',
        orderId: '',
        orderData: {
          orderEvaluateVO: '',
          timeObj: '',
          finishVideo: { pic: [] },
          // status: 1110,
          // shopName: 'danfihi1',
          // warehouseName: 'zhengzhou',

          // goodsDetail: [
          //   {
          //     status: 1110,
          //     goodsName: '江陵动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)全',
          //     periodDays: 10,
          //     goodsCount: 1,
          //     originalPrice: 0,
          //     pic: ['/static/icons/reduce.png'],
          //     addedServices: [
          //       {
          //         name: '定制服务：',
          //         price: 99,
          //         count: 1,
          //       },
          //     ],
          //   },
          // ],
        }, //订单详情数据
        goodsDetail: '', //商品信息
        installEvaluate: '', //评价信息
        upTime: '',
        //地址信息
        orderAddress: {
          id: '',
          name: '',
          phone: '',
          address: '',
          addressDetail: '',
        },
        videoSrc: '', // 视频链接
        poster: '/static/demo/IMG_3839.JPG', // 视频海报
        hours: 0,
        min: 0,
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
        evaQuestion: '',
        tipMsg: '',
        cancelData: '',
      }
    },
    onLoad(option) {
      this.orderId = option.id
      this.getDetail()
      // if (orderData.status === 1130 || orderData.status === 1140) {
      //   this.getDeliverDetailRequest()
      // }
      // if (option.payType === '1') {
      //   this.payClick()
      // }
      uni.$off('updateSuccess')
      uni.$on('updateSuccess', () => {
        this.getDetail()
      })
    },
    onShow() {},
    methods: {
      /**
       * 拨打电话
       */
      callPhone() {
        console.log('callphone', this.orderData.orderEvaluateVO.phone)
        const phone = this.orderData.orderEvaluateVO.phone
        this.$cellPhone(phone)
      },
      // 联系客服
      goImUrl(key) {
        goOnlineCustomerFn(2)
        // //key有值投诉
        // if (!key) {
        //   goOnlineCustomerFn()
        //   return
        // }
        // helper.showLoading()
        // this.$VoHttp
        //   .apiOrderInstallCommitComplaint({
        //     id: this.orderData.id,
        //     categoryId: 1,
        //     content: '服务不到位',
        //   })
        //   .then(() => {
        //     // const info = {
        //     //   targetId: this.orderData.orderEvaluateVO.masterId,
        //     //   type: 0,
        //     //   note: this.orderData.orderEvaluateVO.masterName,
        //     //   platformCode: 'garage',
        //     // }
        //     // this.$storage.set('temp_im_room_info', info)
        //     // this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        //     goOnlineCustomerFn()
        //   })
        //   .catch((err) => {
        //     this.$u.toast(err.message || '操作失败')
        //     helper.hideLoading()
        //   })
      },
      //跳转到关联订单详情页
      toOrderDetail() {
        this.$linkToEasy(
          `/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=${this.orderData.relationOrderId}`,
        )
      },
      //获取订单详情
      getDetail() {
        this.$VoHttp
          .apiOrderInstallDetail$Id({ id: this.orderId })
          .then((res) => {
            if (res.data) {
              let data = res.data
              this.type = data.orderStatus
              if (res.data.goodsDetail && res.data.goodsDetail.length) {
                this.goodsDetail = res.data.goodsDetail[0]
              }
              //组装时间段
              if (data.homeStartTime && data.homeEndTime) {
                this.upTime =
                  this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
                  '-' +
                  this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
              }
              if (res.data.addressDetail) {
                this.orderAddress = JSON.parse(res.data.addressDetail)
              }
              if (res.data.installEvaluate) {
                this.installEvaluate = res.data.installEvaluate
                this.installEvaluate.content = JSON.parse(res.data.installEvaluate.content)
              }
              //完成情况
              if (data.supportQuality && data.supportQuality.checkMsg) {
                data.finishVideo = JSON.parse(data.supportQuality.checkMsg)
                console.log('data.finishVideo', data.finishVideo)
              }

              //订单信息
              if (data.timeList) {
                //组装各种时间
                // data.timeObj = {}
                // data.timeList.map((item) => {
                //   data.timeObj[item.timeName] = item
                // })
                data.timeList.forEach((item) => {
                  //下单时间
                  if (item.timeName === '下单时间') {
                    data.createOrderTime = item.createTime
                    data.nextStageTime = item.nextStageTime
                  }
                  if (item.timeName === '支付时间') {
                    data.payTime = item.createTime
                  }
                  if (item.timeName === '取消时间') {
                    data.orderCancelTime = item.createTime
                  }
                  if (item.timeName === '接单时间') {
                    data.acceptTime = item.createTime
                  }
                  if (item.timeName === '安装时间') {
                    data.doorTime = item.createTime
                  }
                  if (item.timeName === '完成时间') {
                    data.finishTime = item.createTime
                  }
                  if (item.timeName === '安装完成时间') {
                    data.finishTime = item.createTime
                  }
                })
                // console.log(data.timeObj)
              }

              //计算安装时长
              let hours = this.getHour(data.doorTime, data.finishTime)
              this.hours = Math.floor(hours)
              let h = parseInt(hours)
              let fl = hours.toFixed(2)
              console.log('hours', hours, fl)
              this.min = ((fl - h) * 60).toFixed(0)

              this.orderData = data
              let Time = new Date(this.orderData.nextStageTime)
              let timestemp = Time.getTime()
              this.downData = timestemp - this.newData
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单详情获取失败')
          })
      },
      onChange(e) {
        this.timeData = e
      },
      // 取消订单
      toCancel() {
        //待收货、已完成：此时不可以取消订单，页面上进行弹窗提示
        if (
          (this.orderData.sellOrderStatus === 1130 || this.orderData.sellOrderStatus === 1140) &&
          this.orderData.supportSource === 2
        ) {
          this.showModalTip = true
          return
        }
        // 用户点击【取消订单】后先判断订单来源
        // 订单来源为【来源-销售订单】待付款、待发货：此时可以取消订单，页面上进行弹窗提示
        if (this.orderData.supportSource === 2) {
          this.showModalCancel = true
        } else {
          this.showCancel = true
        }
        //待安装,获取退款数据
        if (this.orderData.orderStatus === 3240) {
          this.getCancelData()
          return
        }
        //待指派
        if (this.orderData.orderStatus === 3231) {
          this.showCancel = true
        }
      },
      //销售订单确认取消
      confirmCancel() {
        this.showModalCancel = false
        this.showCancel = true
        // this.$u.toast('订单已取消，本次取消不扣除违约金，您将收到全额退款')
      },
      //取消订单
      cancelOrder(data) {
        this.$VoHttp
          .apiOrderInstallPayRefund({
            id: this.orderData.id,
            cancelReason: data.renson === '其他' ? data.remark : data.renson,
            source: appSource(), //订单来源(1：安卓，2：ios，3：h5，4：pc 5：小程序 6：公众号)
          })
          .then((res) => {
            uni.$u.toast(`订单取消成功`)
            this.showModalCancel = false
            this.showCancel = false
            this.$backFn()
            // this.getDetail()
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单取消失败')
            this.showModalCancel = false
            this.showCancel = false
          })
      },
      //获取退款数据
      getCancelData() {
        this.$VoHttp
          .apiOrderInstallCancel({ orderId: this.orderData.id })
          .then((res) => {
            console.log('res', res)
            this.cancelData = res.data
            let preDate = new Date(
              new Date(this.cancelData.homeStartTime).getTime() - 24 * 60 * 60 * 1000,
            )
            let preDateValue = this.$vocenApi.VoUtils.timeFormat(preDate, 'yyyy-mm-dd hh:MM:ss')
            console.log('preDateValue', preDateValue)
            let hourNum = this.getHour(this.nowDate, this.cancelData.homeStartTime)
            if (hourNum >= 24) {
              this.tipMsg = `${preDateValue}之前可免费取消`
            } else if (hourNum < 24) {
              this.tipMsg = `距离上门时间不足24小时，现在取消将扣除违约金${this.cancelData.penaltyAmount}元补偿集师傅`
            }
            this.showCancel = true
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
      // 修改订单
      toEdit() {
        this.$linkToEasy('/pagesGarage/InstallOrderUser/EditOrder?id=' + this.orderData.id)
      },
      /**
       * 去支付
       */
      payClick() {
        console.log('zhifu金额', this.orderData.supportAmount)
        // 获取订单
        this.showPay = true
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          source: appSource(),
          userId: that.orderData.buyerId,
          cashAmount: that.orderData.supportAmount,
          accountAmount: 0,
          orderId: that.orderData.id,
        }
        this.$storage.set('OrderPayInfo', req)
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.orderData.id })
                .then(() => {
                  plus.globalEvent.removeEventListener('newintent')
                  that.getDetail()
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .apiOrderInstallPay(req)
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.orderData.id })
              .then(() => {
                vocenPay.voPayRemoveListening()
                that.getDetail()
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      //不需要指派
      waitCancel() {
        this.$u.toast('服务订单已关闭，订单将全额退款')
        this.showModalWait = false
      },
      //需要指派
      confirmWait() {
        //点击后关闭弹窗，显示toast提示信息：已提交申请，等待平台派单。将该订单状态变更为【待指派】
        this.$u.toast('已提交申请，等待平台派单')
        this.showModalWait = false
      },
      //去评价
      toEvaPage() {
        this.$linkToEasy(
          `/pagesGarage/InstallOrder/SendEvaluation?type=order&id=${this.orderData.id}`,
        )
      },
      //跳转和集师傅聊天页面
      toConcat() {
        // this.$refs.helpRef.open()
        const data = {
          targetId: this.orderData.orderEvaluateVO.masterId,
          type: 0,
          note: this.orderData.orderEvaluateVO.masterName,
          platformCode: 'skilledWorker',
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      //继续等待
      toWait() {
        //继续等待,点击后该订单依然为【待安装】状态，显示的可操作按钮为【取消订单】、【联系客服】
        this.$VoHttp
          .apiOrderInstallContinueWait({ id: this.orderData.id })
          .then(() => {
            this.$u.toast('操作成功')
            this.getDetail()
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
          })
      },
      //不等待
      toNoWait() {
        this.showModalWait = true
      },
      toFinish() {
        //确认安装完成
        this.$VoHttp
          .apiOrderInstallConfirm({ id: this.orderData.id })
          .then(() => {
            this.$u.toast('安装服务已结束')
            this.getEvaQuestion()
            // this.getData(true)
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
          })
      },
      //获取无感评价问题
      getEvaQuestion() {
        this.$VoHttp
          .apiOrderNoninductiveEvaluateQuestion({ sourceId: this.orderData.id })
          .then((res) => {
            this.evaQuestion = res.data
            this.showModalSatrt = true
            console.log('获取无感评价问题', res)
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
          })
      },
      //无感评价确认
      toEvaPageConfirm(status) {
        this.$VoHttp
          .apiOrderNoninductiveEvaluateSave({
            sourceId: this.orderData.id,
            sourceType: 2,
            status: status,
            content: this.evaQuestion,
          })
          .then((res) => {
            this.showModalSatrt = false
            this.$linkToEasy(
              `/pagesGarage/InstallOrder/SendEvaluation?type=order&id=${this.orderData.id}`,
            )
            console.log('获取无感评价问题', res)
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
          })
      },
      //取消进度
      cancelProgress() {
        this.$linkToEasy('/pagesGarage/InstallOrder/CancelProgress')
      },
      //复制订单
      copyHandler(code) {
        // 复制操作
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
      },
      /**
       * 预览视频
       */
      choseVideo(data) {
        this.videoSrc = data.src
        this.poster = data.poster
        this.$refs.EraPreviewVideo.show(data.src)
      },
      getHour(s1, s2) {
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return ms / 1000 / 60 / 60 //小时
      },
    },
  }
</script>
<style lang="scss" scoped>
  .detail {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    &-button {
      width: 272rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      background: #ff5319;
      border-radius: 181rpx;
      font-size: 24rpx;
      color: #ffffff;
    }
    .padding-box {
      padding: 28rpx 32rpx;
      box-sizing: border-box;
    }
    .info {
      width: 750rpx;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      .title {
        color: $v-c0-85;
        font-weight: bold;
      }
      .link {
        color: #0d66ff;
      }
      &-row {
        font-size: 28rpx;
        line-height: 42rpx;
        padding-bottom: 16rpx;
        box-sizing: border-box;
      }
      .desc {
        padding-top: 16rpx;
        padding-bottom: 16rpx;
      }
    }
    .btm {
      padding: 22rpx;
      box-sizing: border-box;
    }
    .sys-img {
      width: 64rpx;
      height: 64rpx;
    }
    .border-top {
      border-top: 1px solid #f7f7f8;
    }
    .col-line {
      width: 2rpx;
      height: 36rpx;
      background: #f7f7f8;
    }
    .video-container {
      width: 686rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .video-box {
        width: 33.33%;
        height: 218rpx;
        padding-right: 8rpx;
        padding-top: 8rpx;
        box-sizing: border-box;
        position: relative;

        &:nth-child(3n + 3) {
          padding-right: 0;
        }
        &__img {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }
        &__paly {
          position: absolute;
          height: 120rpx;
          width: 120rpx;
          z-index: 99;
          top: 50rpx;
          left: 50rpx;
        }
      }
    }
  }
  .long-button {
    width: 212rpx;
    height: 80rpx;
    line-height: 80rpx;
    border: 2rpx solid #ff5319;
    box-sizing: border-box;
    border-radius: 114rpx;
    font-size: 28rpx;
    text-align: center;
    color: $v-tags;
    margin-left: 32rpx;
  }
  .serve {
    padding: 24rpx 32rpx;
    &-title {
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-video {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      &__outside {
        position: relative;
        width: 218rpx;
        height: 218rpx;
        .outside-size {
          width: 218rpx;
          height: 218rpx;
          border-radius: 8rpx;
          overflow: hidden;
          display: block;
        }
        .outside-play {
          position: absolute;
          top: 48rpx;
          left: 48rpx;
          z-index: 99;
          width: 120rpx;
          height: 120rpx;
          display: block;
        }
        margin: 16rpx 16rpx 0 0;
        &:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
  .red {
    color: #f20014;
  }
</style>
