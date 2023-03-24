<template>
  <view class="page">
    <VoNav :is-fixed="false" :is-back="false" is-have-more title="满意度评价" @backFn="reBack" />
    <view class="content">
      <view class="content_goods">
        <view>
          <text class="fz-28 black85"
            >服务单号：<text>{{ orderDetail.id }}</text></text
          >
          <!-- <text>{{ dataItem.createTime }}</text> -->
        </view>
        <GoodsItemCard :orderDetail="orderDetail" />
      </view>
      <view class="content_evaluate">
        <view>
          <view class="title">1. 您对本次售后服务满意吗？</view>
          <view class="p-l-32 flex flex-vertical-c">
            <u-rate size="30" v-model="form.star" />
            <view class="fz-24 lh36 m-l-4" v-if="form.star">{{ levelText[form.star] }}</view>
          </view>
          <u-line margin="27rpx 0 0 0" />
        </view>
        <view>
          <view class="title">2. 本次服务是否解决了您的问题？</view>
          <view class="row_radio">
            <u-radio-group v-model="form.isResolve" activeColor="#FF5319">
              <u-radio label="已解决" :name="true" />
              <u-radio label="未解决" :name="false" />
            </u-radio-group>
          </view>
          <u-line margin="27rpx 0 0 0" />
        </view>
        <view>
          <view class="title">3. 本次服务过程给您的整体感受如何？</view>
          <view class="column_radio">
            <u-radio-group v-model="form.comment" placement="column" activeColor="#FF5319">
              <u-radio label="非常省心" name="非常省心" />
              <u-radio label="省心" name="省心" />
              <u-radio label="一般" name="一般" />
              <u-radio label="费力" name="费力" />
              <u-radio label="非常费力" name="非常费力" />
            </u-radio-group>
          </view>
        </view>
      </view>
      <u-modal
        :show="modelShow"
        showCancelButton
        :title="modelTitle"
        confirmText="退出评价"
        cancelText="继续评价"
        confirmColor="#22284B"
        cancelColor="#595959"
        @cancel="cancelExit"
        @confirm="confirmExit"
      >
        <template #default>
          <view class="model_view">
            {{ modelContent }}
          </view>
        </template>
      </u-modal>
    </view>
    <view class="bottom">
      <view
        ><u-button shape="circle" color="#FF5319" class="custom-style" text="提交" @click="submit"
      /></view>
    </view>
  </view>
</template>

<script>
  import GoodsItemCard from './components/GoodsItemCard.vue'
  export default {
    components: {
      GoodsItemCard,
    },
    data() {
      return {
        modelShow: false,
        modelTitle: '',
        id: '',
        modelContent: '确定退出评价吗？',
        orderDetail: {},
        form: {
          star: 0,
          comment: '',
          isResolve: '',
        },
        levelText: { 1: '非常差', 2: '差', 3: '一般', 4: '好', 5: '非常好' },
      }
    },
    onLoad(val) {
      if (val && val.id) {
        this.id = val.id
      }
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      reBack() {
        this.modelShow = true
      },
      confirmExit() {
        this.modelShow = false
        this.$backFn()
      },
      cancelExit() {
        this.modelShow = false
      },
      async getOrderDetail() {
        try {
          const res = await this.$VoHttp.apiOrderAfterSale(this.id)
          if (res.success) {
            this.orderDetail = res.data
          } else {
            uni.$u.toast(res.message)
          }
        } catch (err) {
          uni.$u.toast(err.message)
        }
      },
      async submit() {
        if (!this.form.star || this.form.isResolve === '' || !this.form.comment) {
          this.$u.toast('请完善评价信息')
          return
        }
        const res = await this.$VoHttp.apiOrderAfterSaleComment({ ...this.form, id: this.id })
        if (res.success) {
          this.isEvaluate = true
          // this.$linkToEasy('/pagesGarage/PostSaleService/ApplyPostSaleList')
          // uni.redirectTo({ url: '/pagesGarage/PostSaleService/ApplyPostSaleList' })
          this.$backFn()
          uni.$emit('evaSuccess')
        } else {
          uni.$u.toast(res.message)
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
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
      .content_goods {
        background-color: #fff;
        padding: 24rpx 32rpx;
        margin-top: 16rpx;
      }
      .content_evaluate {
        margin-top: 16rpx;
        padding: 0 32rpx;
        background-color: #fff;
        ::v-deep .row_radio .u-radio-group {
          > :nth-child(1) {
            margin-left: 10rpx;
          }
          > :nth-child(2) {
            margin-left: 42rpx;
          }
        }
        ::v-deep .column_radio .u-radio-group {
          padding-left: 10rpx;
          > :nth-child(n) {
            margin-bottom: 40rpx;
          }
        }
      }
    }
  }
  .title {
    font-size: 32rpx;
    padding: 24rpx 0;
    font-weight: bold;
  }
  .model_view {
    width: 640rpx;
    height: 48rpx;
    font-size: 32rpx;
    margin: 0 auto;
    text-align: center;
  }
  .bottom {
    width: 100%;
    height: 132rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    > :nth-child(n) {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .custom-style {
        width: 656rpx;
        height: 80rpx;
      }
    }
  }
  .black85 {
    color: rgba(0, 0, 0, 0.85);
  }
</style>
