<template>
  <view class="vh-full bg-white">
    <VoNav is-fixed :left-width="240" :right-width="240" is-have-more>
      <template #title>上货</template>
    </VoNav>
    <view class="success-img fz-0">
      <image mode="aspectFit" class="img" src="/static/created/certify/success_tips.png" />
    </view>
    <view class="success-text">操作成功</view>
    <view class="success-desc">已提交成功，平台审核通过后，将公开在平台售卖</view>
    <view class="put-operate-save border-box bg-white px-32">
      <view class="py-12 flex">
        <view class="p-r-15 flex1">
          <u-button
            size="large"
            color="#22284B"
            type="primary"
            shape="circle"
            :plain="true"
            text="继续上货"
            @click="goToPutProduct"
          />
        </view>
        <view class="p-l-15 flex1">
          <u-button
            size="large"
            color="#22284B"
            shape="circle"
            type="primary"
            text="查看申请"
            @click="checkHandler"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'PutSuccess',
    data() {
      return {}
    },
    methods: {
      goToPutProduct() {
        delete uni['$VoPutProductForm']
        uni.$u.route('/pagesProduct/PutProduct/PutProduct')
      },
      checkHandler() {
        this.$linkToEasy('/pagesSupplier/GoodsManage/MyGoods')
      },
    },
  }
</script>

<style scoped lang="scss">
  .success-text {
    @include black-size-color(30, 0.85);
    font-weight: bold;
    text-align: center;
    margin-top: 46rpx;
  }

  .success-desc {
    @include black-size-color(24, 0.45);
    text-align: center;
    margin-top: 24rpx;
    margin-bottom: 160rpx;
  }

  .success-img {
    text-align: center;
    padding-top: 200rpx;

    .img {
      width: 148rpx;
      height: 148rpx;
    }
  }
</style>
