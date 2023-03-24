<template>
  <view>
    <view class="good fz-28 color-block">
      <VoNav is-fixed is-have-more title="寄售订单">

      </VoNav>
      <view class="market-top">
        <!--搜索-->
        <view class="market-top__search flex flex-vertical-c">
          <VoSearch
            v-model="searchModel"
            height="34"
            placeholder="请输入搜索"
            borderColor="#FF5319"
            bgColor="#fff"
            :showInsideAction="true"
            @search="orderSearch"
            @custom="orderSearch"
            @input="inputFn"
          />
        </view>
      </view>
      <view class="good-tabs">
        <EraTabs
          :current="current"
          :list="typeList"
          activeStyle="font-weight: bold;color: #FF5319"
          class="tabs"
          inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 28rpx"
          line-color="#FF5319"
          :scrollable="false"
          @change="tabChange"
        />
      </view>
      <swiper :current="current" class="swiper" @change="swiperChange">
        <swiper-item v-for="(item, index) in typeList" :key="index" class="swiper-item">
          <scroll-view
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            :scroll-y="true"
            class="scroll-list"
            refresher-background="#F7F7F8"
            refresher-default-style="none"
            refresher-enabled="true"
            scroll-top="0"
            @refresherabort="onAbort"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
          >
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <block v-if="orderList.length">
              <GoodInfoItem
                v-for="(listItem, listIndex) in orderList"
                :key="listItem.id + listIndex"
                :order-data="listItem"
                @bottomClick="bottomClick"
                @click.native="toDetail(listItem)"
              />
              <vo-loading-text :has-more="orderList.length < total" :loading="isLoading" />
            </block>
            <VoNoData v-else  no-data-tips="没有相关内容" />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!--  发货弹窗  -->
    <VoModal
      :show="showManual"
      title="发货"
      class="position-f"
      closeOnClickOverlay
      confirmColor="#000000"
      confirmText="确定"
      showCancelButton
      @cancel="close"
      @close="close"
      @confirm="confirmDeliverGoods"
    >
      <view class="slot-content w-full">
        <view class="flex flex-justify-c fz-28 color-block-45 m-b-32">请输入发动机识别码</view>
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="modify-form"
          labelPosition="left"
          labelWidth="0"
        >
          <EraFormItem
            class="modify-form__item"
            style="background-color: #f7f7f8; border-radius: 4px"
            color="rgba(0, 0, 0, 0.85)"
            label=""
          >
            <u-input
              v-model.trim="formData.contentManual"
              border="none"
              clearable
              fontSize="18px"
              placeholder="请输入发动机识别码"
              placeholderStyle="font-size: 16px;color: rgba(0, 0, 0, 0.25);"
            />
          </EraFormItem>
        </EraForm>
      </view>
    </VoModal>
  </view>
</template>
<script>
  import GoodInfoItem from './components/DistributionItem'
  import { appSource } from '@/common/helper'

  export default {
    name: 'InstallOrderList',
    components: { GoodInfoItem },
    data() {
      return {
        showManual: false,
        // 编辑内容
        formData: {
          contentManual: '', // 手动输入识别码
          content: '',
        },
        // 表单验证
        rules: {
          contentManual: {
            type: 'string',
            required: true,
            message: '识别码不可为空',
            trigger: ['blur'],
          },
          content: {
            type: 'string',
            required: true,
            message: '识别码不可为空',
            trigger: ['blur'],
          },
        },

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        isLoading: false,
        current: 0,
        typeList: [],
        orderList: [],
        orderStatus: '0',
        searchModel: '',
        orderId:'',//点击发货，订单id
      }
    },
    watch: {},
    onLoad(options) {
      this.origin = options.origin || '' //home从首页跳转
      uni.$on('updateOrderList', (res) => {
        options.origin === null
        this.getOrderStatusListRequest()
      })
      if (options.tabIndex) {
        this.current = options.tabIndex
        this.specify = true
      }
      this.getOrderStatusListRequest(options)
    },
    onShow() {
      this.getOrderStatusListRequest()
    },
    methods: {
      //去详情
      toDetail(data) {
        this.$linkToEasy('/pagesSupplier/Order/DistributionOrder/DistributionOrderDetail?id=' + data.id)
      },
      //跳转搜索页
      searchOnClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderSearch/OrderSearch')
      },
      //销售订单状态枚举
      getOrderStatusListRequest(options) {
        this.typeList = []
        //订单状态,5110=待发货,5120=已发货,5130=已取消（查全部状态可以不传）
        this.typeList = [
          { id: '0', name: '全部' },
          { id: '5110', name: '待发货' },
          { id: '5120', name: '已发货' },
          { id: '5130', name: '已取消' },
        ]

        if (this.specify) {
          this.orderStatus = this.typeList[this.current].id
        }
        //万能喊返回的数据塞入list
        let dataVoice = this.$storage.get('voiceRecords')
        this.$storage.remove('voiceRecords')
        if (
          options &&
          options.origin === 'voice' &&
          dataVoice.records &&
          dataVoice.records.records &&
          dataVoice.records.records.length
        ) {
          console.log('dataVoice', dataVoice.records.records)
          this.orderList = dataVoice.records.records
          this.total = dataVoice.records.total
        } else {
          this.getOrderListRequest(true)
        }
      },
      // 关闭弹窗
      close() {
        this.show = false
        this.showManual = false
        this.formData.content = ''
        this.formData.contentManual = ''
      },
      confirmDeliverGoods() {
        let data = []
        if(this.formData.contentManual.length > 0) {
          data.push(this.formData.contentManual)
        let param = {
          engineNo: data,
          id: this.orderId,
        }
         console.log(param)
        this.$VoHttp
          .apiOrderDistributionDeliver(param)
          .then((res) => {
            console.log("res ---- ",res)
             if (res.code === '20001') {
              this.close()
              uni.$u.toast('发货成功')
              let that=this
              setTimeout(() =>{
                that.getOrderListRequest(true)
              },1500)

            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('发货失败')
          })
          .finally(() => {
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.isLoading = false
          })
        }else{
          uni.$u.toast('识别码不可为空')
        }
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
      },
      //swiper切换
      swiperChange(event) {
        this.refresh = true
        this.current = event.detail.current
        this.orderStatus = this.typeList[this.current].id
        this.getOrderListRequest(true)
      },
      //搜索
      orderSearch() {
        this.refresh = true
        this.getOrderListRequest()
      },
      inputFn(value) {
        //过滤空格
        this.searchModel = value.replace(/\s+/g, '')
      },
      //获取列表数据
      getOrderListRequest(fresh) {
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        let isfresh = fresh || this.refresh
        if (isfresh) {
          this.orderList = []
          this.pageNo = 1
        }
        let param = {
          status: this.orderStatus,
          pageNo: this.pageNo,
          pageSize: 20,
        }

        if (this.searchModel) {
          console.log("this.searchModel --- ",this.searchModel)
          param.searchWord = this.searchModel
        }

        if (this.orderEndTime) {
          param.orderEndTime = this.orderEndTime
        }

        if (this.orderStartTime) {
          param.orderStartTime = this.orderStartTime
        }
        if (this.warnType > 0) {
          param.warnType = this.warnType
        }
        console.log(param)
        this.$VoHttp
          .apiOrderDistributionPage(param)
          .then((res) => {
            if (res.data) {
              let resultData = res.data.records
              resultData.forEach((item) => {
                //判断是否已申请安装服务
                if (item.supportList && item.supportList.length) {
                  let id = item.supportList.filter((ele) => ele.type === 32)[0].id
                  item.isHasInstall = id ? true : false
                } else {
                  item.isHasInstall = false
                }
              })
              this.total = res.data.total
              this.orderList = this.orderList.concat(resultData)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单获取失败')
          })
          .finally(() => {
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.isLoading = !this.isLoading
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getOrderListRequest(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList.length >= this.total) {
            // uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
          this.pageNo++
          this.getOrderListRequest()
        }, 2000)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      /**
       *订单操作
       */
      bottomClick(data) {
        //index 0.备注 1.修改地址 2.取消订单 3.联系仓库 4.提醒发货 5.查看发货信息 6.去支付 7.申请退款 8.确认收货 9.再来一单 10.发货 11.我要投诉
        let index = data.index
        let resultData = data.data

        if (index === '1') {
          this.$linkToEasy(
            `/pagesCommon/AddressList/AddressList?orderId=${resultData.id}&type=2&roleType=1&addressId=${resultData.orderAddress.id}`,
          )
          return
        }
        if (index === '10') {
          this.orderId = resultData.id
          this.showManual = true
          return
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good {
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    background: #f7f7f8;
    .nav-right {
      display: flex;
      width: auto;
      &__btn {
        background: #22284b;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 14rpx 36rpx;
        text-align: center;
        margin-right: 24rpx;
      }
    }
    &-tabs {
      background-color: #ffffff;
    }
    .market {
      &-top {
        position: relative;
        width: 750rpx;
        background-color: #ffffff;

        &__alert {
          position: absolute !important;
          width: 750rpx;
          top: 98rpx !important;
          z-index: 99;
        }

        &__search {
          padding: 20rpx 32rpx 18rpx 32rpx;
          box-sizing: border-box;
          background: #fff;
          .scree {
            position: relative;

            &-icon {
              width: 48rpx;
              height: 48rpx;
            }
            &-badge {
              position: absolute;
              top: 0;
              right: -10rpx;
            }
          }
        }
        &__subsection {
          height: 100rpx;
          padding-left: 32rpx;
          padding-right: 32rpx;
          padding-top: 15rpx;
          .subsection {
            margin-top: 15rpx;
          }
        }
      }
    }
    .swiper {
      flex: 1;
      &-item,
      .scroll-list {
        height: 100%;
      }
    }
    .record-item {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    .color-y {
      color: #ff9b05;
    }
    .color-g {
      color: #07c160;
    }
    .color-r {
      color: #ee0a24;
    }
    .sys-img {
      width: 64rpx;
      height: 64rpx;
    }
  }
</style>
