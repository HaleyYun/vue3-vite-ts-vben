<template>
  <view class="course">
    <!-- <u-gap :height="$systemInfo.statusBarHeight" bgColor="#fff" /> -->
    <VoNav is-fixed title="新人指导" is-have-more>
    </VoNav>
    <view class="course-search">
      <VoSearch placeholder="请输入关键字搜索" height="34" v-model="keyword" @custom="handlerCourseSearch" />
    </view>
    <view class="course-column">
      <EraTabs :list="tabList" @change="tabChange" :current="current" itemStyle="padding: 24rpx" />
    </view>

    <OpenProcess ref="page" v-if="tabList && tabList.length" :tabList="tabList" :scroll-into-view="scrollIntoView" />
    <VoNoData v-else />
    <!--<swiper class="swiper" :current="current" @change="swiperChange">-->
    <!--  <swiper-item class="swiper-item">-->
    <!--    <OpenProcess />-->
    <!--  </swiper-item>-->
    <!--  <swiper-item class="swiper-item" v-for="(item, index) in dataList" :key="index">-->
    <!--    <scroll-view class="scroll-list" :scroll-y="true">-->
    <!--      <CourseBox :title="item.text" @moreClick="toPage(item)">-->
    <!--        <view class="course-list">-->
    <!--          <CourseItem v-for="listItem in item.list" :key="listItem.id" @click="toDetail(listItem)" />-->
    <!--        </view>-->
    <!--      </CourseBox>-->
    <!--    </scroll-view>-->
    <!--  </swiper-item>-->
    <!--</swiper>-->

    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />
  </view>
</template>
<script>
  import CourseBox from '@/pagesSupplier/BusinessUniversity/components/CourseBox'
  import CourseItem from '@/pagesSupplier/BusinessUniversity/components/CourseItem'
  import OpenProcess from './components/OpenProcess.vue'
  import helper from "@/common/helper";
  export default {
    name: 'BusinessUniversity',
    components: { CourseBox, CourseItem, OpenProcess },
    data() {
      return {

        scrollIntoView:'cate0',
        keyword: '',
        current: 0,
        tabList: [
          //{
          //  name: '开店流程',
          //},
          //{
          //  name: '仓储运营',
          //},
          //{
          //  name: '内容营销',
          //},
          //{
          //  name: '数据工具',
          //},
          //{
          //  name: '客户管理',
          //},
        ],
        dataList: [
          //{
          //  text: '仓储运营',
          //  detailPage: '2',
          //  list: [
          //    {
          //      id: '11',
          //    },
          //    {
          //      id: '22',
          //    },
          //    {
          //      id: '33',
          //    },
          //  ],
          //},
          //{
          //  text: '内容营销',
          //  detailPage: '3',
          //  list: [
          //    {
          //      id: '12',
          //    },
          //  ],
          //},
          //{
          //  text: '数据工具',
          //  detailPage: '4',
          //  list: [
          //    {
          //      id: '13',
          //    },
          //  ],
          //},
          //{
          //  text: '客户管理',
          //  detailPage: '5',
          //  list: [
          //    {
          //      id: '14',
          //    },
          //  ],
          //},
        ],
      }
    },
    methods: {
      handlerCourseSearch(){
        if(!this.keyword){
          helper.error('请输入搜索关键词')
          return;
        }
        this.$linkToEasy(`/pagesSupplier/BusinessUniversity/CourseList?keyword=${this.keyword}`)
      },
      async _init_func(){
        console.log("qwe");
        //最近在学
        this.tabList = await this.$VoHttp.apiContentUniversitySelectCategory().then(res=>{
          if(res && res.data){
            return res.data
          }else{
            return []
          }
        }).catch(err=>{
          return []
        })



      },
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem){
        this.$linkToEasy('/pagesSupplier/BusinessUniversity/CourseDetail')
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        this.scrollIntoView = `cate${tab.index}`
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
      },
    },
    async onShow() {
      console.log("aaa");
      await this._init_func()
      await this.$refs.page._init_func()
    },
  }
</script>
<style lang="scss" scoped>
  .course {
    width: 750rpx;
    box-sizing: border-box;
    height: 100vh;
    overflow-x: hidden;
    padding-bottom: 24rpx;
    display: flex;
    flex-direction: column;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-column {
      //   padding: 32rpx 32rpx 32rpx 8rpx;
      //   box-sizing: border-box;
      background: #fff;
    }
    &-list {
      width: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 18upx;
    }
    .swiper {
      flex: 1;
      &-item {
        height: 100%;
      }
    }
  }
</style>
