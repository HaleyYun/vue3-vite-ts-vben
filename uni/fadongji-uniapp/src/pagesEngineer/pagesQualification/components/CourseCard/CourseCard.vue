<template>
  <view class="card m-b-20" @click="nextPage">
    <view>
      <u--image
        v-if="data.type == 1"
        :src="data.fileUrl"
        height="100%"
        mode="widthFix"
        showLoading
        width="100%"
        @error="imgErr"
      />
      <u--image
        v-else
        :src="data.fileUrl+'&type=3'"
        height="100%"
        mode="widthFix"
        showLoading
        width="100%"
        @error="imgErr"
      />
      <view v-if="isShowStatus" :class="classObj[data.qualifyStatus]" class="learn_status fz-24">
        <text>{{ statusObj[data.qualifyStatus] }}</text>
      </view>
      <view v-if="data.type === 2" class="video-icon">
        <VoIcon color="#fff" name="play" size="48" />
      </view>
      <view class="hits fz-24">
        <view>
          <VoIcon color="#fff" name="eye" size="18" />
        </view>
        <view>{{ data.viewRecord }}</view>
      </view>
      <view v-if="data.type === 2" class="video_length fz-24">
        <text>{{ formateDuration(data.duration) }}</text>
      </view>
    </view>
    <view class="course_name fz-28 m-t-16">
      {{ data.name }}
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CourseCard',
    props: {
      isShowStatus: {
        type: Boolean,
        default: true,
      },
      data: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
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
      console.log(this.data)
    },
    methods: {
      formateDuration(dur) {
        let val = dur / 1000
        let hour = ''
        let min = ''
        let sec = ''
        if (Math.trunc(val / 3600)) {
          hour =
            Math.trunc(val / 3600) < 10
              ? '0' + Math.trunc(val / 3600) + ':'
              : Math.trunc(val / 3600) + ':'
        } else {
          hour = ''
        }
        if (Math.trunc((val % 3600) / 60)) {
          min =
            Math.trunc((val % 3600) / 60) < 10
              ? '0' + Math.trunc((val % 3600) / 60)
              : Math.trunc((val % 3600) / 60)
        } else {
          min = '00'
        }
        if (((val % 3600) % 60) % 60) {
          sec =
            Math.trunc(((val % 3600) % 60) % 60) < 10
              ? '0' + Math.trunc(((val % 3600) % 60) % 60)
              : Math.trunc(((val % 3600) % 60) % 60)
        } else {
          sec = '00'
        }
        return hour + min + ':' + sec
      },
      nextPage() {
        this.$emit('nextPage', this.data)
      },
      // 图片加载失败处理
      imgErr() {
        // eslint-disable-next-line vue/no-mutating-props
        this.data.fileUrl = '/static/logo-2.png'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .card {
    width: 334rpx;

    > :nth-child(1) {
      position: relative;
      border-radius: 8rpx;
      overflow: hidden;

      .learn_status {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 16rpx;
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
        :nth-child(n) {
          vertical-align: middle;
        }
      }

      .video_length {
        position: absolute;
        right: 8rpx;
        bottom: 10rpx;
        align-items: center;
        color: #fff;
      }
    }

    .course_name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>
