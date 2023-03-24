<template>
  <view class="container color-block">
    <view class="p-b-24 fz-32 font-weight-500 border-bottom">鉴定结果</view>
    <view class="py-24 fz-28">旧机识别码：{{ dataObj.engineNo }}</view>
    <block v-if="dataObj.pic.length">
      <image @click="preViewPic(0)" class="bigImg" :src="dataObj.pic[0] + '&type=1'" />
      <block v-if="dataObj.pic.length > 1">
        <view class="title">旧机故障图片：</view>
        <view class="flex flex-wrap">
          <block v-for="(item, index) in dataObj.pic">
            <image
              :key="'a' + index"
              v-if="index > 0"
              class="imgItem"
              :src="item + '&type=1'"
              @click="preViewPic(index)"
            />
          </block>
        </view>
      </block>
    </block>
    <block v-if="dataObj.video.length">
      <!-- <image v-if="!dataObj.pic.length" class="bigImg" :src="dataObj.video[0].poster" /> -->
      <view class="title">旧机故障视频：</view>
      <view class="flex flex-wrap">
        <view
          v-for="(item, index) in dataObj.video"
          class="imgItem flex flex-vertical-c"
          :key="index"
          @click="preViewVideo(item)"
        >
          <image :src="item.poster" mode="aspectFit" />
          <image class="play" src="/static/supplier/play.png" />
        </view>
      </view>
    </block>
  </view>
</template>
<script>
  export default {
    name: 'IdentifyResult',
    props: {
      dataObj: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {}
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      console.log(this.dataObj);
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    //生命周期 - 创建之前
    beforeCreate() {},
    //生命周期 - 挂载之前
    beforeMount() {},
    //生命周期 - 更新之前
    beforeUpdate() {},
    //生命周期 - 更新之后
    updated() {},
    //生命周期 - 销毁之前
    beforeUnmount() {},
    //生命周期 - 销毁完成
    unmounted() {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
    methods: {
      preViewPic(index) {
        uni.previewImage({
          current: index,
          urls: this.dataObj.pic,
          indicator: 'none',
        })
      },
      /**
       * 预览视频
       * @param info
       */
      preViewVideo(info) {
        this.$emit('preViewVideo', info)
      },
    },
  }
</script>
<style scoped lang="scss">
  .container {
    padding: 24rpx 32rpx;
    .bigImg {
      width: 452rpx;
      height: 452rpx;
      border-radius: 8rpx;
    }
    .title {
      margin-top: 22rpx;
      margin-bottom: 16rpx;
      font-size: 28;
      line-height: 1.5;
    }
    .imgItem {
      width: 218rpx;
      height: 218rpx;
      border-radius: 8rpx;
      margin-bottom: 16rpx;
      margin-right: 16rpx;
      position: relative;
      overflow: hidden;
      image {
        width: 100%;
      }
      .play {
        position: absolute;
        top: 60rpx;
        left: 60rpx;
        width: 96rpx;
        height: 96rpx;
      }
    }
    .imgItem:nth-of-type(3n) {
      margin-right: 0;
    }
  }
</style>
