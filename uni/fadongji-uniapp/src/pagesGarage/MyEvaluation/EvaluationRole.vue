<template>
  <view class="container">
    <VoNav :is-transparent="true" />
    <image class="container-img" src="/static/garage/user/evaluation_rules.jpg" />
  </view>
</template>
<script>
  export default {
    name: 'EvaluationRole',
    data() {
      return {}
    },
    methods: {},
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad() {},
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
    &-img {
      top: 0;
      position: absolute;
      width: 100%;
      height: 4282rpx;
    }
  }
</style>
