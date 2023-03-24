<template>
  <div class="page-wrap">
    <VoNav is-have-more is-fixed title="设置" />
    <div class="page-container">
      <VoCellGroup>
        <VoCell title="设置密码" @click="$linkToEasy('/pages/CommonLogin/PwdChange')">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
        <VoCell title="修改手机号">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
        <VoCell title="工作台设置" :border="false">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
      </VoCellGroup>
      <div class="page-space"></div>
      <VoCellGroup>
        <VoCell title="用户协议">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
        <VoCell title="隐私政策" :border="false">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
      </VoCellGroup>
      <div class="page-space"></div>
<!--      <VoCellGroup>-->
<!--        <VoCell title="支持与保护" :border="false">-->
<!--          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>-->
<!--        </VoCell>-->
<!--      </VoCellGroup>-->
      <div class="page-space"></div>
      <VoCellGroup>
        <VoCell title="清除缓存">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
        <VoCell title="当前版本">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
        <VoCell title="关于我们">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell>
        <!-- <VoCell title="第三方信息共享清单" :border="false">
          <VoIcon slot="right-icon" name="right-arrow" :opacity="0.25"></VoIcon>
        </VoCell> -->
      </VoCellGroup>
    </div>
    <div class="page-footer p-b-safe-area">
      <div class="logout-btn" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
import VoCellGroup from "@/components/VoCellGroup/VoCellGroup";
import VoCell from "@/components/VoCell/VoCell";
import helper from "@/common/helper";

export default {
  name: "SettingCenter",
  components: { VoCell, VoCellGroup },
  data() {
    return {};
  },
  methods: {
    /**
     * @description 退出登录
     */
    loginOut() {
      helper.showLoading()
      this.$VoHttp
        .logoff({}, { noPrefix: true })
        .then((res) => {
          this.$store.dispatch('user/setUseInfo', {})
          setTimeout(()=>{
            // uni.reLaunch({
            //   url:'/pages/SelectRole/SelectRole'
            // })

            uni.reLaunch({
              url: '/pages/CommonLogin/UserLogin',
            })
          },1500)
          uni.$u.toast('退出成功')
        })
        .catch((e) => {
          this.$store.dispatch('user/setUseInfo', {})
          setTimeout(()=>{
            // uni.reLaunch({
            //   url:'/pages/SelectRole/SelectRole'
            // })
            uni.reLaunch({
              url: '/pages/CommonLogin/UserLogin',
            })
          },1500)
          uni.$u.toast('退出成功')
        })
        .finally(() => {
          helper.hideLoading()
        })
    },
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
.page-wrap{
  background: RGB(246,247,248);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .page-container{
    flex:1;
    overflow-y: scroll;
  }
  .page-footer{
    display: flex;
    justify-content: center;
    background: #fff;
    .logout-btn{
      margin: 20rpx;
      width: 686rpx;
      height: 92rpx;
      background: #22284B;
      border-radius: 48rpx;
      color: #fff;
      text-align: center;
      line-height: 92rpx;
      font-size: 32rpx;
    }
  }
}
.page-space{
  height: 16rpx;
}
</style>
