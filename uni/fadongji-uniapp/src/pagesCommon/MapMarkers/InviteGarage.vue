<template>
  <view class="container">
    <VoShareQrCodeView ref="sharePop" :params="params" @cancle="$backFn" />
  </view>
</template>
<script>
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'

  export default {
    name: 'InviteGarage',
    components: {
      VoShareQrCodeView,
    },
    data() {
      return {
        params: {},
      }
    },
    methods: {},
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad() {
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        roleCode: 'garage',
      }
    },
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {
      // this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/RegisterMobilePage')
      this.$refs.sharePop.showShare('/pages/ShareRegister')
    },
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
<style scoped></style>
