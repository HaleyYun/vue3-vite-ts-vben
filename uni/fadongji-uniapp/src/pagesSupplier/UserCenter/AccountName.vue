<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="name"
  >
    <VoNav is-fixed is-have-more isShadow title="账户名称" />
    <view class="name-content">
      <view class="name-content__textarea">
        <textarea
          v-model.trim="storeName"
          auto-height
          maxlength="15"
          placeholder="请输入名称"
          placeholder-style="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
        ></textarea>
        <view class="textarea-num">{{ storeName.length }}/15</view>
      </view>
    </view>
    <view class="name-button">
      <EraButton v-if="storeName.length > 0" circle text="保存" @click="preserve(storeName)" />
      <EraButton v-else circle disabled text="保存" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AccountName',
    data() {
      return {
        isLoading: false,
        storeName: '',
      }
    },
    onLoad(options) {
      this.storeName = options.storeName
    },
    methods: {
      preserve(content) {
        if (!this.storeName) {
          uni.$u.toast('店铺名称不能为空')
        }
        if (this.isLoading) return
        this.isLoading = true
        let param = {
          storeName: this.storeName,
        }
        this.$VoHttp
          .apiCompanyInfoSroreName(param)
          .then((res) => {
            uni.$u.toast('保存成功')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
            this.isLoading = false
          })
          .catch((e) => {
            this.isLoading = false
            uni.$u.toast(e.message || '保存失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .name {
    width: 750rpx;
    background: #fff;
    min-height: 100vh;
    box-sizing: border-box;
    &-content {
      padding: 40rpx 32rpx;
      font-size: 28rpx;
      color: $v-c0-85;
      line-height: 42rpx;
      &__textarea {
        background: #f7f7f8;
        padding: 20rpx 32rpx;
        box-sizing: border-box;
        border-radius: 8rpx;
        .textarea-num {
          margin-top: 8rpx;
          text-align: right;
          color: $v-c0-25;
        }
      }
    }
    &-button {
      margin-top: 304rpx;
    }
  }
</style>
