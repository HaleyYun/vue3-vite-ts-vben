<template>
  <view class="wrap">
    <!--  头部  -->
    <VoNav :is-fixed="false" :left-width="200" :right-width="200" isHaveMore title="服务通知">
      <block slot="operation">
        <view class="val-record m-r-28 fz-32 color-block" @click="goSetUp(1)">设置</view>
      </block>
    </VoNav>
    <!--  交易物流  -->
    <scroll-view v-if="card.length" class="content_con" scroll-y @scrolltolower="scrolltolower">
      <view v-for="(info, index) of card" :key="index" class="wrap-card" @click="tapToPage(info)">
        <view class="flex flex-justify-between flex-vertical-c m-b-20">
          <view :class="{ hasRead: info.isRead }" class="wrap-card__tip fz-28">{{
            info.title
          }}</view>
          <view :class="{ hasRead: info.isRead }" class="wrap-card__time">{{
            formateTime(info.createTime)
          }}</view>
        </view>
        <view class="content">
          <view v-if="info.content" :class="{ hasRead: info.isRead }" class="wrap-card__remind">{{
            JSON.parse(info.content).json
          }}</view>
        </view>
      </view>
      <view v-if="card.length" class="p-t-30 p-b-30">
        <u-loadmore
          :nomore-text="
            card.length >= getMessageList.noticeList.total ? '暂无更多内容' : '加载更多'
          "
          line
          status="nomore"
        />
      </view>
    </scroll-view>
    <view
      v-else-if="!card.length && !getMessageList.noticeList.loading"
      class="content_con content_con1"
    >
      <VoNoData no-data-tips="暂无数据" />
    </view>
  </view>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import mixin from './components/mixin'

  export default {
    name: 'Transaction',
    mixins: [mixin],
    data() {
      return {}
    },
    computed: {
      ...mapGetters('serviceNotification', ['getMessageList']),
      card() {
        if (this.getMessageList.noticeList.list.length) {
          return this.getMessageList.noticeList.list
        } else {
          return []
        }
      },
    },
    watch: {
      // card: {
      //   deep: true,
      //   immediate: true,
      //   handler(val) {
      //     if (val && val.length) {
      //       let isReadList = val.filter((item) => {
      //         return !item.isRead
      //       })
      //       if (isReadList.length) {
      //         let ids = isReadList.map((item) => {
      //           return item.id
      //         })
      //         this.$VoHttp.apiContentMessageLogMessageRead({ ids }).then((res) => {
      //           console.log(res)
      //         })
      //       }
      //     }
      //   },
      // },
    },
    created() {
      this.setMsgRead()
      this.reqNoticeList()
    },
    methods: {
      ...mapActions('serviceNotification', ['reqNoticeList']),
      scrolltolower() {
        if (this.getMessageList.noticeList.list.length >= this.getMessageList.noticeList.total) {
          //   this.$u.toast('没有更多了')
        } else {
          this.reqNoticeList()
        }
      },
      // 返回上一页
      returnFn() {
        this.$backFn()
      },
      tapToPage(val) {
        this.$linkToEasy(`${val.url}`)
      },
      // 去设置页
      goSetUp(type) {
        this.$linkToEasy('/pagesCommon/serviceMessagePage/SetUp?type=' + type)
      },
      //消息设置已读
      setMsgRead() {
        //1互动消息，2：服务通知，3：交易物流  4：公告
        this.$VoHttp.apiContentMessageLogMessageRead({ type: 2 }).then((res) => {
          console.log(res)
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-navigation {
      height: 100rpx;
      background-color: #fff;
      &__left {
        .left-return {
          width: 50rpx;
          height: 50rpx;
          margin: 0 20rpx;
        }
        .left-msg {
          font-size: 34rpx;
          margin: 0 16rpx;
        }
      }
      &__right {
        margin-right: 20rpx;
        font-size: 32rpx;
        text-align: end;
        padding-bottom: 16rpx;
      }
    }
    &-card {
      padding: 20rpx;
      margin-top: 16rpx;
      background: #fff;
      &__tip {
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
      }
      &__time {
        font-size: 24rpx;
        color: #999;
      }
      &__image {
        width: 128rpx;
        height: 128rpx;
      }
      &__remind {
        font-size: 26rpx;
        color: rgba(0, 0, 0, 0.45);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .content_con {
      flex-grow: 1;
      overflow: hidden;
    }
    .content_con1 {
      background: #fff;
    }
    .content {
      background: #f7f7f8;
      padding: 15rpx;
      box-sizing: border-box;
      border-radius: 8rpx;
      overflow: hidden;
    }
    // .hasRead {
    //   color: rgba(0, 0, 0, 0.25) !important;
    // }
  }
</style>
