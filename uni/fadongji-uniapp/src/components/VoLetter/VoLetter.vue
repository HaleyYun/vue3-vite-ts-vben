<template>
  <view class="brand">
    <!--  字母的选择：start	-->
    <view ref="brand-index" :style="{ top: top + 'px' }" class="brand-index fz-0">
      <view
        v-for="(l, i) in indexListData"
        :key="i"
        :class="{ active: anchor === l.id }"
        class="brand-index--item"
        @click="selectFn(l)"
      >
        {{ l.key }}
        <view v-if="touching && anchor == l.key" class="anchor-scale">{{ l.key }}</view>
      </view>
    </view>
    <!--  字母的选择：end	-->
  </view>
</template>

<script>
  export default {
    name: 'VoLetter',
    props: {
      height: {
        type: String,
        default: '100vh',
      },
      top: {
        type: Number,
        default: 10,
      },
      indexListData: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        anchor: '',
        // 展示
        touching: false,
      }
    },
    watch: {
      indexListData: {
        handler(newVal) {
          console.log('newVal:', newVal)
        },
        // 立即处理 进入页面就触发
        immediate: true,
        deep: true,
      },
    },
    methods: {
      selectFn(l) {
        this.touching = true
        this.anchor = l.id
        this.$emit('sure', this.anchor)
        setTimeout(() => {
          this.touching = false
        }, 1000)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .brand {
    position: relative;
    z-index: 10;
  }

  .brand-index {
    width: 56rpx;
    position: fixed;
    right: 0rpx;
    padding: 0rpx 12rpx;
    z-index: 10;
    box-sizing: border-box;

    &--item {
      height: 32rpx;
      width: 32rpx;
      line-height: 32rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.45);
      font-size: 20rpx;
      position: relative;

      .anchor-scale {
        position: absolute;
        transform: translate(-115%, -18rpx);
        top: 0rpx;
        width: 66rpx;
        height: 66rpx;
        line-height: 66rpx;
        text-align: center;
        background-color: #fff;
        border-radius: 50%;
        font-weight: bold;
        box-shadow: 0px 4rpx 16rpx rgba(34, 40, 75, 0.15);
        color: $color-primary-yellow;
        font-size: 36rpx;
        font-weight: bold;
      }

      &.active {
        color: #ffffff;
        background-color: $color-primary-yellow;
        border-radius: 50%;
        position: relative;

        .anchor-scale {
          display: block;
        }
      }
    }
  }
</style>
