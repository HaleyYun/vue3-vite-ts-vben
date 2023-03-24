<template>
  <scroll-view class="good-scroll" :scroll-y="true">
    <view v-if="type === '2'" class="good-label flex flex-vertical-c">
      <view
        class="good-label__choose"
        :class="info.selected ? 'select' : 'no-select'"
        v-for="info of labelList"
        :key="info.id"
        @click="chooseClick(info)"
        >{{ info.name }}</view
      >
    </view>
    <view v-if="type === '4'" class="good-label flex flex-vertical-c">
      <view
        class="good-label__choose"
        :class="info.selected ? 'select' : 'no-select'"
        v-for="info of violationList"
        :key="info.id"
        @click="violationClick(info)"
        >{{ info.name }}</view
      >
    </view>

    <view class="h16" />
    <GoodItem
      v-for="(item, index) in dataList"
      :key="index"
      :data="item"
      @goodBottomBtnFn="goodBottomBtnFn"
      @click.native="goodDetail(item)"
    />
  </scroll-view>
</template>
<script>
  import GoodItem from '@/pages/SupplierCenter/components/GoodComponents/GoodItem'

  export default {
    name: 'GoodScroll',
    components: { GoodItem },
    props: {
      dataList: {
        type: Array,
        dataList: [],
      },
      /**
       *1.进行中 2.待审核 3.已下架 4.违规 5.已完成
       */
      type: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        labelList: [
          {
            id: 1,
            name: '全部项目',
            selected: true,
          },
          {
            id: 2,
            name: '审核中',
            selected: false,
          },
          {
            id: 3,
            name: '审核未通过',
            selected: false,
          },
        ],
        violationList: [
          {
            id: 1,
            name: '待整改',
            selected: true,
          },
          {
            id: 2,
            name: '审核中',
            selected: false,
          },
          {
            id: 3,
            name: '审核未通过',
            selected: false,
          },
        ],
      }
    },
    methods: {
      goodBottomBtnFn(data) {
        this.$emit('goodBottomClick', data)
      },
      goodDetail(item) {
        this.$emit('goodDetail', item)
      },
      chooseClick(item) {
        this.labelList.forEach((model) => {
          if (item.id === model.id) {
            model.selected = true
          } else {
            model.selected = false
          }
        })
      },
      violationClick(item) {
        this.violationList.forEach((model) => {
          if (item.id === model.id) {
            model.selected = true
          } else {
            model.selected = false
          }
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  .good-scroll {
    flex: 1;
    width: 100%;
  }
  .good-label {
    width: 750rpx;
    height: 96rpx;
    padding-left: 36rpx;
    box-sizing: border-box;
    background: #ffffff;
    &__choose {
      font-size: 24rpx;
      border-radius: 32rpx;
      text-align: center;
      margin-right: 28rpx;
      padding: 6rpx 24rpx;
      white-space: nowrap;
    }
  }
  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
    border: 2rpx solid transparent;
  }
  .select {
    color: $color-primary-red;
    background: $v-error-btn-disabled;
    border: 2rpx solid $v-error-light-two;
    box-sizing: border-box;
    //line-height: 60rpx !important;
  }
</style>
