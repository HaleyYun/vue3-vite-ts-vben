<template>
  <view class="classify">
    <u-popup :show="show" mode="right" @close="closeHandler">
      <view class="type flex flex-column">
        <VoBatteryBar />
        <view class="type-flex1 flex1">
          <view class="type-nav">
            <view>商品类型</view>
            <VoIcon :size="24" class="type-nav__absolute" name="close" @click="closeHandler" />
          </view>
          <scroll-view class="tips" scroll-y>
            <view class="tips-template">
              <block v-for="info of goodsTypeList">
                <text
                  v-if="info.length < 6"
                  :key="info.id"
                  :class="selectKeys.includes(info) ? 'select' : 'no-select'"
                  class="tips-template__choose1"
                  space="ensp"
                  @click="chooseFn(info)"
                >
                  {{ info }}
                </text>
                <text
                  v-else-if="info.length >= 6 && info.length < 14"
                  :key="info.id"
                  :class="selectKeys.includes(info) ? 'select' : 'no-select'"
                  class="tips-template__choose2"
                  space="ensp"
                  @click="chooseFn(info)"
                >
                  {{ info }}
                </text>
                <text
                  v-else
                  :key="info.id"
                  :class="selectKeys.includes(info) ? 'select' : 'no-select'"
                  class="tips-template__choose3"
                  space="ensp"
                  @click="chooseFn(info)"
                >
                  {{ info }}
                </text>
              </block>
            </view>
          </scroll-view>
        </view>
        <!-- <view class="type-bottom flex p-b-safe-area">
          <u-button
            :disabled="!selectKeys.length"
            :plain="true"
            color="rgba(0, 0, 0, 0.85)"
            customStyle="width: 280rpx;height: 92rpx;border: 1px solid rgba(0, 0, 0, 0.25);"
            shape="circle"
            size="large"
            text="重置"
            @click="resetHandler"
          />
          <u-button
            :disabled="!selectKeys.length"
            color="#FF5319"
            customStyle="width: 280rpx;height: 92rpx;margin-left: 30rpx;"
            shape="circle"
            size="large"
            text="确定"
            @click="determine"
          />
        </view> -->
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'GoodsTypePopup',
    props: {
      origin: {
        type: String,
        default: '',
      },
      show: {
        type: Boolean,
        default: false,
      },
      checkBox: {
        type: Boolean,
        default: false,
      },
      categoryType: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: '',
      },
      goodsTypeList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        showProductType: false,
        selectKeys: [],
        selectRows: [],
      }
    },
    watch: {
      show(newVal) {
        if (newVal) {
          this.selectKeys = [this.categoryType]
          this.selectRows = [this.categoryType]
        }
      },
    },
    onLoad() {
      if (this.origin === 'editProduct') {
        this.selectKeys = uni.$VoEditProductForm?.categoryType
          ? [uni.$VoEditProductForm.categoryType]
          : []
        this.selectRows = uni.$VoEditProductForm?.categoryType
          ? [uni.$VoEditProductForm.categoryType]
          : []
      } else {
        this.selectKeys = uni.$VoPutProductForm?.paramsProperty
          ? [uni.$VoPutProductForm?.paramsProperty]
          : []
        this.selectRows = uni.$VoPutProductForm?.paramsProperty
          ? [uni.$VoPutProductForm?.paramsProperty]
          : []
      }
    },
    methods: {
      // 关闭操作
      closeHandler() {
        this.resetHandler()
        this.$emit('update:show', false)
      },
      // 选择条目
      chooseFn(item) {
        if (!this.selectKeys.includes(item)) {
          if (this.checkBox) {
            this.selectKeys = [item]
            this.selectRows = [item]
          } else {
            this.selectKeys.length = 0
            this.selectKeys = [item]
            this.selectRows = [item]
          }
        } else {
          if (this.checkBox) {
            const index = this.selectKeys.findIndex((r) => r === item)
            this.selectKeys = []
            this.selectRows = []
          }
        }
        const value = this.checkBox ? this.selectRows : this.selectRows[0]
        this.$emit('confirm', value)
        this.closeHandler()
      },
      // 重置操作
      resetHandler() {
        this.selectKeys = []
        this.selectRows = []
        this.showProductType = false
      },
      /**
       * 点击确定
       */
      determine() {
        if (this.selectKeys.length) {
          const value = this.checkBox ? this.selectRows : this.selectRows[0]
          this.$emit('confirm', value)
          this.closeHandler()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .classify {
  }

  .type {
    width: 670rpx;
    height: 100vh;
    overflow-y: hidden;
    box-sizing: border-box;

    &-flex1 {
      display: flex;
      flex-direction: column;
      overflow-y: hidden;
    }

    &-nav {
      width: 670rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      position: relative;

      &__absolute {
        position: absolute;
        right: 32rpx;
        top: 20rpx;
      }
    }

    .tips {
      flex: 1;
      padding-left: 32rpx;
      overflow-y: scroll;
      &-title {
        padding: 24rpx 32rpx 24rpx 0;
        font-size: 30rpx;
        height: 46rpx;
        line-height: 46rpx;
        color: $v-c0-85;
      }

      &-template {
        display: flex;
        flex-wrap: wrap;
        //height: 100%;
        //overflow-y: scroll;

        &__choose1 {
          width: 168rpx;
          font-size: 24rpx;
          border-radius: 80rpx;
          padding: 14rpx 0rpx;
          margin-bottom: 24rpx;
          margin-right: 48rpx;
          text-align: center;
        }
        &__choose2 {
          width: 384rpx;
          font-size: 24rpx;
          border-radius: 80rpx;
          padding: 14rpx 0rpx;
          margin-bottom: 24rpx;
          margin-right: 48rpx;
          text-align: center;
        }
        &__choose3 {
          width: 600rpx;
          font-size: 24rpx;
          border-radius: 80rpx;
          padding: 14rpx 30rpx;
          margin-bottom: 24rpx;
          margin-right: 48rpx;
          text-align: center;
        }
      }
    }

    &-bottom {
      width: 670rpx;
      background: #ffffff;
      padding: 32rpx 40rpx;
      box-sizing: border-box;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
    }
  }

  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
    border: 2rpx solid $v-bg-light;
  }

  .select {
    color: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    border: 2rpx solid $color-primary-yellow;
    box-sizing: border-box;
  }
</style>
