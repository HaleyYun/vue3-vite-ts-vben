<template>
  <!--  <view class="order-nav">-->
  <!--    <VoIcon-->
  <!--      class="order-nav__back"-->
  <!--      name="left-arrow"-->
  <!--      color="#000000"-->
  <!--      :opacity="0.45"-->
  <!--      :size="24"-->
  <!--      @click="back"-->
  <!--    />-->
  <EraTabs class="flex flex-justify-c" :list="list" @click="tabClick" />
  <!--    <VoIcon-->
  <!--      class="order-nav__more"-->
  <!--      name="more"-->
  <!--      color="#000000"-->
  <!--      :opacity="0.45"-->
  <!--      :size="24"-->
  <!--      @click="more"-->
  <!--    />-->
  <!--  </view>-->
</template>

<script>
  export default {
    name: 'OrderListNav',

    props: {
      list: {
        type: Array,
        default: [],
      },
    },
    methods: {
      tabClick(item) {
        this.$emit('navTab', item)
      },
      back() {
        this.$emit('backClick')
      },
      more() {
        this.$emit('moreClick')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order-nav {
    width: 400rpx;
    height: 98rpx;
    line-height: 98rpx;

    &__back {
      margin-left: 32rpx;
      margin-top: 26rpx;
    }
    &__more {
      margin-right: 32rpx;
      margin-top: 26rpx;
    }
  }
</style>
