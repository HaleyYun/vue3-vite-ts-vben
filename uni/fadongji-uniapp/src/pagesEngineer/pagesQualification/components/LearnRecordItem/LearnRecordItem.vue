<template>
  <view class="card m-b-20">
    <view>
      <u--image :src="item.fileUrl" showLoading width="100%" />
      <view v-if="isShowStatus" :class="classObj[item.qualifyStatus]" class="learn_status fz-24">
        {{ statusObj[item.qualifyStatus] }}
      </view>
      <view class="video-icon">
        <VoIcon color="#fff" name="play" size="32" />
      </view>
      <view class="hits fz-24">
        <VoIcon color="#fff" name="eye" size="13" />
        <view>{{ item.viewRecord }}</view>
      </view>
    </view>
    <view class="course_name m-l-16">
      <view class="fz-28">{{ item.name }}</view>
      <view>
        <view class="fz-24">
          <!--去掉了时长-->
          <!--<text>时长：{{ item.duration }}</text>-->
          <text class="m-t-16">{{ currentTime }}</text>
        </view>
        <view v-if="item.qualifyStatus === 1" class="fz-24 btn_con fz-b">
          <view class="red_btn">继续学习</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'LearnRecordItem',
    props: {
      isShowStatus: {
        type: Boolean,
        default: true,
      },
      item: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        currentTime: '', // 最近学习时间
        statusObj: {
          0: '未开始',
          1: '学习中',
          2: '已学完',
        },
        classObj: {
          0: 'grey',
          1: 'red',
          2: 'blue',
        },
      }
    },
    created() {
      if(this.item.currentTime){
        this.currentTime = this.$vocenApi.VoUtils.timeTransfer(this.item.currentTime)
      }
    },
    methods: {
      nextPage() {
        this.$emit('nextPage', this.data)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    height: 176rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // >:nth-child(n) {
    //     flex-grow: 1;
    // }

    > :nth-child(1) {
      flex-shrink: 0;
      width: 232rpx;
      height: 100%;
      position: relative;
      border-radius: 8rpx;
      overflow: hidden;

      .learn_status {
        width: 104rpx;
        height: 36rpx;
        line-height: 36rpx;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 0 0 16rpx 0;
        color: #fff;
      }

      .red {
        background-color: #ff5319;
      }

      .blue {
        background-color: #155bd4;
      }

      .grey {
        background-color: #d3d4db;
        color: rgba(0, 0, 0, 0.45);
      }

      .video-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .hits {
        position: absolute;
        left: 8rpx;
        bottom: 10rpx;
        display: flex;
        align-items: center;
        color: #fff;
      }
    }

    .course_name {
      height: 176rpx;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: space-between;

      :nth-child(1) {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: rgba(0, 0, 0, 0.85);
      }

      :nth-child(2) {
        display: flex;
        justify-content: space-between;
        align-items: center;

        :nth-child(1) {
          color: #595959;
        }

        .btn_con {
          > :nth-child(1) {
            width: 160rpx;
            height: 48rpx;
            border-radius: 64rpx;
            text-align: center;
            line-height: 48rpx;
          }

          .red_btn {
            background-color: #ff5319;
            color: #fff;
          }

          .unset_btn {
            border: 1rpx solid #ff5319;
            color: #ff5319;
          }
        }
      }
    }
  }
</style>
