<template>
  <view class="wrap">
    <!--  头部  -->
    <view class="wrap-navigation flex flex-justify-between flex-vertical-c">
      <image class="wrap-navigation__return" src="/static/icons/left.png" @click="returnFn" />
      <view class="wrap-navigation__msg flex">收到的评论和@</view>
      <view class="flex wrap-navigation__right" @click="goSetUp">设置</view>
    </view>
    <u-tabs
      ref="tabs"
      @change="changeNav"
      :list="bill"
      :scrollable="false"
      :current="current"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
      }"
    />
    <swiper class="wrap-swiper" :autoplay="false" :current="current" @change="changeSwiper">
      <swiper-item>
        <scroll-view :scroll-y="true" class="flex1" v-for="(info, index) of title" :key="index">
          <view class="wrap-swiper__scroll">
            <view class="scroll-title flex flex-vertical-c flex-justify-between">
              <view class="flex flex-vertical-c">
                <u-avatar class="scroll-title__photo" :src="src" />
                <view class="scroll-title__name">
                  <view class="name-top">{{ info.name }}</view>
                  <view class="name-bottom flex">
                    <view class="m-r-30">{{ info.state }}</view>
                    <view>{{ info.time }}</view>
                  </view>
                </view>
              </view>
              <image class="scroll-title__image" src="/static/logo-1.png" />
            </view>
            <view class="scroll-con">等我搞清楚了跟你说下</view>
            <view class="scroll-body"
              >我也很关注这个压库存的问题，先Mark一下，看有没有大佬来解答一下~</view
            >
            <view class="scroll-reply flex flex-vertical-c">
              <image class="scroll-reply__icon" src="/static/icons/comment.png" />
              <view class="scroll-reply__word">回复评论</view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view :scroll-y="true" class="flex1" v-for="(item, index) of message" :key="index">
          <view class="wrap-swiper__scroll">
            <view class="scroll-title flex flex-vertical-c flex-justify-between">
              <view class="flex flex-vertical-c">
                <u-avatar class="scroll-title__photo" :src="src" />
                <view class="scroll-title__name">
                  <view class="name-top">{{ item.name }}</view>
                  <view class="name-bottom flex">
                    <view class="m-r-30">{{ item.state }}</view>
                    <view>{{ item.time }}</view>
                  </view>
                </view>
              </view>
              <image class="scroll-title__image" src="/static/logo-1.png" />
            </view>
            <view class="scroll-body"
              >我也很关注这个压库存的问题，先Mark一下，看有没有大佬来解答一下~</view
            >
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view :scroll-y="true" class="flex1" v-for="(add, index) of list" :key="index">
          <view class="wrap-swiper__scroll">
            <view class="scroll-title flex flex-vertical-c flex-justify-between">
              <view class="flex flex-vertical-c">
                <u-avatar class="scroll-title__photo" :src="src" />
                <view class="scroll-title__name">
                  <view class="name-top">{{ add.name }}</view>
                  <view class="name-bottom flex">
                    <view class="m-r-30">{{ add.con }}</view>
                    <view>{{ add.time }}</view>
                  </view>
                </view>
              </view>
              <view @click="showConcern(index)">
                <view v-if="add.concern" class="scroll-title__attention">+关注</view>
                <view v-else class="scroll-title__concerned">已关注</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import { pageMixin } from '@/common/mixins/index.js'
  export default {
    name: 'Interaction',
    mixins: [pageMixin],
    data() {
      return {
        current: 0,
        title: [
          {
            name: '汽配老王',
            state: '回复了你的评论',
            time: '2022-03-22',
          },
          {
            name: '汽配老王',
            state: '回复了你的评论',
            time: '2022-03-22',
          },
        ],
        message: [
          {
            name: '汽配老王',
            state: '赞了你的评论',
            time: '2022-03-22',
          },
          {
            name: '汽配老王',
            state: '赞了你的评论',
            time: '2022-03-22',
          },
          {
            name: '汽配老王',
            state: '赞了你的评论',
            time: '2022-03-22',
          },
          {
            name: '汽配老王',
            state: '赞了你的评论',
            time: '2022-03-22',
          },
        ],
        bill: [
          {
            name: '评论和@',
          },
          {
            name: '赞和收藏',
          },
          {
            name: '新增关注',
          },
        ],
        list: [
          {
            concern: true,
            name: '汽配老王',
            con: '赞了你的评论',
            time: '2022-03-22',
          },
          {
            concern: true,
            name: '汽配老王',
            con: '赞了你的评论',
            time: '2022-03-22',
          },
          {
            concern: true,
            name: '汽配老王',
            con: '赞了你的评论',
            time: '2022-03-22',
          },
          {
            concern: true,
            name: '汽配老王',
            con: '赞了你的评论',
            time: '2022-03-22',
          },
        ],
      }
    },
    methods: {
      // 返回上一页
      returnFn() {
        this.$backFn()
      },
      // 去设置页
      goSetUp() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImNotice/SetUp')
      },
      changeNav(e) {
        console.log(e)
        this.current = e.index
      },
      changeSwiper(e) {
        this.current = e.detail.current
      },
      showConcern(index) {
        console.log(index)
        console.log(this.list[1], '55555555')
        this.list[index].concern = !this.list[index].concern
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    &-navigation {
      height: 100rpx;
      background-color: #fff;
      &__return {
        width: 54rpx;
        height: 54rpx;
        margin: 0 20rpx;
      }
      &__msg {
        font-size: 36rpx;
        margin: 0 16rpx;
      }
      &__right {
        margin-right: 20rpx;
        font-size: 32rpx;
        text-align: end;
        padding-top: 18rpx;
      }
    }
    &-swiper {
      flex: 1;
      &__scroll {
        padding: 0 20rpx 0rpx 30rpx;
        border-bottom: 2rpx solid rgb(214, 215, 217);
        .scroll-title {
          &__photo {
            margin: 30rpx 30rpx 30rpx 0;
          }
          &__name {
            color: #999;
            font-weight: 400 !important;
            .name-top {
              font-size: 34rpx;
              margin-bottom: 6rpx;
            }
            .name-bottom {
              font-size: 28rpx;
            }
          }
          &__image {
            width: 150rpx;
            height: 130rpx;
          }
          &__attention {
            font-size: 32rpx;
            color: #333333;
            border: 2rpx solid #999;
            padding: 10rpx 14rpx;
            border-radius: 40rpx;
          }
          &__concerned {
            font-size: 32rpx;
            color: #666666;
            padding: 10rpx 14rpx;
          }
        }
        .scroll-con {
          font-size: 34rpx;
          margin-left: 10rpx;
        }
        .scroll-body {
          font-size: 28rpx;
          color: #999;
          margin: 30rpx 10rpx;
          border-left: 6rpx solid rgb(214, 215, 217);
          padding-left: 20rpx;
        }
        .scroll-reply {
          margin-bottom: 30rpx;
          &__icon {
            width: 36rpx;
            height: 36rpx;
            margin-right: 20rpx;
          }
          &__word {
            font-size: 28rpx;
          }
        }
      }
    }
  }
</style>
