<template>
  <view
    v-if="brandInfo"
    class="result"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more :title="brandInfo.statusText" />
    <view class="result-top flex flex-justify-between" v-if="brandInfo.status === 2">
      <view class="result-top__left flex1">
        <view class="left-state">审核通过</view>
        <view class="left-time">{{ brandInfo.approvalTime }}</view>
      </view>
      <image class="result-top__img" src="/static/created/personalCenter/passed.png" />
    </view>
    <view class="result-top flex flex-justify-between" v-else-if="brandInfo.status === 1">
      <view class="result-top__left flex1">
        <view class="left-state">审核中...</view>
        <view class="left-time">{{ brandInfo.approvalTime }}</view>
      </view>
      <image class="result-top__img" src="/static/created/personalCenter/under_review.png" />
    </view>
    <view class="result-top flex flex-justify-between" v-else-if="brandInfo.status === 3">
      <view class="result-top__left flex1">
        <view class="left-state">审核不通过原因：</view>
        <view class="left-time color-block">{{ brandInfo.reason }}</view>
        <view class="left-time">{{ brandInfo.approvalTime }}</view>
      </view>
      <image class="result-top__img" src="/static/created/personalCenter/not_through.png" />
    </view>
    <!--  经营品类-申请记录进入  -->
    <view class="result-info">
      <view class="result-info__title">品类名称</view>
      <view v-for="(item, index) in brandInfo.list" :key="index" class="result-info__con">
        {{ item.name }} : {{ item.value }}
      </view>
    </view>
    <!--  经营品牌-申请记录进入  -->
    <view v-if="false" class="result-info">
      <view class="result-info__title">品牌信息</view>
      <view class="result-info__con">{{ info.series }}</view>
      <view class="result-info__con flex">
        <view class="m-r-8">品牌logo：</view>
        <image class="con-logo" src="/static/logo-2.png" />
      </view>
      <view class="result-info__con"
        >申请理由：我司最近研发了一款新的发动机，能适合奔驰、宝马等高端车型，希望能放在平台上售卖。
      </view>
    </view>

    <view class="result-info">
      <view class="result-info__time">申请时间：{{ brandInfo.approvalTime }}</view>
      <view class="result-info__time">申请人：{{ brandInfo.applicationName }}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AuditResult',
    data() {
      return {
        id: '',
        info: '',
        brandInfo: null,
      }
    },
    onLoad(options) {
      this.info = options?.info ? JSON.parse(options.info) : {}
      if (options.hasOwnProperty('id')) {
        this.id = options.id
      } else {
        this.$u.toast('缺少参数')
      }
    },
    onShow() {
      if (this.id) {
        this.initData(this.id)
      }
    },
    methods: {
      async initData(id) {
        try {
          const { data } = await this.$VoHttp.apiGoodsCategoryApplyDetail({ id })
          console.log(data, 'xx')
          this.brandInfo = data
          let list = []
          const tmp = new Map()

          data.categoryName.forEach((c) => {
            const arr = c.split('-')
            const key = arr[0]
            const val = arr[1]
            const valArr = tmp.get(key) || []
            valArr.push(val)
            tmp.set(key, valArr)
          })
          this.brandInfo['statusText'] =
            data.status === 1 ? '审核中' : data.status === 2 ? '已通过' : '审核不通过'
          tmp.forEach((val, key) => {
            list.push({
              name: key,
              value: val.join('、'),
            })
          })
          this.brandInfo['list'] = list
        } catch (e) {
          console.warn(e, 'AuditResult')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      goAuditResult() {
        this.$emit('goAuditResult')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .result {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-top {
      background: #fff;
      padding: 0 32rpx;
      margin-bottom: 16rpx;
      box-sizing: border-box;

      &__left {
        padding: 40rpx 0;
        box-sizing: border-box;

        .left-state {
          line-height: 48rpx;
          font-weight: bold;
          font-size: 32rpx;
        }

        .left-time {
          margin-top: 24rpx;
          line-height: 42rpx;
          font-size: 28rpx;
        }
      }

      &__img {
        margin-top: 8rpx;
        margin-left: 32rpx;
        width: 176rpx;
        height: 176rpx;
      }
    }

    &-info {
      background: #fff;
      margin-bottom: 16rpx;
      padding: 0 32rpx 32rpx;
      box-sizing: border-box;

      &__title {
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
      }

      &__con {
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        margin-top: 16rpx;

        .con-logo {
          width: 96rpx;
          height: 96rpx;
          border-radius: 8rpx;
        }
      }

      &__time {
        line-height: 42rpx;
        font-size: 28rpx;
        color: $v-c0-85;
        padding-top: 32rpx;
        box-sizing: border-box;
      }
    }
  }
</style>
