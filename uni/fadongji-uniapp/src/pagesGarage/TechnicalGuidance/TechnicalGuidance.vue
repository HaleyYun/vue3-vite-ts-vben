<template>
  <view class="course">
    <!-- <u-gap :height="$systemInfo.statusBarHeight" bgColor="#fff" /> -->
    <VoNav :right-width="200" is-fixed is-have-more title="技术指导">

      <block slot="operation">
        <view class="course-operate flex-vertical-c text-center" @click="myCollection">
          <view>我的收藏</view>
        </view>
      </block>
    </VoNav>
    <view class="course-search">
      <VoSearch
        v-model="keyWord"
        placeholder="请输入关键字搜索"
        height="34"
        bgColor="#fff"
        borderColor="#FF5319"
        :actionStyle="{color:'#fff'}"
        :showInsideAction="true"
        @custom="handlerCourseSearch"
        @search="handlerCourseSearch"
      />
    </view>
    <view class="bg-white p-t-24 p-l-32 flex flex-wrap">
      <view
        v-for="(info, index) in categoryItem"
        :key="index"
        class="flex flex-vertical-c flex-justify-between"
        v-show="info.name"
      >
        <view class="course-label" @click="toList(info)">{{ info.name }}</view>
      </view>
    </view>
    <block v-if="optionsOrigin !== 'voice'">
      <CourseBox
        v-for="(item, index) in dataList"
        v-show="item.list && item.list.length"
        :key="index"
        :more-length="item.list.length"
        :title="item.text"
        @moreClick="goPage(item)"
      >
        <view class="course-list">
          <!--    筛选最近在看最多显示两个    -->
          <block v-for="(listItem, pos) of item.list" :key="listItem.id">
            <CourseItem
                class="course-item"
                :class="{'m-r-0':(pos+1)%2==0}"
              v-if="dataList[index].text === '最近在看' && pos < 2"
              :key="listItem.id"
              :data-obj="listItem"
              more
              @click="toDetail(listItem)"
            />
          </block>
          <!--    筛选精算内容最多显示四个    -->
          <block v-for="(listItem, pos) in item.list" :key="listItem.id">
            <CourseItem
                class="course-item"
                :class="{'m-r-0':(pos+1)%2==0}"
                v-if="dataList[index].text === '精选内容' && pos < 4"
              :key="listItem.id"
              :data-obj="listItem"
              @click="toDetail(listItem)"
            />
          </block>
          <!--    筛选热门内容最多显示四个    -->
          <block v-for="(listItem, pos) in item.list" :key="listItem.id">
            <CourseItem
                class="course-item"
                :class="{'m-r-0':(pos+1)%2==0}"
                v-if="dataList[index].text === '热门内容' && pos < 4"
              :key="listItem.id"
              :data-obj="listItem"
              @click="toDetail(listItem)"
            />
          </block>
        </view>
      </CourseBox>
    </block>
    <CourseBox v-else title="搜索结果">
      <view class="course-list">
        <CourseItem
            class="course-item"
            :class="{'m-r-0':(pos+1)%2==0}"
            v-for="(item, index) in dataVoice"
          :key="item.id"
          :data-obj="item"
          @click="toDetail(item)"
        />
      </view>
    </CourseBox>
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />
  </view>
</template>
<script>
  import CourseBox from './components/CourseBox'
  import CourseItem from './components/CourseItem'
  import helper, { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'TechnicalGuidance',
    components: { CourseBox, CourseItem },
    data() {
      return {
        keyWord: '',
        categoryItem: [],
        columnList: [
          {
            text: '系列课程',
            icon: 'file-log',
            detailPage: '/pagesGarage/TechnicalGuidance/SeriesCourse?lately=1',
          },
          {
            text: '课程上新',
            icon: 'file-tag',
            detailPage: '/pagesGarage/TechnicalGuidance/CourseList?new=1',
          },
          {
            text: '我的收藏',
            icon: 'file-star',
            detailPage: '/pagesGarage/TechnicalGuidance/MyCollect',
          },
        ],
        dataList: [
          {
            text: '最近在看',
            detailPage: '/pagesGarage/TechnicalGuidance/moreList?lately=1',
            list: [
              //{
              //  id: '11',
              //},
              //{
              //  id: '22',
              //},
              //{
              //  id: '33',
              //},
            ],
          },
          {
            text: '精选内容',
            detailPage: '/pagesGarage/TechnicalGuidance/moreList?recommend=1&origin=1',
            list: [
              //{
              //  id: '12',
              //},
            ],
          },
          {
            text: '热门内容',
            detailPage: '/pagesGarage/TechnicalGuidance/moreList?hot=1&origin=1',
            //detailPage: '4',
            list: [
              //{
              //  id: '13',
              //},
            ],
          },
        ],
        optionsOrigin: '',
        dataVoice: [],
      }
    },
    onLoad(options) {
      console.log(options.origin)
      this.optionsOrigin = options.origin || ''

      this.categoryData()
      if (this.optionsOrigin === 'voice') {
        //万能喊返回的数据
        let dataVoice = this.$storage.get('voiceRecords')
        this.$storage.remove('voiceRecords')
        console.log(dataVoice)
        this.dataVoice = []
        if (
            dataVoice.records &&
            dataVoice.records.records &&
            dataVoice.records.records.length
        ) {
          console.log('dataVoice', dataVoice.records)
          dataVoice.records.records.forEach((item) => {
            helper.regroupFileData(item, 'fileUrl', ',')
          })
          this.dataVoice = [...dataVoice.records.records]
          // this.dataList[0].list = dataVoice.records
        } else {
          this._init_func()
        }
      } else {
        this._init_func()
      }
    },
    methods: {
      categoryData() {
        this.$VoHttp
          .apiContentTechnicalGuidanceSelectCategory({}, { noLoading: true })
          .then((res) => {
            if (res.data) {
              console.log(res.data)
              this.categoryItem = res.data
              // this.categoryItem = this.categoryItem.splice(0, 4)
              console.log(this.categoryItem, 'this.categoryItem')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      handlerCourseSearch() {
        if (!this.keyWord) {
          helper.error('请输入搜索关键词')
          return
        }
        this.$linkToEasy(`/pagesGarage/TechnicalGuidance/CourseList?keyWord=${this.keyWord}`)
      },
      goPage(item) {
        this.$linkToEasy(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy(`/pagesGarage/TechnicalGuidance/CourseDetail?id=${listItem.id}`)
      },
      toList(info) {
        this.$linkToEasy(
          `/pagesGarage/TechnicalGuidance/moreList?categoryId=${info.id}&name=${info.name}`,
        )
      },
      myCollection() {
        this.$linkToEasy(`/pagesGarage/TechnicalGuidance/MyCollect`)
      },
      async _init_func() {
        //最近在学
        showLoading()
        this.dataList[0].list = await this.$VoHttp
          .apiContentTechnicalGuidanceStudyCourse({}, { noLoading: true })
          .then((res) => {
            console.log(res)
            if (this.$vocenApi.VoUtils.checkIsEmpty(res)) {
              return []
            } else {
              let records = res.data.records
              records.forEach((item) => {
                helper.regroupFileData(item, 'fileUrl', ',')
              })
              return records
            }
          })
          .catch((err) => {
            return []
          })
        //精选课程
        this.dataList[1].list = await this.$VoHttp
          .apiContentTechnicalGuidanceRecommendCourse({}, { noLoading: true })
          .then((res) => {
            if (this.$vocenApi.VoUtils.checkIsEmpty(res)) {
              return []
            } else {
              let records = res.data.records
              records.forEach((item) => {
                helper.regroupFileData(item, 'fileUrl', ',')
              })
              return records
            }
          })
          .catch((err) => {
            return []
          })
        //热门课程
        this.dataList[2].list = await this.$VoHttp
          .apiContentTechnicalGuidanceHotCourse({}, { noLoading: true })
          .then((res) => {
            if (this.$vocenApi.VoUtils.checkIsEmpty(res)) {
              return []
            } else {
              let records = res.data.records
              records.forEach((item) => {
                helper.regroupFileData(item, 'fileUrl', ',')
              })
              return records
            }
          })
          .catch((err) => {
            return []
          })
          .finally(() => {
            this.$forceUpdate()
          })
        hideLoading()
        console.log(this.dataList)
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
    &-operate {
      font-size: 24rpx;
      line-height: 56rpx;
      color: #ff5319;
      width: 144rpx;
      height: 56rpx;
      border: 2rpx solid #ffa98c;
      border-radius: 200rpx;
      margin-right: 24rpx;
    }
    &-search {
      padding: 8rpx 32rpx;
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
        box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.08);
        border-radius: 4px;
        height: 112rpx;
        margin-left: 24rpx;
        flex: 1;
        display: flex;
        align-items: center;
        .item-icon {
          width: 72rpx;
          height: 72rpx;
        }
        .item-text {
          color: $v-c0-65;
          font-size: 24rpx;
          line-height: 1.5;
          padding-left: 8rpx;
        }
      }
    }
    &-list {
      width: 100%;
      //column-count: 2; //分为两列,用于瀑布流
      //column-gap: 32rpx;
      //row-gap: 24rpx;
      display: flex;
      flex-wrap: wrap;
    }
    &-label {
      width: 206rpx;
      height: 94rpx;
      line-height: 94rpx;
      text-align: center;
      background: #f7f7f8;
      border-radius: 16rpx;
      margin-bottom: 24rpx;
      margin-right: 32rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-85;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .interval {
    width: 32rpx;
  }
  .course-item{
    width: 328rpx;
    margin-right: 30rpx;
  }
  .m-r-0{
    margin-right: 0rpx !important;
   }
</style>
