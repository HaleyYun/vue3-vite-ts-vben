<template>
  <view class="notice">
    <view class="notice-bg">
      <view class="notice-bg__title flex flex-vertical-c">
        <image class="title-img" src="/static/supplier/home/announcement.png" />
        <view class="title-line" />
        <view class="flex1 lh36 fz-28 color-block">
          <u-notice-bar
            :text="announcementList"
            bgColor="transparent"
            color="rgba(0, 0, 0, 0.85)"
            direction="column"
            icon=""
            @click="noticeClick"
        /></view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'NoticeBar',
    data() {
      return {
        //公告列表
        announcementList: [],
      }
    },
    methods: {
      noticeClick(index) {
        if (this.announcementList && this.announcementList.length > 0) {
          let data = this.announcementDataList[index]
          this.$linkToEasy(
            '/pagesGarage/UserCenter/AnnouncementDetail?data=' + JSON.stringify(data),
          )
          return
        }
        console.log('没有公告')
      },
      //获取公告列表
      getAnnouncementListRequest() {
        let params = {
          type: 4,
        }
        this.$VoHttp
          .apiContentMessageLogAnnouncementList(params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.records
              this.announcementDataList = data
              data.forEach((item) => {
                this.announcementList.push(item.title)
              })
            } else {
              console.log('获取公告列表失败', res.message)
            }
          })
          .catch((err) => {
            console.log('获取公告列表失败', err.message)
          })
      },
    },
    created() {
      this.getAnnouncementListRequest()
      // this.initInfo()
    },
  }
</script>
<style lang="scss" scoped>
  .notice {
    width: 750rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    &-bg {
      //border-radius: 16rpx;
      border-top-left-radius: 16rpx;
      border-top-right-radius: 16rpx;
      overflow: hidden;
      background: #fff;
      //background-image: url('/static/garage/home/NoticBar.png');
      //background-repeat: no-repeat;
      //background-size: cover;
      &__title {
        width: 100%;
        padding: 14rpx 22rpx;
        box-sizing: border-box;

        .title-img {
          width: 78rpx;
          height: 32rpx;
          margin-right: 10rpx;
        }

        .title-line {
          width: 2rpx;
          height: 24rpx;
          background: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }
</style>
