<template>
  <view class="list">
    <VoNav :title="navTitle" is-fixed is-have-more> </VoNav>
    <!-- v-if="navTitle === '关注'" -->
    <view class="search-wrap">
      <VoSearch
        v-model="keyword"
        :showInsideAction="true"
        bgColor="#fff"
        borderColor="#FF5319"
        class="input"
        height="34"
        placeholder="请输入昵称进行搜索"
        @custom="searchFn"
        @search="searchFn"
      />
      <view class="search-wrap__sort">
        <view class="right-text" @click="showTipModal">排序</view>
        <view v-if="showTip" class="tip">
          <image class="tip-img" src="/static/common/tip_bg.png" />
          <view class="tip-content">
            <view class="tip-content__text" @click="sort('DESC')">最近关注</view>
            <VoLine class="tip-content__line" color="#fff" />
            <view class="tip-content__text" @click="sort('ASC')">最早关注</view>
          </view>
        </view>
      </view>

      <VoIcon :opacity="0.25" :size="20" color="#000" name="order-toggle" @click="showTipModal" />
    </view>
    <view class="h16" />
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="scroll-list"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      refresher-enabled="true"
      scroll-top="0"
      scroll-y="true"
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <view
        v-for="(item, index) in infoList"
        :key="index"
        class="scroll-list__item"
        @click="toUserHome(item)"
      >
        <image :src="item.photoUrl || '/static/icons/default_user.png'" class="item-img" />
        <view class="item-right">
          <view class="item-text">{{ item.antherUserName || '' }}</view>
          <view v-if="item.followType === 0" class="item-btn disabled" @click.stop="toFocus(item)"
            >回关</view
          >
          <view
            v-else-if="item.followType === 2"
            class="item-btn"
            @click.stop="confirmFocusCancel(item, index)"
            >互相关注
          </view>
          <block v-else-if="item.followType === 1">
            <view v-if="navTitle === '粉丝'" class="item-btn" @click.stop="toFocus(item, index)">
              关注
            </view>
            <view v-else class="item-btn" @click.stop="confirmFocusCancel(item, index)">
              已关注
            </view>
          </block>
          <view
            v-else-if="item.followType === -2"
            class="item-btn disabled"
            @click.stop="toFocus(item, index)"
          >
            关注
          </view>
          <view v-else-if="item.followType === 3" class="item-btn disabled">黑名单 </view>
        </view>
      </view>
      <VoNoData v-if="!infoList.length && !refresh" no-data-tips="暂无数据" />
    </scroll-view>
    <!-- 确认取消关注 -->
    <VoModal
      v-if="modalVisible"
      :show="modalVisible"
      showCancelButton
      @cancel="modalVisible = false"
      @confirm="toFocusCancel"
    >
      <view class="modal-content"> 确定不再关注？ </view>
    </VoModal>
  </view>
</template>
<script>
  export default {
    name: 'CourseList',
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        navTitle: '关注',
        keyword: '',
        infoList: [],
        showTip: false,

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        modalVisible: false,
        cancelData: '',
        orderType: '',
        cancelIndex: '',
      }
    },
    onLoad(options) {
      if (options.title) {
        this.navTitle = options.title
        this.getData(true)
      }
    },
    methods: {
      //跳转作者主页
      toUserHome(item) {
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            item.antherUserId +
            '&platformCode=' +
            item.platformCode,
        )
      },
      //关注
      toFocus(data) {
        this.$VoHttp
          .apiCreateQuestionsHomeUpdateFollow({
            platformCode: data.platformCode,
            id: data.antherUserId,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已关注该用户')
              this.getData(true)
            } else {
              uni.$u.toast(res.message || '关注失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(res.message || '关注失败')
          })
      },
      confirmFocusCancel(data, index) {
        this.cancelIndex = index
        console.log(this.cancelIndex, data)
        this.cancelData = data
        this.modalVisible = true
      },
      //取消关注
      toFocusCancel() {
        this.$VoHttp
          .apiCreateQuestionsHomeCancelFollow({
            platformCode: this.cancelData.platformCode,
            id: this.cancelData.antherUserId,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消关注')
              if (this.cancelData.followType === 2) {
                this.getData(true)
              } else {
                this.infoList[this.cancelIndex].followType = -2
                this.$forceUpdate()
                console.log(this.infoList)
              }

              this.modalVisible = false
            } else {
              uni.$u.toast(res.message || '取消失败')
              this.modalVisible = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '取消失败')
            this.modalVisible = false
          })
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
      //排序
      sort(key) {
        console.log(key)
        this.orderType = key
        this.getData(true)
      },
      searchFn() {
        this.getData(true)
      },
      //获取列表数据
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          userId: this.userInfo.id,
          platformCode: this.userInfo.platformCode,
          orderType: this.orderType,
        }
        if (this.keyword) {
          params.antherUserName = this.keyword
        }
        let api = ''
        if (this.navTitle === '关注') {
          api = 'apiCreateQuestionsHomeGetAttention'
        } else {
          api = 'apiCreateQuestionsHomeGetFans'
        }
        this.$VoHttp[api](params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.records
              this.total = res.data.total
              // data.forEach((item) => {
              //   item.datetime = this.$vocenApi.VoUtils.timeTransfer(item.createTime)
              // })
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
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
            return false
          }
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
  .list {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .search-wrap {
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      display: flex;
      align-items: center;
      position: relative;

      .right-text {
        font-size: 28rpx;
        line-height: 40rpx;
        color: $v-c0-85;
        padding-left: 24rpx;
        padding-right: 8rpx;
      }
      .input {
        flex: 1;
      }
      &__sort {
        position: relative;
        .tip {
          width: 240rpx;
          height: 180rpx;
          position: absolute;
          top: 40rpx;
          right: -48rpx;
          z-index: 10;
        }

        .tip-img {
          width: 100%;
          height: 100%;
        }
        .tip-content {
          width: 100%;
          position: absolute;
          top: 0;
          z-index: 99;
          font-size: 28rpx;
          color: #fff;
          text-align: center;
          padding: 18rpx 16rpx 0 16rpx;
          box-sizing: border-box;
          &__text {
            line-height: 80rpx;
          }
          &__line {
            opacity: 0.25;
          }
        }
      }
    }
    .scroll-list {
      flex: 1;
      overflow-y: auto;
      box-sizing: border-box;
      background: #fff;

      &__item {
        display: flex;
        align-items: center;
        // padding: 32rpx;
        box-sizing: border-box;
        .item-img {
          width: 96rpx;
          height: 96rpx;
          border-radius: 8rpx;
          margin: 32rpx 0 32rpx 32rpx;
        }
        .item-right {
          flex: 1;
          display: flex;
          padding: 32rpx 32rpx 32rpx 24rpx;
          border-bottom: 1px solid #f7f7f8;
          box-sizing: border-box;
        }
        .item-text {
          flex: 1;
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
        }
        .item-btn {
          font-size: 24rpx;
          color: $color-primary-yellow;
          text-align: center;
          height: 56rpx;
          line-height: 56rpx;
          border: 1px solid $color-primary-yellow;
          width: 160rpx;
          text-align: center;
          border-radius: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          &.disabled {
            color: #fff;
            background: $color-primary-yellow;
            border: 0;
          }
        }
      }
    }
  }
</style>
