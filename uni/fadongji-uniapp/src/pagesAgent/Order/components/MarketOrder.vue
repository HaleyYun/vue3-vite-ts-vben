<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="market flex flex-column"
  >
    <view class="market-top">
      <!--搜索-->
      <view class="market-top__search flex flex-vertical-c">
        <view class="flex1" @click="searchOnClick">
          <VoSearch
            v-model="searchModel"

            :showInsideAction="true"
            bgColor="#fff"
            borderColor="#FF5319"
            height="34"
            placeholder="请输入搜索"
            @custom="searchOnClick"
            @search="searchOnClick"
          />
        </view>
        <view class="scree flex flex-vertical-c m-l-24" @click="showTemplateType">
          <view class="fz-28 color-block-85 m-r-4 lh42">筛选</view>
          <view class="scree flex flex-vertical-c">
            <VoIcon :opacity="0.45" color="#000000" name="screening" size="20" />
            <VoBadge :value="screenNum" class="scree-badge" />
          </view>
        </view>
      </view>
      <OrderScreenAlert ref="orderScreen" class="market-top__alert" @screen="screenData" />
      <EraTabs
        v-show="eraTabs"
        :current="current"
        :list="typeList"
        activeStyle="font-weight: bold;color: #FF5319;"
        inactiveStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.45);"
        itemStyle="height: 49px;"
        @click="tabsClick"
      />
      <view v-if="sendType" class="market-top__subsection">
        <EraSubsection
          :current="curNow"
          :list="list"
          activeColor="rgba(0, 0, 0, 0.85)"
          class="subsection"
          customStyle="background-color: #f7f7f8"
          inactiveColor="rgba(0, 0, 0, 0.45)"
          @change="sectionChange"
        />
      </view>
    </view>

    <swiper :autoplay="false" :current="current" class="market-swiper flex1" @change="changeSwiper">
      <swiper-item v-for="(item, index) in typeList" :key="index">
        <MarketScrollView v-if="index === 0" ref="orderListRef" :is-request="true" />
        <MarketScrollView v-else-if="current===index" ref="orderListRef" :status="status" />
        <MarketScrollView v-else ref="orderListRef"  />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import MarketScrollView from './MarketScrollView'
  import OrderScreenAlert from './OrderScreenAlert'

  export default {
    name: 'MarketOrder',

    components: {
      OrderScreenAlert,
      MarketScrollView,
    },
    props: {
      status: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        current: 0,
        curNow: 0,
        screenNum: '',
        searchModel: '',
        deliverGoodsModel: false,
        sendType: false, //待发货显示催货栏 默认不显示
        list: ['全部', '催发货', '超时发货'],
        typeList: [],
        eraTabs: true, // tab栏显隐
        //提醒类型,不传则为全部1,提醒发货,2超时发货
        warnType: 0,
        requestParams: {},
      }
    },
    async created() {
      await this.getOrderStatusListRequest()
      if (this.status === '1120') {
        this.current = 2
        this.sendType = true
      }
      if (this.status === '1110') {
        this.current = 1
      }
    },
    methods: {
      scrollFn(e) {
        this.eraTabs = e >= 0
      },
      back() {
        this.$backFn()
      },
      searchOnClick() {
        this.getOrderListRequest()
      },
      more() {
        this.$u.toast('查看更多')
      },
      tabsFn(item) {
        this.$u.toast(item.name)
      },
      tabsClick(item) {
        this.current = item.index
        if (item.index == 2) {
          this.sendType = true
        } else {
          this.sendType = false
        }
      },
      //发货成功之后返回列表已发货页面
      deliverGoodsUpdate() {
        this.eraTabs = true
        this.tabsClick({ index: 3 })
      },
      //刷新列表页面
      updateOrderList(index) {
        this.eraTabs = true
        this.tabsClick({ index: index })
      },
      changeSwiper(e) {
        this.current = e.detail.current
        console.log('12121212121212----', this.current)
        if (e.detail.current == 2) {
          this.sendType = true
        } else {
          this.sendType = false
        }
        //请求订单列表
        this.getOrderListRequest()
      },
      showTemplateType() {
        this.$refs.orderScreen.showShare(true)
      },
      sectionChange(index) {
        this.curNow = index
        this.warnType = index

        //请求订单列表
        this.getOrderListRequest()
      },
      screenData(data) {
        let warehouseIdList = []
        if (data.mySelf && data.mySelf.length) {
          data.mySelf.map((item) => {
            warehouseIdList.push(item.id)
          })
        }
        if (data.paltform && data.paltform.length) {
          data.paltform.map((item) => {
            warehouseIdList.push(item.id)
          })
        }

        this.screenNum = String(data.num)
        let param = {}
        let timeArr = data.time
        if (timeArr.length > 0) {
          param.orderStartTime = timeArr[0]
          param.orderEndTime = timeArr[1]
        } else {
          param.orderStartTime = null
          param.orderEndTime = null
        }
        param.warehouseIdList = warehouseIdList
        this.requestParams = Object.assign(this.requestParams, param)
        this.getOrderListRequest()
      },
      getOrderListRequest() {
        let typeParam = this.typeList[this.current]
        this.requestParams.id = Number(typeParam?.id)||0
        this.requestParams.searchWord = this.searchModel
        this.requestParams.warnType = this.warnType
        console.log(this.requestParams)
        this.$refs.orderListRef[this.current].getOrderRequest(this.requestParams)
      },
      //销售订单状态枚举
      getOrderStatusListRequest() {
        this.typeList = []
        this.$VoHttp
          .apiOrderSellEnumStatus()
          .then((res) => {
            if (res.code === '20001') {
              let resultData = res.data
              let arr = Object.entries(resultData)
              let param = { id: '0', name: '全部' }
              this.typeList.push(param)
              for (const item of arr) {
                let param = { id: item[0], name: item[1] }
                this.typeList.push(param)
              }
            } else {
              uni.$u.toast(res.message || '销售订单状态获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('销售订单状态获取失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
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
        padding: 8rpx 32rpx;
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
            top: -14rpx;
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
    &-swiper {
      width: 100%;
      height: 100%;
      &__scroll {
        height: 100%;
      }
    }
  }
</style>
