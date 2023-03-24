<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="market flex flex-column"
  >
    <view class="market-top">
      <!--搜索-->
      <view class="market-top__search flex flex-vertical-c">
        <view class="flex1" @click="searchOnClick">
          <VoSearch v-model="searchModel" height="34" actionText="筛选" placeholder="请输入搜索" />
        </view>
        <view class="scree flex flex-vertical-c">
          <image
            class="scree-icon"
            src="/static/created/product/screening.png"
            @click="showTemplateType"
          />
          <VoBadge :value="screenNum" class="scree-badge" />
        </view>
      </view>
      <OrderScreenAlert ref="orderScreen" class="market-top__alert" @screen="screenData" />
      <EraTabs :current="current" :list="typeList" class="m-l-8" @click="tabsClick" />
    </view>

    <swiper
      :autoplay="false"
      :current="current"
      class="market-swiper flex1 p-b-safe-area"
      @change="changeSwiper"
    >
      <swiper-item v-for="(item, index) in typeList" :key="index">
        <MarketScrollView
          v-if="index === 0"
          ref="orderListRef"
          :search-model="search"
          is-request
          @confirmReviceGoodSuccess="confirmReviceGood"
        />
        <MarketScrollView
          v-else
          ref="orderListRef"
          :search-model="search"
          @confirmReviceGoodSuccess="confirmReviceGood"
        />
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
      search: {
        type: String,
        default: '',
      },
      current: {
        type: [String, Number],
        default: 0,
      },
      isPreSale: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        curNow: 0,
        searchModel: '',
        screenNum: '0',
        deliverGoodsModel: false,
        typeList: [],
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    created() {
      this.searchModel = this.search
      this.getOrderStatusListRequest()
    },
    methods: {
      reLoad() {
        console.log(this.current,"9999999999999999");
        this.$refs.orderListRef[this.current].getOrderListRequest(1)
      },
      searchOnClick() {
        this.$linkToEasy('/pagesRecovery/SellOrder/OrderSearch/OrderSearch')
      },
      tabsClick(item) {
        // this.current = item.index
        this.$emit('change', item.index)
      },
      changeSwiper(e) {
        // this.current = e.detail.current
        this.$emit('change', e.detail.current)
        //清空筛选项
        this.$refs.orderScreen.resetClick()
      },
      showTemplateType() {
        console.log('asd')
        this.$refs.orderScreen.showShare(true)
      },
      // 筛选数据
      screenData(data) {
        this.screenNum = String(data.num)
        let param = {}
        let timeArr = data.time
        if (timeArr.length > 0) {
          param.orderStartTime = timeArr[0]
          param.orderEndTime = timeArr[1]
        }
        //状态
        let typeParam = this.typeList[this.current]
        console.log(data)
        param.orderStatus = typeParam.id
        // if (data.orderTypeData[0]) {
        //   let type = data.orderTypeData[0]
        //   param.isPreSale = type.name === '预售订单'
        // }
        param.isPreSale = this.isPreSale
        this.$refs.orderListRef[this.current].getOrderRequest(param)
        this.$forceUpdate()
      },
      searchEvent(data) {
        console.log('111111111111', data)
      },
      //确认收货成功
      confirmReviceGood() {
        this.typeList.forEach((item, index) => {
          if (item.id === '1140') {
            this.current = index
          }
        })
      },
      //销售订单状态枚举
      getOrderStatusListRequest() {
        this.typeList = [
          { id: '0', name: '全部' },
          { id: '1310', name: '待付款' },
          { id: '1320', name: '待发货' },
          { id: '1330', name: '已发货' },
          { id: '1340', name: '已完成' },
          { id: '1350', name: '已取消' },
          { id: '1360', name: '已关闭' },
        ]
        return
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
    &-swiper {
      width: 100%;
      height: 100%;
    }
  }
</style>
