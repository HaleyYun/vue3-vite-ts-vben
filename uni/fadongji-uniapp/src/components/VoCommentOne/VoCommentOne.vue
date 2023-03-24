<template>
  <view class="one-level">
    <view class="flex one-level__position">
      <!--  评论头像    -->
      <view class="one-level__left">
        <image class="left-photo p-t-10" :src="photoSrc" />
        <image v-if="bigV" class="left-icon" src="/static/icons/big_v.png" />
      </view>
      <!--  右上角三个点    -->
      <VoIcon class="one-level__more opacity" name="comment-more" :size="24" color="#000" />
      <view class="one-level__right flex1">
        <!--  姓名    -->
        <view class="flex flex-vertical-c">
          <view class="right-name">{{ name }}</view>
          <image v-if="author" class="right-tags" src="/static/created/circle/author_tags.png" />
        </view>
        <!--  评论内容    -->
        <view class="right-content">
          <view
            >{{ contentStr }}
            <text class="right-content__position" v-if="content.length > 39"
              >...<text class="right-content__text">全部</text>
            </text>
          </view>
        </view>
        <!--  时间、评论、点赞    -->
        <view class="right-bottom flex flex-justify-between">
          <view class="right-bottom__time">{{ time }}</view>
          <view class="m-t-8 flex flex-vertical-c">
            <VoIcon class="opacity m-r-24" name="commit" :size="24" color="#000" />
            <VoIcon class="opacity m-r-24" name="like" :size="24" color="#000" />
            <view class="right-bottom__num">{{ number }}</view>
          </view>
        </view>
        <VoCommentTwo v-if="twoLevel" :contentTwo1="contentTwo1" />
      </view>
    </view>
  </view>
</template>
<script>
  import VoCommentTwo from '../VoCommentTwo/VoCommentTwo'
  export default {
    components: { VoCommentTwo },
    props: {
      // 头像路径
      photoSrc: {
        type: String,
        default: '/static/headPhoto/photo.png',
      },
      // 是否显示大V图标
      bigV: {
        type: Boolean,
        default: false,
      },
      // 是否显示作者图标
      author: {
        type: Boolean,
        default: false,
      },
      // 姓名
      name: {
        type: String,
        default: '李思思',
      },
      // 评论内容
      content: {
        type: String,
        default: '',
      },
      // 时间
      time: {
        type: String,
        default: '刚刚',
      },
      // 点赞数量
      number: {
        type: String,
        default: '1.2w',
      },
      // 是否显示二级评论
      twoLevel: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        contentTwo1:
          '汽车好物老铁带你一镜到底汽车好物老铁带你一镜到底汽车好物老铁好一镜到底快来体验汽车好物老铁带你',
        contentStr: '',
      }
    },
    created() {
      this.contentStr = this.content.length > 39 ? this.content.slice(0, 39) : this.content
    },
    methods: {},
  }
</script>
<style lang="scss" scope>
  .one-level {
    width: 686rpx;
    margin: 0 32rpx;
    padding-bottom: 18rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f7f7f8;
    &:last-child {
      border-bottom: none;
    }
    &__left {
      position: relative;
      width: 48rpx;
      height: 58rpx;
      .left-photo {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
      }
      .left-icon {
        position: absolute;
        right: -4rpx;
        bottom: -4rpx;
        width: 24rpx;
        height: 24rpx;
      }
    }
    &__right {
      margin-left: 12rpx;
      .right-name {
        font-size: 24rpx;
        color: $v-c0-65;
        height: 36rpx;
        line-height: 36rpx;
        overflow: hidden;
        margin: 12rpx 8rpx 8rpx 0;
      }
      .right-tags {
        width: 60rpx;
        height: 26rpx;
      }
      .right-content {
        width: 560rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        color: $v-c0-85;
        &__position {
          background: #fff;
        }
        &__text {
          color: $v-tip !important;
        }
      }
      .right-bottom {
        &__time {
          margin-top: 18rpx;
          font-size: 20rpx;
          height: 30rpx;
          line-height: 30rpx;
          color: $v-c0-45;
        }
        &__num {
          height: 40rpx;
          line-height: 40rpx;
          font-size: 26rpx;
          color: $v-c0-45;
        }
      }
    }
    &__position {
      position: relative;
      width: 686rpx;
    }
    &__more {
      position: absolute;
      top: 0;
      right: 0;
      width: 48rpx;
      height: 48rpx;
    }
  }
  .opacity {
    opacity: 0.45;
  }
</style>
