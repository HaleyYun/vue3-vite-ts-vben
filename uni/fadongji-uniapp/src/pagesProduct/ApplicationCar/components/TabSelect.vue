<template>
  <view class="select">
    <view class="select-filter">
      <view
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: selectKeys.includes(item.type) }"
        class="filter-item"
        @click="selectHandler(item)"
      >
        {{ item.value }}
      </view>
    </view>
    <view class="put-operate-save border-box bg-white px-32">
      <view class="py-24 flex">
        <view class="p-r-15 flex1">
          <u-button
            :plain="true"
            color="rgba(0, 0, 0, 0.85)"
            customStyle="width: 280rpx;height: 92rpx;border: 1px solid rgba(0, 0, 0, 0.25);"
            shape="circle"
            size="large"
            text="重置"
            @click="resetHandler"
          />
        </view>
        <view class="p-l-15 flex1">
          <u-button
            color="#FF5319"
            customStyle="width: 280rpx;height: 92rpx;margin-left: 30rpx;"
            shape="circle"
            size="large"
            text="确定"
            @click="confirmHandler"
          />
        </view>
      </view>
    </view>
    <view
      style="position: fixed; background-color: rgba(0, 0, 0, 0.34); height: 100vh; width: 100vw"
      @click="confirmOverlayHandler"
    />
  </view>
</template>

<script>
  export default {
    name: 'TabOneSelect',
    props: {
      list: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        selectKeys: [],
      }
    },
    methods: {
      confirmOverlayHandler() {
        this.$emit('change', this.selectKeys)
      },
      confirmHandler() {
        this.emitValue()
      },
      emitValue() {
        this.$emit('change', this.selectKeys)
      },
      resetHandler() {
        this.selectKeys = []
      },
      tabChooseHandler(tabKey) {
        this.tabKey = tabKey
      },
      selectHandler(row) {
        const index = this.selectKeys.findIndex((item) => item === row.type)
        if (index > -1) {
          this.selectKeys.splice(index, 1)
        } else {
          this.selectKeys.push(row.type)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .select-filter {
    display: flex;
    padding: 35rpx 30rpx 0;
    margin: 0 -12rpx;
    flex-wrap: wrap;

    .filter-item {
      padding: 14rpx 32rpx;
      line-height: 1.5;
      font-size: 24rpx;
      @include black-color(0.85);
      background: #f7f7f8;
      border: 1px solid #f7f7f8;
      margin: 0 12rpx 24rpx;
      border-radius: 34rpx;

      &.active {
        background: #feecee;
        color: #e50012;
        border: 1px solid #f7909c;
      }
    }
  }
</style>
