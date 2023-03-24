<template>
  <view>
    <view class="list">
      <VoNav :title="navTitle + '(' + total + ')'" is-fixed>
        <view slot="operation" class="nav-operation">
          <text class="nav-text" @click="toManage">{{ navText }}</text>
          <VoIcon
            v-if="navText !== '完成'"
            :opacity="0.45"
            color="#000000"
            name="more"
            @click="showDirect = true"
          />
        </view>
      </VoNav>
      <view class="tabs">
        <EraTabs
          :current="current"
          :itemStyle="{ padding: '24rpx', width: '50%' }"
          :list="tabList"
          :scrollable="false"
          @change="tabChange"
        />
      </view>
      <swiper :current="current" class="swiper" @change="swiperChange">
        <swiper-item class="swiper-item">
          <CreatedQuestion
            ref="createdQuestion"
            pageType="collectList"
            @getListData="getListDataQues"
            @select="select"
            @selectCancel="selectCancel"
            @showReport="showReport"
          />
        </swiper-item>
        <swiper-item class="swiper-item">
          <CollectVideo
            ref="collectVideo"
            pageType="collectList"
            @getListData="getListDataVideo"
            @select="select"
            @selectCancel="selectCancel"
          />
        </swiper-item>
      </swiper>
    </view>
    <BottomOperation
      ref="bottomOperation"
      @deleteFn="deleteFn"
      @select="selectAll"
      @selectAllCancel="selectAllCancel"
    />
    <!-- 举报弹层 -->
    <VoActionSheet
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      class="action-sheet"
      @close="showAction = false"
      @select="actionSelect"
    />
    <VoQuick :show.sync="showDirect" />
  </view>
</template>
<script>
  import CreatedQuestion from '@/components/VoTabbarCreate/components/CreatedQuestion'
  import CollectVideo from '@/components/VoTabbarCreate/components/CreatedVideoList.vue'
  import BottomOperation from './components/bottomOperation.vue'
  import { hideLoading, showLoading } from '../../common/helper'

  export default {
    name: 'CourseList',
    components: { CreatedQuestion, CollectVideo, BottomOperation },
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        showDirect: false,
        navTitle: '收藏',
        current: 0,
        tabList: [
          {
            name: '问答',
          },
          {
            name: '视频',
          },
        ],
        isManage: false,
        navText: '管理',
        selectList: [],
        showAction: false,
        actions: [
          {
            name: '举报作者',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '举报内容',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '拉黑用户',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        reportData: '', //被举报数据
        total: 0,
      }
    },
    onLoad(options) {
      this.initTotalFn()
      if (this.current === 0) {
        this.$nextTick(() => {
          this.$refs.createdQuestion.getData('', true)
        })
      } else {
        this.$nextTick(() => {
          this.$refs.collectVideo.getData('', true)
        })
      }
    },
    methods: {
      initTotalFn(){
        this.$VoHttp.apiCreateQuestionsHomeCollectTotalCount({},{noLoading:true}).then(res=>{
          this.total=res.data||0
        })
      },
      //全选问答数据
      getListDataQues(list) {
        this.selectList = list
      },
      //全选视频数据
      getListDataVideo(list) {
        this.selectList = list
      },
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem) {
        this.$linkToEasy('/pagesSupplier/BusinessUniversity/CourseDetail')
      },
      //排序弹框显隐
      showTipModal() {
        this.showTip = !this.showTip
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        this.selectReset()
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.navText = '管理'
        this.selectReset()
        if (this.current === 0) {
          this.$refs.createdQuestion.getData('', true)
        } else {
          this.$refs.collectVideo.getData('', true)
        }
      },
      //重置
      selectReset() {
        this.selectList = []
        this.selectAllCancel()
        this.$refs.bottomOperation?.close()
        if (this.current === 0) {
          this.$refs.createdQuestion.toManage(false)
        } else {
          this.$refs.collectVideo.toManage(false)
        }
      },
      //管理
      toManage() {
        if (this.navText === '完成') {
          this.navText = '管理'
          this.isManage = false
          this.selectReset()
          this.$refs.createdQuestion.selectAllCancel()
          this.$refs.collectVideo.selectAllCancel()
        } else {
          this.navText = '完成'
          this.isManage = true
          if (this.current === 0) {
            this.$refs.createdQuestion.toManage(this.isManage)
          } else {
            this.$refs.collectVideo.toManage(this.isManage)
          }
          this.$refs.bottomOperation.show()
        }
      },
      //选择事件
      select(data) {
        this.selectList.push(data)
        console.log('this.selectList', this.selectList)
      },
      //选择取消
      selectCancel(data) {
        this.selectList.forEach((item, index) => {
          if (item.id === data.id) {
            this.selectList.splice(index, 1)
          }
        })
        console.log('this.selectListdel取消', this.selectList)
      },
      //选择全部
      selectAll() {
        if (this.current === 0) {
          this.$refs.createdQuestion.selectAll()
          // this.selectList = this.questionList
        } else {
          this.$refs.collectVideo.selectAll()
          // this.selectList = this.videoList
        }
      },
      //取消选择全部
      selectAllCancel() {
        this.$refs.createdQuestion.selectAllCancel()
        this.$refs.collectVideo.selectAllCancel()
        this.selectList = []
      },
      //删除
      deleteFn() {
        if (!this.selectList.length) {
          uni.$u.toast('请先选择删除项')
          return
        }
        let ids = this.selectList.map((item) => {
          return item.id
        })
        console.log('ids', ids)
        this.$VoHttp
          .apiCreateQuestionsHomeCancelCollect({
            ids: ids,
          })
          .then((res) => {
            uni.$u.toast('删除成功')
            this.initTotalFn()
            if (this.current === 0) {
              this.$refs.createdQuestion.getData('', true)
            } else {
              this.$refs.collectVideo.getData('', true)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
          })
      },
      //举报
      showReport(obj) {
        this.showAction = true
        this.reportData = obj
      },
      //举报弹层选择
      actionSelect(e) {
        console.log(e.name)
        if (e.name === '举报作者') {
          showLoading()
          setTimeout(() => {
            hideLoading()
            this.$u.toast('举报成功')
          }, 1500)
          return
        }
        if (e.name === '拉黑用户') {
          showLoading()
          setTimeout(() => {
            hideLoading()
            this.$u.toast('拉黑成功')
          }, 1000)
          return
        }
        if (e.name === '举报内容') {
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/AnswerAll/CircleReport?data=' +
              JSON.stringify(this.reportData),
          )
          return
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .list {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .nav-operation {
      display: flex;
      align-items: center;
    }
    .nav-text {
      font-size: 28rpx;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.65);
      margin-right: 32rpx;
    }
    .tabs {
      background: #fff;
    }
    .swiper {
      flex: 1;
      &-item {
        height: 100%;
      }
    }
  }
</style>
