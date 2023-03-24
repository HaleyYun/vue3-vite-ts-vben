<template>
  <view class="course-detail">
    <!-- <u-gap :height="$systemInfo.statusBarHeight" bgColor="#fff" /> -->
    <VoNav is-fixed title="课程详情" is-have-more>
    </VoNav>
    <view class="course-detail__main">
      <block v-if="vo.type === 2 && vo.video && vo.video.length">
        <!--http://v.xiaohongshu.com/01e283d1fe7326190103700380d3899301_259.mp4?sign=7244aa9a285fa5b5ff630436428b9797&t=62ab5380-->
        <video
          id="myVideo"
          ref="myVideo"
          :autoplay="true"
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

        <view class="video-desc__info">
          <view class="icon-eys">
            <VoIcon :opacity="0.85" :size="24" color="#2D3548" name="eye" />
            <text>{{ vo.viewCount }}</text>
          </view>

          <view class="flex">
            <view class="video-desc__icon">
              <VoIcon
                :opacity="0.45"
                :size="24"
                color="#000000"
                name="share"
                @click="showSharePop()"
              />
              <view class="icon__word">分享</view>
            </view>
            <view class="video-desc__icon">
              <VoIcon
                v-if="vo.isCollection === 1"
                :size="24"
                color="#FDA202"
                name="star"
                @click="collect(1)"
              />
              <VoIcon
                v-else
                :opacity="0.45"
                :size="24"
                color="#000000"
                name="collect-none"
                @click="collect(2)"
              />
              <view class="icon__word">收藏</view>
            </view>
          </view>
        </view>
        <view class="video-desc__updateTime">{{ vo.updateTime }}</view>
        <!--<view class="line"></view>-->
      </view>
      <block v-if="vo.type === 1" @click="preview(vo.fileUrl)">
        <view class="detail-block">
          <image :src="vo.fileUrl" class="detail-image" mode="widthFix" />
        </view>
        <view class="video-desc__rich">
          <u-parse :content="vo.content.json" />
        </view>
      </block>
    </view>

    <CourseBox v-if="infoList.length > 0" hide-more title="相关课程" @moreClick="toPage()">
      <view class="course-list">
        <CourseItem
          v-for="(listItem, index) in infoList"
          :key="index"
          :data-obj="listItem"
          disabled
          @click="clickFn(listItem)"
        />
      </view>
    </CourseBox>
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />

    <VoShareView ref="sharePop" @shareFn="shareFn" />
  </view>
</template>
<script>
  import CourseBox from '@/pagesSupplier/BusinessUniversity/components/CourseBox'
  import CourseItem from '@/pagesSupplier/BusinessUniversity/components/CourseItem'
  import helper from '@/common/helper'
  import helpUtil from '@/common/helper'
  import devConf from '@/common/env'

  export default {
    name: 'BusinessUniversityDetail',
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
            detailPage: '/pagesSupplier/BusinessUniversity/SeriesCourse',
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
        originStatus: '', // 暂存收藏状态
      }
    },
    methods: {
      async clickFn(item) {
        this.id = item.id
        await this._init_func()
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
        return
        this.vo = await this.$VoHttp
          .apiContentUniversityDetail$Id({ id: item.id })
          .then((res) => {
            let resData = res.data
            helper.regroupFileData(resData, 'fileUrl', ',')
            return resData
          })
          .catch((err) => {})
        this.id = this.vo.id
        this.vo.content = JSON.parse(this.vo.content)
        this.getMore()

        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
        this.videoContext.play()
      },
      ended() {
        this.videoContext.pause()
        this.videoContext.seek(0)
      },
      preview(val) {
        uni.previewImage({ urls: [val] })
      },
      playFn() {
        // 文章直接添加访问记录
        this.$VoHttp
          .apiContentUniversityBrowseRecord$Id({
            id: this.id,
          })
          .then((res) => {
            if (res.data) {
              // this.vo.viewCount++
            }
          })
      },
      // collectCancel() {
      //   if (this.actionLoading) {
      //     return
      //   }
      //   this.actionLoading = true
      //   helper.showLoading()
      //   //api/content/university/cancel/collection/course/{id}
      //   uni.$u.debounce(this.collectCancelApi, 500)
      // },
      /**
       * 取消收藏接口
       */
      collectCancelApi() {
        if (this.vo.isCollection === this.originStatus) return
        this.$VoHttp
          .apiContentUniversityCancelCollectionCourse$Id({ id: this.id })
          .then((res) => {
            uni.showToast({
              title: '取消收藏',
              duration: 1000,
              mask: true,
            })

            this.vo.isCollection = 2 // 视图的状态
            this.originStatus = 2 // 暂存的状态
          })
          .catch((err) => {
            helper.error('操作失败')
            this.vo.isCollection = this.originStatus
          })
          .finally(() => {
            this.actionLoading = false
            helper.hideLoading()
          })
      },
      /**
       * 点击收藏/取消谁才能够取表
       * @param type 1：收藏 2：取消收藏
       */
      collect(type) {
        if (type === 1) {
          this.vo.isCollection = 2
          uni.$u.debounce(this.collectCancelApi, 500)
        } else {
          this.vo.isCollection = 1
          uni.$u.debounce(this.collectApi, 500)
        }
      },
      /**
       * 收藏接口
       */
      collectApi() {
        if (this.vo.isCollection === this.originStatus) return
        this.$VoHttp
          .apiContentUniversityCollectionCourse$Id({ id: this.id })
          .then((res) => {
            if (+res.code === 20001) {
              // this.$toast('收藏成功', 'success', '')
              uni.showToast({
                title: '收藏成功',
                icon: 'success',
                image: '/static/icons/success_icon.png',
                duration: 1000,
              })
              this.vo.isCollection = 1 // 视图的状态
              this.originStatus = 1 // 暂存的状态
            }
          })
          .catch((err) => {
            helper.error('操作失败')
            this.vo.isCollection = this.originStatus
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
      goPage(item) {
        this.$linkToEasy(item.detailPage)
      },
      getMore() {
        this.$VoHttp
          .apiContentUniversityRelevantCourse({
            categoryId: this.vo.categoryId,
            contentId: this.id,
          })
          .then((res) => {
            if (res.data && res.data && res.data.records) {
              this.infoList = res.data.records
              this.infoList.forEach((item) => {
                helpUtil.regroupFileData(item, 'fileUrl', ',')
              })
            }
          })
      },
      async _init_func() {
        this.vo = await this.$VoHttp
          .apiContentUniversityDetail$Id({ id: this.id })
          .then((res) => {
            let resData = res.data
            helper.regroupFileData(resData, 'fileUrl', ',')

            return resData
          })
          .catch((err) => {})
        this.originStatus = this.vo.isCollection
        this.vo.content = JSON.parse(this.vo.content)

        helpUtil.regroupFileData(this.vo, 'fileUrl', ',')
        this.getMore()
        console.log(this.vo, '============')
        if (this.vo.type == 1) {
          // 文章直接添加访问记录
          this.$VoHttp
            .apiContentUniversityBrowseRecord$Id({
              id: this.id,
            })
            .then((res) => {
              if (res.data) {
                // this.vo.viewCount++
              }
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
              devConf.shareBaseUrl +
              '/#/pagesSupplier/BusinessUniversity/CourseDetail?id=' +
              this.vo.id,
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
          font-size: 30rpx;
          line-height: 1.5;
          font-weight: 500;
        }
        &__updateTime {
          color: rgba(0, 0, 0, 0.45);
          font-size: 24rpx;
          line-height: 150%;
          margin-top: 16rpx;
        }

        &__rich {
          background: #fff;
          padding: 0 32rpx 32rpx;
          font-size: 32rpx;
        }
        &__info {
          display: flex;
          justify-content: space-between;
          padding: 16rpx 32rpx 0 0;

          .icon-eys {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.65);
            font-size: 24rpx;
          }
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
            color: $v-c0-45;
            font-size: 24rpx;
            line-height: 1.5;
          }
          &:first-child {
            margin-right: 36rpx;
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
  .detail-block {
    padding: 0 32rpx;
    background: #fff;
  }
  .detail-image {
    width: 100%;
  }
</style>
