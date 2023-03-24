<template>
  <view class="edit">
    <VoNav :title="navTitle" is-fixed is-have-more is-shadow>

    </VoNav>
    <view class="edit-form">
      <view class="textarea">
        <u--textarea
          v-model="value"
          class="edit-form__input"
          confirmType="done"
          height="400rpx"
          maxlength="450"
          placeholder="请输入个性签名"
          placeholderClass="placeholder"
          @input="inputHandle"
        />
        <view class="count">{{ value.length || 0 }}/450</view>
      </view>

      <view v-if="value" class="edit-form__btn" @click="toSave">提交</view>
      <view v-else class="edit-form__btn disabled">提交</view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'RemarksPage',
    components: {},
    data() {
      return {
        navTitle: '备注',
        value: '',
      }
    },
    onLoad() {},
    methods: {
      inputHandle(val) {
        this.value = val.replace(/\s+/g, '')
        // console.log(val, this.value)
      },
      toSave() {
        uni.$emit('remark', this.value)
        this.$backFn()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .edit {
    height: 100vh;
    background: #fff;
    padding: 40rpx 32rpx;
    box-sizing: border-box;
    &-form {
      .textarea {
        position: relative;
        min-height: 268rpx;
        max-height: 498rpx;
        background: #f7f7f8;
        border-radius: 8rpx;
        .count {
          position: absolute;
          right: 32rpx;
          bottom: 20rpx;
          color: $v-c0-25;
          font-size: 28rpx;
          line-height: 1.5;
        }
      }
      &__input {
        background: #f7f7f8 !important;
        border: 0;
        color: $v-c0-85;
        padding: 20rpx 32rpx 60rpx 32rpx;
        box-sizing: border-box;
      }
      &__btn {
        background: $color-primary-yellow;
        border-radius: 24px;
        text-align: center;
        font-size: 32rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 22rpx 0;
        margin-top: 166rpx;
        &.disabled {
          background: #f6f7f8;
          color: $v-c0-25;
        }
      }
    }
    .placeholder {
      font-size: 28rpx;
      line-height: 1.5;
      color: $v-c0-25;
    }
    .u-textarea__count {
      background-color: none;
    }
  }
</style>
