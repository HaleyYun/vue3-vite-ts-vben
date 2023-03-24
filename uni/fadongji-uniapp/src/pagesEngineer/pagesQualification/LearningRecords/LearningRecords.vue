<template>
  <view>
    <VoNav is-fixed is-have-more title="学习记录" />
    <scroll-view class="p-32 record" scroll-y="true">
      <block v-if="infoList && infoList.length">
        <view v-for="(item, index) in infoList" :key="index" @click="nextPage(item)">
          <LearnRecordItem  :item="item"   />
        </view>
      </block>
      <VoNoData v-else />
    </scroll-view>
  </view>
</template>

<script>
  import LearnRecordItem from '../components/LearnRecordItem/LearnRecordItem.vue'
  import { hideLoading, showLoading } from '../../../common/helper'

  export default {
    components: {
      LearnRecordItem,
    },
    data() {
      return {
        qualifyType: '', // 认证类型  31:售后回收单 32:安装单 33:回收单
        qualifyStatus: '', // 单课程认证状态  0 未开始，1学习中，2已学完
        pageNo: 1, // 页数
        pageSize: 10, // 条数
        infoList: [],
      }
    },
    onLoad(opthons) {
      this.qualifyType = opthons.qualifyType
      this.getData(true)
    },
    methods: {
      /**
       * 去详情页
       * @param item
       */
      nextPage(item) {
        console.log(item)
        if (item.type === 1) {
          this.$linkToEasy(
            '/pagesEngineer/pagesQualification/RecyclingQualification/CourseDetailText?id=' +
              item.contentId+'&qualifyType='+this.qualifyType,
          )
        } else if (item.type === 2) {
          this.$linkToEasy(
            '/pagesEngineer/pagesQualification/RecyclingQualification/CourseDetail?id=' +
              item.contentId+'&qualifyType='+this.qualifyType,
          )
        }
      },
      //获取列表数据
      getData(refresh) {
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
          .apiContentLearningTasksLearningHistory(params)
          .then((res) => {
            if (res.data) {
              let data = res.data || []
              // this.total = res.total
              this.infoList = this.infoList.concat(data)
              console.log('this.infoList', this.infoList)
              console.log(this.infoList.qualifyStatus, 555555555555)
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
  .record {
    background-color: #fff;
    box-sizing: border-box;
  }
</style>
