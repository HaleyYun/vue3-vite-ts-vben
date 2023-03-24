<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="market flex flex-column"
  >
    <view class="market-top">
      <!--搜索-->
      <view class="market-top__search flex flex-vertical-c">
        <view class="flex1" @click="searchOnClick">
          <VoSearch v-model="searchModel" height="34" placeholder="请输入搜索" />
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
      <EraTabs :current="current" :list="typeList" itemStyle="height: 49px;" @click="tabsClick" />
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
          :is-request="true"
          :search-model="search"
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
        type: Number,
        default: 0,
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
    created() {
      this.searchModel = this.search
      this.getOrderStatusListRequest()
    },
    methods: {
      back() {
        this.$backFn()
      },
      searchOnClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderSearch/OrderSearch')
      },
      more() {
        this.$u.toast('查看更多')
      },
      tabsFn(item) {
        this.$u.toast(item.name)
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
        this.$refs.orderScreen.showShare(true)
      },
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
        param.id = typeParam.id
        this.$refs.orderListRef[this.current].getOrderRequest(param)
      },
      searchEvent(data) {
        console.log('111111111111', data)
      },
      //确认收货成功
      confirmReviceGood() {
        this.typeList.forEach((item, index) => {
          if (item.id === '1140') {
            // this.current = index
            this.$emit('change', index)
          }
        })
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
      //从其他页面跳转过来的数据 请求订单相对应的列表数据
      getOrderTypeList(current) {
        let reqParam = {}
        this.typeList.forEach((item, index) => {
          if (current === index) {
            reqParam = item
          }
        })
        this.$refs.orderListRef[this.current].getOrderRequest(reqParam)
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
