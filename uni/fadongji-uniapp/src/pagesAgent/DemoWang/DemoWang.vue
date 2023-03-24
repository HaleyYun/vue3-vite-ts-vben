<template>
  <view class="wrap">
    <EraButton class="m-t-10" text="cellList" @click.native="DemoCell" />
    <EraButton class="m-t-10" text="SwipeAction" @click.native="SwipeAction" />
    <EraButton class="m-t-10" text="form单选" @click.native="FormRadio" />
    <EraButton class="m-t-10" text="form" @click.native="Form" />
    <EraButton class="m-t-10" text="筛选" @click.native="Screen" />
    <EraButton class="m-t-10" text="Video" @click.native="video" />
    <EraButton class="m-t-10" text="VideoModule" @click.native="videoModule" />
<!--    <CommentPop ref="commentPop" />-->

    <u-popup :show="show" mode="bottom">
      <view >
        sdasdasdasdasdasdsadasdasdsada
      </view>
    </u-popup>
  </view>
</template>

<script>
  import CommentPop from '@/pagesAgent/CreatedCenter/Components/CommentPop.nvue'
  const vocenVideo = uni.requireNativePlugin('vocen-video')

  export default {
    components: {
      CommentPop,
    },
    data() {
      return{
        show:false,
      }
    },
	onLoad() {
		console.log(this.$VoHttp)
	},
    methods: {
      DemoCell() {
        this.$linkToEasy('/pagesAgent/DemoWang/DemoCell')
      },
      FormRadio() {
        this.$linkToEasy('/pagesAgent/DemoWang/DemoFormRadio')
      },
      Form() {
        this.$linkToEasy('/pagesAgent/DemoWang/DemoForm')
      },
      SwipeAction() {
        this.$linkToEasy('/pagesAgent/DemoWang/DemoSwipeAction')
      },
      Screen() {
        this.$linkToEasy('/pagesAgent/DemoWang/DemoScreen')
      },
      video() {
        this.$linkToEasy('/pagesAgent/DemoWang/VoVideo')
      },
      videoModule() {
        vocenVideo.voVideoDetailView((res) => {
          let dict = res

          console.log(dict)
          if (dict.code === 200) {
            this.show = true
            // this.$refs.commentPop.init()
          } else {
            this.pushLogin()
          }
        })
      },
    },
  }
</script>

<style></style>
