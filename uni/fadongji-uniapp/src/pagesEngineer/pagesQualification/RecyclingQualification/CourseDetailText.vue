<template>
  <view class="container">
    <VoNav is-fixed is-have-more title="课程详情"></VoNav>
    <view class="p-32 content-con">
      <view class="fz-32 m-b-26">{{ detailsInfo.name }}</view>
      <view class="icon">
        <view calss="m-b-18">
          <view class="hits fz-24">
            <view>
              <VoIcon color="#8C8C8C" name="eye" size="20" />
            </view>
            <view class="m-l-8">{{ detailsInfo.viewCount || 0 }}</view>
          </view>
          <view class="action">
            <view class="hits fz-24" @click="openShare">
              <view>
                <VoIcon color="#8C8C8C" name="share" size="20" />
              </view>
              <view class="m-l-8">分享</view>
            </view>
<!--            <view class="hits fz-24 m-l-35">-->
<!--              <view>-->
<!--                <VoIcon color="#8C8C8C" name="collect-none" size="20" />-->
<!--              </view>-->
<!--              <view class="m-l-8">收藏</view>-->
<!--            </view>-->
          </view>
        </view>

        <view class="fz-24 m-t-18">{{ detailsInfo.createTime }}</view>
      </view>
    </view>
    <view
      class="video-desc__rich"
      style="background: #fff; padding: 0 32rpx 32rpx; font-size: 32rpx"
    >
      <u-parse :content="detailsInfo.content.json"></u-parse>
    </view>
    <view class="more m-t-16 p-32">
      <view class="relative_title">
        <view class="fz-30 m-b-32">相关课程</view>
<!--        <view class="fz-26">-->
<!--          <text>更多</text>-->
<!--          <VoIcon color="#8C8C8C" name="right-arrow" size="20" />-->
<!--        </view>-->
      </view>
      <view class="flex1">
        <CourseCardList v-if="infoList && infoList.length" :data="infoList" />
        <view v-else>
          <VoNoData noDataTips="暂无相关课程" />
        </view>
      </view>
    </view>
    <!-- 分享弹框 -->
    <VoShareView ref="sharePop" @shareFn="shareFn" />
  </view>
</template>

<script>
  import CourseCardList from './components/CourseCardList'
  import { hideLoading, showLoading } from '../../../common/helper'
  import helpUtil from "@/common/helper";
  import devConf from "@/common/env";

  export default {
    components: {
      CourseCardList,
    },
    data() {
      return {
        qualifyType: '',
        contentId: '',
        detailsInfo: {
          content: {},
        },
        info: {},
        infoList: [],
        isShare: false,
      }
    },
    async onLoad(options) {
      this.contentId = options.id || ''
      this.qualifyType = +options.qualifyType || ''
      if (options.isShare) {
        this.isShare = true
      }
      await this.getDetails()
      await this.getData(true)
      if (!this.isShare) {
        this.readText()
      }
    },
    //监听页面隐藏
    onHide() {
      if (!this.isShare) {
        this.readText()
      }
    },
    //监听页面卸载
    onUnload() {
      if (!this.isShare) {
        this.readText()
      }
    },
    methods: {
      openShare() {
        console.log(2);
        this.$refs.sharePop.showShare(true)
      },
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.sharePop.cancle()
        let path = `/pagesEngineer/pagesQualification/RecyclingQualification/CourseDetailText?id=${this.contentId}&qualifyType=${this.qualifyType}&isShare=1`
        helpUtil
          .shareWeixin({
            scene: type,
            title: this.detailsInfo.name || null,
            path: devConf.shareBaseUrl + path,
            imageUrl: this.detailsInfo.fileUrl ? this.detailsInfo.fileUrl : '',
          })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      //已经看完了
      readText() {
        let params = {
          contentId: this.contentId,
          platformCode: this.userInfo.platformCode,
          qualifyType: this.qualifyType,
          qualifyStatus: 2,
          remark: '', // 备注可先传空字符串
        }
        this.$VoHttp.apiContentLearningUpdateProgress(params).then((res) => {})
      },
      // 获取详情数据
      async getDetails() {
        await this.$VoHttp
          .apiContentLearningCourseDetail({ id: this.contentId })
          .then((res) => {
            if (res.data) {
              this.detailsInfo = res.data || {}
              this.detailsInfo.content = JSON.parse(this.detailsInfo.content)
              console.log(this.detailsInfo, 'this.detailsInfo')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      // 获取列表数据
      async getData(refresh) {
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
        await this.$VoHttp
          .apiContentLearningRelatedCourse(params)
          .then((res) => {
            console.log(res);
            if (res.data && res.data.length > 0) {
              let data = res.data || []
              this.total = res.total
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            uni.$u.toast(err.message || '请检查网络')
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
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .nav_button {
    padding: 12rpx 30rpx;
    color: #ff5319;
    border: 1rpx solid #ff5319;
    border-radius: 200rpx;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
</style>
