<template>
  <view class="fixed relative">
    <view class="fixed-box flex flex-row w-full bg-white">
      <view
        v-for="(item, index) in tabList"
        :key="index"
        :class="item.selected ? 'fixed-screen' : 'fixed-screen1'"
        @click="toShopScreen(1, index)"
      >
        <view>
          {{ item.name }}
          <VoIcon
            v-if="item.children"
            :color="item.selected ? '#FF5319' : '#000'"
            :name="item.selected ? 'open-arrow-b' : 'close-arrow-t'"
            :opacity="item.selected ? 1 : 0.45"
            class="m-l-8"
            size="16"
          />
        </view>
      </view>
    </view>
    <FliterPop
      ref="fliterPop"
      :list="list"
      :visible="fliterVisible"
      @filterConfirm="filterConfirm"
      @close="fliterVisible = false"
    />
  </view>
</template>

<script>
  import FliterPop from './FliterPop'

  export default {
    name: 'SalesFixed',
    components: { FliterPop },
    props: {
      tabList: {
        type: Array,
        default: () => {
          return [
            // { id: 1, name: '在售', selected: false },
            // { id: 2, name: '待审核', selected: false },
            // { id: 3, name: '待售', selected: false },
            // {
            //   id: 4,
            //   name: '违规',
            //   children: [
            //     { id: 3, name: '待整改', selected: false },
            //     { id: 4, name: '审核中', selected: false },
            //     { id: 5, name: '审核未通过', selected: false },
            //   ],
            // },
          ]
        },
      },
    },
    data() {
      return {
        fliterVisible: false,
        list: [],
        cur: 0,
      }
    },
    methods: {
      /**
       * 父级选择
       * @param type 1 父级选择 2 子级选择
       */
      toShopScreen(type, index) {
        if (type === 1) {
          if (this.tabList[index].children) {
            this.fliterVisible = !this.fliterVisible
            this.list = this.tabList[index].children
            this.cur = index
          }
          this.$emit('change', [index])
        } else {
          this.$emit('change', [this.cur, index])
        }
        // this.$emit('confirm', item)
      },
      //筛选弹框确认
      filterConfirm(index) {
        this.toShopScreen(2, index)
        this.fliterVisible = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fixed {
    width: 750rpx;
    &-box {
      width: 100%;
      height: 96rpx;
      white-space: nowrap;
      overflow-x: scroll;
      padding: 18rpx 0 18rpx 46rpx;
      box-sizing: border-box;
    }
    &-screen {
      //width: 176rpx;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 48rpx;
      box-sizing: border-box;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
      margin-right: 28rpx;
    }
    &-screen1 {
      //width: 176rpx;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 48rpx;
      box-sizing: border-box;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      border-radius: 200rpx;
      margin-right: 28rpx;
    }
  }
</style>
