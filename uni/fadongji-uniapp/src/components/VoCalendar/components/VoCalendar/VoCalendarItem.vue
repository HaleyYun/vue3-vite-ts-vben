<template>
  <!--  <view-->
  <!--    class="uni-calendar-item__weeks-box"-->
  <!--    :class="{-->
  <!--      'uni-calendar-item&#45;&#45;disable': weeks.disable,-->
  <!--      'uni-calendar-item&#45;&#45;isDay': calendar.fullDate === weeks.fullDate && weeks.isDay,-->
  <!--      'uni-calendar-item&#45;&#45;checked': calendar.fullDate === weeks.fullDate && !weeks.isDay && !isReadOnly,-->
  <!--      'uni-calendar-item&#45;&#45;before-checked': weeks.beforeMultiple,-->
  <!--      'uni-calendar-item&#45;&#45;multiple': weeks.multiple,-->
  <!--      'uni-calendar-item&#45;&#45;after-checked': weeks.afterMultiple,-->
  <!--    }"-->
  <!--    @click="choiceDate(weeks)"-->
  <!--  >-->
  <view
    :class="{
      'uni-calendar-item--disable': weeks.disable,
      'uni-calendar-item--isDay': weeks.extraInfo,
      'uni-calendar-item--orange': weeks.extraInfo && +weeks.extraInfo.repayStatus !== 1,
      'uni-calendar-item--checked':
        calendar.fullDate === weeks.fullDate && !weeks.isDay && !isReadOnly,
      'uni-calendar-item--before-checked': weeks.beforeMultiple,
      'uni-calendar-item--multiple': weeks.multiple,
      'uni-calendar-item--after-checked': weeks.afterMultiple,
    }"
    class="uni-calendar-item__weeks-box"
    @click="choiceDate(weeks)"
  >
    <view class="uni-calendar-item__weeks-box-item">
      <!--      <text v-if="selected && weeks.extraInfo" class="uni-calendar-item__weeks-box-circle" />-->
      <!-- 全局默认 -->
      <!--      <text-->
      <!--        class="uni-calendar-item__weeks-box-text"-->
      <!--        :class="{-->
      <!--          'uni-calendar-item&#45;&#45;isDay-text': weeks.isDay,-->
      <!--          'uni-calendar-item&#45;&#45;isDay': calendar.fullDate === weeks.fullDate && weeks.isDay,-->
      <!--          'uni-calendar-item&#45;&#45;checked':-->
      <!--            calendar.fullDate === weeks.fullDate && !weeks.isDay && !isReadOnly,-->
      <!--          'uni-calendar-item&#45;&#45;before-checked': weeks.beforeMultiple,-->
      <!--          'uni-calendar-item&#45;&#45;multiple': weeks.multiple,-->
      <!--          'uni-calendar-item&#45;&#45;after-checked': weeks.afterMultiple,-->
      <!--          'uni-calendar-item&#45;&#45;disable': weeks.disable,-->
      <!--        }"-->
      <!--        >-->
      <text
        :class="{
          'uni-calendar-item--isDay-text': weeks.isDay,
          'uni-calendar-item--isDay': selected && weeks.extraInfo,
          'uni-calendar-item--orange': weeks.extraInfo && +weeks.extraInfo.repayStatus !== 1,
          'uni-calendar-item--checked':
            calendar.fullDate === weeks.fullDate && !weeks.isDay && !isReadOnly,
          'uni-calendar-item--before-checked': weeks.beforeMultiple,
          'uni-calendar-item--multiple': weeks.multiple,
          'uni-calendar-item--after-checked': weeks.afterMultiple,
          'uni-calendar-item--disable': weeks.disable,
        }"
        class="uni-calendar-item__weeks-box-text"
        >{{ weeks.date }}</text
      >
      <!-- 未填写指定时间 -->
      <text
        v-if="!lunar && !weeks.extraInfo && weeks.isDay"
        :class="{
          'uni-calendar-item--isDay-text': weeks.isDay,
          'uni-calendar-item--isDay': selected && weeks.extraInfo,
          'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
          'uni-calendar-item--before-checked': weeks.beforeMultiple,
          'uni-calendar-item--multiple': weeks.multiple,
          'uni-calendar-item--after-checked': weeks.afterMultiple,
        }"
        class="uni-calendar-item__weeks-lunar-text"
        >{{ todayText }}</text
      >
      <!-- 阴历 -->
      <text
        v-if="lunar && !weeks.extraInfo"
        :class="{
          'uni-calendar-item--isDay-text': weeks.isDay,
          'uni-calendar-item--isDay': selected && weeks.extraInfo,
          'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
          'uni-calendar-item--before-checked': weeks.beforeMultiple,
          'uni-calendar-item--multiple': weeks.multiple,
          'uni-calendar-item--after-checked': weeks.afterMultiple,
          'uni-calendar-item--disable': weeks.disable,
        }"
        class="uni-calendar-item__weeks-lunar-text"
        >{{
          weeks.isDay
            ? todayText
            : weeks.lunar.IDayCn === '初一'
            ? weeks.lunar.IMonthCn
            : weeks.lunar.IDayCn
        }}</text
      >
      <text
        v-if="weeks.extraInfo && weeks.extraInfo.info"
        :class="{
          'uni-calendar-item--extra': weeks.extraInfo.info,
          'uni-calendar-item--isDay-text': weeks.isDay,
          'uni-calendar-item--isDay': selected && weeks.extraInfo,
          'uni-calendar-item--checked': calendar.fullDate === weeks.fullDate && !weeks.isDay,
          'uni-calendar-item--before-checked': weeks.beforeMultiple,
          'uni-calendar-item--multiple': weeks.multiple,
          'uni-calendar-item--after-checked': weeks.afterMultiple,
          'uni-calendar-item--disable': weeks.disable,
        }"
        class="uni-calendar-item__weeks-lunar-text"
        >{{ weeks.extraInfo.info }}</text
      >
    </view>
  </view>
</template>

<script>
  import { initVueI18n } from '@dcloudio/uni-i18n'
  import messages from './i18n/index.js'

  const { t } = initVueI18n(messages)
  export default {
    props: {
      weeks: {
        type: Object,
        default() {
          return {}
        },
      },
      calendar: {
        type: Object,
        default: () => {
          return {}
        },
      },
      selected: {
        type: Array,
        default: () => {
          return []
        },
      },
      lunar: {
        type: Boolean,
        default: false,
      },
      //只读
      isReadOnly: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['change'],
    computed: {
      todayText() {
        return t('uni-calender.today')
      },
    },
    methods: {
      choiceDate(weeks) {
        console.log(weeks, 'weeks')
        this.$emit('change', weeks)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .uni-calendar-item__weeks-box {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16rpx;
  }

  .uni-calendar-item__weeks-box-text {
    font-size: $uni-font-size-base;
    color: $uni-text-color;
  }

  .uni-calendar-item__weeks-lunar-text {
    font-size: $uni-font-size-sm;
    color: $uni-text-color;
  }

  .uni-calendar-item__weeks-box-item {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
  }

  .uni-calendar-item__weeks-box-circle {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: $uni-color-error;
  }

  .uni-calendar-item--disable {
    background-color: rgba(249, 249, 249, $uni-opacity-disabled);
    color: $uni-text-color-disable;
  }

  .uni-calendar-item--isDay-text {
    // color: $uni-color-primary;
  }

  .uni-calendar-item--isDay {
    //background-color: $uni-color-primary;
    // opacity: 0.8;
    color: #fff;
    //background: #FF5319;
    background: #00b259;
  }
  .uni-calendar-item--orange {
    //background-color: $uni-color-primary;
    // opacity: 0.8;
    color: #fff;
    //background: #FF5319;
    background: #f20014;
  }

  .uni-calendar-item--extra {
    color: $uni-color-error;
    // opacity: 0.8;
  }

  .uni-calendar-item--checked {
    background-color: $uni-color-primary;
    color: #fff;
    // opacity: 0.8;
    border-radius: 16rpx;
  }

  .uni-calendar-item--multiple {
    background-color: $uni-color-primary;
    color: #fff;
    // opacity: 0.8;
  }
  .uni-calendar-item--before-checked {
    background-color: #ff5a5f;
    color: #fff;
  }
  .uni-calendar-item--after-checked {
    background-color: #ff5a5f;
    color: #fff;
  }
</style>
