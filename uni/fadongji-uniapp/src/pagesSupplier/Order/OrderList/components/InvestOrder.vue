<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="invest flex flex-column"
  >
    <view class="invest-top">
      <!--搜索-->
      <view class="invest-top__search flex flex-vertical-c flex-justify-between">
        <view class="search-left">
          <VoSearch
            v-model="searchModel"
            placeholder="请输入关键字搜索"
            height="34"
            bgColor="#fff"
            borderColor="#FF5319"
            :actionStyle="{color:'#fff'}"
            :showInsideAction="true"
            @search="searchOnClick"
            @custom="searchOnClick"
            @input="inputFn"
          >
          </VoSearch>
        </view>
        <view class="flex flex-vertical-c">
          <view class="fz-28 color-block-85 m-r-4 lh42" @click="showTemplateType">筛选</view>
          <view class="scree flex flex-vertical-c" @click="showTemplateType">
            <VoIcon :opacity="0.25" color="#000" name="screening" size="20" />
            <VoBadge :value="screenNum" class="scree-badge" />
          </view>
        </view>
      </view>
      <OrderScreenAlert ref="orderScreen" class="invest-top__alert" @screen="screenData" />
      <EraTabs
        :current="current"
        :list="typeList"
        activeStyle="font-weight: bold;color: #FF5319;"
        inactiveStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.45);"
        itemStyle="height: 49px;"
        @click="tabsClick"
      />
      <view v-if="current === 2" class="invest-top__subsection">
        <EraSubsection
          :current="curNow"
          :list="list"
          activeColor="rgba(0, 0, 0, 0.85)"
          bgColor="#F6F7F8"
          class="subsection"
          customStyle="background-color: #f7f7f8"
          inactiveColor="rgba(0, 0, 0, 0.45)"
          @change="sectionChange"
        />
      </view>
    </view>

    <swiper
      :autoplay="false"
      :current="current"
      class="invest-swiper flex1 p-b-safe-area"
      @change="changeSwiper"
    >
      <swiper-item v-for="(item, index) in typeList" :key="index">
        <InvestOrderScrollView
          v-if="index === 0"
          ref="orderListRef"
          :current="index"
          :is-request="true"
        />
        <InvestOrderScrollView
          v-else
          ref="orderListRef"
          :current="index"
          :isTimeout="isTimeout"
          :status="status"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import InvestOrderScrollView from './InvestOrderScrollView'
  import OrderScreenAlert from './OrderScreenAlert'

  export default {
    name: 'InvestOrder',

    components: {
      OrderScreenAlert,
      InvestOrderScrollView,
    },
    props: {
      //订单状态
      status: {
        type: String,
        default: '',
      },
      //是否超时订单
      isTimeout: {
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
        //提醒类型,不传则为全部1,提醒发货,2超时发货
        warnType: 0,
        //订单列表请求接口参数
        requestParams: {},
      }
    },
    created() {
      this.getOrderStatusListRequest()
      if (this.status === '1220') {
        this.current = 2
        if (this.isTimeout) {
          this.curNow = 2
        }
      }
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
      more() {
        this.$u.toast('查看更多')
      },
      tabsFn(item) {
        this.$u.toast(item.name)
      },
      tabsClick(item) {
        this.current = item.index
      },
      changeSwiper(e) {
        this.current = e.detail.current
        this.getOrderListRequest()
      },
      //发货成功之后返回列表已发货页面
      deliverGoodsUpdate() {
        this.current = 3
      },
      showTemplateType() {
        this.$refs.orderScreen.showShare(true)
      },
      sectionChange(index) {
        this.curNow = index
        this.warnType = index
        this.getOrderListRequest()
      },
      screenData(data) {
        let warehouseIdList = []
        if (data.mySelf && data.mySelf.length) {
          data.mySelf.forEach((item) => {
            warehouseIdList.push(item.id)
          })
        }
        if (data.platform && data.platform.length) {
          data.platform.forEach((item) => {
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
        let keyWord = this.searchModel.replace(/\s+/g, '')
        let typeParam = this.typeList[this.current]
        this.requestParams.id = typeParam.id
        this.requestParams.searchWord = keyWord
        this.requestParams.warnType = this.warnType
        this.$refs.orderListRef[this.current].getOrderRequest(this.requestParams)
      },
      //投资订单状态枚举
      getOrderStatusListRequest() {
        this.typeList = []
        let param = { isBuyer: false }
        this.$VoHttp
          .apiOrderInvestEnumStatus(param)
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
              uni.$u.toast(res.message || '投资订单状态获取失败')
            }
          })
          .catch((err) => {
            uni.$u.toast('投资订单状态获取失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invest {
    &-top {
      position: relative;
      width: 750rpx;
      background-color: #ffffff;
      z-index: 10;

      &__alert {
        position: absolute !important;
        width: 750rpx;
        top: 98rpx !important;
        z-index: 99;
      }

      &__search {
        padding: 10rpx 32rpx;
        box-sizing: border-box;
        background: #fff;
        .search-left {
          width: 562rpx;
          &__word {
            width: 128rpx;
            height: 56rpx;
            font-size: 32rpx;
            color: #fff;
            background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
            border-radius: 100rpx;
            text-align: center;
            line-height: 56rpx;
          }
        }
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
      &__scroll {
        height: 100%;
      }
    }
  }
  .loading-more {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32rpx 0;
    background-color: #f7f7f8;
    &__text {
      font-size: 20rpx;
      line-height: 1.5;
      color: $v-c0-25;
    }
  }
</style>
