<template>
  <view class="container" :style="{ width: style.width, height: style.height }">
    <swiper class="wrap" :style="{ width: style.width, height: style.height }">
      <swiper-item v-for="(item, index) in link" :key="index" :style="{ width: style.width, height: style.height }">
        <image class="img" :src="item" mode="aspectFill" />
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
  export default {
    name: 'Demo',
    data() {
      return {
        link: [
          'http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getImage?fileName=temporary/20221208/275f74c87a734a26b8a223eafcc989ed.JPG',
          'http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getObject?fileName=temporary/20221205/7206fc702b4f47ccb6e7b4c1a17d9b34.mp4&type=3',
          'http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getObject?fileName=temporary/20221205/7206fc702b4f47ccb6e7b4c1a17d9b34.mp4&type=3',
          'http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getObject?fileName=temporary/20221205/7206fc702b4f47ccb6e7b4c1a17d9b34.mp4&type=3',
          'http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getObject?fileName=temporary/20221205/7206fc702b4f47ccb6e7b4c1a17d9b34.mp4&type=3',
          'http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getObject?fileName=temporary/20221205/7206fc702b4f47ccb6e7b4c1a17d9b34.mp4&type=3',
        ],
        current: 0,
        style: {
          width: '100%',
          height: '750rpx',
        },
      }
    },
    methods: {},
  }
</script>
<style scoped lang="scss">
.container{
  position: relative;
  .img{
    width: 100%;
    height: 100%;
  }
}
</style>
