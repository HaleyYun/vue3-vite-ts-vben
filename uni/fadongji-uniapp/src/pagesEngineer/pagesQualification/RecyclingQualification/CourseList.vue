<template>
  <view class="page">
    <view class="head">
      <VoNav
        :isFixed="false"
        :left-width="220"
        :right-width="220"
        :title="titleStr + '认证课程'"
        is-have-more
      >
        <block slot="operation">
          <view class="fz-24 nav_button m-r-10" @click="toLearnRecord">学习记录</view>
        </block>
      </VoNav>
      <view class="p-l-32 p-r-32 rate_learn-con">
        <view v-if="progressShow" class="rate_learn p-t-32 p-b-32">
          <text class="fz-28">学习进度</text>
          <view class="m-l-16">
            <CustomProgressBar :width="466" :data="learningProgress" />
          </view>
        </view>

        <view class="btn fz-24 p-t-18 p-b-14">
          <view
            v-for="(item, key) in btnGroup"
            :key="key"
            :class="{ isActive: key === currentTab }"
            calss="btn_item"
            @click="tap(key)"
            >{{ item.text }}
          </view>
        </view>
      </view>
    </view>

    <view class="content p-l-32 p-r-32 p-t-32 m-t-16">
      <CourseCardList
        v-if="infoList.length"
        @scrolltolower="scrolltolower"
        :data="infoList"
        :qualify-type="qualifyType"
        qualifyStatus
        @scroll="handleScroll"
      />
      <VoNoData v-else/>
    </view>
  </view>
</template>

<script>
  import CustomProgressBar from '../components/CustomProgressBar/CustomProgressBar'
  import CourseCardList from './components/CourseCardList'
  import { hideLoading, showLoading } from '../../../common/helper'

  export default {
    components: {
      CustomProgressBar,
      CourseCardList,
    },
    data() {
      return {
        total:0,
        companyId: '', // 企业id
        contentId: '', // 课程id
        qualifyType: '', // 认证类型  31:售后回收单 32:安装单 33:回收单
        // 学习进度
        learningProgress: {
          sum: 0,
          finishCount: 0,
        },
        qualifyStatus: '', // 单课程认证状态  0 未开始，1学习中，2已学完
        pageNo: 1,
        pageSize: 10,
        currentTab: 0,
        scrollTop: 0,
        progressShow: true,
        btnGroup: [
          {
            text: '全部',
            status: null,
          },
          {
            text: '未开始',
            status: 0,
          },
          {
            text: '学习中',
            status: 1,
          },
          {
            text: '已学完',
            status: 2,
          },
        ],
        infoList: [],
      }
    },
    computed: {
      titleStr: function () {
        let str = ''
        switch (+this.qualifyType) {
          case 31:
            return '售后'
          case 32:
            return '安装'
          case 33:
            return '回收'
        }
      },
    },
    onLoad(options) {
      this.qualifyType = +options.qualifyType || ''
    },
    async onShow() {
      await this.getData()
      await this.getList(true)
    },
    methods: {
      tap(val) {
        this.currentTab = val
        console.log(this.currentTab, 2222222222222222)
        this.qualifyStatus = this.btnGroup[val].status
        this.getList(true)
      },
      toLearnRecord() {
        this.$linkToEasy('../LearningRecords/LearningRecords?qualifyType=' + this.qualifyType)
      },
      handleScroll(val) {
        if (val.detail.scrollTop > this.scrollTop) {
          this.progressShow = false
        } else {
          this.progressShow = true
        }
        this.scrollTop = val.detail.scrollTop
      },
      //获取学习进度数据
      async getData() {
        // 初始化课程
        await this.$VoHttp
          .apiContentLearningTasksInitialize()
          .then((res) => {
            if (res.data) {
              this.qualificationDataList = res.data
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })

        let params = {
          companyId: this.companyId,
          contentId: this.contentId,
          qualifyType: this.qualifyType,
        }
        // 学习进度
        await this.$VoHttp
          .apiContentLearningTasksProgress(params)
          .then((res) => {
            if (res.data) {
              this.learningProgress = res.data
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      //获取列表数据
      getList(refresh) {
        console.log(123)
        showLoading()
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          qualifyType: this.qualifyType,
          qualifyStatus: this.qualifyStatus,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        this.$VoHttp
          .apiContentLearningTasksCourseList(params)
          .then((res) => {
            console.log(res,"999999999");
            if (res.data&&res.data.records) {
              let data = res.data.records || []
              this.total = res.data.total
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              hideLoading()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
            hideLoading()
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          this.refresh = false
          if (this.infoList.length >= this.total) {
            uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
          this.pageNo++
          this.getList()
        }, 2000)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    .content {
      flex: 1;
      position: relative;
      background: #fff;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
  .nav_button {
    width: 144rpx;
    height: 54rpx;
    box-sizing: border-box;
    text-align: center;
    line-height: 50rpx;
    color: #ff5319;
    border: 1rpx solid #ff5319;
    border-radius: 200rpx;
  }

  .rate_learn-con {
    background-color: #fff;

    .rate_learn {
      display: flex;
      align-items: center;

      > :nth-child(2) {
        flex-grow: 1;
      }
    }

    .btn {
      display: flex;
      justify-content: space-between;

      > :nth-child(n) {
        padding: 14rpx 40rpx;
        border-radius: 200rpx;
        background: #f7f7f8;
        color: rgba(0, 0, 0, 0.85);
        border: 1px solid #f7f7f8;
      }

      .isActive {
        background: #ffece5;
        color: #ff5319;
        border: 1px solid #ff6633;
      }
    }
  }
</style>
