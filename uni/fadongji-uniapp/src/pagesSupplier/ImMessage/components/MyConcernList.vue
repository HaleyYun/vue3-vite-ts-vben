<template>
  <view class="bg">
    <view class="chat flex flex-justify-between">
      <view class="chat-left" @click.stop="goToHome(myConcernList)">
        <view v-if="myConcernList.type === 'groupChat'" class="chat-left__group">
          <view class="group-padding">
            <image :src="info.src" class="group-img" />
          </view>
        </view>
        <u-avatar
          :size="48"
          class="chat-left__img"
          default-url="/static/icons/defaultHead.png"
          :src="myConcernList.photoUrl"
          shape="square"
        />
      </view>
      <view class="chat-right flex1 flex flex-justify-between flex-vertical-c">
        <view
          class="chat-right__before flex flex-column flex-justify-between"
          @click.stop="goToHome(myConcernList)"
        >
          <view class="before-note">{{
            myConcernList.nickName || myConcernList.targetName || myConcernList.targetUserName
          }}</view>
        </view>
        <!--0：未关注     1：已关注     2：互相关注-->
        <view v-if="attention === 1">
          <!--          <view-->
          <!--            v-if="followType === 1"-->
          <!--            class="chat-right__after"-->
          <!--            @click="unFollow()"-->
          <!--          >-->
          <!--     关注我的 -- 关注  我的关注---已关注       已关注-->
          <!--          </view>-->
          <view v-if="followType == 1" class="chat-right__after" @click="unFollow()"> 已关注 </view>
          <view v-if="followType == 0" class="chat-right__after" @click="changeFollow(1)">
            关注
          </view>
          <view
            v-if="followType == 2"
            class="chat-right__after mutual flex flex-vertical-c flex-justify-c"
            @click="unFollow()"
          >
            <VoIcon :size="20" name="switch" />
            <view class="m-l-4">相互关注</view>
          </view>
        </view>

        <view v-if="attention === 2">
          <!--          <view-->
          <!--            v-if="followType === 1"-->
          <!--            class="chat-right__after"-->
          <!--            @click="unFollow()"-->
          <!--          >-->
          <!--     关注我的 -- 关注  我的关注---已关注       已关注-->
          <!--          </view>-->
          <view v-if="followType == 1" class="chat-right__after" @click="changeFollow(1)">
            关注
          </view>
          <view v-if="followType == 0" class="chat-right__after" @click="changeFollow(1)">
            关注
          </view>
          <view
            v-if="followType == 2"
            class="chat-right__after mutual flex flex-vertical-c flex-justify-c"
            @click="unFollow()"
          >
            <VoIcon :size="20" name="switch" />
            <view class="m-l-4">相互关注</view>
          </view>
        </view>

        <view
          v-if="attention == 3"
          class="chat-right__after remove"
          @click="blackChange(myConcernList)"
        >
          解除拉黑
        </view>
      </view>
    </view>
    <VoLine v-if="!myConcernList.noLine" class="line" color="#F7F7F8" />
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModal"
      :showCancelButton="true"
      @cancel="showModal = false"
      @confirm="confirm"
    />
  </view>
</template>

<script>
  export default {
    name: 'MyConcernList',
    props: {
      /**
       * headImage 头像
       * message 消息数
       * doNotDisturb 是否开启了消息免打扰
       * note 消息列表备注名
       * time 消息时间
       * content 消息内容
       * name 功能名称
       * attention 1已关注 2回关 3互相关注
       * noLine noLine=true时没有下划线
       */
      myConcernList: {
        type: Object,
        default() {
          return {}
        },
      },
      attention: {
        type: Number || String,
        default: 1, // 1我关注的 2关注我的 3 黑名单
      },
    },
    data() {
      return {
        loading: false,
        showModal: false,
        content: '',
        showModalType: 1, // 1取消关注 2加入和名单
        followType: '',
      }
    },
    created() {
      this.followType = this.myConcernList.followType
      console.log(this.followType, 'xx')
    },
    methods: {
      //关注和取消关注
      async changeFollow(type) {
        //apiCreateQuestionsHomeUpdateFollow 关注
        // apiCreateQuestionsHomeCancelFollow 取消关注
        if (type == 1) {
          try {
            if (this.loading) {
              return
            }
            this.loading = true
            const { code } = await this.$VoHttp.IM.apiImMyAttentionAdd({
              targetUserId: this.myConcernList.targetUserId,
            })
            if (code === '20001') {
              uni.$u.toast('已关注该用户')
              this.attention == 1 ? (this.followType = 1) : (this.followType = 2)
            }
            this.loading = false
          } catch (e) {
            uni.$u.toast(res.message || '关注失败')
            this.loading = false
          }
        } else {
          try {
            if (this.loading) {
              return
            }
            this.loading = true
            const { code } = await this.$VoHttp.IM.apiImMyAttentionDelete({
              targetUserId: this.myConcernList.targetUserId,
            })
            if (code === '20001') {
              uni.$u.toast('已取消关注该用户')
              this.followType = 0
              // this.$emit('refresh')
            }
            this.loading = false
          } catch (e) {
            uni.$u.toast(res.message || '取消关注失败')
            this.loading = false
          }
        }
      },
      unFollow() {
        this.showModal = true
        this.content = '确认不再关注？'
      },
      confirm() {
        this.changeFollow(2)
        this.showModal = false
      },
      blackChange(item) {
        this.$emit('blackChange', item)
      },
      //点击跳转到详情
      goToHome(concern) {
        console.log(concern)
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            concern.targetUserId +
            '&platformCode=' +
            concern.targetPlatformCode,
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .chat {
    background: #ffffff;
    padding: 24rpx 32rpx;

    &-left {
      position: relative;
      width: 96rpx;
      height: 96rpx;

      &__group {
        width: 96rpx;
        height: 96rpx;
        background: rgba(0, 0, 0, 0.08);
        border-radius: 8rpx;

        .group-padding {
          padding: 4rpx;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          grid-gap: 2rpx;
          margin: auto;
        }

        .group-img {
          width: 28rpx;
          height: 28rpx;
          display: block;
        }
      }

      &__img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
      }

      &__badge {
        position: absolute;
        top: -14rpx;
        right: -14rpx;
        display: inline-block;

        &.point {
          top: -8rpx;
          right: -8rpx;
        }
      }
    }

    &-right {
      margin-left: 24rpx;

      &__before {
        .before-note {
          height: 48rpx;
          line-height: 48rpx;
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
        }

        .before-msg {
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-65;
        }
      }

      &__after {
        width: 128rpx;
        height: 56rpx;
        line-height: 56rpx;
        border: 2rpx solid $v-btn-weight;
        border-radius: 30rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-btn-weight;
        box-sizing: border-box;
        text-align: center;

        &.mutual {
          width: 208rpx;
        }

        &.remove {
          width: 160rpx;
        }
      }
    }
  }

  .bg {
    background: #ffffff;
    overflow-x: hidden;
  }

  .line {
    margin-left: 150rpx !important;
    background: #ffffff;
  }
</style>
