<template>
  <view>

    <VoDragButton
        :isPlatform="isPlatform"
        v-show="showRightBtn"
        :existTabBar="true"
        :isDock="true"
        @btnClick="dragBtnFn"
        @btnTouchend="btnTouchend"
        @btnTouchstart="btnTouchstart"
    />
    <view v-show="!showRightBtn" :style="showRightInfo" class="workbench-fixbtns" @click.stop>
      <view class="workbench-fixbtns__item" @click="toOnlineService">
        <VoIcon :size="20"  name="qimo-im" />
        <text class="m-l-8" v-if="isPlatform===1">在线客服</text>
        <text class="m-l-8" v-else-if="isPlatform===2">售后客服</text>
        <text class="m-l-8" v-else-if="isPlatform===3">投诉客服</text>
      </view>
      <view class="workbench-fixbtns__item" v-if="showPhone" @click="$cellCustomerPhone('400-893-5518')">
        <VoIcon :size="20" color="#ffffff" name="mobile-new" />
        <text class="m-l-8">电话客服</text>
      </view>

      <view class="workbench-fixbtns__item" v-if="isPlatform===2" @click="$cellCustomerPhone('(010)52534369')">
        <VoIcon :size="20" color="#ffffff" name="mobile-new" />
        <text class="m-l-8">售后电话</text>
      </view>
    </view>

  </view>
</template>

<script>

import {goOnlineCustomerFn} from "@/common/helper";

export default {
  name: 'VoQiMoCustomer',
  props:{
    /**
     * @description 1售前  2售后  3投诉客服
     */
    isPlatform:{
      type:Number,
      default:1
    },
    showPhone:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      showRightInfo: {},
      showRightBtn:true
    }
  },
  methods: {
    close(){
      this.showRightBtn = true
    },
    toOnlineService() {
      goOnlineCustomerFn(this.isPlatform)
    },
    dragBtnFn(res) {
      console.log(res,"**************")
      let resData = {}
      resData.top = res.top + 'px'

      if (res.left == 0) {
        resData.left = '0px'
      } else {
        resData.right = '0px'
      }
      this.showRightInfo = resData
      this.showRightBtn =false
    },
    btnTouchstart() {
      this.showRightBtn = true
    },
    btnTouchend() {
      this.showRightBtn = true
    },

  },
}
</script>

<style lang="scss" scoped>

.workbench{

  &-fixbtns {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 99;
    height: 264rpx;
    width: 190rpx;
    &__item {
      color: #ffffff;
      font-size: 26rpx;
      height: 64rpx;
      line-height: 64rpx;
      background: linear-gradient(90.22deg, #ff7321 2.68%, #ff5622 99.81%);
      mix-blend-mode: normal;
      display: flex;
      align-items: center;
      padding-left: 12rpx;
      padding-right: 16rpx;
      border-radius: 100rpx;
      margin-bottom: 24rpx;
    }
  }
}

</style>
