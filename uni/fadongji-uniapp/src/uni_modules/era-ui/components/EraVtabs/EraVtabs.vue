<template>
  <view class="v-tabs" :style="[{ width: $u.addUnit(tabsWidth) }]">
    <scroll-view scroll-y="true">
      <view
        class="v-tabs__item"
        @click="itemClick(item, index)"
        v-for="(item, index) in list"
        :key="index"
        :class="index === current2 ? 'active' : ''"
        :style="index === current2 ? activeStyle : inactiveStyle"
      >
        <!--  width: $u.addUnit(lineWidth), -->
        <view
          v-if="index === current2"
          class="item-line"
          :style="[
            {
              backgroundColor: lineColor,
            },
          ]"
        />
        <view class="item-text" :style="index === current2 ? activeStyle : inactiveStyle">
          {{ item[keyName] }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
  // import props from './props.js'
  export default {
    name: 'EraVtabs',
    components: {},
    props: {
      //宽度
      tabsWidth: {
        type: [String, Number],
        default: 100,
      },
      // tabs标签数组
      list: {
        type: Array,
        default: () => {
          return []
        },
      },
      // 滑块颜色
      lineColor: {
        type: String,
        default: '#22284B',
      },
      // 菜单选择中时的样式
      activeStyle: {
        type: [String, Object],
        default: () => {
          return { color: '#22284B', fontWeight: 500 }
        },
      },
      // 菜单非选中时的样式
      inactiveStyle: {
        type: [String, Object],
        default: () => {
          return { color: 'rgba(0, 0, 0, 0.45)' }
        },
      },
      // 滑块宽度
      // lineWidth: {
      //   type: [Number],
      //   default: 3,
      // },
      // 滑块高度
      // lineHeight: {
      //   type: [String, Number],
      //   default: uni.$u.props.tabs.lineHeight,
      // },
      // 菜单item的样式
      itemStyle: {
        type: [String, Object],
        default: '',
      },
      // 当前选中标签的索引
      current: {
        type: [Number, String],
        default: 0,
      },
      // 默认读取的键名
      keyName: {
        type: String,
        default: 'name',
      },
    },
    data() {
      return {
        current2: this.current,
      }
    },
    methods: {
      itemClick(item, index) {
        this.current2 = index
        this.$emit('click', item)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .v-tabs {
    display: flex;
    flex-direction: column;
    &__item {
      display: flex;
      align-items: center;
      height: 100rpx;
      padding-left: 38rpx;
      position: relative;
      background: #f7f7f8;
      &.active {
        background: #fff;
        .item-text {
          color: #22284b;
        }
      }
      .item-line {
        width: 6rpx;
        height: 100%;
        position: absolute;
        left: 0;
      }
      .item-text {
        font-size: 28rpx;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.45);
        flex: 1;
      }
    }
  }
</style>
