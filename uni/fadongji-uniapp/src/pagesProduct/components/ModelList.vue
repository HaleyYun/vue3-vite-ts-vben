<template>
  <view class="tips">
    <view class="tips-title flex flex-justify-between flex-vertical-c">
      <view class="tips-title__left">型号</view>
      <view @click="salesVolume">
        <view v-if="!isShowAll" class="tips-title__right flex flex-vertical-c">
          <view class="right-margin">展开</view>
          <VoIcon :size="16" name="arrow-bottom-line" />
        </view>
        <view v-else class="tips-title__right flex flex-vertical-c">
          <view class="right-margin">收起</view>
          <VoIcon :size="16" name="arrow-top-line" />
        </view>
      </view>
    </view>
    <view v-show="isShowAll" class="tips-template margin-left">
      <block v-for="(info, index) of resultData" :key="index">
        <text
          v-if="info.model.length < 7"
          :key="info.id"
          :class="selectItem === info.id ? 'select' : 'no-select'"
          class="tips-template__choose1"
          space="ensp"
          @click="chooseFn(info)"
        >
          {{ info.model }}
        </text>
        <text
          v-else-if="info.model.length >= 7 && info.model.length < 17"
          :key="info.id"
          :class="selectItem === info.id ? 'select' : 'no-select'"
          class="tips-template__choose2"
          space="ensp"
          @click="chooseFn(info)"
        >
          {{ info.model }}
        </text>
        <text
          v-else
          :key="info.id"
          :class="selectItem === info.id ? 'select' : 'no-select'"
          class="tips-template__choose3"
          space="ensp"
          @click="chooseFn(info)"
        >
          {{ info.model }}
        </text>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TypeList',
    props: {
      modelList: {
        type: Array,
        default() {
          return []
        },
      },
      resultData: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        isShowAll: true, //有数据收起
        infoItem: {},
        selectItem: '',
        selectMap: new Map(),
      }
    },
    mounted() {
      const selected = this.modelList.find((item) => item.id === 'model')
      if (selected) {
        this.selectItem = selected.key
        const newObj = { id: selected.key, model: selected.value }
        this.chooseFn(newObj)
      }
    },
    methods: {
      chooseFn(info) {
        this.selectItem = info.id
        this.$emit('goodsModel', {
          key: info.id,
          value: info,
        })
      },
      /**
       * 展开、收起数据
       */
      salesVolume() {
        this.isShowAll = !this.isShowAll
      },
      clear() {
        this.selectItem = ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tips {
    padding-left: 32rpx;

    &-title {
      padding: 24rpx 32rpx 24rpx 0;

      &__left {
        font-size: 30rpx;
        height: 46rpx;
        line-height: 46rpx;
        color: $v-c0-85;
      }

      &__right {
        height: 18rpx;
        line-height: 18rpx;
        font-size: 24rpx;
        color: $v-c0-45;

        .right-margin {
          margin-right: 4rpx;
        }
      }
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

  .margin-left {
    margin-left: 44rpx;
  }
</style>
