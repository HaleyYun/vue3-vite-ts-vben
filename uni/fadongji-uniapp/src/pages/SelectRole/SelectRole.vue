<template>
  <view class="user p-t-40 flex flex-vertical-c flex-column flex-justify-c">

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('agent')"
    >服务商登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('supplier')"
    >供应商登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('garage')"
    >修理厂登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('lease')"
    >招商经理登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('channel')"
    >渠道经理登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('oldbuyer')"
    >旧机买家登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('engineer')"
    >技术工登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="goLoginFn('recovery')"
    >回收公司登录</EraButton>

    <EraButton
      class="m-b-20"
      type="primary"
      @click="test"
    >无角色登录</EraButton>



  </view>
</template>

<script>

import EraButton from "@/uni_modules/era-ui/components/EraButton/EraButton";
import { toRoleHome } from "@/common/helper";
// #ifdef APP-PLUS
const vocenPay = uni.requireNativePlugin('vocen-pay')
// #endif
export default {
  components: { EraButton },
  props: {},
  data() {
    return {

    }
  },
  methods: {
    test() {
      this.$linkToEasy('/pagesEngineer/DemoMap')
    },
    /**
     * @description 跳转登录
     */
    goLoginFn(roleCode) {
	// this.$linkToEasy('/pagesLeaseManager/demo')
      this.$linkToEasy('/pages/CommonLogin/UserLogin?roleCode=' + roleCode)
    }
  },
  onShow() {
      if(this.userInfo&&this.userInfo.access_token){
        toRoleHome()
      }
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.user{
  height: 100vh;
  width: 750rpx;
  box-sizing: border-box;
}

</style>
