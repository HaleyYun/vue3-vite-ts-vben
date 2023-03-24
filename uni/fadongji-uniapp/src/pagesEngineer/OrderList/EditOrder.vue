<template>
  <view class="page-wrap">
    <VoNav is-fixed title="修改上门时间" is-have-more />
    <view class="order m-b-16">
      <view class="color-block fz-32 500 p-b-24 border-bottom">服务信息</view>
      <view class="flex flex-vertical-c p-b-24">
        <!-- 服务单类型,31:售后回收单 32:安装单 33:回收单  -->
        <text v-if="supportType === 32" class="word-sign m-r-18 fz-24"> 安装 </text>
        <text v-else-if="supportType === 33" class="word-sign green m-r-18 fz-24"> 回收 </text>
        <text v-else-if="supportType === 31" class="word-sign yellow m-r-18 fz-24"> 售后 </text>
        <text class="fz-28 font-weight-500 color-block"> {{ deatilInfo.supportName }}</text>
      </view>
      <view class="cell p-b-16">
        <view>
          服务金额：
          <text class="font-weight-500" style="color: #ee0a24"
            >{{ deatilInfo.supportAmount }}元</text
          >
        </view>
      </view>
      <view class="cell">
        <view>上门时间：{{ dateTime }}</view>
      </view>
    </view>
    <view class="container-main flex1">
      <view class="time fz-28 color-block bg-white">
        <!-- <view class="time-nav fz-32 flex">
          <view class="color-block-45" @click="close">取消</view>
          <view class="color-block-main" @click="confirm">确定</view>
        </view> -->
        <view class="flex1 overflow-y flex">
          <view class="left">
            <EraVtabs
              :list="dateList"
              @click="dateClick"
              tabsWidth="170"
              lineColor="#FF5319"
              :activeStyle="{ color: '#FF5319' }"
            />
          </view>

          <view class="flex1">
            <view
              class="time-item color-block-65"
              :class="{ choosed: item.choosed }"
              v-for="item in timeArr"
              :key="item.time"
              @click="timeClick(item)"
            >
              {{ item.time }}
            </view>
          </view>
        </view>
      </view>
      <!-- <template v-if="menus.length">
        <view class="container-menu">
          <view
            class="container-menu-item"
            v-for="(menu, idx) in menus"
            :key="idx"
            :class="{ active: idx === currentActiveMenuIdx }"
            @click="changeMenuActive(menu, idx)"
          >
            <span>{{ menu.name }}</span>
            <view class="underline" />
          </view>
        </view>
        <view class="container-list bg-white">
          <template v-if="questionList.length">
            <template v-for="(question, idx) in questionList">
              <view
                :key="idx"
                :class="{ active: idx === currentActiveItemIdx }"
                class="container-list-item"
                @click="choseTime(idx)"
              >
                {{ question.name }}
              </view>
            </template>
          </template>
          <template v-else>
            <VoNoData no-data-tips="暂无该模块内容" />
          </template>
        </view>
      </template>
      <template v-else>
        <VoNoData no-data-tips="暂无该模块内容" />
      </template> -->
    </view>
    <view class="order-bottom p-b-safe-area">
      <EraButton circle text="提交" @click="toSubmit" v-if="time" />
      <EraButton circle disabled text="提交" v-else />
    </view>
  </view>
</template>

<script>
  import helper from '@/common/helper'
  import { storage } from '@/common/unifyGlobalReg'

  export default {
    name: 'HelperContentList',
    data() {
      return {
        deatilInfo: '',
        menus: [],
        currentActiveMenuIdx: 0,
        questionList: [],
        pageNo: 1,
        pageSize: 100,
        total: 0,
        userinfo: '',
        currentActiveItemIdx: 0,

        id: 0,
        type: 1,
        upTime: '',
        supportType: '',

        dateList: [
          // {
          //   name: '6月22日(今天)',
          // },
          // {
          //   name: '6月23日(明天)',
          // },
        ],
        timeArr: [
          {
            time: '08:00-10:00',
            choosed: false,
          },
          {
            time: '10:00-12:00',
            choosed: false,
          },
          {
            time: '12:00-14:00',
            choosed: false,
          },
          {
            time: '14:00-16:00',
            choosed: false,
          },
          {
            time: '16:00-18:00',
            choosed: false,
          },
          {
            time: '18:00-20:00',
            choosed: false,
          },
        ],
        dateTime: '',
        date: this.$vocenApi.VoUtils.timeFormat(new Date().getTime(), 'yyyy-mm-dd'),
        time: '',
        isLoading: false,
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
      }
    },
    onLoad(options) {
      this.initFn()
      // this.type = +options.type || 1
      //服务单类型,31:售后单 32:安装单 33:回收单
      this.supportType = +options.supportType
      this.id = options.id || 1
      if (storage.get('userInfo')) {
        this.userinfo = storage.get('userInfo')
        console.log('this.userinfo===', this.userinfo)
      }
      this.getDetail()
      // this.getTypeList()
    },
    watch: {
      date(val) {
        this.dateTime = val + ' ' + this.time
      },
      time(val) {
        this.dateTime = this.date + ' ' + val
      },
    },
    methods: {
      getDetail() {
        //服务单类型,31:售后单 32:安装单 33:回收单
        let api = ''
        if (this.supportType === 31) {
          api = 'apiOrderSupportAfterSaleDetail$Id'
        } else if (this.supportType === 32) {
          api = 'apiOrderTechnicianInstallDetail$Id'
        } else if (this.supportType === 33) {
          api = 'apiOrderRecycleOrderDetail$Id'
        }
        // 获取订单详情
        this.$VoHttp[api]({ id: this.id })
          .then((res) => {
            if (res.data) {
              let data = res.data
              //组装时间段
              if (data.homeStartTime && data.homeEndTime) {
                this.dateTime =
                  this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
                  '-' +
                  this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
              }
              this.deatilInfo = data
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '获取信息失败')
          })
      },
      toSubmit() {
        if (this.isLoading) {
          return
        }
        //需要判断不同订单接口，目前只有售后接口
        let homeStartTime = ''
        let homeEndTime = ''
        if (this.time) {
          homeStartTime = this.date + ' ' + this.time.split('-')[0] + ':00'
          homeEndTime = this.date + ' ' + this.time.split('-')[1] + ':00'
        } else {
          homeStartTime = this.deatilInfo.homeStartTime
          homeEndTime = this.deatilInfo.homeEndTime
        }
        //服务单类型,31:售后单 32:安装单 33:回收单
        let api = ''
        let params = {}
        if (this.supportType === 31) {
          api = 'apiOrderSupportAfterSaleTimeUpdate'
          params = {
            req: {
              id: this.id,
              homeStartTime: homeStartTime,
              homeEndTime: homeEndTime,
            },
          }
        } else if (this.supportType === 32) {
          api = 'apiOrderInstallUpdate'
          params = {
            id: this.id,
            homeStartTime: homeStartTime,
            homeEndTime: homeEndTime,
          }
        } else if (this.supportType === 33) {
          api = 'apiOrderRecycleUpdate'
          params = {
            id: this.id,
            homeStartTime: homeStartTime,
            homeEndTime: homeEndTime,
          }
        }

        this.isLoading = true
        this.$VoHttp[api](params)
          .then((res) => {
            this.$u.toast('提交成功')
            setTimeout(() => {
              this.$backFn()
              uni.$emit('updateTime')
              this.isLoading = false
            }, 1000)
          })
          .catch((err) => {
            this.$u.toast(err.message || '提交失败')
          })
      },
      initFn() {
        //获取一周时间
        let nowDate = new Date()
        let numArr = [0, 1, 2, 3, 4, 5, 6]
        // 24小时毫秒数
        let dayStamp = 24 * 60 * 60 * 1000
        numArr.forEach((num) => {
          let nextDate = new Date(nowDate.getTime() + num * dayStamp)
          let date = this.$vocenApi.VoUtils.timeFormat(nextDate.getTime(), 'yyyy-mm-dd')
          let day = '星期' + '日一二三四五六'.charAt(new Date(date).getDay())
          let dateText = ''
          if (num === 0) {
            dateText = `${date}（今天） `
          } else if (num === 1) {
            dateText = `${date}（明天） `
          } else {
            dateText = `${date}（${day}）`
          }
          this.dateList.push({
            name: dateText,
            date: date,
          })
        })
      },
      //日期选择
      dateClick(e) {
        console.log('e', e)
        this.date = e.date
      },
      //时间段选择
      timeClick(e) {
        let homeStartTime = this.date + ' ' + e.time.split('-')[0] + ':00'
        if (homeStartTime <= this.nowDate) {
          this.$u.toast('上门时间不能小于当前时间~~')
          return
        }
        this.time = e.time
        this.timeArr.forEach((item) => {
          if (item.time === e.time) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },
      confirm() {
        if (!this.time) {
          this.$u.toast('请选择时间段')
          return
        }
        let obj = {
          date: this.date,
          time: this.time,
          dateTime: this.dateTime,
        }
        console.log('obj', obj)
        this.reset()
      },
      close() {
        this.reset()
      },
      reset() {
        this.timeArr.forEach((item) => {
          item.choosed = false
        })
      },
      getTypeList() {
        this.menus = [
          {
            id: '157874475730337792',
            name: '来来来',
            sort: 12,
          },
          {
            id: '149473002193551360',
            name: '营销',
            sort: 2,
          },
          {
            id: '149510821989449728',
            name: '供应商帮助中心',
            sort: 4,
          },
          {
            id: '149535958709174272',
            name: '供应商售卖物料支持',
            sort: 6,
          },
          {
            id: '149544322121990144',
            name: '安装的指导',
            sort: 7,
          },
          {
            id: '149544734002642944',
            name: '问题类型',
            sort: 8,
          },
          {
            id: '157804182949199872',
            name: '12312',
            sort: 11,
          },
        ]
        this.getDetailList(1)
      },
      getDetailList(categoryId) {
        this.questionList = [
          {
            id: '1',
            name: '13:00-15:00',
          },
          {
            id: '2',
            name: '15:00-17:00',
          },
        ]
        return
        helper.showLoading()
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          categoryId: categoryId,
        }
        this.$VoHttp
          .apiContentUniversityQueryHelpDetail(params)
          .then((res) => {
            console.log('res22', res)
            if (res.data) {
              this.questionList = res.data.records
            } else {
              this.questionList = []
            }
            helper.hideLoading()
          })
          .catch((err) => {
            helper.hideLoading()
            console.log('err', err)
          })
      },
      /**
       * 选定时间
       * @param idx
       */
      choseTime(idx) {
        this.currentActiveItemIdx = Number(idx)
      },
      /**
       * 一级菜单被选中
       * @param menu
       * @param idx
       */
      changeMenuActive(menu, idx) {
        this.currentActiveMenuIdx = Number(idx)
        this.getDetailList(menu.id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    padding: 24rpx 32rpx;
    background: #fff;
    margin-top: 16rpx;
    .word-sign {
      font-size: 24rpx;
      padding: 4rpx 16rpx;
      border-radius: 8rpx;
      background: linear-gradient(96.72deg, #f20014 -13.61%, #fa6419 104.67%);
      color: #fff;
      &.green {
        background: linear-gradient(96.72deg, #00b259 -13.61%, #29d446 104.67%);
      }
      &.yellow {
        background: linear-gradient(96.72deg, #ff9b05 -13.61%, #ffbe0d 104.67%);
      }
    }
    .cell {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-weight: 500;
      &-box {
        display: flex;
        align-items: center;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  .container {
    &-main {
      flex: 1;
      display: flex;
      overflow-y: hidden;
      //position: relative;
    }
    &-menu {
      background: #f6f7f8;
      overflow-y: scroll;
      &-item {
        position: relative;
        width: 268rpx;
        height: 100rpx;
        line-height: 100rpx;
        font-size: 28rpx;
        padding-left: 24rpx;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.45);
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .underline {
          visibility: hidden;
          position: absolute;
          width: 8rpx;
          left: 0rpx;
          top: 0rpx;
          bottom: 0rpx;
          background: #ff5319;
          border-radius: 0rpx 22rpx 22rpx 0rpx;
          content: ' ';
        }
        &.active {
          color: #ff5319;
          background: #fff;
          .underline {
            visibility: visible;
          }
        }
      }
    }
    &-list {
      flex: 1;

      overflow-y: scroll;
      &-item {
        margin-left: 32rpx;
        line-height: 96rpx;
        height: 96rpx;
        padding: 0 32rpx 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(0, 0, 0, 0.85);
        font-size: 32rpx;
        border-bottom: 2rpx solid #f7f7f8;
        &.active {
          color: #ff5319;
        }
      }
    }
  }
  .page-wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .order-bottom {
    width: 100%;
    background: #ffffff;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
    border-top: 2rpx solid $v-bg-light;
  }
  .time {
    width: 750rpx;
    height: 60vh;
    display: flex;
    flex-direction: column;
    &-nav {
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
    .left {
      background: #f7f7f8;
    }
    .time-item {
      height: 100rpx;
      line-height: 100rpx;
      padding: 0 48rpx;
      box-sizing: border-box;
      &.choosed {
        color: #ff5319;
      }
    }
  }
</style>
