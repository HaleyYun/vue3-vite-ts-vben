<template>
  <VoModal :show="modalVisible" showCancelButton @cancel="close" @confirm="confirmFn">
    <view class="modal-content color-block">
      <view class="font-weight-500 p-b-48 text-center fz-32">{{ info.model }} 回收价格</view>

      <view class="flex h-96 flex-vertical-c">
        <u-input
          maxlength="6"
          v-model.number="price"
          class="input fz-32 flex1"
          inputAlign="left"
          placeholder-class="color-block-45"
          type="number"
          @input="inputFn"
          :formatter="formatterMoney"
        />
        <text class="font-weight-500 m-l-8"> 元</text>
      </view>
      <view v-if="tipText" class="fz-28 tip">{{ tipText }}</view>
    </view>
  </VoModal>
</template>
<script>
  import { formatterHandle } from '@/common/helper'

  export default {
    data() {
      return {
        modalVisible: false,
        info: {
          modelId: '',
        },
        price: '',
        tipText: '',
        isLoading: false,
        originPrice: '',
        formatterMoney: (value) => formatterHandle(value, 'money'),
      }
    },
    methods: {
      show(info) {
        console.log(info)
        this.info = info
        this.price = info.price
        this.originPrice = info.price
        this.modalVisible = true
        this.isLoading = false
        this.tipText = ''
      },
      close() {
        this.modalVisible = false
        this.price = ''
        this.originPrice = ''
        this.isLoading = false
        this.tipText = ''
      },
      async confirmFn() {
        if (this.originPrice === this.price) {
          uni.$u.toast(`请先修改价格`)
          return
        }
        if (this.isLoading || this.tipText) {
          return
        }
        // /goods/recycle/model/update/price
        const { modelId, id } = this.info
        await this.$VoHttp
          .apiGoodsRecycleModelUpdatePrice({
            modelId,
            price: this.price,
            id,
          })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('商品修改成功', 'success', '/static/icons/success_icon.png')
              this.$emit('success')
              this.close()
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '修改失败')
          })
      },
      async inputFn(val) {
        console.log(val)
        if (!val) {
          this.tipText = '不可为空'
        } else {
          if (this.isLoading || val <= 0) {
            return
          }
          this.isLoading = true
          await this.$VoHttp
            .apiGoodsRecycleModelCheckPrice(
              { modelId: this.info.modelId, price: val },
              { noLoading: true },
            )
            .then((res) => {
              this.tipText = res.data ? '' : '回收价格过低'
            })
            .catch((err) => {
              this.$u.toast(err.message || '网络错误')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
        return formatterHandle(val, 'money')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .modal-content {
    box-sizing: border-box;
    flex: 1;

    .input {
      background: #f7f7f8;
      border-radius: 8rpx;
      padding: 0 24rpx;
      box-sizing: border-box;
      height: 96rpx;
    }

    .tip {
      margin-top: 16rpx;
      color: #ee0a24;
    }
  }
</style>
