<template>
  <view>
    <view class="container">
      <!-- NavBar -->
      <VoNav is-fixed is-have-more isShadow title="识别结果">
      </VoNav>
      <view class="top">
        识别到所扫发动机为下述商品，请设置价格并发布。
        <view class="code">{{ scanCode }}</view>
      </view>
      <!-- 商品信息 -->
      <view class="goods">
        <view class="goods-image">
          <image :src="goodsInfo.pic" class="img" mode="aspectFill" />
        </view>
        <view class="flex1 fz-32 color-block">
          <view class="goods-title overTwoEllipsis">
            <text v-if="goodsInfo.categoryType" class="sign">{{ goodsInfo.categoryType }}</text>
            <text class="fz-b">{{ goodsInfo.name }}</text>
          </view>
        </view>
      </view>
      <!-- 提交表单 -->
      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="form"
        labelPosition="left"
        labelWidth="128"
      >
        <EraFormItem
          class="form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="修理厂支付形式"
          prop="paymentForm"
          required
        >
          <EraCheckboxGroup v-model="payType" class="item-group" color="#FF5319">
            <EraCheckbox :name="1" disabled label="现金" />
            <EraCheckbox :name="2" class="m-l-48" label="账期" />
          </EraCheckboxGroup>
        </EraFormItem>
        <EraFormItem
          class="form__item cash"
          color="rgba(0, 0, 0, 0.85)"
          label="修理厂现金价格"
          prop="cashPrice"
          required
        >
          <u-input
            v-model.trim="formData.cashPrice"
            :formatter="formatterMoney"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入修理厂现金价格"
            placeholderClass="item-placeholder"
          />
          <text class="item-text">元</text>
          <view class="form__block"> 参考零售价：{{ goodsInfo.cashPrice || '--' }}元</view>
        </EraFormItem>
        <EraFormItem
          v-if="payType.includes(2)"
          class="form__item cash"
          color="rgba(0, 0, 0, 0.85)"
          label="账期价格"
          prop="accountPrice"
          required
        >
          <u-input
            v-model.trim="formData.accountPrice"
            :formatter="formatterMoney"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="item-placeholder"
            type="number"
          />
          <text class="item-text">元</text>
          <view class="form__block"> 参考零售价：{{ goodsInfo.accountPrice || '--' }}元</view>
        </EraFormItem>
        <EraFormItem
          v-if="payType.includes(2)"
          class="form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="账期天数"
          prop="accountPeriodDays"
          required
        >
          <u-input
            v-model.trim="formData.accountPeriodDays"
            :formatter="formatterMonth"
            border="none"
            class="item-input m-r-6"
            color="rgba(0, 0, 0, 0.85)"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="item-placeholder"
            type="number"
          />
          <text class="item-text">天</text>
        </EraFormItem>
      </EraForm>
      <!-- 底部按钮 -->
      <view class="btnBar bg-white border-top">
        <view class="btn" @click="sure">立即发布</view>
        <VoSafetyArea :is-fixed="false" />
      </view>
    </view>
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showPublished"
      :showCancelButton="true"
      confirmText="去看看"
      @cancel="cancel"
      @confirm="confirm"
    />
  </view>
</template>
<script>
  import { formatterHandle } from '@/common/helper'

  export default {
    name: 'SetGoodsInfo',
    data() {
      return {
        type: 3, // 类型：1.商家仓扫码补货 2.商家仓手动出库 3.一件上架
        id: '', // 商品id
        // 商品信息
        goodsInfo: {},
        payType: [1],
        formData: {
          paymentForm: '', // 支付形式
          cashPrice: '', // 现金价格
          accountPrice: '', // 账期价格
          accountPeriodDays: '', // 账期天数
        },
        rules: {
          cashPrice: {
            type: 'number',
            required: true,
            message: '请输入修理厂现金价格',
            trigger: ['blur'],
          },
          accountPrice: {
            type: 'number',
            required: true,
            message: '请输入账期价格',
            trigger: ['blur', 'change'],
          },
          accountPeriodDays: [
            {
              required: true,
              type: 'number',
              message: '请输入账期天数',
              trigger: ['blur', 'change'],
            },
            {
              validator: (rule, value) => {
                return this.$vocenApi.Pattern.isIntNumber(value) && value > 0
              },
              message: '账期必须是整数且大于0',
              trigger: ['blur'],
            },
          ],
        },
        showPublished: false, // 是否去查看弹出层
        content: '您的店铺之前已发布过该商品，不可重复发布。是否去查看发布情况？',
        scanCode: '',
      }
    },
    methods: {
      formatterMonth: (value) => formatterHandle(value, 'int'),
      formatterMoney: (value) => formatterHandle(value, 'money'),
      // 立即发布
      sure() {
        this.$refs.form.validate().then((res) => {
          if (this.isLoading) return
          this.isLoading = !this.isLoading
          let arr = [this.scanCode]
          const params = {
            ...this.formData,
            engineIdentificationCode: arr,
            id: this.goodsInfo.id,
          }
          if (!params.accountPeriodDays) {
            delete params.accountPeriodDays
            delete params.accountPrice
          }
          this.$VoHttp.GOODS.apiGoodsShelves(params)
            .then((res) => {
              console.log(res, 'res')
              this.$backFn()
              // this.$linkToEasy('/pagesAgent/GoodsManage/MyGoods')
            })
            .catch((err) => {
              if (err.code === '40004') {
                this.showPublished = true
              } else {
                uni.$u.toast(err.message || '操作失败')
              }
            })
          setTimeout(() => {
            this.isLoading = !this.isLoading
          }, 2000)
        })
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirm() {
        this.$storage.set('storeGoodsData', this.goodsInfo)
        this.$linkToEasy('/pagesAgent/StoreDetail/InventoryDetails?id=' + this.id)
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancel() {
        this.showPublished = false
      },
      // 获取商品信息
      getInfo(id) {
        this.$VoHttp.GOODS.apiGoodsDetail({ id: id })
          .then((res) => {
            this.goodsInfo = res.data
            this.goodsInfo.pic =
              this.goodsInfo.pic && this.goodsInfo.pic.length ? this.goodsInfo.pic[0] : ''
            this.formData.cashPrice = this.goodsInfo.cashPrice || ''
            this.formData.accountPrice = this.goodsInfo.accountPrice || ''
            this.formData.accountPeriodDays = this.goodsInfo.accountPeriodDays || ''
            console.log(this.formData)
            this.$forceUpdate()
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络请求失败')
          })
      },
      resetForm() {
        this.$refs['form'].resetFields()
      },
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad(options) {
      this.getInfo(options.id || 123)
      console.log(options, 'options')
      this.id = options.id
      this.scanCode = options.code || ''
    },
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
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
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f7f7f8;
    overflow-y: scroll;
    box-sizing: border-box;
    .top {
      padding: 24rpx 36rpx;
      background: #ffffff;
      margin-top: 14rpx;
      color: #000;
      font-size: 28rpx;
      font-weight: 500;
      .code {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border: 2rpx solid rgba(0, 0, 0, 0.08);
        border-radius: 16rpx;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 400;
        font-size: 32rpx;
        margin-top: 24rpx;
      }
    }
    .goods {
      display: flex;
      flex-wrap: nowrap;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin: 16rpx 0;

      &-image {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 16rpx;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      &-title {
        //display: flex;
        width: 500rpx;
        margin-bottom: 16rpx;

        .sign {
          font-weight: 400;
          display: inline-block;
          flex-shrink: 0;
          padding: 0 12rpx;
          font-size: 24rpx;
          color: #fff;
          background: #ff5319;
          border-radius: 24rpx;
          height: 36rpx;
          line-height: 36rpx;
          margin-right: 16rpx;
        }
      }
    }

    .form {
      padding: 24rpx 32rpx;
      background: #fff;

      &__item {
        //padding: 0rpx 32rpx;
        box-sizing: border-box;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        position: relative;

        .item-input {
          height: 48rpx;
          line-height: 150%;
        }

        .item-placeholder {
          text-align: right;
          color: $v-c0-25 !important;
          font-size: 32rpx;
        }

        .item-text {
          font-size: 32rpx;
          line-height: 48rpx;
          margin-left: 24rpx;
        }

        &.cash {
          height: 130rpx;
        }

        .item-group {
          margin-left: auto;
        }
      }

      &__block {
        height: 60rpx;
        line-height: 60rpx;
        text-align: right;
        font-size: 28rpx;
        color: #ee0a24;
        // border-bottom: 2rpx solid $v-bg-light;
        position: absolute;
        right: 0;
        bottom: 8rpx;
        padding-bottom: 10rpx;
        margin-top: 24rpx;
      }

      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
        margin-left: 44rpx;
      }
    }

    .btnBar {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }

    .btn {
      height: 80rpx;
      font-size: 32rpx;
      color: #fff;
      background: #ff5319;
      border-radius: 48rpx;
      line-height: 80rpx;
      text-align: center;
    }
  }
</style>
