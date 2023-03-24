<template>
  <view>
    <view class="good fz-28 color-block">
      <VoNav :rightWidth="200" is-fixed is-have-more title="回收订单">
      </VoNav>
      <!-- <view class="top-search">
        <VoSearch v-model="keyword" placeholder="请输入搜索" />
      </view> -->
      <view class="good-tabs">
        <EraTabs
          :current="current"
          :list="tabs"
          :scrollable="false"
          activeStyle="font-weight: bold;color: #FF5319"
          line-color="#FF5319"
          @change="tabChange"
        />
      </view>

      <swiper :current="current" class="swiper" @change="swiperChange">
        <swiper-item v-for="(item, index) in tabs" :key="index" class="swiper-item">
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
            <view
              v-for="(listItem, index) in infoList"
              :key="index"
              class="record-item bg-white m-t-16"
              @click="toDetail(listItem)"
            >
              <view class="flex flex-justify-between border-bottom p-b-32">
                <view class="fz-32 font-weight-500">{{ listItem.supportName }}</view>
                <view v-if="listItem.statusEvent === '待质检'" class="color-block-45">待查验</view>
                <view v-else-if="listItem.statusEvent === '支付订单'" class="color-block-45"
                  >待接单</view
                >
                <view v-else-if="listItem.statusEvent === '待寄回'" class="color-block-45"
                  >待发货</view
                >
                <view v-else-if="listItem.statusEvent === '接单'" class="color-block-45"
                  >待上门</view
                >
                <view v-else class="color-block-45">{{ listItem.statusEvent }}</view>
              </view>
              <!--      集师傅相关信息        -->
              <view v-if="listItem.technicianInfo" class="flex flex-justify-between m-b-24 m-t-24">
                <view class="flex flex-vertical-c">
                  <image
                    :src="listItem.technicianInfo.photoUrl || '/static/default_avatar.png'"
                    class="sys-img"
                  />
                  <view>集师傅：{{ listItem.technicianInfo.realName }}</view>
                </view>
                <view class="flex flex-vertical-c">
                  <VoIcon
                    :opacity="0.85"
                    class="m-r-32"
                    color="#000000"
                    name="mobile-new"
                    @click.stop.native="$cellPhone(listItem.technicianInfo.userName)"
                  />
                  <VoIcon
                    :opacity="0.85"
                    color="#000000"
                    name="smile-m"
                    @click.stop.native="goChatCollect(listItem)"
                  />
                </view>
              </view>
              <!--      修理厂相关信息        -->
              <view v-else class="flex flex-justify-between m-b-24 m-t-24">
                <view class="flex flex-vertical-c">
                  <image
                    :src="listItem.garageInfo.photoUrl || '/static/default_avatar.png'"
                    class="sys-img"
                  />
                  <view>{{ listItem.garageInfo.storeName }}</view>
                </view>
                <view class="flex flex-vertical-c">
                  <VoIcon
                    :opacity="0.85"
                    class="m-r-32"
                    color="#000000"
                    name="mobile-new"
                    @click.stop.native="$cellPhone(listItem.garageInfo.userName)"
                  />
                  <VoIcon
                    :opacity="0.85"
                    color="#000000"
                    name="smile-m"
                    @click.stop.native="goChatRepair(listItem)"
                  />
                </view>
              </view>
              <view v-if="listItem.homeEndTime" class="m-b-10">
                上门时间：{{
                  $vocenApi.dayjs(listItem.homeStartTime).format('YYYY-MM-DD') +
                  ' ' +
                  $vocenApi.dayjs(listItem.homeStartTime).format('HH:mm') +
                  '-' +
                  $vocenApi.dayjs(listItem.homeEndTime).format('HH:mm')
                }}
              </view>
              <view v-else class="m-b-10">上门时间：{{ listItem.homeStartTime }}</view>
              <view class="m-b-40">
                回收价格：
                <VoPointPrice
                  :price="listItem.supportAmount"
                  :showUnit="true"
                  class="lh48"
                  color="#E50012"
                  display="inline-block"
                />
              </view>
              <view class="flex flex-justify-r">
                <!--待查验 -->
                <view v-if="+listItem.status === 3320" @click.stop="toCheck(listItem)">
                  <EraButton class="m-l-20" size="mini" theme-type="Wire">查验</EraButton>
                </view>
                <!-- 待发货 -->
                <!--                <view v-if="+listItem.status === 3351" @click.stop="toLogistics(listItem)">-->
                <!--                  <EraButton class="m-l-20" size="mini" theme-type="Wire"> 物流信息 </EraButton>-->
                <!--                </view>-->
                <!-- 待收货 -->
                <view v-if="+listItem.status === 3352" @click.stop="confirmReceipt(listItem)">
                  <EraButton class="m-l-20" size="mini" theme-type="Wire">确认收货</EraButton>
                </view>
              </view>
            </view>
            <view v-if="noMore && infoList.length" class="p-b-50 p-t-50">
              <u-loadmore
                color="rgba(0, 0, 0, 0.45)"
                line
                lineColor="rgba(0, 0, 0, 0.08)"
                nomore-text="暂无更多内容"
                status="nomore"
              />
            </view>

            <VoNoData
              v-if="!infoList.length && !refresh"
              imgUrl="/static/noData/noOrder.png"
              no-data-tips="您还没有相关订单"
            />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <QualityTestModal ref="qualityTestModal" @updateFn="updateFn" />
    <ConfirmReceiptModal
      ref="confirmReceiptModal"
      :goodsStatus="goodsStatus"
      :radioList="radioList"
      :type="type"
      @updateFn="updateFn"
    />
  </view>
</template>
<script>
  import { hideLoading, showLoading } from '../../common/helper'
  import QualityTestModal from './components/QualityTestModal'
  import ConfirmReceiptModal from './components/ConfirmReceiptModal'

  export default {
    name: 'MyGoods',
    components: { QualityTestModal, ConfirmReceiptModal },
    data() {
      return {
        goodsStatus: 0,
        radioList: [],
        type: 1,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        statusList: [0],

        total: 0,
        noMore: false,

        isLoading: false,
        keyword: '',
        current: 0,
        tabs: [
          {
            name: '全部',
            value: [0],
          },
          {
            name: '待查验',
            value: [3320],
          },
          {
            name: '待上门',
            value: [3330, 3340],
          },
          {
            name: '待收货',
            value: [3351, 3352],
          },
          {
            name: '已完成',
            value: [3360],
          },
        ],
        infoList: [
          {
            id: '11',
            status: 1,
          },
          {
            id: '22',
            status: 2,
          },
          {
            id: '33',
            status: 3,
          },
          {
            id: '44',
            status: 4,
          },
        ],
        selectList: [],
        isSelectAll: false,
        isSelectAllCancel: false,
        postData: {},

        operationData: '',
        operationType: '',
        modalVisible: false,
        modelId: '', // 型号
      }
    },
    watch: {},
    onLoad(options) {
      if (options.index) {
        this.current = +options.index
        this.statusList = this.tabs[this.current].value
      }
      this.getData(true)
    },
    methods: {
      /**
       * 去集师傅聊天
       */
      goChatCollect(e) {
        const info = {
          targetId: e.technicianInfo.userId,
          type: 0,
          note: e.technicianInfo.userName,
          platformCode: 'garage',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 去修理厂聊天
       */
      goChatRepair(e) {
        console.log('e====', e)
        const info = {
          targetId: e.garageInfo.userId,
          type: 0,
          note: e.garageInfo.userName,
          platformCode: 'garage',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      updateFn() {
        this.getData(true)
      },
      toDetail(item) {
        this.$linkToEasy('/pagesRecovery/RecycleOrders/TypeRecordDetail?id=' + item.id)
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        this.statusList = tab.value
        // this.getData(true)
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.getData(true)
      },
      //查验
      toCheck(data) {
        this.$refs.qualityTestModal.show(data)
      },
      //物流信息
      toLogistics(listItem) {},
      //确认收货
      async confirmReceipt(data) {
        const { modelId } = data.engineMsg
        const res = await this.$VoHttp.apiGoodsRecyleResaleQueryByModelId({ modelId })
        console.log(res.data)
        if (res.data) {
          this.type = 1
          this.goodsStatus = res.data.status
          this.radioList = res.data.levelInfoVOS.map((item) => {
            return { name: item.level + '类', value: item.level }
          })
        } else {
          this.type = 0
        }
        this.$refs.confirmReceiptModal.show(data)
      },
      //获取列表数据
      getData(refresh) {
        showLoading()
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          statusList: this.statusList,
        }
        this.$VoHttp
          .apiOrderRecycleQueryPageList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records || []
              data.forEach((item) => {
                item.engineMsg = JSON.parse(item.engineMsg, (key, val) => {
                  if (key == 'modelId') return BigInt(val).toString()
                  else return val
                })
              })
              this.total = res.data.total
              this.infoList = this.infoList.concat(data)
              console.log('this.infoList', this.infoList)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              hideLoading()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
            hideLoading()
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
          this.getData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
          this.pageNo++
          this.getData()
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
      //出库
      outWare(listItem) {
        this.operationData = listItem
        this.operationType = 'out'
        this.modalVisible = true
      },
      //ru库
      enterWare(listItem) {
        this.operationData = listItem
        this.operationType = 'in'
        this.modalVisible = true
      },
      confirmFn() {
        this.modalVisible = false
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
    .top-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
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
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16rpx;
    }
  }
</style>
