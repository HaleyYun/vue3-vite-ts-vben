<template>
  <view class="page flex1" :style="{ background: bgColor }">
    <image
      :src="imgUrl"
      :style="{
        width: width + 'rpx',
        height: height + 'rpx',
        paddingTop: paddingTop + 'rpx',

      }"
      class="page-img"
    />
    <view v-for="(item, index) in list" :key="index" class="page-word">{{ item }}</view>
    <slot></slot>
  </view>
</template>
<script>
  export default {
    name: 'VoNoData',
    props: {
      noDataTips: {
        type: [String, Array],
        default: '暂无数据',
      },
      width: {
        type: [Number, String],
        default: 416,
      },
      paddingTop: {
        type: [Number, String],
        default: 260,
      },
      height: {
        type: [String, Number],
        default: 308,
      },
      imgUrl: {
        type: String,
        default: '/static/noData/nodata.png',
      },
      bgColor: {
        type: String,
        default: '#fff',
      },
    },
    data() {
      return {
        list: [],
      }
    },
    created() {
      this.list = []
      if (Array.isArray(this.noDataTips)) {
        this.list = this.noDataTips
      } else {
        this.list.push(this.noDataTips)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100%;
    // background: #fff;

    &-img {
      width: 416rpx;
      height: 176rpx;
      display: block;
      margin: 0 auto 32rpx;
    }

    &-word {
      height: 42rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: $v-c0-25;
      text-align: center;
    }
  }
</style>
