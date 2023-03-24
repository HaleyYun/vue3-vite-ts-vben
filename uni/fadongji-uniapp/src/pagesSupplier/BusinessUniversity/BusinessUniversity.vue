<template>
  <view class="course">
    <!-- <u-gap :height="$systemInfo.statusBarHeight" bgColor="#fff" /> -->
    <VoNav is-fixed is-have-more title="商家大学" />
    <view class="course-search">
      <VoSearch
        v-model="keyword"
        height="34"
        placeholder="请输入关键字搜索"
        borderColor="#FF5319"
        bgColor="#fff"
        :actionStyle="{ color: '#fff' }"
        :showInsideAction="true"
        @custom="handlerCourseSearch"
        @search="handlerCourseSearch"
      />
    </view>
    <view class="course-column">
      <view
        v-for="(item, index) of columnList"
        :key="index"
        class="course-column__item p-r-15"
        @click="goPage(item)"
      >
        <VoIcon :name="item.icon" :size="32" />
        <view class="item-text fz-28">{{ item.text }}</view>
      </view>
    </view>
    <block
      v-if="
        dataList[0].list.length > 0 || dataList[1].list.length > 0 || dataList[2].list.length > 0
      "
    >
      <CourseBox
        v-for="(item, index) of dataList"
        v-show="item.list && item.list.length"
        :key="index"
        :title="item.text"
        @moreClick="goPage(item)"
      >
        <view class="course-list">
          <block v-for="(listItem, itemIndex) of item.list" :key="itemIndex">
            <CourseItem
              v-if="itemIndex < item.num"
              :data-obj="listItem"
              @click="toDetail(listItem)"
            />
          </block>
        </view>
      </CourseBox>
    </block>
    <VoNoData v-else />
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />

    <view v-if="showBackBtn" class="back-to__top">
      <VoIcon @click="goTopFn" name="open-close" :size="20" color="#000000" :opacity="1" />
    </view>
  </view>
</template>
<script>
  import CourseBox from '@/pagesSupplier/BusinessUniversity/components/CourseBox'
  import CourseItem from '@/pagesSupplier/BusinessUniversity/components/CourseItem'
  import helper from '@/common/helper'

  export default {
    name: 'BusinessUniversity',
    components: { CourseBox, CourseItem },
    data() {
      return {
        showBackBtn: false,
        keyword: '',
        columnList: [
          {
            text: '新人指导',
            icon: 'file-log',
            detailPage: '/pagesSupplier/BusinessUniversity/SeriesCourse',
          },
          {
            text: '新增课程',
            icon: 'file-tag',
            detailPage: '/pagesSupplier/BusinessUniversity/CourseList?new=1',
          },
          {
            text: '我的收藏',
            icon: 'file-star',
            detailPage: '/pagesSupplier/BusinessUniversity/MyCollect',
          },
        ],
        dataList: [
          {
            text: '最近在学',
            num: 2,
            detailPage: '/pagesSupplier/BusinessUniversity/CourseList?lately=1',
            list: [],
          },
          {
            text: '精选课程',
            num: 4,
            detailPage: '/pagesSupplier/BusinessUniversity/CourseList?recommend=1',
            list: [],
          },
          {
            text: '热门课程',
            num: 4,
            detailPage: '/pagesSupplier/BusinessUniversity/CourseList?hot=1',
            //detailPage: '4',
            list: [],
          },
        ],
      }
    },
    onShow() {
      this._init_func()
    },
    onPageScroll(e) {
      if (e.scrollTop >= 250) {
        this.showBackBtn = true
      } else {
        this.showBackBtn = false
      }
    },
    methods: {
      /**
       * @description 返回顶部
       */
      goTopFn() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
      },
      handlerCourseSearch() {
        if (!this.keyword) {
          helper.error('请输入搜索关键词')
          return
        }
        this.$linkToEasy(`/pagesSupplier/BusinessUniversity/SearchResult?keyword=${this.keyword}`)
      },
      toPage() {},
      goPage(item) {
        this.$linkToEasy(item.detailPage)
      },
      toDetail(listItem) {
        //this.$linkToEasy('/pagesSupplier/BusinessUniversity/BusinessCourseDetail')
        this.$linkToEasy(`/pagesSupplier/BusinessUniversity/CourseDetail?id=${listItem.id}`)
      },
      async _init_func() {
        try {
          //最近在学
          this.dataList[0].list = []
          this.dataList[1].list = []
          this.dataList[2].list = []
          const studyCourse = await this.$VoHttp.apiContentUniversityStudyCourse()
          console.log(studyCourse)
          if (!studyCourse || !studyCourse.data) return
          // if (this.$vocenApi.VoUtils.checkIsEmpty(studyCourse)) {
          this.dataList[0].list = studyCourse.data.records
          // }
          //精选课程
          const recommendCourse = await this.$VoHttp.apiContentUniversityRecommendCourse()
          if (!recommendCourse || !recommendCourse.data) return
          // if (this.$vocenApi.VoUtils.checkIsEmpty(recommendCourse)) {
          this.dataList[1].list = recommendCourse.data.records
          // }
          //热门课程
          const hotCourse = await this.$VoHttp.apiContentUniversityHotCourse()
          if (!hotCourse || !hotCourse.data) return
          // if (this.$vocenApi.VoUtils.checkIsEmpty(hotCourse)) {
          this.dataList[2].list = hotCourse.data.records
          // }
          console.log('this.dataList', this.dataList)
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络链接错误')
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .course {
    width: 750rpx;
    box-sizing: border-box;
    min-height: 100vh;
    overflow-y: auto;
    padding-bottom: 24rpx;
    background: #fff;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-column {
      padding: 32rpx 32rpx 32rpx 8rpx;
      box-sizing: border-box;
      background: #fff;
      display: flex;
      &__item {
        background: #ffffff;
        box-sizing: border-box;
        box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.08);
        border-radius: 4px;
        width: 212rpx;
        height: 112rpx;
        margin-left: 24rpx;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .item-icon {
          width: 72rpx;
          height: 72rpx;
        }
        .item-text {
          color: $v-c0-85;
          line-height: 1.5;
          padding-left: 4rpx;
          font-weight: bold;
        }
      }
    }
    &-list {
      width: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 18upx;
    }
  }
  .back-to__top {
    position: fixed;
    right: 32rpx;
    bottom: 200rpx;
    width: 36px;
    height: 36px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
