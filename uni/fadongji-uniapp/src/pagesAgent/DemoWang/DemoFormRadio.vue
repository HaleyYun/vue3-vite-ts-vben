<template>
  <view class="wrap">
    <view class="wrap-title">radio</view>
    <view
      class="wrap-radio flex flex-column"
      v-for="(item, index) in radiolist1"
      :key="index"
      @click="radioChange(item.name)"
    >
      <view class="flex m-l-30 wrap-radio__info flex-vertical-c">
        <VoIcon :name="item.disabled ? 'right-fill' : 'focus'" />
        <view class="m-l-30 fz-30">{{ item.name }}</view>
      </view>
      <view class="wrap-radio__line" />
    </view>

    <view class="wrap-title">radio</view>
    <view
      class="wrap-radio"
      v-for="(item, index) in radiolist1"
      :key="index"
      @click="radioChange(item.name)"
    >
      <view class="flex m-l-30 m-r-30 wrap-radio__info flex-vertical-c flex-justify-between">
        <view class="fz-30">{{ item.name }}</view>
        <VoIcon v-if="item.disabled === true" name="right-fill" />
      </view>
      <view class="wrap-radio__line" />
    </view>
    <view class="wrap-title">组件radio</view>
    <EraRadioGroup v-model="radiovalue1" placement="column" :lineBottom="true" iconPlacement="left">
      <EraRadio
        :customStyle="{ background: '#ffffff', paddingTop: '16px', paddingBottom: '16px' }"
        v-for="(item, index) in radiolist2"
        :key="index"
        :label="item.name"
        :name="item.name"
        :iconSize="14"
      />
    </EraRadioGroup>
    <view class="wrap-title">组件radio</view>
    <EraRadioGroup v-model="radiovalue1" placement="column" :lineBottom="true" iconPlacement="right">
      <EraRadio
        :customStyle="{
          background: '#ffffff',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingRight: '16px',
        }"
        v-for="(item, index) in radiolist2"
        :key="index"
        :label="item.name"
        :name="item.name"
      />
    </EraRadioGroup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        radiovalue1: '苹果',
        // 基本案列数据
        radiolist1: [
          {
            name: '苹果',
            disabled: false,
          },
          {
            name: '香蕉',
            disabled: false,
          },
          {
            name: '橙子',
            disabled: false,
          },
          {
            name: '榴莲',
            disabled: false,
          },
        ],

        // 组件基本案列数据
        radiolist2: [
          {
            name: '苹果',
          },
          {
            name: '香蕉',
          },
          {
            name: '橙子',
          },
          {
            name: '榴莲',
          },
        ],
      }
    },
    methods: {
      radioChange(n) {
        this.radiolist1.forEach(function (item) {
          if (n === item.name) {
            item.disabled = true
          } else {
			item.disabled = false
		  }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    padding-bottom: 20px;

    &-title {
      width: 100%;
      height: 80rpx;
      padding-left: 30rpx;
      line-height: 80rpx;
      background-color: #e5e5e5;
      color: #1a1b1c;
      font-size: 32rpx;
    }

    &-radio {
      width: 100%;
      height: 80rpx;
      background-color: #ffffff;

      &__info {
        height: 79rpx;
        line-height: 79rpx;
      }

      &__line {
        height: 1px;
        width: 750rpx - 32rpx;
        margin-left: 32rpx;
        background-color: #e5e5e5;
      }
    }

    & &-item {
      .line {
        background-color: #e5e5e5;
        width: 100%;
        height: 20rpx;
      }

      .cell-value {
        color: rgba(0, 0, 0, 0.85);
        font-size: 30rpx;
      }

      .cell-icon {
        width: 15px;
        height: 16px;
      }
    }
  }

  .item-view {
    border: 1px solid #22284b;
    border-radius: 4px;
    font-size: 24rpx;
    width: 160rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.85);
  }

  .item-selected {
    border: 1px solid #22284b;
    border-radius: 4px;
    font-size: 24rpx;
    width: 160rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background-color: #22284b;
    color: #ffffff;
  }

  .content-title {
    color: rgba(0, 0, 0, 0.25);
    font-size: 30rpx;
  }

  .content-button {
    border-radius: 4px;
    font-size: 24rpx;
    width: 160rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background-color: #22284b;
    color: #ffffff;
  }
</style>
