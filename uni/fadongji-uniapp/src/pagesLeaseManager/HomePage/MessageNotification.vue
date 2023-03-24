<template>
  <view class="massage">
    <VoNav is-fixed title="消息">
      <!-- #ifdef APP-PLUS -->
      <block slot="operation">
        <view
          class="val-record m-r-32 fz-32 color-block-65"
          @click="goTo('/pagesCommon/serviceMessagePage/Setting')"
        >设置</view
        >
      </block>
      <!-- #endif -->
    </VoNav>
    <MessageItem v-for="(info, index) in chatList" :chat-item-info="info" :key="index" />
  </view>
</template>

<script>
  import MessageItem from './components/MessageItem.vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'MessageNotification',
    components: { MessageItem },
    data() {
      return {}
    },
    computed: {
      ...mapGetters('serviceNotification', ['getMessageCountList']),
      chatList() {
        if (this.getMessageCountList) {
          return [
            {
              id: 1,
              photoUrl: '/static/demo/IMG_9166.HEIC.JPG',
              notReadNum: this.getMessageCountList.interactCount,
              targetName: '互动消息',
              recordTimeLast: '17:20',
              recordLast: '你问的这个发动机我们有货。',
            },
            {
              id: 2,
              photoUrl: '/static/demo/IMG_9166.HEIC.JPG',
              notReadNum: this.getMessageCountList.logisticsCount,
              targetName: '交易物流',
              recordTimeLast: '17:20',
              recordLast: '你问的这个发动机我们有货。',
            },
            {
              id: 3,
              photoUrl: '/static/demo/IMG_9166.HEIC.JPG',
              notReadNum: this.getMessageCountList.noticeCount,
              targetName: '服务通知',
              recordTimeLast: '17:20',
              recordLast: '你问的这个发动机我们有货。',
            },
            //   {
            //     id: 4,
            //     photoUrl: '/static/demo/IMG_9166.HEIC.JPG',
            //     notReadNum: 8,
            //     targetName: '系统公告',
            //     recordTimeLast: '17:20',
            //     recordLast: '你问的这个发动机我们有货。',
            //   },
          ]
        } else {
          return []
        }
      },
    },
    created() {
      this.reqAllList()
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    methods: {
      ...mapActions('serviceNotification', ['reqAllList']),

      goTo(url) {
        this.$linkToEasy(url)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .massage {
    width: 750rpx;
    height: 100vh;
    background: #ffffff;
    &-set {
      font-size: 32rpx;
      color: #22284b;
    }
  }
</style>
