<template>
  <view class="course-detail">
    <!-- <u-gap :height="$systemInfo.statusBarHeight" bgColor="#fff" /> -->
    <VoNav is-fixed is-have-more title="课程详情">

    </VoNav>
    <view class="course-detail__main">
      <block v-if="vo.type === 2 && vo.video && vo.video.length">
        <!--http://v.xiaohongshu.com/01e283d1fe7326190103700380d3899301_259.mp4?sign=7244aa9a285fa5b5ff630436428b9797&t=62ab5380-->
        <video
          id="myVideo"
          ref="myVideo"
          :autoplay="true"
          :poster="vo.image && vo.image.length ? vo.image[0] : '/static/default_logo.png'"
          :src="vo.video[0] + '&type=4'"
          class="detail-video"
          @ended="ended"
          @play="playFn"
        ></video>
      </block>

      <view class="video-desc">
        <view class="video-desc__title">
          {{ vo.name }}
        </view>
        <view v-if="vo.keyword && vo.keyword != '[]'" class="tag-con">
          <view
            v-for="(item, index) in vo.keyword.split(',')"
            :key="index"
            class="tag-item color-block"
          >
            {{ item }}
          </view>
        </view>
        <view class="video-desc__info">
          <view class="icon-eys">
            <VoIcon :opacity="0.85" :size="24" color="#2D3548" name="eye" />
            <text>{{ vo && vo.viewCount ? +vo.viewCount : 0 }}</text>
          </view>

          <view class="flex">
            <view class="video-desc__icon">
              <VoIcon
                :opacity="0.45"
                :size="20"
                color="#000000"
                name="share"
                @click="showSharePop()"
              />
              <view class="icon__word">分享</view>
            </view>
            <view class="video-desc__icon">
              <VoIcon
                v-if="vo.isCollection === 1"
                :size="20"
                color="#FDA202"
                name="star"
                @click="collectCancel()"
              />
              <VoIcon
                v-else
                :opacity="0.45"
                :size="20"
                color="#000000"
                name="collect-none"
                @click="collect()"
              />
              <view class="icon__word">收藏</view>
            </view>
          </view>
        </view>
        <view class="video-desc__updateTime">{{ vo.updateTime }}</view>
        <!--        <view class="video-desc__inputtime">{{ vo.s }}</view>-->
        <!--<view class="line"></view>-->
      </view>
      <block v-if="vo.type === 1">
        <view class="video-desc__rich">
          <u-parse :content="vo.content.json"></u-parse>
        </view>
      </block>
    </view>

    <CourseBox v-if="infoList.length > 0" title="相关课程" @moreClick="toPage()">
      <view class="course-list">
        <CourseItem
          v-for="(listItem, index) in infoList"
          :key="index"
          :data-obj="listItem"
          @click="clickItem"
        />
      </view>
    </CourseBox>
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />

    <VoShareView ref="sharePop" @shareFn="shareFn" />
  </view>
</template>
<script>
  import CourseBox from './components/CourseBox'
  import CourseItem from './components/CourseItem'
  import helper from '@/common/helper'
  import helpUtil from '@/common/helper'
  import devConf from '@/common/env'

  export default {
    name: 'CourseDetail',
    components: { CourseBox, CourseItem },
    data() {
      return {
        id: '',
        vo: {
          isCollection: 2,
        },
        actionLoading: false,
        keyword: '',
        columnList: [
          {
            text: '系列课程',
            icon: '/static/icons/group.png',
            detailPage: '/pagesGarage/TechnicalGuidance/SeriesCourse',
          },
          {
            text: '课程上新',
            icon: '/static/icons/group.png',
          },
          {
            text: '我的收藏',
            icon: '/static/icons/group.png',
          },
        ],
        infoList: [
          //{
          //  id: '11',
          //},
          //{
          //  id: '22',
          //},
          //{
          //  id: '33',
          //},
          //{
          //  id: '44',
          //},
        ],
        isCollect: false,
        videoContext: null,
      }
    },
    methods: {
      ended() {
        if (this.videoContext) {
          this.videoContext.pause()
          this.videoContext.seek(0)
        }
      },
      playFn() {
        // 文章直接添加访问记录
        this.$VoHttp.apiContentUniversityBrowseRecord$Id(
          {
            id: this.id,
          },
          { noLoading: true },
        )
      },
      collectCancel() {
        if (this.actionLoading) {
          return
        }
        this.actionLoading = true
        helper.showLoading()
        //api/content/university/cancel/collection/course/{id}
        this.$VoHttp
          .apiContentTechnicalGuidanceCancelCollectionCourse$Id({ id: this.id })
          .then((res) => {
            this.$u.toast('取消收藏')
            this.vo.isCollection = 2
            this.$forceUpdate()
          })
          .catch((err) => {
            helper.error('操作失败')
          })
          .finally(() => {
            this.actionLoading = false
            helper.hideLoading()
          })
      },
      collect() {
        if (this.actionLoading) {
          return
        }
        this.actionLoading = true
        helper.showLoading()
        this.$VoHttp
          .apiContentTechnicalGuidanceCollectionCourse$Id({ id: this.id })
          .then((res) => {
            this.$u.toast('已收藏')
            this.vo.isCollection = 1
            this.$forceUpdate()
          })
          .catch((err) => {
            helper.error('操作失败')
          })
          .finally(() => {
            this.actionLoading = false
            helper.hideLoading()
          })
      },
      //分享
      showSharePop() {
        this.$refs.sharePop.showShare(true)
      },
      toPage() {},
      async clickItem(data) {
        console.log(data)
        if (this.videoContext) {
          this.videoContext.pause()
          this.videoContext = null
        }
        this.vo = await this.$VoHttp
          .apiContentTechnicalGuidanceDetail$Id({ id: data.id })
          .then((res) => {
            return res.data
          })
          .catch((err) => {})

        this.vo.content = JSON.parse(this.vo.content)

        helpUtil.regroupFileData(this.vo, 'fileUrl', ',')

        this.id = this.vo.id
        this.$forceUpdate()
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
        this.videoContext.play()
      },
      goPage(item) {
        this.$linkToEasy(item.detailPage)
      },
      async _init_func() {
        this.vo = await this.$VoHttp
          .apiContentTechnicalGuidanceDetail$Id({ id: this.id })
          .then((res) => {
            return res.data
          })
          .catch((err) => {})

        this.vo.content = JSON.parse(this.vo.content)

        helpUtil.regroupFileData(this.vo, 'fileUrl', ',')

        this.$VoHttp
          .apiContentTechnicalGuidanceRelevantCourse({ categoryId: this.vo.categoryId })
          .then((res) => {
            if (res.data && res.data && res.data.records) {
              let records = res.data.records
              records.forEach((item) => {
                helpUtil.regroupFileData(item, 'fileUrl', ',')
              })
              this.infoList = records
            }
          })

        if (this.vo.type == 1) {
          // 文章直接添加访问记录
          this.$VoHttp.apiContentTechnicalGuidanceBrowseRecord$Id({
            id: this.id,
          })
        } else if (this.vo.type == 2) {
          if (this.vo.video && this.vo.video.length) {
            this.videoContext = uni.createVideoContext('myVideo', this)
          }
        }
      },
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.sharePop.cancle()
        helpUtil
          .shareWeixin({
            scene: type,
            title: this.vo.name,
            path:
              devConf.shareBaseUrl + '/pagesGarage/TechnicalGuidance/CourseDetail?id=' + this.vo.id,
            imageUrl: this.vo.image[0],
          })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
    },
    onLoad(opts) {
      this.id = opts.id
      this._init_func()
    },
    onUnload() {
      try {
        if (this.videoContext) {
          this.videoContext.pause()
          this.videoContext = null
        }
      } catch (e) {
        console.log(e)
      }
    },
    onHide() {
      try {
        if (this.videoContext) {
          this.videoContext.pause()
          this.videoContext = null
        }
      } catch (e) {
        console.log(e)
      }
    },
  }
</script>
<style lang="scss" scoped>
  .course-detail {
    width: 750rpx;
    box-sizing: border-box;
    min-height: 100vh;
    overflow-y: auto;
    padding-bottom: 24rpx;
    &__main {
      .detail-video {
        height: 384rpx;
        width: 100%;
      }
      .video-desc {
        //display: flex;
        padding-top: 32rpx;
        padding-left: 32rpx;
        padding-bottom: 24rpx;
        box-sizing: border-box;
        background-color: #fff;
        &__title {
          //flex: 1;
          padding-right: 32rpx;
          word-break: break-all;
          color: $v-c0-85;
          font-size: 32rpx;
          font-weight: bold;
          line-height: 48rpx;
        }
        .tag-con {
          overflow: hidden;
          //display: flex;
          //flex-wrap: nowrap;
          //align-items: center;
          width: 100%;
          // -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical; //盒子中内容竖直排列
          // height: 92rpx;
          margin-top: 16rpx;
          .tag-item {
            margin-bottom: 10rpx;
            overflow: initial;
            flex-shrink: 0;
            margin-right: 16rpx;
            float: left;
            border: 1.6rpx solid #d3d4db;
            border-radius: 4rpx;
            background: #f6f7f8;
            width: fit-content;
            height: 36rpx;
            padding: 0 8rpx;
            font-size: 24rpx;
            box-sizing: border-box;
          }
        }

        &__rich {
          background: #fff;
          padding: 0 32rpx 32rpx;
          font-size: 32rpx;
        }
        &__info {
          display: flex;
          justify-content: space-between;
          padding: 10rpx 32rpx 0 0;

          .icon-eys {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.65);
            font-size: 24rpx;
          }
        }
        &__updateTime {
          color: rgba(0, 0, 0, 0.45);
          font-size: 24rpx;
          line-height: 150%;
          margin-top: 16rpx;
        }
        .line {
          width: 1px;
          background-color: rgba(0, 0, 0, 0.08);
          margin: 12rpx 0;
        }
        &__icon {
          display: flex;
          align-items: center;
          .icon__word {
            color: $v-c0-65;
            font-size: 24rpx;
            line-height: 1.5;
            margin-left: 8rpx;
          }
          &:first-child {
            margin-right: 32rpx;
          }
        }
      }
    }
    .course-list {
      width: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 18upx;
    }
  }
</style>
