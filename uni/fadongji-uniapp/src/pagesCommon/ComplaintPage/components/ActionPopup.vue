<template>
  <u-popup v-if="visible" :show="visible" @close="close">
    <view class="row-item" v-for="item in reasonList" :key="item.name" @click="select(item)">{{
      item.name
    }}</view>
    <view class="row-item last" @click="close">取消</view>
  </u-popup>
</template>
<script>
  export default {
    name: 'ActionPopup',
    data() {
      return {
        visible: false,
        //投诉类型
        reasonList: [],
      }
    },
    methods: {
      getReasonList() {
        this.$VoHttp
          .apiContentComplaintType()
          .then((res) => {
            this.reasonList = res.data || []
          })
          .catch((err) => {
            console.log(err)
          })
      },
      show() {
        this.getReasonList()
        this.visible = true
      },
      close() {
        this.visible = false
      },
      select(item) {
        this.$emit('select', item)
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
    }
    &.red {
      color: #ee0a24;
    }
  }
</style>
