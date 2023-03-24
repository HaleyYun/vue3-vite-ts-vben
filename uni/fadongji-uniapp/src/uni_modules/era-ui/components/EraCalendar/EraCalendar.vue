<template>
	<view class="uni-calendar">
		<view v-if="!insert&&show" class="uni-calendar__mask" :class="{'uni-calendar--mask-show':aniMaskShow}" @click="clean"></view>
		<view v-if="insert || show" class="uni-calendar__content" :class="{'uni-calendar--fixed':!insert,'uni-calendar--ani-show':aniMaskShow}">
			<view v-if="!insert" class="uni-calendar__header uni-calendar--fixed-top">
				<view class="uni-calendar__header-btn-box" @click="close">
					<text class="uni-calendar__header-text uni-calendar--fixed-width">{{cancelText}}</text>
				</view>
				<view class="uni-calendar__header-btn-box" @click="confirm">
					<text class="uni-calendar__header-text uni-calendar--fixed-width">{{okText}}</text>
				</view>
			</view>
			<view class="uni-calendar__header">
        <view  class='flex-view'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.stop="preYear">
            <path d="M12.8254 19.317C12.606 19.5426 12.2571 19.5599 12.0178 19.3674L11.9683 19.3229L5.18043 12.5304C4.95802 12.3079 4.94094 11.9539 5.1308 11.7112L5.17465 11.661L11.9625 4.68298C12.1976 4.4413 12.5814 4.43869 12.8196 4.67716C13.042 4.89973 13.0591 5.25363 12.8692 5.49632L12.8253 5.54653L6.46327 12.087L12.8196 18.4476C13.042 18.6702 13.0591 19.0241 12.8692 19.2668L12.8254 19.317Z" fill="black" fill-opacity="0.85"/>
            <path d="M18.8254 19.317C18.606 19.5426 18.2571 19.5599 18.0178 19.3674L17.9683 19.3229L11.1804 12.5304C10.958 12.3079 10.9409 11.9539 11.1308 11.7112L11.1747 11.661L17.9625 4.68298C18.1976 4.4413 18.5814 4.43869 18.8196 4.67716C19.042 4.89973 19.0591 5.25363 18.8692 5.49632L18.8253 5.54653L12.4633 12.087L18.8196 18.4476C19.042 18.6702 19.0591 19.0241 18.8692 19.2668L18.8254 19.317Z" fill="#4E536F"/>
          </svg>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.stop="pre">
            <path d="M15.8254 19.317C15.606 19.5426 15.2571 19.5599 15.0178 19.3674L14.9683 19.3229L8.18043 12.5304C7.95802 12.3079 7.94094 11.9539 8.1308 11.7112L8.17465 11.661L14.9625 4.68298C15.1976 4.4413 15.5814 4.43869 15.8196 4.67716C16.042 4.89973 16.0591 5.25363 15.8692 5.49632L15.8253 5.54653L9.46327 12.087L15.8196 18.4476C16.042 18.6702 16.0591 19.0241 15.8692 19.2668L15.8254 19.317Z" fill="black" fill-opacity="0.85"/>
          </svg>
        </view>

        <view class='flex-line'></view>
				<picker mode="date" :value="date" fields="month" @change="bindDateChange" style='flex: 1'>
					<view class="uni-calendar__header-text text-center">{{ (nowDate.year||'') +' 年 '+( nowDate.month||'')+'月'}}</view>
				</picker>
        <view class='flex-line'></view>
        <view class='flex-view'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.stop="next">
            <path d="M8.17461 19.317C8.39401 19.5426 8.74291 19.5599 8.98219 19.3674L9.03169 19.3229L15.8196 12.5304C16.042 12.3079 16.0591 11.9539 15.8692 11.7112L15.8253 11.661L9.03747 4.68298C8.80238 4.4413 8.41865 4.43869 8.18039 4.67716C7.95801 4.89973 7.94095 5.25363 8.1308 5.49632L8.17465 5.54653L14.5367 12.087L8.18043 18.4476C7.95803 18.6702 7.94094 19.0241 8.13077 19.2668L8.17461 19.317Z" fill="black" fill-opacity="0.85"/>
          </svg>


          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click.stop="nextYear">
            <path d="M11.1746 19.317C11.394 19.5426 11.7429 19.5599 11.9822 19.3674L12.0317 19.3229L18.8196 12.5304C19.042 12.3079 19.0591 11.9539 18.8692 11.7112L18.8253 11.661L12.0375 4.68298C11.8024 4.4413 11.4186 4.43869 11.1804 4.67716C10.958 4.89973 10.9409 5.25363 11.1308 5.49632L11.1747 5.54653L17.5367 12.087L11.1804 18.4476C10.958 18.6702 10.9409 19.0241 11.1308 19.2668L11.1746 19.317Z" fill="black" fill-opacity="0.85"/>
            <path d="M5.17461 19.317C5.39401 19.5426 5.74291 19.5599 5.98219 19.3674L6.03169 19.3229L12.8196 12.5304C13.042 12.3079 13.0591 11.9539 12.8692 11.7112L12.8253 11.661L6.03747 4.68298C5.80238 4.4413 5.41865 4.43869 5.18039 4.67716C4.95801 4.89973 4.94095 5.25363 5.1308 5.49632L5.17465 5.54653L11.5367 12.087L5.18043 18.4476C4.95803 18.6702 4.94094 19.0241 5.13077 19.2668L5.17461 19.317Z" fill="#4E536F"/>
          </svg>

        </view>

			</view>
			<view class="uni-calendar__box">
				<view v-if="showMonth" class="uni-calendar__box-bg">
					<text class="uni-calendar__box-bg-text">{{nowDate.month}}</text>
				</view>
				<view class="uni-calendar__weeks">
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text day-select">{{SUNText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{monText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{TUEText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{WEDText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{THUText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text">{{FRIText}}</text>
					</view>
					<view class="uni-calendar__weeks-day">
						<text class="uni-calendar__weeks-day-text day-select">{{SATText}}</text>
					</view>
				</view>
				<view class="uni-calendar__weeks" v-for="(item,weekIndex) in weeks" :key="weekIndex">
					<view class="uni-calendar__weeks-item" v-for="(weeks,weeksIndex) in item" :key="weeksIndex">
						<CalendarItem class="uni-calendar-item--hook" :multipleStatus='multipleStatus' :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></CalendarItem>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Calendar from './util.js';
	import CalendarItem from './CalendarItem'
	import {
	initVueI18n
	} from '@dcloudio/uni-i18n'
	import messages from './i18n/index.js'
	const {	t	} = initVueI18n(messages)
	/**
	 * Calendar 日历
	 * @description 日历组件可以查看日期，选择任意范围内的日期，打点操作。常用场景如：酒店日期预订、火车机票选择购买日期、上下班打卡等
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=56
	 * @property {String} date 自定义当前时间，默认为今天
	 * @property {Boolean} lunar 显示农历
	 * @property {String} startDate 日期选择范围-开始日期
	 * @property {String} endDate 日期选择范围-结束日期
	 * @property {Boolean} range 范围选择
	 * @property {Boolean} insert = [true|false] 插入模式,默认为false
	 * 	@value true 弹窗模式
	 * 	@value false 插入模式
	 * @property {Boolean} clearDate = [true|false] 弹窗模式是否清空上次选择内容
	 * @property {Array} selected 打点，期待格式[{date: '2019-06-27', info: '签到', data: { custom: '自定义信息', name: '自定义消息头',xxx:xxx... }}]
	 * @property {Boolean} showMonth 是否选择月份为背景
	 * @event {Function} change 日期改变，`insert :ture` 时生效
	 * @event {Function} confirm 确认选择`insert :false` 时生效
	 * @event {Function} monthSwitch 切换月份时触发
	 * @example <uni-calendar :insert="true":lunar="true" :start-date="'2019-3-2'":end-date="'2019-5-20'"@change="change" />
	 */
	export default {
		components: {
      CalendarItem
		},
		emits:['close','confirm','change','monthSwitch'],
		props: {
			date: {
				type: String,
				default: ''
			},
			selected: {
				type: Array,
				default () {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			},
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			range: {
				type: Boolean,
				default: false
			},
			insert: {
				type: Boolean,
				default: true
			},
			showMonth: {
				type: Boolean,
				default: false
			},
			clearDate: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: false,
				weeks: [],
        multipleStatus:{},
				calendar: {},
				nowDate: '',
				aniMaskShow: false
			}
		},
		computed:{
			/**
			 * for i18n
			 */

			okText() {
				return t("uni-calender.ok")
			},
			cancelText() {
				return t("uni-calender.cancel")
			},
			todayText() {
				return t("uni-calender.today")
			},
			monText() {
				return t("uni-calender.MON")
			},
			TUEText() {
				return t("uni-calender.TUE")
			},
			WEDText() {
				return t("uni-calender.WED")
			},
			THUText() {
				return t("uni-calender.THU")
			},
			FRIText() {
				return t("uni-calender.FRI")
			},
			SATText() {
				return t("uni-calender.SAT")
			},
			SUNText() {
				return t("uni-calender.SUN")
			},
		},
		watch: {
			date(newVal) {
				// this.cale.setDate(newVal)
				this.init(newVal)
			},
			startDate(val){
				this.cale.resetSatrtDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			endDate(val){
				this.cale.resetEndDate(val)
				this.cale.setDate(this.nowDate.fullDate)
				this.weeks = this.cale.weeks
			},
			selected(newVal) {
				this.cale.setSelectInfo(this.nowDate.fullDate, newVal)
				this.weeks = this.cale.weeks
			}
		},
		created() {
			// 获取日历方法实例
			this.cale = new Calendar({
				// date: new Date(),
				selected: this.selected,
				startDate: this.startDate,
				endDate: this.endDate,
				range: this.range,
			})
			// 选中某一天
			// this.cale.setDate(this.date)
			this.init(this.date)
			// this.setDay
		},
		methods: {
			// 取消穿透
			clean() {},
			bindDateChange(e) {
				const value = e.detail.value + '-1'
				console.log(this.cale.getDate(value));
				this.init(value)
			},
			/**
			 * 初始化日期显示
			 * @param {Object} date
			 */
			init(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.calendar = this.cale.getInfo(date)
			},
			/**
			 * 打开日历弹窗
			 */
			open() {
				// 弹窗模式并且清理数据
				if (this.clearDate && !this.insert) {
					this.cale.cleanMultipleStatus()
					// this.cale.setDate(this.date)
					this.init(this.date)
				}
				this.show = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.aniMaskShow = true
					}, 50)
				})
			},
			/**
			 * 关闭日历弹窗
			 */
			close() {
				this.aniMaskShow = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.show = false
						this.$emit('close')
					}, 300)
				})
			},
			/**
			 * 确认按钮
			 */
			confirm() {
				this.setEmit('confirm')
				this.close()
			},
			/**
			 * 变化触发
			 */
			change() {
				if (!this.insert) return
				this.setEmit('change')
			},
			/**
			 * 选择月份触发
			 */
			monthSwitch() {
				let {
					year,
					month
				} = this.nowDate
				this.$emit('monthSwitch', {
					year,
					month: Number(month)
				})
			},
			/**
			 * 派发事件
			 * @param {Object} name
			 */
			setEmit(name) {
				let {
					year,
					month,
					date,
					fullDate,
					lunar,
					extraInfo
				} = this.calendar
				this.$emit(name, {
					range: this.cale.multipleStatus,
					year,
					month,
					date,
					fulldate: fullDate,
					lunar,
					extraInfo: extraInfo || {}
				})
			},
			/**
			 * 选择天触发
			 * @param {Object} weeks
			 */
			choiceDate(weeks) {
				if (weeks.disable) return
				this.calendar = weeks
				// 设置多选
				this.cale.setMultiple(this.calendar.fullDate)
        console.log(this.cale,"22222222222222")
				this.weeks = this.cale.weeks
        this.multipleStatus=this.cale.multipleStatus
				this.change()
			},
			/**
			 * 回到今天
			 */
			backtoday() {
				console.log(this.cale.getDate(new Date()).fullDate);
				let date = this.cale.getDate(new Date()).fullDate
				// this.cale.setDate(date)
				this.init(date)
				this.change()
			},
			/**
			 * 上个月
			 */
			pre() {
				const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'month').fullDate
				this.setDate(preDate)
				this.monthSwitch()

			},
			/**
			 * 下个月
			 */
			next() {
				const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'month').fullDate
				this.setDate(nextDate)
				this.monthSwitch()
			},
      /**
       * 上年
       */
      preYear() {
        const preDate = this.cale.getDate(this.nowDate.fullDate, -1, 'year').fullDate
        this.setDate(preDate)
        this.monthSwitch()

      },
      /**
       * 下年
       */
      nextYear() {
        const nextDate = this.cale.getDate(this.nowDate.fullDate, +1, 'year').fullDate
        this.setDate(nextDate)
        this.monthSwitch()
      },
			/**
			 * 设置日期
			 * @param {Object} date
			 */
			setDate(date) {
				this.cale.setDate(date)
				this.weeks = this.cale.weeks
				this.nowDate = this.cale.getInfo(date)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.uni-calendar__mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--mask-show {
		opacity: 1
	}

	.uni-calendar--fixed {
		position: fixed;
		/* #ifdef APP-NVUE */
		bottom: 0;
		/* #endif */
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(460px);
		/* #ifndef APP-NVUE */
		bottom: calc(var(--window-bottom));
		z-index: 99;
		/* #endif */
	}

	.uni-calendar--ani-show {
		transform: translateY(0);
	}

	.uni-calendar__content {
		background-color: #fff;
	}

	.uni-calendar__header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
    padding: 0rpx 32rpx;
    box-sizing: border-box;
		align-items: center;
		height: 88rpx;
		border-bottom-color: $uni-border-color;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.uni-calendar--fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $uni-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.uni-calendar--fixed-width {
		width: 50px;
		// padding: 0 15px;
	}

	.uni-calendar__backtoday {
		position: absolute;
		right: 0;
		top: 25rpx;
		padding: 0 5px;
		padding-left: 10px;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		color: $uni-text-color;
		background-color: $uni-bg-color-hover;
	}

	.uni-calendar__header-text {
		text-align: center;
		width: 100px;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 0.85);
	}

	.uni-calendar__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
	}

	.uni-calendar__header-btn {
		width: 10px;
		height: 10px;
		border-left-color: $uni-text-color-placeholder;
		border-left-style: solid;
		border-left-width: 2px;
		border-top-color: $uni-color-subtitle;
		border-top-style: solid;
		border-top-width: 2px;
	}

	.uni-calendar--left {
		transform: rotate(-45deg);
	}

	.uni-calendar--right {
		transform: rotate(135deg);
	}


	.uni-calendar__weeks {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
    margin-bottom: 16rpx;
	}

	.uni-calendar__weeks-item {
		flex: 1;
	}

	.uni-calendar__weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		border-bottom-color: #F5F5F5;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.uni-calendar__weeks-day-text {
		font-size: 26rpx;
    color: rgba(0, 0, 0, 0.85);
	}

	.uni-calendar__box {
		position: relative;
	}

	.uni-calendar__box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uni-calendar__box-bg-text {
		font-size: 200px;
		font-weight: bold;
		color: $uni-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
  .text-center{
    text-align: center;
    width: 100%;
  }
  .flex-view{
    display: flex;
    align-items: center;
  }
  .flex-line{
    width: 40rpx;
    height: 100%;
  }
  .day-select{
    color: #EE0A24 !important;
  }
</style>
