<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="market flex flex-column"
  >
    <view class="market-top">
      <!--搜索-->
      <view class="market-top__search flex flex-vertical-c">
        <view class="flex1">
          <VoSearch
            v-model="searchModel"
            placeholder="请输入搜索"
            height="34"
            bgColor="#fff"
            borderColor="#FF5319"
            :showInsideAction="true"
            @custom="searchOnClick"
            @input="inputFn"
            @search="searchOnClick"
          />
        </view>
        <view class="scree flex flex-vertical-c" @click="showTemplateType">
            <view class="fz-28 m-r-4 color-block-85 m-l-24">筛选</view>
            <image class="scree-icon" src="/static/created/product/screening_grey.png" />
            <VoBadge
              :value="screenNum"
              class="scree-badge"
              customStyle="width: 40rpx;height: 40rpx;text-align: center;line-height:34rpx;justify-content: center;"
            />
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
        <PromoteScrollView
          v-if="index === 0"
          ref="orderListRef"
          :is-request="true"
          :source="source"
        />
        <PromoteScrollView v-else ref="orderListRef" :source="source" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import PromoteScrollView from './PromoteScrollView'
  import OrderScreenAlert from './OrderScreenAlert'

  export default {
    name: 'PromoteOrder',
    components: {
      OrderScreenAlert,
      PromoteScrollView,
    },
    props: {
      /**
       * 跳转来源：
       * 1：默认，服务商拓客查看修理厂订单
       * 2：集师傅推广
       */
      source: {
        type: [Number, String],
        default: 1,
      },
    },
    data() {
      return {
        current: 0,
        screenNum: '',
        searchModel: '',
        typeList: [],
        pageNo: 1,
        pageSize: 20,
        total: 1,
        requestParams: {},
      }
    },
    created() {
      this.getOrderStatusListRequest()
    },
    methods: {
      back() {
        this.$backFn()
      },
      inputFn(value) {
        //过滤空格
        this.searchModel = value.replace(/\s+/g, '')
      },
      searchOnClick() {
        //过滤空格
        // let valueNew = this.searchModel.replace(/\s+/g, '')
        // if (!valueNew) {
        //   return
        // }
        this.getOrderListRequest()
      },
      tabsClick(item) {
        this.current = item.index
      },
      changeSwiper(e) {
        this.current = e.detail.current
        //请求订单列表
        this.getOrderListRequest()
      },
      showTemplateType() {
        this.$refs.orderScreen.showShare(true)
      },
      screenData(data) {
        this.requestParams = {}
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
        this.requestParams.id = Number(typeParam.id)
        this.requestParams.searchWord = this.searchModel
        this.$refs.orderListRef[this.current].getOrderRequest(this.requestParams)
      },
      //销售订单状态枚举
      getOrderStatusListRequest(init) {
        this.typeList = []
        let param = { isBuyer: false, searchWord: this.searchModel }
        this.$VoHttp
          .apiOrderSellEnumStatus(param)
          .then((res) => {
            let resultData = res.data
            let arr = Object.entries(resultData)
            let param = { id: '0', name: '全部' }
            this.typeList.push(param)
            for (const item of arr) {
              let param = { id: item[0], name: item[1] }
              this.typeList.push(param)
            }
          })
          .catch((err) => {
            uni.$u.toast(err.message || '销售订单状态获取失败')
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
