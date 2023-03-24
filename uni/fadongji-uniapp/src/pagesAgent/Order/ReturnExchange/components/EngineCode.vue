<template>
  <view class="engine">
    <view class="color-block fz-b p-t-24 fz-32">
      <view class="m-l-50 position-relative">
        <span class="red-required">*</span>
        退回机器的发动机识别码：
      </view>
    </view>
    <view class="code">
      <view
        v-for="(item, index) in engineArr"
        :key="index"
        :class="item.selected ? 'code-labelSelected' : 'code-label'"
      >
        <view class="text-nowrap" @click="chooseCode(item)">{{ item.name }}</view>
      </view>
    </view>
    <view class="color-red p-l-32 m-t-8 p-b-24 fz-24">邮寄时，请一定寄回所选识别码的机器哦！</view>
  </view>
</template>

<script>
  export default {
    name: 'EngineCode',
    props: {
      goodData: {
        type: Object,
        default: {},
      },
      isEdit: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        engineArr: [],
      }
    },
    created() {
      console.log(this.isEdit, 888888888)
      if (this.goodData.orderId) {
        this.getData()
      }
    },
    methods: {
      chooseCode(item) {
        this.engineArr.forEach((code) => {
          if (item.name === code.name) {
            code.selected = !code.selected
          }
        })
        let arr = this.engineArr.filter((item) => item.selected)
        console.log('arr==', arr)
        this.$emit('selectedFn', arr)
      },
      /**
       * 获取发动机识别码列表数据
       */
      getData() {
        let params = {
          // orderId: this.goodData.orderId,
          // orderId: this.goodData.oriOrderId,
          goodsId: this.goodData.goodsId,
          projectId: this.goodData.projectId || 0,
        }
        console.log(this.isEdit, 44444444)
        if (Number(this.isEdit) === 1) {
          params.orderId = this.goodData.oriOrderId
          console.log(params.orderId, 111111111)
        } else {
          params.orderId = this.goodData.orderId
          console.log(params.orderId, 2222222222222)
        }
        this.$VoHttp
          .apiRefundGetRefundEngineCode(params)
          .then((res) => {
            if (res.data && res.data.length) {
              this.engineArr = res.data.map((item) => {
                return {
                  name: item,
                  selected: false,
                }
              })
            }
            if (this.engineArr.length === 1) {
              this.engineArr[0].selected = true
              this.$emit('selectedFn', this.engineArr)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            // this.triggered = false
            // this.refresh = false
            // this.loadingStatus = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .engine {
    width: 750rpx;
    background-color: #ffffff;
    margin-top: 16rpx;
  }
  .code {
    background-color: #ffffff;
    padding-left: 8rpx;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    &-label {
      position: relative;
      height: 56rpx;
      line-height: 56rpx;
      width: 328rpx;
      margin: 20rpx 18rpx;
      text-align: center;
      display: inline-block;
      border: 2rpx solid $v-c0-25;
      border-radius: 8rpx;
      font-size: 28rpx;
      color: $v-c0-65;
    }
    &-labelSelected {
      position: relative;
      height: 56rpx;
      line-height: 56rpx;
      width: 328rpx;
      margin: 20rpx 18rpx;
      text-align: center;
      display: inline-block;
      border: 2rpx solid $color-primary-yellow;
      background-color: $color-primary-yellow;
      border-radius: 8rpx;
      font-size: 28rpx;
      color: #ffffff;
    }
  }
  .red-required {
    color: #f56c6c;
    position: absolute;
    left: -9px;
    top: 3px;
    line-height: 20px;
    font-size: 20px;
    font-weight: 400;
  }
  .position-relative {
    position: relative;
  }
</style>
