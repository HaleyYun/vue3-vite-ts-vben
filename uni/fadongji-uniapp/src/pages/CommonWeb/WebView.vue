<template>
  <view>
    <VoNav v-if="showNav" :is-have-more="false" title="" is-back />
    <web-view :src="src" v-if="src" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        src: '',
        showNav: false,
      }
    },
    onLoad(options) {
      if (options.contractUrl) {
        this.src = '/static/pdf/web/viewer.html?file=' + encodeURIComponent(options.contractUrl)
        return
      }
      if (options.hasOwnProperty('encode') && options.encode) {
        this.src = decodeURIComponent(options.url)
      } else if (options.isLocal) {
        this.src = this.$storage.get('withdrawSign')
        this.showNav = true
      } else {
        this.src = options.url
      }
    },
    onReady() {
      // #ifdef APP-PLUS
      let currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
      setTimeout(function() {
        wv = currentWebview.children()[0]
        wv.setStyle({
          scalable: true
        })
      }, 1000); //如果是页面初始化调用时，需要延时一下
      // #endif
    }
  }
</script>

<style></style>
