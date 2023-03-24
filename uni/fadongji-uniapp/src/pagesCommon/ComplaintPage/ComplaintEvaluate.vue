<template>
  <view class="detail">
    <VoNav is-fixed is-have-more title="评价服务">

    </VoNav>
    <view class="detail-item">
      <view class="content bg-white">
        <view class="item-nav">
          <view class="time">服务评价</view>
        </view>
        <view class="flex flex-vertical-c m-t-16">
          <view class="lh42 fz-28 color-block">星级：</view>
          <u-rate
            :value="selectNum"
            activeIcon="/static/created/evaluate/score_activate.png"
            gutter="12"
            inactiveIcon="/static/created/evaluate/score_not_active.png"
            @change="rateChange"
          />
          <view class="fz-24 lh36 m-l-4">{{ levelText[selectNum] }}</view>
        </view>
        <view class="lh42 fz-28 color-block m-t-32 m-b-24">内容：</view>
        <!-- http://jira.gongchuangji.cn/browse/ENG-6953?filter=-1 -->
        <EraTextarea
          v-model="content"
          border="none"
          class="text-area"
          count
          countStyle="background: #F7F7F8;color: rgba(0, 0, 0, 0.25)"
          height="130"
          maxlength="150"
          placeholder="请输入评价内容"
          placeholderStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
          @input="inputFn"
        />
      </view>
    </view>
    <view class="detail-bottom bg-white">
      <EraButton :disabled="!selectNum || !content" circle @click="confirm" />
    </view>
    <u-gap :height="$systemInfo.safeAreaInsets.bottom" />
  </view>
</template>
<script>
  export default {
    name: 'CourseBox',
    props: {},
    data() {
      return {
        isLoading: false,
        info: '',
        levelText: { 1: '非常差', 2: '差', 3: '一般', 4: '好', 5: '非常好' },
        selectNum: 0, // 星级别默认0颗星
        content: '',
        optionsId: '',
      }
    },
    onLoad(options) {
      if (options.id) {
        this.optionsId = options.id
      }
    },
    methods: {
      inputFn(value) {
        //过滤空格
        this.content = value.replace(/\s+/g, '')
      },
      //评级
      rateChange(e) {
        this.selectNum = e
      },
      /*
       * 预览图片
       */
      priviewImg(index) {
        uni.previewImage({
          urls: this.info.image,
          current: index,
        })
      },
      //确定
      confirm() {
        if (this.isLoading) {
          return
        }
        let obj = {
          content: this.content,
        }
        this.isLoading = true
        this.$VoHttp
          .apiContentEvaluateSave({
            sourceId: this.optionsId,
            sourceType: 1,
            starMark: this.selectNum * 2,
            content: JSON.stringify(obj),
            platformCode: this.userInfo.platformCode,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('评价成功')
              setTimeout(() => {
                this.isLoading = false
                this.$backFn()
              }, 1000)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('评价失败')
            this.isLoading = false
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .detail {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .detail-item {
      margin-top: 16rpx;
      flex: 1;
      overflow-y: auto;
      .content {
        padding: 0 32rpx 32rpx 32rpx;
        box-sizing: border-box;
      }
      .item-nav {
        display: flex;
        font-size: 28rpx;
        line-height: 1.5;
        border-bottom: 1px solid #f7f7f8;
        padding-top: 24rpx;
        padding-bottom: 16rpx;
      }
    }
    .text-area {
      background: #f7f7f8;
    }
    .detail-bottom {
      padding: 20rpx 0;
      box-sizing: border-box;
    }
  }
</style>
