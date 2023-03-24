<template>
  <view>
    <VoNav is-fixed is-have-more title="课程详情" />
    <view class="video">
      <video id="myVide" ref="myVideo" :src="detailsInfo.fileUrl + '&type=4'" @ended="ended" @timeupdate="timeupdate"></video>
    </view>
    <view class="p-32 content-con">
      <view class="fz-32 m-b-26">{{ detailsInfo.name }}</view>
      <view class="icon">
        <view calss="m-b-18">
          <view class="hits fz-24">
            <view>
              <VoIcon color="#8C8C8C" name="eye" size="20" />
            </view>
            <view>{{ detailsInfo.viewCount || 0 }}</view>
          </view>
          <view class="action">
            <view class="hits fz-24">
              <view>
                <VoIcon color="#8C8C8C" name="share" size="20" />
              </view>
              <text>分享</text>
            </view>
            <!-- <view class="hits fz-24 m-l-35">
              <view>
                <VoIcon color="#8C8C8C" name="collect-none" size="20" />
              </view>
              <view>收藏</view>
            </view> -->
          </view>
        </view>

        <view class="fz-24 m-t-18">{{ detailsInfo.createTime }}</view>
      </view>
    </view>
    <view class="more m-t-16 p-32">
      <view class="relative_title m-b-32">
        <view class="fz-30">相关课程</view>
<!--        <view class="fz-26">-->
<!--          <text>更多</text>-->
<!--          <VoIcon color="#8C8C8C" name="right-arrow" size="20" />-->
<!--        </view>-->
      </view>
      <view>
        <CourseCardList v-if="infoList && infoList.length" :data="infoList" />
        <view v-else>
          <VoNoData noDataTips="暂无相关课程" />
        </view>
      </view>
    </view>
    <u-popup :show="show" mode="center" round="4">
      <view class="model">
        <view class="fz-32">
          <view> 恭喜你，完成安装师认证啦！ </view>
          <view> 快去接单吧～ </view>
        </view>
        <view class="model_bottom fz-32">
          <view>继续学习</view>
          <view class="fz-b">去接单</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import CourseCardList from './components/CourseCardList'
  import { hideLoading, showLoading } from '../../../common/helper'

  export default {
    components: {
      CourseCardList,
    },
    data() {
      return {
        detailsInfo: {
          content: {},
        },
        show: false,
        pageNo: 1,
        pageSize: 10,
        infoList: [],
        contentId: '',
        qualifyType: '',
        createTime: '',
        currentTime: '', // 视频播放时长
        totalLength: '', // 视频总时长
        qualifyStatus: 0, // 单课程认证状态  0 未开始，1学习中，2已学完
        videoContext: null,
      }
    },
    async onLoad(options) {
      this.contentId = options.id || ''
      this.qualifyType = +options.qualifyType || ''
      await this.getDetails()
      await this.getData(true)
      this.videoContext = uni.createVideoContext('myVideo', this)
    },
    //监听页面隐藏
    onHide() {
      this.ended()
    },
    //监听页面卸载
    onUnload() {
      this.ended()
    },
    methods: {
      // 获取详情数据
      async getDetails() {
        const { data } = await this.$VoHttp.apiContentLearningCourseDetail({ id: this.contentId })
        this.detailsInfo = data || {}
        this.detailsInfo.content = JSON.parse(this.detailsInfo.content)
        this.detailsInfo.fileUrl = this.detailsInfo.fileUrl.split(',')[0]
        this.createTime = this.detailsInfo.createTime
        console.log('1')
      },
      //获取列表数据
      async getData(refresh) {
        showLoading()
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          qualifyType: this.qualifyType,
          contentId: this.contentId,
          createTime: this.detailsInfo.createTime,
        }
        const data = await this.$VoHttp.apiContentLearningRelatedCourse(params)
        console.log(2)
        this.total = data.total
        this.infoList = this.infoList.concat(data.data)
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
        hideLoading()
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
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
          this.pageNo++
          this.getData()
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
      timeupdate(data) {
        console.log('timeupdate', data.detail)
        this.currentTime = Math.trunc(data.detail.currentTime * 1000)
        console.log(this.currentTime)
        this.totalLength = Math.trunc(data.detail.duration * 1000)
        console.log(this.totalLength, 'this.totalLength')
        // 获取秒数，取整
        // this.currentTime = this.formatSeconds(currentTime)
        // console.log(this.currentTime, 'this.currentTime')
      },
      // 根据秒获取时间
      formatSeconds(a) {
        var hh = parseInt(a / 3600)
        var mm = parseInt((a - hh * 3600) / 60)
        if (mm < 10) mm = '0' + mm
        var ss = parseInt((a - hh * 3600) % 60)
        if (ss < 10) ss = '0' + ss
        if (hh < 10) hh = hh == 0 ? '' : `0${hh}:`
        var length = hh + mm + ':' + ss
        if (a >= 0) {
          return length
        } else {
          return '00:00'
        }
      },
      /**
       * 当播放到末尾时触发 ended 事件
       */
      ended() {
        if (this.currentTime && this.currentTime === this.totalLength) {
          this.qualifyStatus = 2
          console.log(this.qualifyStatus, 'this.qualifyStatus')
        } else if (!this.currentTime) {
          return
        } else if (this.currentTime && this.currentTime < this.totalLength) {
          this.qualifyStatus = 1
        }
        let params = {
          contentId: this.contentId,
          platformCode: this.userInfo.platformCode,
          qualifyType: this.qualifyType,
          qualifyStatus: this.qualifyStatus,
          duration: this.currentTime,
          remark: '', // 备注可先传空字符串
        }
        if(this.videoContext){
          this.videoContext.pause()
          this.videoContext.seek(0)
        }

        this.$VoHttp
          .apiContentLearningUpdateProgress(params)
          .then((res) => {
            if (res.data) {
              console.log(res, 'resresres')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nav_button {
    padding: 12rpx 30rpx;
    color: #ff5319;
    border: 1rpx solid #ff5319;
    border-radius: 200rpx;
  }

  .video {
    > :nth-child(1) {
      width: 100%;
      height: 480rpx;
    }
  }

  .content-con {
    background-color: #fff;

    .icon {
      color: rgba(0, 0, 0, 0.65);

      > :nth-child(1) {
        display: flex;
        justify-content: space-between;

        .action {
          display: flex;
        }
      }
    }

    .hits {
      display: flex;
      align-items: center;
      :nth-child(1) {
        vertical-align: middle;
      }
    }
  }

  .more {
    background-color: #fff;

    .relative_title {
      display: flex;
      justify-content: space-between;

      align-items: center;

      :nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
      }

      :nth-child(2) {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }

  .model {
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
    padding: 80rpx 56rpx 170rpx 56rpx;
    position: relative;

    > :nth-child(1) {
      width: 528rpx;
    }

    > :nth-child(2) {
      width: 100%;
      height: 110rpx;
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;

      > :nth-child(1) {
        color: rgba(0, 0, 0, 0.65);
        border-right: 1rpx solid rgba(0, 0, 0, 0.08);
      }

      > :nth-child(2) {
        color: #22284b;
      }

      > :nth-child(n) {
        height: 100%;
        flex-grow: 1;
        line-height: 110rpx;
        border-top: 1rpx solid rgba(0, 0, 0, 0.08);
      }
    }
  }
</style>
