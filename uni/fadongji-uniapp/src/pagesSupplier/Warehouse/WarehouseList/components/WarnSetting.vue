<template>
  <u-popup :show="show" mode="bottom" @close="closeHandler">
    <view class="setting">
      <view class="setting-nav flex">
        <view class="setting-nav__left" />
        <view class="flex1 text-center fz-b fz-28">预警设置</view>
        <VoIcon :size="24" name="close" @click="closeHandler" />
      </view>

      <view class="setting-item flex-justify-between">
        <view>无货预警</view>
        <switch
          :checked="formData.warningSoldout == 1"
          color="#00B359"
          style="transform: scale(0.7)"
          @change="changeSoldoutFn"
        />
        <!--        <EraSwitch-->
        <!--          v-model="formData.warningSoldout == 1"-->
        <!--          activeColor="#00B359"-->
        <!--          inactiveColor="rgba(24, 34, 65, 0.25)"-->
        <!--          size="18"-->
        <!--          @click="changeSoldoutFn"-->
        <!--        />-->
      </view>
      <view v-if="formData.warningSoldout == 1" class="setting-item h-auto">
        <span>当商品库存数量≤</span>
        <input
          class="setting-item__input"
          disabled
          placeholder="输入数量"
          placeholder-class="place"
          type="number"
          value="0"
        />
        <span>件时，进行无货预警提示</span>
      </view>
      <view class="h16" />
      <!--      <view class="setting-item h-auto ">-->
      <!--        <span>当商品库存数量≤</span>-->
      <!--        <input placeholder="输入数量" placeholder-class="place" type="number" class="setting-item__input">-->
      <!--        <span>件时，进行无货预警提示</span>-->
      <!--      </view>-->
      <!--      <view class="h16"></view>-->
      <view class="line-bg w-full h24" />
      <view class="setting-item flex-justify-between">
        <view>安全库存预警</view>
        <switch
          :checked="formData.warningSafe == 1"
          color="#00B359"
          size="18"
          style="transform: scale(0.7)"
          @change="changeSafeFn"
        />
      </view>
      <view v-if="formData.warningSafe == 1" class="setting-item h-auto">
        <span>当商品库存数量≤</span>
        <input
          v-model="formData.warningThreshold"
          :min="0"
          class="setting-item__input"
          placeholder="输入数量"
          placeholder-class="place"
          type="number"
          @input="inputFn"
        />
        <span>件时，进行安全库存预警提示</span>
      </view>
      <view class="btn-sure">
        <EraButton size="medium" text="确定" @click="sureFn" />
      </view>
      <!--      <u-button class="btn-sure" size="large" text="确定" @click="sureFn" />-->
      <!--      <u-button  class="disable-btn btn-sure"  disabled text="确定"></u-button>-->

      <VoSafetyArea />
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'WarnSetting',
    props: {
      editData: {
        type: Object,
        default: () => {},
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isLoading: false,
        formData: {
          warningSafe: 1,
          warningSoldout: '',
          warningThreshold: 10,
        },
      }
    },
    watch: {
      editData: {
        handler(val) {
          console.log(val, 'val')
          this.formData = {
            ...val,
            warningThreshold: val.warningThreshold || 10,
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      changeSoldoutFn(e) {
        if (e.detail.value) {
          this.formData.warningSoldout = 1
        } else {
          this.formData.warningSoldout = 10
        }
      },
      changeSafeFn(e) {
        if (e.detail.value) {
          this.formData.warningSafe = 1
        } else {
          this.formData.warningSafe = 10
        }
      },
      inputFn(e) {
        console.log(e, 555555555555)
        if (e.detail.value < 0) {
          this.formData.warningThreshold = 0
        }
      },
      sureFn() {
        if (this.isLoading) return
        this.isLoading = true
        // if (this.formData.warningThreshold < 0) {
        //   this.$u.toast('数量不能为负数')
        // } else {
        let param = this.formData
        this.$VoHttp
          .apiWarehouseStockWarnSetting(param)
          .then((res) => {
            uni.$u.toast('保存成功')
            this.$emit('updateFn')
            this.isLoading = false
          })
          .catch((e) => {
            uni.$u.toast(e.message || '保存失败')

            this.isLoading = false
          })
        // }
      },
      closeHandler() {
        this.$emit('update:show', false)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .setting {
    &-nav {
      width: 750rpx;
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid #f7f7f8;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      height: 94rpx;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);

      &__left {
        width: 24px;
        height: 24px;
      }
    }

    &-item {
      padding: 0rpx 32rpx;
      width: 750rpx;
      box-sizing: border-box;
      height: 96rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);

      &__input {
        width: 136rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        background-color: #f7f7f8;
        border-radius: 8rpx;
        display: inline-flex;
        margin: 0rpx 8rpx;
      }

      &.h-auto {
        height: auto !important;
        display: block !important;
        line-height: 64rpx !important;
      }

      .place {
        font-size: 26rpx;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }

  .btn-sure {
    padding: 20rpx 32rpx;
  }

  .disable-btn {
    background: #f6f7f8;
    color: rgba(0, 0, 0, 0.25);
  }
</style>
