<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="remark flex flex-column"
  >
    <VoNav isHaveMore title="订单备注" />
    <view class="remark-line" />
    <view class="remark-content">
      <!-- 文本域 -->
      <EraTextarea
        v-model.trim="textModel"
        border="none"
        class="remark-content__area"
        count
        height="498rpx"
        maxlength="450"
        placeholder="请输入备注信息"
        placeholderStyle="color:$v-c0-25;font-size:28rpx"
      />
    </view>
    <view
      :class="textModel.length > 0 ? 'remark-select' : ''"
      class="remark-bottom"
      @click="confirmClick"
      >提交</view
    >
  </view>
</template>
<script>
  export default {
    name: 'OrderRemark',
    data() {
      return {
        textModel: '',
        orderNumber: 0,
        sign: '',
      }
    },
    methods: {
      // TODO 备注后续逻辑 ？ 对接接口 or 向之前页面传值
      confirmClick() {
        if (this.textModel.length > 0) {
          this.marketOrderRemarkRequest()
        }
      },
      marketOrderRemarkRequest() {
        let param = {
          orderId: this.orderNumber,
          remark: this.textModel,
          type: 1,
        }
        this.$VoHttp
          .apiOrderOldRemarkAdd(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('订单备注添加成功')
              this.$backFn()
              if (this.sign === 'agent') {
                //回显服务商提交订单
                uni.$emit(this.orderNumber, this.textModel)

                uni.$emit('setContent', this.textModel)
              }
            } else {
              uni.$u.toast(res.message || '订单备注添加失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单备注添加失败')
          })
      },
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad(option) {
      let data = JSON.parse(option.data)
      console.log(data, 'onload')
      this.orderNumber = data.warehouseId
      //如果有备注则显示备注
      if (data.remarkList || data.remarkList) {
        data.remarkList.forEach((item) => {
          //买家备注
          if (item.type === 1) {
            this.textModel = item.remark || ''
          }
        })
      }
      if (option.sign) {
        this.sign = option.sign
      }
    },
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onshow() {},
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
  .remark {
    background-color: #ffffff;
    width: 750rpx;
    height: 100vh;

    &-line {
      background-color: #f8f8f8;
      height: 2rpx;
      width: 750rpx;
    }

    &-content {
      margin-top: 40rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
      background-color: $v-bg-light;

      &__area {
        background-color: $v-bg-light;
        padding: 20rpx 32rpx;
      }
    }
    &-bottom {
      margin-left: 32rpx;
      margin-right: 32rpx;
      margin-top: 74rpx;
      height: 92rpx;
      line-height: 92rpx;
      color: $v-c0-25;
      background-color: $v-btn-disabled;
      border-radius: 48rpx;
      text-align: center;
    }
    &-select {
      background-color: $color-primary-yellow;
      color: #ffffff;
    }
  }
</style>
