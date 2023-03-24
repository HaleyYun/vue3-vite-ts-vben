<template>
  <view
    class="business flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <view>
      <VoNav :left-width="190" :right-width="190" :is-fixed="false" is-have-more title="经营品牌"></VoNav>
      <view class="business-tabs">
        <EraTabs :list="tabsList" :current="currentTab" @change="changeTabs" />
      </view>
    </view>
    <view class="flex1 overflow-y">
      <!--  空数据页面  -->
      <!--  <NullData />  -->
      <swiper
        class="business-scroll flex1 overflow-hidden"
        :autoplay="false"
        :current="currentTab"
        @change="changeSwiper"
      >
        <swiper-item>
          <scroll-view
            v-if="authedData.length"
            class="business-scroll flex1 p-t-16"
            :scroll-y="true"
          >
            <VoCellGroup :border="false">
              <VoCell :title="info.name" v-for="info of authedData" :key="info.id">
                <image slot="icon" class="brand-logo" :src="info.logoUrl" mode="aspectFill" />
              </VoCell>
            </VoCellGroup>
          </scroll-view>
          <view v-else class="h-full flex flex-vertical-c flex-justify-c">
            <u-empty
              icon="/static/noData/nodata.png"
              text="您还没有经营品牌"
            />
          </view>
        </swiper-item>
        <swiper-item>
          <scroll-view
            v-if="authingData.length"
            class="business-scroll flex1 p-t-16"
            :scroll-y="true"
          >
            <VoCellGroup :border="false">
              <VoCell :title="info.name" v-for="info of authingData" :key="info.id">
                <image slot="icon" class="brand-logo" :src="info.logoUrl" mode="aspectFill" />
              </VoCell>
            </VoCellGroup>
          </scroll-view>
          <view v-else class="h-full flex flex-vertical-c flex-justify-c">
            <u-empty
              icon="/static/noData/nodata.png"
              text="您还没有经营品牌"
            />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!--  认证中品类列表  -->
    <view class="business-bottom">
      <EraButton circle text="认证品牌" @click="goAddBankCard" />
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
      this.$linkToEasy('/pagesProduct/BrandCertification/BrandCertification?source=3')
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
    width: 120rpx;
    height: 36rpx;
    line-height: 36rpx;
    text-align: center;
    font-weight: bold;
    font-size: 24rpx;
    color: #ffffff;
    padding: 10rpx 0;
    background: $color-primary-yellow;
    border-radius: 100rpx;
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
