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
      v-if="typeList.value && typeList.value.length"
      v-show="isShowAll"
      :class="{ '': tipsType === false, 'margin-left': tipsType === true }"
      class="tips-template"
    >
      <block v-for="(info, i) of typeList.value" :key="info">
        {{ typeList.unit }}
        <text
          v-if="info.length + typeList.unit.length < 6"
          :key="info.id"
          :class="selectItem === info ? 'select' : 'no-select'"
          class="tips-template__choose1"
          space="ensp"
          @click="chooseFn(typeList.id, info)"
        >
          {{ info }}{{ typeList.unit }}
        </text>
        <text
          v-else-if="
            info.length + typeList.unit.length >= 6 && info.length + typeList.unit.length < 14
          "
          :key="info.id"
          :class="selectItem === info ? 'select' : 'no-select'"
          class="tips-template__choose2"
          space="ensp"
          @click="chooseFn(typeList.id, info)"
        >
          {{ info }}{{ typeList.unit }}
        </text>
        <text
          v-else
          :key="info.id"
          :class="selectItem === info ? 'select' : 'no-select'"
          class="tips-template__choose3"
          space="ensp"
          @click="chooseFn(typeList.id, info)"
        >
          {{ info }}{{ typeList.unit }}
        </text>
      </block>
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
      index: {
        type: Number,
        default: 0,
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
      const selected = this.modelList.find((item) => item.key === this.typeList.id)
      if (selected) {
        this.selectItem = selected.value
        this.chooseFn(selected.key, selected.value)
      }
    },
    methods: {
      chooseFn(key, value) {
        this.selectItem = value
        this.$emit('goodsModel', {
          key,
          value,
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
