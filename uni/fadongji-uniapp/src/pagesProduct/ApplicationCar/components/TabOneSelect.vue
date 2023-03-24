<template>
  <view class="select">
    <view class="select-filter">
      <view
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: index === tabKey }"
        class="filter-item"
        @click="tabChooseHandler(item, index)"
      >
        {{ item.name }}
      </view>
    </view>
    <scroll-view class="scroll-view" scroll-y>
      <view class="select-inner">
        <view
          v-for="(item, index) in selectList"
          v-show="item.type !== -1"
          :key="index"
          :class="{ active: selectKeys.includes(item.type) }"
          class="select-item"
          @click="selectHandler(item.type)"
        >
          <view class="select-icon">
            {{ selectKeys.includes(item.type) }}
            <VoIcon :size="26" class="icon-noactive" color="#E3D9D9" name="circle" />
            <VoIcon :size="26" class="icon-active" color="#FF5319" name="select-right" />
          </view>
          <view class="select-content">{{ item.value }}</view>
        </view>
      </view>
    </scroll-view>
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
    <view class="mask" @click="confirmOverlayHandler" />
  </view>
</template>

<script>
  export default {
    name: 'TabOneSelect',
    inject: ['brand'],
    props: {
      series: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        tabList: [],
        tabKey: 0,
        selectList: [],
        selectKeys: [],
        list: [],
      }
    },
    computed: {
      brandObj() {
        return this.brand()
      },
    },
    watch: {
      series: {
        deep: true,
        handler(newVal) {
          console.log(newVal, 'xxxxxxxxxxxxxxx')
        },
      },
    },
    mounted() {
      this.transferData()
    },
    methods: {
      confirmOverlayHandler() {
        this.$emit('change', this.selectKeys)
      },
      transferData() {
        const list = []
        const listMap = new Map()
        this.series.forEach((item) => {
          const val = listMap.get(item.subbrand)
          if (val) {
            val.push(item)
            listMap.set(item.subbrand, val)
          } else {
            listMap.set(item.subbrand, [item])
          }
        })
        listMap.forEach((item, key) => {
          const tmp = {
            name: key,
            list: key === '全部' ? this.series : item,
          }
          list.push(tmp)
        })
        this.list = list
        this.selectList = this.list[0].list
      },
      resetHandler() {
        this.tabKey = 0
        this.selectKeys = []
        this.selectList = this.list[0].list
      },
      confirmHandler() {
        this.$emit('change', this.selectKeys)
      },
      tabChooseHandler(row, index) {
        this.tabKey = index
        this.selectList = row.list
      },
      selectHandler(key) {
        const index = this.selectKeys.findIndex((item) => item === key)
        if (index > -1) {
          this.selectKeys.splice(index, 1)
        } else {
          this.selectKeys.push(key)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.34);
    height: 100vh;
    width: 100vw;
  }

  .scroll-view {
    height: 600rpx;
  }

  .select-inner {
    padding: 20rpx 30rpx;
    font-size: 0;

    .select-item {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;

      .icon-noactive {
        display: block !important;
      }

      .icon-active {
        display: none !important;
      }

      &.active {
        .icon-noactive {
          display: none !important;
        }

        .icon-active {
          display: block !important;
        }
      }

      .select-content {
        font-size: 28rpx;
        @include black-color(0.85);
        line-height: 1;
        padding-left: 15rpx;
      }
    }
  }

  .select-filter {
    display: flex;
    padding: 15rpx 30rpx 0;
    margin: 0 -12rpx;
    flex-wrap: wrap;

    .filter-item {
      padding: 10rpx 25rpx;
      line-height: 1;
      font-size: 24rpx;
      @include black-color(0.85);
      background: #f7f7f8;
      border: 1px solid #f7f7f8;
      margin: 0 12rpx 20rpx;
      border-radius: 24rpx;

      &.active {
        background: $v-tags-btn-disabled;
        color: $color-primary-yellow;
        border: 1px solid $color-primary-yellow;
      }
    }
  }
</style>
