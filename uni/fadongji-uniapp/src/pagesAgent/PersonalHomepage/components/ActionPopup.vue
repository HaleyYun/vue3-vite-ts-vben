<template>
  <u-popup v-if="visible" :show="visible" @close="close">
    <block v-if="key === 'edit'">
      <view class="row-item" @click="toEdit">修改</view>
    </block>
    <block v-else>
      <view class="row-item" @click="toFocus" v-if="focusStatus === 0">关注TA</view>
      <view
        class="row-item"
        @click="confirmFocusCancel"
        v-if="focusStatus === 1 || focusStatus === 2"
      >
        取消关注
      </view>
      <!-- <view class="row-item">不看这个问题</view> -->
      <view class="row-item red" @click="toReport">举报</view>
    </block>

    <view class="row-item last" @click="close">取消</view>
  </u-popup>
</template>
<script>
  export default {
    name: 'ActionPopup',
    props: {
      info: {
        type: Object,
      },
      // 关注状态 0 未关注1已关注2互相关注
      focusStatus: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        visible: false,
        record: {},
        key: '',
      }
    },
    methods: {
      show(data, key) {
        this.record = data
        this.key = key
        this.visible = true
      },
      close() {
        this.visible = false
      },
      //关注
      toFocus() {
        this.$emit('toFocus')
        this.visible = false
      },
      //取消关注
      confirmFocusCancel() {
        this.$emit('confirmFocusCancel')
        this.visible = false
      },
      //举报
      toReport() {
        let reportData = {
          id: this.record.id,
          userId: this.record.userId,
          businessType: this.record.businessType,
        }
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/AnswerAll/CircleReport?data=' + JSON.stringify(reportData),
        )
        this.visible = false
      },
      //修改
      toEdit() {
        if (this.record.businessType === 0) {
          //去修改问题
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseQuestion?id=' + this.record.id,
          )
        }
        if (this.record.businessType === 1) {
          //去修改想法
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseIdea?id=' + this.record.id,
          )
        }
        if (this.record.businessType === 3) {
          //去修改回答
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/CreatedQuestion/ToAnswer?answerId=' + this.record.id,
          )
        }
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .row-item {
    height: 94rpx;
    font-size: 32rpx;
    color: $v-c0-85;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f7f7f8;
    &.last {
      border-top: 8rpx solid #f7f7f8;
      border-bottom: none
    }
    &.red {
      color: #ee0a24;
    }
  }
</style>
