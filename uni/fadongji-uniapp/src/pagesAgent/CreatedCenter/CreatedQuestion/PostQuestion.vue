<template>
  <view class="post-question">
    <view class="post-question__tbtn" @click="toPage">
      {{ type === '1' ? '发布问题' : '发布想法' }}
    </view>
    <view class="post-question__top">
      <view class="top-btn" @click.stop="">
        <u-icon class="inline-block" name="plus" />
        选择栏目
      </view>
      <view class="top-btn" @click.stop="">
        <u-icon class="inline-block" name="plus" />
        选择共创项目
      </view>
    </view>
    <view class="post-question__area">
      <u--textarea
        v-model="content"
        :placeholder="type === '1' ? '请输入内容并以问号结尾' : '记录每时每刻的惊奇想法'"
        autoHeight
        maxlength="-1"
        class="area-box"
      />
      <u--textarea
        v-model="desc"
        placeholder="对问题补充说明，便于回答者更准确的解答（选填，最长300字）"
        autoHeight
        maxlength="300"
        class="area-box"
      />
    </view>
    <view class="post-question__tip" v-show="tipVisible">
      <u-icon class="tip-icon" name="close-circle" @click="tipVisible = false" />
      <view>小贴士：如何获得更多解答</view>
      <view>1、保持文字简练，表述清晰问题的关键点</view>
      <view>2、确保问题没有被提问过</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'QuestionPost',
    props: {},
    data() {
      return {
        type: '',
        content: '',
        desc: '',
        tipVisible: true,
      }
    },
    created() {},

    methods: {
      toPage() {
        this.$linkToEasy('/pagesAgent/CreatedCenter/CreatedQuestion/AllAnswer')
      },
    },
    onLoad(options) {
      this.type = options.type
    },
  }
</script>

<style lang="scss" scoped>
  .post-question {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    font-size: 14px;
    background: #fff;

    &__top {
      padding: 10px;

      .top-btn {
        display: inline-block;
        margin-right: 15px;
      }
    }

    &__tip {
      padding: 15px;
      font-size: 16px;
      background: #eee;
      border-radius: 10px;
      margin: 10px;
      .tip-icon {
        float: right;
      }
    }

    &__tbtn {
      font-weight: bold;
      text-align: right;
      padding: 10px;
    }

    &__area {
      .area-box {
        border: 0;
        min-height: 100px;
      }
    }

    .uni-textarea-placeholder {
      overflow: visible;
    }

    .inline-block {
      display: inline-block;
    }
  }
</style>
