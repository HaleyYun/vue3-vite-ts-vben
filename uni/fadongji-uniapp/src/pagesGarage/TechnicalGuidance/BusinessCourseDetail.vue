<template>
  <view class="course-detail">
    <!-- <u-gap :height="$systemInfo.statusBarHeight" bgColor="#fff" /> -->
    <VoNav is-fixed title="课程详情" is-have-more>

    </VoNav>
    <view class="course-detail__main">
      <view class="mian-title">
        第二讲：课程名称课程名称课程名称课程名称课程名称课程名称课程名称
      </view>
      <view class="main-desc">
        <view class="main-desc__item">
          <text class="item-time">2022-08-20</text>
          <VoIcon :opacity="0.45" color="#000000" name="eye" />
          <text>120</text>
        </view>
        <view class="main-desc__item right">
          <view class="icon-btn first" @click="showSharePop">
            <VoIcon :opacity="0.45" :size="24" color="#000000" name="share" />
            <view class="icon-btn__name">分享</view>
          </view>
          <view class="icon-btn">
            <VoIcon
              v-if="isCollect"
              :size="24"
              color="#FDA202"
              name="star"
              @click="collectCancel()"
            />
            <VoIcon v-else :opacity="0.45" :size="24" color="#000000" name="collect-none" />
            <text class="item-btn__name">收藏</text>
          </view>
        </view>
      </view>
      <view class="main-rich">
        <u-parse :content="content" />
      </view>
    </view>
    <CourseBox title="相关课程" @moreClick="toPage()">
      <view class="course-list">
        <CourseItem v-for="listItem in infoList" :key="listItem.id" />
      </view>
    </CourseBox>
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />
    <!-- 分享弹框 -->
    <VoShareView ref="sharePop" />
  </view>
</template>
<script>
  import CourseBox from './components/CourseBox'
  import CourseItem from './components/CourseItem'

  export default {
    name: 'BusinessUniversity',
    components: { CourseBox, CourseItem },
    data() {
      return {
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
          {
            id: '11',
          },
          {
            id: '22',
          },
          {
            id: '33',
          },
          {
            id: '44',
          },
        ],
        isCollect: false,
        content: `
					<p>露从今夜白，月是故乡明</p>
					<img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				`,
      }
    },
    methods: {
      toPage() {},
      goPage(item) {
        this.$linkToEasy(item.detailPage)
      },
      //分享
      showSharePop() {
        this.$refs.sharePop.showShare(true)
      },
      //收藏
      collect() {
        this.isCollect = true
      },
      //收藏取消
      collectCancel() {
        this.isCollect = false
      },
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
      padding: 0 32rpx;
      box-sizing: border-box;
      background-color: #ffffff;
      .mian-title {
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
        font-weight: 500;
        padding-top: 40rpx;
        padding-bottom: 24rpx;
      }
      .main-desc {
        display: flex;
        color: $v-c0-65;
        font-size: 24rpx;
        line-height: 1.5;
        padding-bottom: 40rpx;
        border-bottom: 1px solid #f7f7f8;
        &__item {
          flex: 1;
          display: flex;
          align-items: center;
          .item-time {
            margin-right: 32rpx;
          }
          .icon-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            &.first {
              margin-right: 40rpx;
            }
          }
          &.right {
            justify-content: flex-end;
          }
        }
      }
      .main-rich {
        padding: 40rpx 0;
        color: $v-c0-85;
        font-size: 28rpx;
        line-height: 1.5;
      }
    }
    .course-list {
      width: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 18upx;
    }
  }
</style>
