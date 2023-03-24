<template>
  <view
    class="business flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav :left-width="190" :right-width="190" is-fixed is-have-more title="经营品类"></VoNav>
    <view v-if="applying.length || certificationCategorys.length" class="flex1 overflow-y">
      <!--  空数据页面  -->
      <!--  品类列表  -->
      <view v-if="certificationCategorys.length" class="business-list">
        <view class="business-list__title">已认证品类</view>
        <view
          v-for="(item, index) in certificationCategorys"
          :key="index"
          class="business-list__info"
        >
          {{ item.name }}： {{ item.value }}
        </view>
      </view>
      <!--  品类列表  -->
      <view v-if="applying.length" class="business-list">
        <view class="business-list__title">认证中品类</view>
        <view v-for="(item, index) in applying" :key="index" class="business-list__info">
          {{ item.name }}： {{ item.value }}
        </view>
      </view>
    </view>
    <view v-else class="h-full flex-vertical-c flex flex-justify-c">
      <u-empty
        icon="/static/noData/nodata.png"
        text="您还没有经营品类"
      />
    </view>
    <view class="business-bottom">
      <EraButton circle text="认证新品类" @click="goCertifiedCategory" />
      <view class="p-b-safe-area" />
    </view>
  </view>
</template>

<script>
import NullData from './components/NullData'

export default {
  name: 'BusinessCategory',
  components: { NullData },
  data() {
    return {
      applying: [],
      certificationCategorys: [],
    }
  },
  onShow() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        this.applying = []
        this.certificationCategorys = []
        const applyingMap = new Map()
        const certificationCategorysMap = new Map()
        const { data } = await this.$VoHttp.apiGoodsCategoryApplyCertificationCategory()
        const { applying, certificationCategorys } = data
        applying.forEach((item) => {
          const keyArr = item.name.split('-')
          const key = keyArr[0]
          const val = applyingMap.get(key) || []
          val.push(keyArr[1])
          applyingMap.set(key, val)
        })
        certificationCategorys.forEach((item) => {
          const keyArr = item.name.split('-')
          const key = keyArr[0]
          const val = certificationCategorysMap.get(key) || []
          val.push(keyArr[1])
          certificationCategorysMap.set(key, val)
        })
        applyingMap.forEach((val, key) => {
          this.applying.push({
            name: key,
            value: val.join('、'),
          })
        })
        certificationCategorysMap.forEach((val, key) => {
          this.certificationCategorys.push({
            name: key,
            value: val.join('、'),
          })
        })
      } catch (e) {
        console.warn(e, 'BusinessCategory')
        this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
      }
    },
    /**
     * 去认证新品类
     */
    goCertifiedCategory() {
      this.$linkToEasy('/pagesLeaseManager/WorkingTable/CertifiedCategory')
    },
  },
}
</script>

<style lang="scss" scoped>
.business {
  width: 750rpx;
  height: 100vh;
  box-sizing: border-box;
  &-list {
    background: #fff;
    padding: 0 32rpx 32rpx;
    color: $v-c0-85;
    margin-bottom: 16rpx;
    &__title {
      padding: 24rpx 0;
      border-bottom: 2rpx solid $v-bg-light;
      height: 48rpx;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
    }
    &__info {
      margin-top: 32rpx;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
    }
  }
  &-bottom {
    width: 100%;
    background: #ffffff;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
  }
}
</style>
