<template>
  <view v-show="empty" class="echo">
    <view class="echo-box flex">
      <view
        v-for="(item, index) of echoList"
        v-show="item.delete"
        :key="index"
        class="echo-option flex flex-vertical-c"
      >
        <view>{{ item.name }}</view>
        <image
          class="echo-option__icon"
          src="/static/created/circle/delete.png"
          @click="deleteFn(item)"
        />
      </view>
    </view>
    <view class="echo-right flex flex-vertical-c" @click.stop="emptyFn">
      <VoIcon :size="16" class="m-l-20" name="delete" />
      <view class="m-l-4 fz-28 color-block-45">清空</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'EchoTime',
    props: {
      echoList: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        empty: true,
        // echoList: [
        //   {
        //     id: 1,
        //     name: '三天内',
        //     delete: true,
        //   },
        //   {
        //     id: 2,
        //     name: '20公里',
        //     delete: true,
        //   },
        //   {
        //     id: 3,
        //     name: '郑州(11)',
        //     delete: true,
        //   },
        //   {
        //     id: 4,
        //     name: '开封(11)',
        //     delete: true,
        //   },
        // ],
      }
    },
    methods: {
      /**
       * 删除
       * @param e
       */
      deleteFn(e) {
        this.$emit('deleteFn', e)
        // this.echoList.forEach((item) => {
        //   if (e.id === item.id) {
        //     item.delete = false
        //   }
        // })
        let arr = this.echoList.filter((item) => !item.delete)
        if (arr.length === this.echoList.length) {
          this.empty = false
        }
      },
      /**
       * 清空
       */
      emptyFn() {
        this.empty = false
        this.$emit('emptyFn')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .echo {
    width: 100%;
    background: #fff;
    padding: 16rpx 128rpx 12rpx 24rpx;
    box-sizing: border-box;
    white-space: nowrap;
    position: relative;
    &-right {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      width: 128rpx;
      height: 64rpx;
      border-left: 2rpx solid $v-bg-light;
    }
    &-box {
      overflow-x: scroll;
    }
    &-option {
      height: 36rpx;
      line-height: 36rpx;
      box-sizing: border-box;
      padding: 0 6rpx 0 16rpx;
      background: #ffece5;
      font-size: 24rpx;
      border: 2rpx solid #ff6633;
      border-radius: 32rpx;
      color: #ff5319;
      margin-right: 16rpx;
      &__icon {
        width: 24rpx;
        height: 24rpx;
        border-radius: 50%;
        overflow: hidden;
        display: block;
        margin-left: 8rpx;
      }
    }
  }
</style>
