<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="business flex flex-column"
  >
    <view>
      <VoNav :is-fixed="false" :left-width="250" :right-width="250" is-have-more title="经营品牌">
        <block slot="operation">
          <view class="business-complete disable m-r-24" @click="goApplyRecordBrand">申请记录</view>
        </block>
      </VoNav>
      <view class="business-tabs">
        <EraTabs
          :current="currentTab"
          :list="tabsList"
          activeStyle="font-size: 14px;font-weight: bold;color: #FF5319;"
          inactiveStyle="font-size: 14px;font-weight: 400;color: rgba(0, 0, 0, 0.45);"
          @change="changeTabs"
        />
      </view>
    </view>
    <view class="flex1 overflow-y">
      <!--  空数据页面  -->
      <!--  <NullData />  -->
      <swiper
        :autoplay="false"
        :current="currentTab"
        class="business-scroll flex1 overflow-hidden"
        @change="changeSwiper"
      >
        <swiper-item>
          <scroll-view
            v-if="authedData.length"
            :scroll-y="true"
            class="business-scroll flex1 p-t-16"
          >
            <VoCellGroup :border="false">
              <VoCell v-for="info of authedData" :key="info.id" :title="info.name">
                <image
                  slot="icon"
                  :src="info.logoUrl + '&type=1'"
                  class="brand-logo"
                  mode="aspectFill"
                />
              </VoCell>
            </VoCellGroup>
          </scroll-view>
          <view v-else class="h-full flex flex-vertical-c flex-justify-c">
            <u-empty icon="/static/noData/nodata.png" text="您还没有经营品牌" />
          </view>
        </swiper-item>
        <swiper-item>
          <scroll-view
            v-if="authingData.length"
            :scroll-y="true"
            class="business-scroll flex1 p-t-16"
          >
            <VoCellGroup :border="false">
              <VoCell v-for="info of authingData" :key="info.id" :title="info.name">
                <image
                  slot="icon"
                  :src="info.logoUrl + '&type=1'"
                  class="brand-logo"
                  mode="aspectFill"
                />
              </VoCell>
            </VoCellGroup>
          </scroll-view>
          <view v-else class="h-full flex flex-vertical-c flex-justify-c">
            <u-empty icon="/static/noData/nodata.png" text="您还没有经营品牌" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!--  认证中品类列表  -->
    <view class="business-bottom">
      <EraButton circle text="认证新品牌" @click="goAddBankCard" />
      <view class="p-b-safe-area" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OperateBrand',
    data() {
      return {
        currentTab: 0, // 横向tabs默认
        tabsList: [
          {
            name: '已认证品牌',
          },
          {
            name: '认证中品牌',
          },
        ],
        authedData: [],
        authingData: [],
      }
    },
    onShow() {
      this.initMyBrandData()
    },
    methods: {
      // 初始化认证品牌信息
      async initMyBrandData() {
        try {
          const { data } = await this.$VoHttp.apiGoodsBrandQueryMyList()
          data.forEach((item) => {
            if (item.status === 1) {
              this.authingData = item.voList
            } else {
              this.authedData = item.voList
            }
          })
          console.log(data)
        } catch (e) {
          console.warn(e, 'OperateBrand')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      changeTabs(e) {
        this.currentTab = e.index
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
      },
      /**
       * 去认证品牌
       */
      goAddBankCard() {
        this.$linkToEasy('/pagesProduct/BrandCertification/BrandCertification?source=2')
      },
      /**
       * 去申请记录
       */
      goApplyRecordBrand() {
        this.$linkToEasy('/pagesCommon/StoreInfo/ApplyRecordBrand')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .business {
    width: 750rpx;
    height: 100vh;
    //padding-bottom: 132rpx;
    box-sizing: border-box;
    //overflow-y: scroll;
    .brand-logo {
      width: 48rpx;
      height: 48rpx;
    }

    &-complete {
      width: 144rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      font-weight: bold;
      font-size: 24rpx;
      color: #ff5319;
      border-radius: 100rpx;
      box-sizing: border-box;
      border: 2rpx solid #ffa98c;
    }

    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }

    &-tabs {
      width: 100%;
      background: #ffffff;
      height: 96rpx;
      box-sizing: border-box;
      padding-top: 8rpx;
    }

    &-scroll {
      height: 100%;
    }
  }
</style>
