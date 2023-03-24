<template>
  <view class="tips">
    <view class="tips-title flex flex-justify-between flex-vertical-c">
      <view class="tips-title__left">{{ typeList.name }}</view>
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
    <view
      :class="{ '': tipsType === false, 'margin-left': tipsType === true }"
      class="tips-template flex flex-wrap"
    >
      <view
        v-for="(info, index) of typeList.value"
        v-show="isShowAll ? index < typeList.value.length : index < 0"
        :key="info"
        :class="selectItem[index] ? 'select' : 'no-select'"
        class="tips-template__choose"
        @click="chooseFn(typeList.id, info)"
        >{{ info }}{{ typeList.unit }}
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TypeList',
    props: {
      tipsType: {
        type: Boolean,
        default: false, // 当tipsType为false时没有左边距 true有左边距
      },
      radioType: {
        type: Boolean,
        default: true, // 当radioType为true时单选 false时多选
      },
      typeList: {
        type: Object,
        default() {
          return {}
        },
      },
      modelList: {
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
        selectItem: [],
        selectMap: new Map(),
      }
    },
    created() {
      this.typeList.value.forEach((item) => {
        this.selectItem.push(false)
      })
    },
    methods: {
      chooseFn(key, value) {
        let index = this.typeList.value.findIndex((item) => item === value)
        this.selectItem[index] = !this.selectItem[index]
        let isSelected = this.selectItem[index]
        this.$emit('goodsModel', {
          value,
          isSelected,
        })
        this.$forceUpdate()
      },
      /**
       * 展开、收起数据
       */
      salesVolume() {
        this.isShowAll = !this.isShowAll
      },
      clear() {
        for (let i = 0; i < this.selectItem.length; i++) {
          this.selectItem[i] = false
        }
        this.$forceUpdate()
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
      // display: grid;
      // grid-template-columns: repeat(auto-fill, 84px);
      // grid-column-gap: 48rpx;

      &__choose {
        // width: 168rpx;
        height: 64rpx;
        font-size: 24rpx;
        border-radius: 80rpx;
        line-height: 64rpx;
        margin-bottom: 24rpx;
        display: inline-block;
        margin-right: 16rpx;
        padding: 0rpx 24rpx;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
  }

  .select {
    color: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    border: 2rpx solid $color-primary-yellow;
    box-sizing: border-box;
    line-height: 60rpx;
  }

  .margin-left {
    margin-left: 44rpx;
  }
</style>
