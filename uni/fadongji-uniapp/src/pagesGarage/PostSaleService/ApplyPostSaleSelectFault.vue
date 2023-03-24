<template>
  <view class="page">
    <view class="header">
      <VoNav :is-fixed="false" is-have-more title="选择故障件" />
      <view class="header_search">
        <VoSearch placeholder="请输入关键字搜索" height="34" v-model="keyword" />
      </view>
    </view>
    <view class="content">
      <block v-if="dataObj && dataObj.length > 0">
        <view
          :class="{ isActive: item.unitId === currentItem.unitId }"
          @click="tapItem(item)"
          class="content_item"
          v-for="(item, index) in dataObj"
          :key="index"
        >{{ item.unit }}</view
        >
      </block>
      <block v-else>
        <VoNoData no-data-tips="暂无故障件" />
      </block>
    </view>
    <view class="uploaded-footer" v-show="dataObj && dataObj.length > 0">
      <view>
        <u-button
          class="uploaded-footer__button"
          color="#FF5319"
          shape="circle"
          text="提交"
          @click="backPage"
        />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
        modelId: null,
        currentItem: {},
        dataObj: [],
      }
    },
    watch: {
      keyword(val, oldValue) {
        this.reqList()
      },
    },
    onLoad(options) {
      if (options.modelId) {
        this.modelId = options.modelId
      }
    },
    mounted() {
      this.reqList()
    },
    methods: {
      tapItem(val) {
        this.currentItem = val
      },
      backPage() {
        uni.$emit('getUnit', this.currentItem)
        uni.navigateBack()
        // this.$linkToEasy(
        //   `/pagesGarage/PostSaleService/ApplyPostSaleService?unit=${this.currentItem.unit}&unitId=${this.currentItem.unitId} `,
        // )
      },
      async reqList() {
        this.dataObj = []
        const res = await this.$VoHttp.apiGoodsModelCompensateUnitList({
          keyword: this.keyword,
          modelId: this.modelId,
        })
        console.log(res)
        if (res.data && Object.keys(res.data).length) {
          let keys = Object.keys(res.data)
          keys.forEach((key) => {
            this.dataObj.push({
              unit: res.data[key],
              unitId: key,
            })
          })
          console.log('111111111', this.dataObj)
        } else {
          this.$u.toast('该发动机暂不支持自助售后，如有需要请联系客服。')
          // this.$u.toast('未录入发动机识别号')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header {
      background-color: #fff;
      .header_search {
        padding: 8rpx 32rpx;
      }
    }
    .content {
      flex: 1;
      overflow: auto;
      background-color: #fff;
      margin-top: 16rpx;
      padding: 40rpx 58rpx;
      .content_item {
        width: 168rpx;
        height: 64rpx;
        display: inline-block;
        font-size: 24rpx;
        border-radius: 80rpx;
        margin-bottom: 32rpx;
        color: rgba(0, 0, 0, 0.85);
        background-color: #f7f7f8;
        border: 1px solid #f7f7f8;
        text-align: center;
        line-height: 64rpx;
      }
      > :nth-child(3n-1) {
        margin: 0 50rpx;
      }
      .isActive {
        color: #ff5319;
        border: 1px solid #ff5319;
        background-color: #ffece5;
      }
    }
    .uploaded-footer {
      height: 182rpx;
      line-height: 182rpx;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $v-bg-white;
      border-top: 2rpx solid #f7f7f8;

      .uploaded-footer__button {
        width: 656rpx;
        height: 80rpx;
        margin: auto;
      }
    }
  }
</style>
