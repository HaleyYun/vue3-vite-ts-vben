<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="logistics flex flex-column"
  >
    <VoNav is-fixed is-have-more title="物流信息" />
    <view class="logistics-line" />
    <view class="logistics-info flex flex-justify-between">
      <view class="flex flex-vertical-c">
        <image
          class="logistics-info__logo"
          mode="aspectFit"
          src="/static/icons/logistics_logo.png"
        />
        <view class="m-l-8 fz-b fz-32">德邦物流</view>
        <view class="m-l-16 fz-28">D232123333213</view>
      </view>
      <view class="flex flex-vertical-c">
        <view class="fz-28 logistics-info__text p-r-20">复制</view>
        <view class="logistics-info__line" />
        <view class="fz-28 logistics-info__text p-l-20">打电话</view>
      </view>
    </view>

    <!-- 步骤条 -->
    <view class="logistics-step">
      <EraSteps :current="current" direction="column">
        <EraStepsItem>
          <text slot="title">
            <view class="flex flex-vertical-c">
              <view class="m-l-32 fz-32 fz-b color-block">已签收</view>
              <view class="m-l-16 fz-24 color-block">05-26 14:06</view>
            </view>
          </text>
          <text slot="icon" class="slot-icon">
            <voIcon v-if="current >= 0" :size="24" name="certified" />
            <voIcon v-else :size="24" name="address_select" />
          </text>
          <text slot="desc" class="color-block fz-24 m-l-32 m-t-16 p-b-40">
            <view>已签收，他人代收。投递员：韩冰，电话：13823748493</view>
          </text>
        </EraStepsItem>
        <EraStepsItem>
          <text slot="title">
            <view
              :class="current > 0 ? 'color-block' : 'color-block-45'"
              class="flex flex-vertical-c"
            >
              <view class="m-l-32 fz-32 fz-b">派送中</view>
              <view class="m-l-16 fz-24">05-26 9:06</view>
            </view>
          </text>
          <text slot="icon" class="slot-icon">
            <voIcon v-if="current > 0" :size="24" name="certified" />
            <voIcon v-else :size="24" name="address_select" />
          </text>
          <text
            slot="desc"
            :class="current > 0 ? 'color-block' : 'color-block-45'"
            class="fz-24 m-l-32 m-t-16 p-b-40"
          >
            <view>河南省郑州市商都公司 派件中，派件员：李刚</view>
          </text>
        </EraStepsItem>
        <EraStepsItem>
          <text slot="title">
            <view
              :class="current > 1 ? 'color-block' : 'color-block-45'"
              class="flex flex-vertical-c"
            >
              <view class="m-l-32 fz-32 fz-b">运输中</view>
              <view class="m-l-16 fz-24">05-23 9:06</view>
            </view>
          </text>
          <text slot="icon" class="slot-icon">
            <voIcon v-if="current > 1" :size="24" name="certified" />
            <voIcon v-else :size="24" name="address_select" />
          </text>
          <text
            slot="desc"
            :class="current > 1 ? 'color-block' : 'color-block-45'"
            class="fz-24 m-l-32 m-t-16 p-b-40"
          >
            <view>河南省郑州市商都公司 已发出</view>
          </text>
        </EraStepsItem>
        <EraStepsItem>
          <text slot="title">
            <view
              :class="current > 2 ? 'color-block' : 'color-block-45'"
              class="flex flex-vertical-c"
            >
              <view class="m-l-32 fz-32 fz-b">已揽件</view>
              <view class="m-l-16 fz-24">05-19 9:06</view>
            </view>
          </text>
          <text slot="icon" class="slot-icon">
            <voIcon v-if="current > 2" :size="24" name="certified" />
            <voIcon v-else :size="24" name="address_select" />
          </text>
          <text
            slot="desc"
            :class="current > 2 ? 'color-block' : 'color-block-45'"
            class="fz-24 m-l-32 m-t-16 p-b-40"
          >
            <view>河南省郑州市公司 已揽收，王胜，电话：13827384958</view>
          </text>
        </EraStepsItem>
        <EraStepsItem>
          <text slot="title">
            <view
              :class="current > 3 ? 'color-block' : 'color-block-45'"
              class="flex flex-vertical-c"
            >
              <view class="m-l-32 fz-32 fz-b">已发货</view>
              <view class="m-l-16 fz-24">05-19 6:06</view>
            </view>
          </text>
          <text slot="icon" class="slot-icon">
            <voIcon v-if="current > 3" :size="24" name="certified" />
            <voIcon v-else :size="24" name="address_select" />
          </text>
          <text
            slot="desc"
            :class="current > 3 ? 'color-block' : 'color-block-45'"
            class="fz-24 m-l-32 m-t-16 p-b-40"
          >
            <view>包裹正在等待揽收</view>
          </text>
        </EraStepsItem>
        <EraStepsItem>
          <text slot="title">
            <view
              :class="current > 4 ? 'color-block' : 'color-block-45'"
              class="flex flex-vertical-c"
            >
              <view class="m-l-32 fz-32 fz-b">已下单</view>
              <view class="m-l-16 fz-24">05-17 6:06</view>
            </view>
          </text>
          <text slot="icon" class="slot-icon">
            <voIcon v-if="current > 4" :size="24" name="certified" />
            <voIcon v-else :size="24" name="address_select" />
          </text>
          <text
            slot="desc"
            :class="current > 4 ? 'color-block' : 'color-block-45'"
            class="fz-24 m-l-32 m-t-16 p-b-40"
          >
            <view>商品已经下单</view>
          </text>
        </EraStepsItem>
      </EraSteps>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        current: 3,
        optionsId: '',
      }
    },
    onLoad(options) {
      this.optionsId = options.id
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .logistics {
    width: 750rpx;
    height: 100vh;
    background: #ffffff;
    &-line {
      background: $v-bg-light;
      width: 750rpx;
      height: 16rpx;
    }
    &-info {
      margin: 0rpx 32rpx;
      height: 96rpx;
      line-height: 96rpx;
      border-bottom: 2rpx solid $v-bg-light;
      &__logo {
        width: 52rpx;
        height: 52rpx;
      }
      &__text {
        color: $v-tip;
      }
      &__line {
        width: 2rpx;
        height: 30rpx;
        background: $v-c0-45;
        border-radius: 26rpx;
      }
    }
    &-step {
      margin: 24rpx 32rpx 0rpx 32rpx;
    }
  }
</style>
