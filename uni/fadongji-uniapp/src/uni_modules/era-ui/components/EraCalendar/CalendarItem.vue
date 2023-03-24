<template>
	<view class="uni-calendar-item__weeks-box" :class="{
		'uni-calendar-item--disable':weeks.disable,
		'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
		'uni-calendar-item--checked':(calendar.fullDate === weeks.fullDate && !weeks.isDay) ,
		'uni-calendar-item--before-checked':weeks.beforeMultiple,
		'uni-calendar-item--multiple': weeks.multiple,
		'uni-calendar-item--after-checked':weeks.afterMultiple,
		}"
	 @click="choiceDate(weeks)">
		<view class="uni-calendar-item__weeks-box-item">
			<text v-if="selected&&weeks.extraInfo" class="uni-calendar-item__weeks-box-circle"></text>
      <text v-if='multipleStatus.data&&multipleStatus.data[0]==weeks.fullDate' class='start-time'>开始时间</text>
      <text v-else-if='multipleStatus.data&&multipleStatus.data[multipleStatus.data.length-1]==weeks.fullDate' class='end-time'>结束时间</text>
      <block v-if='multipleStatus.data&&multipleStatus.data[0]==weeks.fullDate' >
        <view class='start-line'></view>
        <view class='start-line second-left'></view>
      </block>

      <block  v-else-if='multipleStatus.data&&multipleStatus.data[multipleStatus.data.length-1]==weeks.fullDate' >
        <view class='end-line'></view>
        <view class='end-line second-right'></view>
      </block>
			<text class="uni-calendar-item__weeks-box-text" :class="{
				'uni-calendar-item--isDay-text': weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.date}}</text>
			<text v-if="!lunar&&!weeks.extraInfo && weeks.isDay" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				}">{{todayText}}</text>
			<text v-if="lunar&&!weeks.extraInfo" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.isDay ? todayText : (weeks.lunar.IDayCn === '初一'?weeks.lunar.IMonthCn:weeks.lunar.IDayCn)}}</text>
			<text v-if="weeks.extraInfo&&weeks.extraInfo.info" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--extra':weeks.extraInfo.info,
				'uni-calendar-item--isDay-text':weeks.isDay,
				'uni-calendar-item--isDay':calendar.fullDate === weeks.fullDate && weeks.isDay,
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && !weeks.isDay,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">{{weeks.extraInfo.info}}</text>
		</view>
	</view>
</template>

<script>
	import {
	initVueI18n
	} from '@dcloudio/uni-i18n'
	import messages from './i18n/index.js'
	const {	t	} = initVueI18n(messages)
	export default {
		emits:['change'],
		props: {
      multipleStatus: {
        type: Object,
        default () {
          return {}
        }
      },
			weeks: {
				type: Object,
				default () {
					return {}
				}
			},
			calendar: {
				type: Object,
				default: () => {
					return {}
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			todayText() {
				return t("uni-calender.today")
			},
		},
		methods: {
			choiceDate(weeks) {
				this.$emit('change', weeks)
			}
		}
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
	}

	.uni-calendar-item__weeks-box-text {
		font-size:32rpx;
    color: rgba(0, 0, 0, 0.85) !important;

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
		width: 104rpx;
		height: 104rpx;
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
		color: $uni-color-primary;
	}

	.uni-calendar-item--isDay {
    background: #22284B;
    border-radius: 16rpx;
    color: #fff !important;
	}

	.uni-calendar-item--extra {
		color: $uni-color-error;
		opacity: 0.8;
	}

	.uni-calendar-item--checked {
    background: #22284B;
    border-radius: 16rpx;
		color: #fff !important;
    font-weight: bold;
	}

	.uni-calendar-item--multiple {
		background-color: #f7f7f8;
		color: rgba(0, 0, 0, 0.85);
		opacity: 1;
	}
	.uni-calendar-item--before-checked {
		background-color: #22284B;
    color: #ffffff !important;
    font-weight: bold;
    border-radius: 16rpx;
	}
	.uni-calendar-item--after-checked {
		background-color: #22284B;
    color: #ffffff !important;
    font-weight: bold;
    border-radius: 16rpx;
	}
  .start-time{
    font-size: 20rpx;
    width: 104rpx;
    top: 4rpx;
    color: #ffffff;
    text-align: center;
    position: absolute;
  }
  .end-time{
    width: 104rpx;
    position: absolute;
    top: 4rpx;
    font-size: 20rpx;
    color: #ffffff;
    text-align: center;
  }
  .start-line{
    width: 2rpx;
    height: 20rpx;
    position: absolute;
    left: 4rpx;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.65);
  }
  .end-line{
    width: 2rpx;
    height: 20rpx;
    position: absolute;
    right: 4rpx;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.65);
  }
  .second-left{
    left: 8rpx;
  }
  .second-right{
    right: 8rpx;
  }
</style>
