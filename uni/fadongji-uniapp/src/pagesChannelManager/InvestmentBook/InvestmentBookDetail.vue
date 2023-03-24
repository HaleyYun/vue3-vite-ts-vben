<template>
  <div className="page-wrap">
    <VoNav is-fixed title="详情">
      <VoIcon
        slot="operation"
        @click="showShareBox"
        class="more-icon"
        color="#000"
        :opacity="0.45"
        name="more"
      />
    </VoNav>
    <view className="page-header">
      <view className="title">{{ info.name }}</view>
      <view className="info">
        <view className="create-time">{{ info.updateTime }}</view>
        <view className="author">{{ info.author || '' }}</view>
      </view>
    </view>
    <view className="page-container">
      <u-parse :content="info.content.json" />
    </view>
    <VoShareView ref="shareRef" />
    <!--<VoShareView></VoShareView>-->
  </div>
</template>

<script>
  import VoShareView from '@/components/VoShareView/VoShareView'

  export default {
    name: 'HelperContentList',
    components: { VoShareView },
    data() {
      return {
        info: {},
        content: '',
      }
    },
    onLoad(options) {
      if (options.id) {
        this.getDetail(options.id, options.categoryId)
      }
    },
    methods: {
      getDetail(id, categoryId) {
        let data = this.$storage.get('helpQuestionData')
        this.info = data
        this.info.content = JSON.parse(this.info.content)
      },
      showShareBox() {
        this.$refs.shareRef && this.$refs.shareRef.showShare(true)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    &-wrap {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      overflow-y: scroll;
      background: #fff;
      padding: 0 32 rpx;
    }

    &-container {
      padding: 24 rpx 0;
    }

    &-header {
      padding: 22 rpx;
      border-bottom: 1px solid #f0f0f0;

      .title {
        font-size: 36 rpx;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 20 rpx;
      }

      .info {
        display: flex;
      }

      .create-time {
        font-size: 24 rpx;
        color: rgba(0, 0, 0, 0.45);
        margin-right: 30 rpx;
      }

      .author {
        font-size: 24 rpx;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
</style>
