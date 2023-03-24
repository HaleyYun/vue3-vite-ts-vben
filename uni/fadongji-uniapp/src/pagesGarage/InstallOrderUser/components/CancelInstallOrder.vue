<template>
  <u-popup :show="show" closeOnClickOverlay mode="bottom" @close="close">
    <view class="cancel flex flex-column">
      <view class="flex1 p-b-40">
        <view class="cancel-nav">
          <view class="m-t-40 text-center fz-b fz-32">取消订单</view>
          <VoIcon class="cancel-nav__close" name="close" @click="close" />
        </view>
        <view class="m-l-32 m-r-32">
          <slot name="msg"></slot>
          <!-- <view class="text-center m-t-40 fz-28"
            >当前距离上门时间还有<text class="color-red">6小时</text>，现在取消将扣除违约金<text
              class="color-red"
              >23.00元</text
            >补偿集师傅。</view
          > -->
          <slot name="alert"></slot>
          <view class="color-block-45 fz-28 m-t-40"
            ><text class="color-red">*</text>请选择取消订单原因（必选）：</view
          >
          <EraRadioGroup v-model="radioValue" placement="column">
            <EraRadio
              v-for="(item, index) in radioList"
              :key="index"
              :customStyle="{ marginTop: '17px' }"
              :disabled="item.disabled"
              :iconSize="14"
              :label="item.name"
              :name="item.name"
            />
          </EraRadioGroup>
          <block v-if="radioValue === '其他'">
            <view class="color-block-45 fz-28 m-t-40"
              ><text class="color-red">*</text>取消原因</view
            >
            <EraTextarea
              v-model.trim="textModel"
              class="m-t-32 cancel-area"
              count
              countStyle="background: inherit;right: 28rpx;bottom: 16rpx;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
              height="260rpx"
              maxlength="200"
              placeholder="请输入取消原因"
              placeholderStyle="color:$v-c0-85;font-size:28rpx"
            />
          </block>
        </view>
      </view>
      <!--   底部固定区域   -->
      <view class="cancel-bottom flex">
        <view class="p-b-safe-area" />
        <EraButton
          v-if="(radioValue && radioValue != '其他') || (radioValue === '其他' && textModel)"
          text="确定"
          @click="confirmClick"
        />
        <EraButton v-else disabled text="确定" @click="confirmClick" />
      </view>
      <view class="p-b-safe-area" />
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'CancelInstallOrder',
    components: {},

    props: {
      show: {
        type: Boolean,
        default: false,
      },
      alertMsg: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        textModel: '',
        radioValue: '',
        // 基本案列数据
        radioList: [
          {
            name: '不需要安装了',
            disabled: false,
          },
          {
            name: '计划有变，重新预约时间',
            disabled: false,
          },
          {
            name: '已经与集师傅协商一致，重新约定的安装时间',
            disabled: false,
          },
          {
            name: '其他',
            disabled: false,
          },
        ],
      }
    },
    methods: {
      confirmClick() {
        this.$emit('confirm', { remark: this.textModel, renson: this.radioValue })
      },
      close() {
        this.$emit('close')
        this.textModel = ''
        this.radioValue = ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cancel {
    min-height: 60vh;
    &-nav {
      position: relative;
      &__close {
        position: absolute;
        top: -24rpx;
        right: 32rpx;
      }
    }
    &-area {
      background-color: $v-bg-light;
    }
    &-bottom {
      padding: 20rpx 32rpx;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
