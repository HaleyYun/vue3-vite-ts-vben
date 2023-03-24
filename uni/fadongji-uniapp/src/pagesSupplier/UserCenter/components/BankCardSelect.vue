<template>
  <u-popup :show="show" mode="bottom" @close="close">
    <view>
      <view class="card-title fz-32">
        <view class="color-block-45 w100" @click="cancelFn">取消</view>
        <view class="flex1 text-center color-block">时间收款账户</view>
        <view class="w100" />
      </view>
      <view
        v-for="(info, index) of bankCardSelect"
        :key="index"
        class="flex flex-vertical-c card-item fz-32 color-block fz-b"
        @click="selectedFn(index)"
      >
        <VoIcon :size="24"  name="bank-card"/>
        <view class="m-l-16 flex1 overEllipsis">{{ info.bankName }}</view>
        <VoIcon v-if="info.selected" :size="20" color="#FF9B05" name="right" />
      </view>

      <view class="flex flex-vertical-c card-item fz-32 color-block fz-b" @click="goAddBankCard">
        <VoIcon :size="24" color="#FF9B05" name="bank-card" />
        <view class="m-l-16 flex1 overEllipsis">新增银行卡</view>
        <VoIcon :size="20" name="right-arrow" />
      </view>
    </view>
  </u-popup>
</template>

<script>
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'BankCardSelect',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        bankCardSelect: [],
        selected: {},
      }
    },
    methods: {
      /**
       * 关闭事件
       */
      close() {
        this.$emit('update:show', false)
        // console.log('close');
      },
      cancelFn() {
        this.close()
      },
      /**
       * 跳转添加银行卡
       */
      goAddBankCard() {
        this.close()
        this.$linkToEasy('/pagesSupplier/UserCenter/AddBankCard')
      },
      // 获取银行卡列表
      async initBankCard() {
        showLoading()
        try {
          const data = await this.$VoHttp.USER.apiExtraBankList()
          if (+data.code === 20001) {
            data.data.forEach((item, index) => {
              item.selected = false
              if (index === 0) {
                item.selected = true
                this.selected = item
              }
            })
            this.bankCardSelect = data.data
            this.$emit('changeBinkCard', this.selected)
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
        }
        hideLoading()
      },
      // 选择银行卡
      selectedFn(i) {
        console.log(this.bankCardSelect)
        this.bankCardSelect.forEach((item, index) => {
          if (i === index) {
            item.selected = true
            this.selected = item
          } else {
            item.selected = false
          }
        })
        this.close()
        this.$emit('changeBinkCard', this.selected)
      },
    },
    created() {
      this.initBankCard()
    },
  }
</script>

<style lang="scss" scoped>
  .card-title {
    width: 750rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    padding: 0rpx 32rpx;
    box-sizing: border-box;
  }
  .card-item {
    width: 750rpx;
    height: 140rpx;
    padding: 0rpx 32rpx;
    box-sizing: border-box;
  }
</style>
