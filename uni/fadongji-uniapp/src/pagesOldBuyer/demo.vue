<template>
  <view class="container">
    <video
      x5-video-player-type="h5-page"
      x5-playsinline="true"
      webkit-playsinline="true"
      playsinline="true"
      id="camera"
    ></video>
    <button id="snap">拍照</button>
    <canvas id="cameraCanvas" :width="style.width" :height="style.height"></canvas>
  </view>
</template>
<script>
export default {
  name: "demo",
  data() {
    return {
      camera: null,
      stream: null,
      style: {
        width: 300,
        height: 100,
      }
    }
  },
  methods: {
    getMedia() {
      this.camera = document.querySelector('#camera')
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          const getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            navigator.oGetUserMedia
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      const { width, height } = this.style
      const medias = {
        audio: false,
        video: {
          width: width,
          height: height,
          facingMode: 'facingMode',
        },
      }
      navigator.mediaDevices
        .getUserMedia(medias)
        .then((stream) => {
          console.log(stream)
          try {
            this.camera.srcObject = stream
          } catch (error) {
            console.log('error: ', error)
            this.camera.src = window.URL.createObjectURL(stream)
          }
          this.camera.play()
        })
        .catch(function (err) {
          // 未找到音频或者是视频输入
          console.log('err: ', err.message)
          console.log('err.name ', err.name)
          console.log('err ', err)
          alert(err.name + ': ' + err.message)
        })
    },
    async scanCamera() {
      const { width, height } = this.style
      const canvas = document.querySelector('#cameraCanvas')
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, this.style.width, this.style.height)
      const blob = await getBlob(ctx.canvas, type, quality)
      const url = (await blobToDataURL(blob))
    },
  },
}
</script>
<style scoped>

</style>
