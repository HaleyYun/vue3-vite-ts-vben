<template>
  <view>
    <u-popup :show="show" mode="right" @close="closeHandler">
      <view class="popup flex flex-column">
        <view class="popup-close">
          <VoIcon :size="24" name="close" @click="closeHandler" />
        </view>
        <view class="popup-search">
          <VoSearch v-model="keyword" height="34" placeholder="请输入搜索" />
        </view>
        <view class="popup-model flex1 overflow-y">
          <view class="fz-b fz-30 m-b-24">型号</view>
          <view class="flex flex-wrap flex-justify-between">
            <view
              v-for="info of modelList"
              :key="info.id"
              :class="{ selected: info.choose === true, 'un-selected': info.choose === false }"
              class="popup-model__public m-b-20"
              @click="chooseFn(info)"
            >
              {{ info.name }}
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'ModelPopup',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      modelList: {
        type: Array,
        default() {
          return [
            {
              id: 1,
              name: '154963766658859008',
              choose: false,
            },
            {
              id: 2,
              name: 'DK15-02',
              choose: false,
            },
            {
              id: 3,
              name: 'DK15-02',
              choose: false,
            },
            {
              id: 4,
              name: 'B15',
              choose: false,
            },
          ]
        },
      },
    },
    data() {
      return {
        keyword: '', // 搜索双向绑定
      }
    },
    methods: {
      // 关闭操作
      closeHandler() {
        this.$emit('update:show', false)
      },
      /**
       * 选择型号
       */
      chooseFn(e) {
        this.modelList.forEach((info) => {
          info.choose = e.id === info.id
        })
        this.$emit('chooseFn', e)
        this.closeHandler()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .popup {
    width: 670rpx;
    height: 100vh;
    &-close {
      padding: 20rpx 32rpx;
    }
    &-search {
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-model {
      padding: 24rpx 32rpx;
      &__public {
        line-height: 64rpx;
        padding: 0rpx 33rpx;
        text-align: center;
        box-sizing: border-box;
        font-size: 24rpx;
        border-radius: 64rpx;
      }
    }
  }
  .selected {
    border: 2rpx solid #ff6633;
    color: #ff5319;
    background: #ffece5;
  }
  .un-selected {
    border: 2rpx solid #f7f7f8;
    background: #f7f7f8;
    color: $v-c0-85;
  }
</style>
