<template>
  <view class="massage">
    <VoNav :left-width="200" :right-width="200" is-fixed is-have-more title="消息">
      <block slot="title">
        消息
        <text v-if="getMissMessageCount">{{ `(${getMissMessageCount})` }}</text>
      </block>
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
    <MessageItem v-for="(info, index) in chatList" :key="index" :chat-item-info="info" />
  </view>
</template>

<script>
  import MessageItem from './components/MessageItem.vue'
  import { mapActions, mapGetters } from 'vuex'
  import mixin from './components/mixin'

  export default {
    name: 'MessageNotification',
    components: { MessageItem },
    mixins: [mixin],
    data() {
      return {
        isDot: {
          item1: true,
          item2: true,
          item3: true,
        },
        notDisturb: {
          item1: true,
          item2: true,
          item3: true,
        },
      }
    },

    computed: {
      ...mapGetters('serviceNotification', [
        'getMessageCountList',
        'getMessageList',
        'getMissMessageCount',
      ]),
      chatList() {
        if (this.getMessageCountList) {
          // console.log(this.getContent);
          return [
            {
              id: 1,
              photoUrl: '/static/serviceMessage/message.png',
              notReadNum: this.getMessageCountList.interactCount,
              targetName: '互动消息',
              recordTimeLast: this.getTime,
              recordLast: this.getContent,
              path: '/pagesCommon/serviceMessagePage/InteractionPage',
              isDot: !this.isDot.item3,
              notDisturb: !this.notDisturb.item3,
            },
            {
              id: 2,
              photoUrl: '/static/serviceMessage/logistics.png',
              notReadNum: this.getMessageCountList.logisticsCount,
              targetName: '交易物流',
              recordTimeLast: this.formateTime(
                this.getMessageList.logisticsList.list[0]?.createTime,
              ),
              recordLast: this.getMessageList.logisticsList.list[0]?.content
                ? JSON.parse(this.getMessageList.logisticsList.list[0]?.content).json
                : '暂无消息',
              path: '/pagesCommon/serviceMessagePage/TransactionPage',
              isDot: !this.isDot.item2,
              notDisturb: !this.notDisturb.item2,
            },
            {
              id: 3,
              photoUrl: '/static/serviceMessage/smallBell.png',
              notReadNum: this.getMessageCountList.noticeCount,
              targetName: '服务通知',
              recordTimeLast: this.formateTime(this.getMessageList.noticeList.list[0]?.createTime),
              recordLast: this.getMessageList.noticeList.list[0]?.title || '暂无消息',
              path: '/pagesCommon/serviceMessagePage/ServiceNotification',
              isDot: !this.isDot.item1,
              notDisturb: !this.notDisturb.item1,
            },
            {
              id: 4,
              photoUrl: '/static/serviceMessage/bulletin.png',
              notReadNum: this.getMessageCountList.announcementCount,
              targetName: '系统公告',
              recordTimeLast: this.formateTime(
                this.getMessageList.announcementList.list[0]?.createTime,
              ),
              recordLast: this.getMessageList.announcementList.list[0]?.title || '暂无消息',
              path: '/pagesCommon/serviceMessagePage/announcementPage',
              idDot: 0,
              notDisturb: 0,
            },
          ]
        } else {
          return []
        }
      },
      getTime() {
        let commentList0 = this.getMessageList.commentList.list[0]
        let collectList0 = this.getMessageList.collectList.list[0]
        let attentionList0 = this.getMessageList.attentionList.list[0]
        let time = this.getNewMessage([commentList0, collectList0, attentionList0])
        return time ? this.formateTime(time.createTime) : ''
      },
      getContent() {
        let commentList0 = this.getMessageList.commentList.list[0]
        let collectList0 = this.getMessageList.collectList.list[0]
        let attentionList0 = this.getMessageList.attentionList.list[0]
        let arr = [commentList0, collectList0, attentionList0]
        let newArr = arr.filter((s) => s && s.id)
        let info
        console.log(newArr);
        if (newArr.length < 2) {
          if (newArr.length) {
            console.log(newArr[0]);
            console.log(this.fomatterMessageContent(newArr[0]));
            return this.fomatterMessageContent(newArr[0])
          } else {
            return '暂无消息'
          }
        }
        info = this.getNewMessage([commentList0, collectList0, attentionList0])
        console.log(info);
        return this.fomatterMessageContent(info)
      },

    },
    onShow() {
      this.reqAllList()
      this.reqMissMessageCount()
      this.getSettingStatus()
    },

    methods: {
      fomatterMessageContent(info) {
        if (info.resourceType) {
          return {
            type: 1,
            content: `${info.name}${info.resourceType == 1 ? ' 点赞' : ' 收藏'}了你的${this.getType(
              info.businessType,
            )}`,
          }
        } else if (!info.commentContent && !info.fileUrl) {
          return {
            type: 2,
            content: `${info.nickName} 关注了你`,
          }
        } else {
          if (info.commentContent) {
            console.log(info.commentContent);
            return {
              type: 0,
              // content: this.getText(info.commentContent),
              content: `${info.name} 评论了你`,
            }
          } else {
            return {
              type: 0,
              content: '你收到了新的评论消息',
            }
          }
        }
      },
      ...mapActions('serviceNotification', ['reqAllList', 'reqMissMessageCount']),
      getSettingStatus() {
        // 服务通知
        this.$VoHttp.apiContentMessageUserSettingSelect({ messageType: 1 }).then((res) => {
          this.isDot.item1 = res.data.numFlag
          this.notDisturb.item1 = res.data.pushFlag
        })
        // 交易物流
        this.$VoHttp.apiContentMessageUserSettingSelect({ messageType: 2 }).then((res) => {
          this.isDot.item2 = res.data.numFlag
          this.notDisturb.item2 = res.data.pushFlag
        })
        // 互动消息
        this.$VoHttp.apiContentMessageUserSettingSelect({ messageType: 3 }).then((res) => {
          this.isDot.item3 = res.data.numFlag
          this.notDisturb.item3 = res.data.pushFlag
        })
      },
      getText(str) {
        console.log(str)
        if (!str) return '暂无消息'
        if (str.match(/>[^<>]+</g)) {
          console.log(str)
          return str.match(/>[^<>]+</g).map((item) => {
            return item.replace('<', '').replace('>', '')
          })
        } else {
          console.log(str)
          if (str.match(/json:/g)) {
            return JSON.parse(str)?.json
          } else {
            return str
          }
        }
      },
      getNewMessage(arr) {
        let newArr = JSON.parse(JSON.stringify(arr))
        newArr.sort((a, b) => {
          if (!a) return 1
          if (!b) return -1
          if (this.$vocenApi.dayjs(a?.createTime).isBefore(b?.createTime)) {
            return 1
          } else {
            return -1
          }
        })
        console.log(newArr[0]);
        return newArr[0]
      },
      getType(val) {
        switch (val) {
          case 0:
            return '问题'
          case 1:
            return '想法'
          case 2:
            return '视频'
          case 3:
            return '回答'
          case 4:
            return '评论'
          case 5:
            return '发现'
          default:
            return ''
        }
      },
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
