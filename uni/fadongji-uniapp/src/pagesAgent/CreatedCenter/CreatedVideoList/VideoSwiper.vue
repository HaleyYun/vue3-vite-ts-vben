<template>
  <view :style="{ paddingTop: statusBarHeight + 'px' }" class="video-swiper">
    <!-- <u-gap :height="statusBarHeight" /> -->
    <swiper
      :autoplay="autoplay"
      :circular="circular"
      :current="current_"
      :disable-touch="disableTouch"
      :duration="duration"
      :indicator-dots="indicatorDots"
      :vertical="vertical"
      class="swiper"
      style="height: 100%"
      @animationfinish="videoAnimationfinish"
      @change="change"
      @transition="transition"
    >
      <block v-if="videoListAll && videoListAll.length">
        <swiper-item v-for="(item, index) in videoListAll" :key="item.id">
          <!-- @catchtouchmove="catchTouchMove" -->
          <VideoItem
            :current="current_"
            :isEdit="isEdit"
            :videoDetail="item"
            :videoIndex="index"
            @CommentPopClose="CommentPopClose"
            @showAnswerPop="showAnswerPop"
          />
        </swiper-item>
      </block>
    </swiper>
    <u-gap :height="safeAreaHeight" />
  </view>
</template>

<script>
  // import  VideoContent from '@/pagesAgent/CreatedCenter/CreatedVideoList/subNVue/VideoContent'
  import VideoItem from './components/VideoItem.vue'
  import devConf from '@/common/env'
  import helpUtil from '@/common/helper'

  let touchArr = []
  export default {
    name: 'VideoDetail',
    components: { VideoItem },
    data() {
      return {
        info: '',
        statusBarHeight: 0,
        safeAreaHeight: 0,

        indicatorDots: false, // 是否显示面板指示点
        autoplay: false, // 是否自动切换
        vertical: true, // 滑动方向是否为纵向
        duration: 800,
        circular: false, // 是否衔接滑动
        current_: 0, // 当前所在视频的 index
        preIndex: 0,
        videoIndex: 0, // 维护的视屏下标
        disableTouch: false, //是否禁止用户 touch 操作
        videoListAll: [
          // {
          //   id: 0,
          //   name: '汽配老炮',
          //   videoUrl: '/static/video/video1.mp4',
          //   desc: '火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程火花塞安装教程',
          //   img: '/static/headPhoto/photo1.png',
          //   giveNum: 0,
          //   time: '3-25',
          //   isNoble: true,
          //   isLike: false,
          //   isCollect: false,
          // },
        ], // 数据源
        total: 0, // 视频总条数
        isTwo: false, // 初始的时候是否请求了两次
        isSuccess: true, // 请求是否失败
        touchDirection: '', // 滑动方向
        current0: '', // 上一个swiper下标
        isRequest: false, // 是否在请求数据
        pageNo: 1,
        pageSize: 10,
        isEdit: 0,
        columnId: '',
      }
    },
    onLoad(options) {
      console.log('options', options)
      this.columnId = options.columnId || ''
      this.isEdit = Number(options.isEdit) || 0
      const res = uni.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight
      this.safeAreaHeight = res.safeAreaInsets.bottom
      //options.disableTouch禁用传1非禁用传0
      if (Number(options.disableTouch)) {
        //页面禁止滑动
        this.disableTouch = true
        this.getVideoDetail(options.id)
        return
      }
      this.current_ = options.index ? parseInt(options.index) : 0
      this.pageNo = parseInt(options.pageNo) || 1
      this.pageSize = parseInt(options.pageSize) || 100
      this.initPage()
    },
    onShow() {},
    watch: {
      //   videoIndex(val) {
      //     // 维护数组
      //     let videoIndex_ = this.videoIndex % 10
      //     let index_ = parseInt(this.videoIndex / 10)
      //     // 判断是否衔接
      //     this.isCircular(videoIndex_)
      //     // 加载数据
      //     if (this.touchDirection == 'up' && videoIndex_ == 4) {
      //       // 第5个加载数据
      //       if (!this.videoListAll[index_ + 1]) {
      //         // 如果有数据就不加载了
      //         this.videoList(index_)
      //       }
      //     }
      //     // 请求失败时第九个再次请求
      //     if (this.touchDirection == 'up' && videoIndex_ == 8) {
      //       if (!this.videoListAll[index_ + 1] && !this.isSuccess) {
      //         // 如果有数据就不加载了
      //         this.videoList(index_)
      //       }
      //     }
      //     // 分享参数
      //     // let detail = this.videoListAll[index_][videoIndex_]
      //     // if (detail) {
      //     //   this.videoIdFX = detail.videoId
      //     //   this.title = detail.title
      //     //   this.videoImageFile = detail.videoImageFile && detail.videoImageFile.imageUrl
      //     // }
      //     // // 标记上一个下标
      //     this.current0 = this.videoIndex % 10
      //     // this.current_ = videoIndex_
      //   },
    },
    methods: {
      getVideoDetail(id) {
        let param={
          id: id,
        }
        if(this.userInfo&&this.userInfo.id){
          param.userId=this.userInfo.id
        }
        this.$VoHttp
          .apiCreateQuestionsQuestion$Id(param)
          .then((res) => {
            console.log('this.info===', res.data)
            let data = res.data
            //图片路径转换
            if (data.fileUrl) {
              let urls = data.fileUrl.split('|')
              data.videoUrl = urls[0]
              data.videoPoster = urls[1]
            }
            helpUtil.regroupFileData(data)
            this.videoListAll = [data]
            console.log('this.videoListAll', this.videoListAll)
          })
      },
      //swiper-item 的位置发生改变时会触发，用来判断上滑还是下滑
      transition(event) {
        // 在export default外定义一个数组 touchArr
        // <script>
        // let touchArr = []
        // export default {}
        // <script/>
        // uni.$u.debounce(() => {
        touchArr.push(event.detail.dy)
        if (touchArr.length > 1) {
          if (touchArr[touchArr.length - 1] - touchArr[touchArr.length - 2] > 0) {
            this.touchDirection = 'up'
          } else {
            this.touchDirection = 'down'
          }
          //   console.log('==========(transition)========>>>', this.touchDirection)
        }
        // }, 500)
      },
      //swiper-item 的current下标改变时触发，用来维护videoIndex下标
      change(event) {
        console.log(event)
        this.current_ = event.detail.current
        // console.log('触发了change)========>>>', this.current_, this.total)
        // touchArr = []
        // console.log(this.videoIndex)
        // // 维护下标
        // // console.log('==========(touchDirection(change里面的))========>>>', this.touchDirection)
        // if (this.touchDirection === 'down') {
        //   this.videoIndex--
        //   console.log(this.videoIndex)
        //   console.log(this.touchDirection)
        //   this.circular = false // 每次videoIndex改变先设为false
        // } else if (this.touchDirection === 'up') {
        //   this.videoIndex++
        //   this.circular = false // 每次videoIndex改变先设为false
        // }
        // // 防止维护的下标为负的时候白屏
        // if (this.videoIndex < 0) {
        //   console.log('33333333333333')
        //   this.videoIndex = 0
        //   this.current_ = 0
        // }
        //请求下一页
        console.log(this.touchDirection, this.current_, this.videoListAll.length, '---------')
        if (this.touchDirection === 'up' && this.current_ === this.videoListAll.length - 2) {
          console.log()
          if (this.videoListAll.length < this.total) {
            this.pageNo++
            this.videoList()
          }
        }
        this.preIndex = this.current_
        // 防止维护的下标大于总数时候白屏
        // if (this.videoIndex >= this.total) {
        //   console.log('4444444444444444')
        //   this.videoIndex = this.total - 1
        //   this.current_ = this.total - 1
        // } else {
        //   console.log('5555555555555555555555')
        //   // 修正swiper下标
        //   this.current_ = this.videoIndex % 10
        // }
      },
      // swiper动画结束执行
      videoAnimationfinish(event) {
        // 如果在请求中，swiper不做首尾衔接
        if (this.isRequest) {
          this.circular = false // 不衔接
          uni.showToast({ title: '加载中', icon: 'none', duration: 1000 })
          return
        }
        console.log(this.videoIndex, 'asd')
        console.log(this.total, 'zxc')
        // 没有数据了
        if (this.videoIndex == this.total - 1) {
          uni.showToast({ title: '没有更多了', icon: 'none', duration: 1000 })
          return
        }
      },
      //判断是否衔接
      isCircular(type) {
        // 1、维护的下标小于等于0时
        if (this.videoIndex <= 0) {
          this.circular = false
          return
        }
        // 2、维护的下标大于等于总数时
        if (this.videoIndex >= this.total - 1) {
          this.circular = false
          return
        }
        // 3、总数小于等于10时
        if (this.total <= 10) {
          this.circular = false
          return
        }
        // 4、总数大于10
        if (type == 0) {
          this.circular = true
          console.log('==========(circular是否衔接1)========>>>', this.circular)
          return
        } else if (type == 9) {
          this.circular = true
          console.log('==========(circular是否衔接2)========>>>', this.circular)
          return
        } else {
          this.circular = false
        }
      },
      // 页面初始化
      async initPage() {
        if (this.videoIndex % 10 === 0 && Number(this.pageNo) > 1) {
          this.pageNo = Number(this.pageNo) - 1
        }
        this.videoList()
      },
      // 获取视频列表
      videoList(index) {
        if (this.isRequest) return // 防止重复请求
        this.isRequest = true
        this.isSuccess = false
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          businessType: 2,
        }
        if (this.isEdit) {
          params['userId'] = this.userInfo.id
        }
        if (this.columnId) {
          params['columnId'] = this.columnId
        }
        if (this.$storage.get('searchCreate')) {
          params.content = this.$storage.get('searchCreate')
        }
        this.$VoHttp
          .apiCreateQuestionsQuestionList(params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                //图片路径转换
                if (item.fileUrl) {
                  let urls = item.fileUrl.split('|')
                  item.videoUrl = urls[0]
                  item.videoPoster = urls[1]
                }
                helpUtil.regroupFileData(item)
              })
              this.videoListAll = this.videoListAll.concat(data)
              console.log('this.videoListAll', this.videoListAll)
              this.isSuccess = true
              this.isRequest = false
              this.isCircular(this.videoIndex % 10) // 请求成功再调一次衔接判断
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.isRequest = false
            // this.$store.commit('setShowPageLoading', false);
          })
        // this.$fetch({
        //   url: 'VIDEO_LIST_VX',
        //   data: {
        //     themeId: this.themeId || '',
        //     pageNo: this.pageNo,
        //     queryType: this.queryType,
        //     channelType: 'MP',
        //     accountId: this.$store.state.accountId, // || 'F00012306'
        //   },
        // })
        //   .then((res) => {
        //     if (res.code === '000000' && res.data) {
        //       let videoListAll = res.data.list
        //       console.log('=======发了请求videoListAll=====>>>', videoListAll)
        //       this.isloading = true
        //       if (videoListAll.length <= 0 && this.total >= 10) {
        //         this.$store.commit('setShowPageLoading', false)
        //         return
        //       }
        //       this.videoListAll[Number(this.pageNo) - 1] = videoListAll
        //       // 处理视频顺序
        //       let that = this
        //       index = index || Number(this.pageNo) - 1
        //       if (!this.isTwo && that.pageNo >= that.option.pageNo) {
        //         this.videoListAll[index].map((item, index) => {
        //           if (item.videoId == that.videoId) {
        //             that.current_ = index
        //             that.videoIndex = index + (Number(this.pageNo) - 1) * 10
        //             that.current0 = index
        //             that.title = item.title
        //             that.videoImageFile = item.videoImageFile && item.videoImageFile.imageUrl
        //             that.videoId = ''
        //             this.$store.commit('setShowPageLoading', false)
        //           }
        //         })
        //         if (that.pageNo > that.option.pageNo) this.isTwo = true
        //       }
        //       console.log('==========(视频列表数据)========>>>', this.videoListAll)
        //       that.total = that.total + videoListAll.length
        //       this.pageNo = Number(this.pageNo) + 1
        //       this.isSuccess = true
        //       this.isRequest = false
        //       if (!this.isTwo) {
        //         console.log('==========(请求第二次)========>>>')
        //         this.videoList()
        //       }
        //       this.isCircular(this.videoIndex % 10) // 请求成功再调一次衔接判断
        //     } else {
        //       this.isSuccess = false
        //       res.message && uni.showToast({ title: res.message, icon: 'none' })
        //       this.isloading = true
        //       this.$store.commit('setShowPageLoading', false)
        //     }
        //   })
        //   .finally(() => {
        //     this.isRequest = false
        //     // this.$store.commit('setShowPageLoading', false);
        //   })
      },
      showAnswerPop() {
        //评论弹框出现页面禁止滑动
        this.disableTouch = true
      },
      CommentPopClose() {
        this.disableTouch = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .video-swiper {
    height: 100vh;
    width: 750rpx;
    position: relative;
  }
</style>
