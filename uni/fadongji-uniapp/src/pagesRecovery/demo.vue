<template>
  <view class="container">
    <video
      id="myVideo"
      :src="video"
      @error="videoErrorCallback"
      controls
    ></video>
    <input type="text" v-model="text">
    <view @click="sure">确定</view>
    <view>视频报错信息：</view>
    <view class="text">{{ errorLog }}</view>
  </view>
</template>
<script>
export default {
  name: "demo",
  data() {
    return {
      video: '',
      text: '',
      errorLog: '',
    }
  },
  methods: {
    videoErrorCallback(e) {
      this.errorLog = JSON.stringify(e.mp)
    },
    sure() {
      this.video = this.text
    },
  },
}
</script>
<style scoped>
.text{
  width: 100vw;
  word-break: break-all;
}
</style>
