<template>
  <view class="address">
    <scroll-view :scroll-into-view="scrollProvinceId" :scroll-y="true" class="address-area__scroll">
      <view class="m-t-16">
        <ChatListItem
          v-for="(info, index) in interestList"
          :chat-item-info="info"
          :key="index"
          @click.native="goDetailsPage(info)"
        />
        <ChatListItem
          v-if="userInfo.roleCode === 'garage' || userInfo.roleCode === 'agent'"
          :chat-item-info="garageManager"
          @click.native="goDetailsPage(garageManager)"
        />
        <ChatListItem
          v-if="userInfo.roleCode === 'supplier'"
          :chat-item-info="supplierManager"
          @click.native="goDetailsPage(supplierManager)"
        />
      </view>
      <ChatFirendList>
        <view class="friend-section" v-for="(section, idx) in friendList" :key="idx">
          <view class="scroll-title" :id="section.en"> {{ section.en }}</view>
          <view
            class="scroll-item"
            v-for="(row, index) in section.list"
            :key="index"
            @click.stop="toImRoom(row)"
          >
            <ChatFirendItem :friend-item-info="row" />
          </view>
        </view>
      </ChatFirendList>
      <VoLetter
        v-if="indexListData.length"
        :indexListData="indexListData"
        @sure="sureProvinceFn"
        :top="200"
      />
      <VoModal
        v-if="showModal"
        :closeOnClickOverlay="true"
        title="提示"
        :content="content"
        :show="showModal"
        :showCancelButton="true"
        @cancel="showModal = false"
        @confirm="showModal = false"
        @close="showModal = false"
      />
    </scroll-view>
  </view>
</template>

<script>
  // 生成字母
  //import ChatList from "./ChatList";
  import ChatListItem from '@/components/VoTabbarIm/components/ChatListItem'
  import pinyin from '@/common/helpers/pinyin'
  import ChatFirendItem from '@/components/VoTabbarIm/components/ChatFirendItem'
  import ChatFirendList from '@/components/VoTabbarIm/components/ChatFirendList'
  import helpUtil, {
    goOnlineCustomerFn,
  } from '@/common/helper'

  const indexList = () => {
    const indexList = []
    const charCodeOfA = 'A'.charCodeAt(0)
    for (let i = 0; i < 26; i++) {
      indexList.push({
        id: String.fromCharCode(charCodeOfA + i),
        key: String.fromCharCode(charCodeOfA + i),
      })
    }
    return indexList
  }
  export default {
    name: 'IndexList',
    components: { ChatFirendList, ChatFirendItem, ChatListItem },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // 通讯录功能列表
        interestList: [
          {
            type: 'interest',
            photoUrl: '/static/created/im/my_concern.png',
            name: '我的关注(0)',
            interestType: 1,
          },
          {
            type: 'interest',
            photoUrl: '/static/created/im/follow_my.png',
            name: '关注我的(0)',
            interestType: 2,
          },
        ],
        garageManager: {
          type: 'interest',
          photoUrl: '/static/icons/aboutMe.png',
          name: '我的渠道经理',
          interestType: 3,
        },
        supplierManager: {
          type: 'interest',
          photoUrl: '/static/icons/aboutMe.png',
          name: '我的招商经理',
          interestType: 3,
        },
        friendList: [],
        // 字母数据
        indexListData: [],
        scrollProvinceId: '',
        // 滑动下标
        current: 0,
        managerInfo: '', //渠道经理信息
        showModal: false,
        content: '',
      }
    },
    created() {},
    methods: {
      getIndexList() {
        const indexList = []
        const charCodeOfA = 'A'.charCodeAt(0)
        for (let i = 0; i < 26; i++) {
          indexList.push({
            id: String.fromCharCode(charCodeOfA + i),
            key: String.fromCharCode(charCodeOfA + i),
          })
        }
        this.indexListData = indexList
      },
      toImRoom(row) {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        // const info = {
        //   targetId: row.friendId,
        //   type: 0,
        //   note: row.friendName,
        //   platformCode: row.platformCode,
        // }
        // this.$storage.set('temp_im_room_info', info)
        let params = {
          platformCode: row.platformCode, // 聊天对象用户角色
          friendId: row.friendId, // 聊天对象用户id
          isMe: 0,
          sameRole: 1, // //聊天关系 0：普通聊天  1：我是买家  2：我是卖家
        }
        this.$u.route({ url: '/pagesSupplier/ImMessage/FriendSettings', params: params })
      },
      goDetailsPage(info) {
        if (info.interestType === 1) {
          this.$linkToEasy('/pagesSupplier/ImMessage/MyConcern')
        } else if (info.interestType === 2) {
          this.$linkToEasy('/pagesSupplier/ImMessage/AttentionToMy')
        } else if (info.interestType === 3) {
          // 我的渠道经理，点击跳转到与当前用户有从属关系的招商经理聊天页面；若没有从属关系的招商经理，则进入平台客服聊天页面
          if (this.managerInfo.userId) {
            this.goChatPage({
              targetId: this.managerInfo.userId,
              platformCode: this.managerInfo.platformCode,
            })
          } else {
            //进入平台客服聊天页面
            goOnlineCustomerFn()
          }
        }
      },
      /**
       * 去聊天详情页
       */
      goChatPage(data) {
        console.log(data, '聊天列表页面进入')
        const info = {
          targetId: data.targetId,
          type: 0,
          note: data.targetName || '',
          platformCode: data.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * 点击
       */
      sureProvinceFn(e) {
        this.scrollProvinceId = e
      },
      /*
       * 切换swiper
       */
      changeCurrent(e) {
        this.current = e.detail.current
      },
      close() {
        this.$emit('update:show', false)
      },
      async _init_func() {
        const friendList = await this.$VoHttp.IM.apiImAttentionMeMyFriend()
          .then((res) => {
            console.log({
              apiImAttentionMeMyFriend: res,
            })
            //获取角色
            return res.data.map((item) => {
              return {
                ...item,
                friendName: item.friendName || `新用户${item.friendId}`,
                firstEnChart: pinyin.getChineseFirstName(item.friendName),
              }
            })
          })
          .catch((res) => {
            console.log(res)
            this.content = `加载聊天记录失败:${res.data.message}`
            this.showModal = true
            return []
          })

        const enOjb = []
        friendList.forEach((item) => {
          if (!enOjb.hasOwnProperty(item.firstEnChart)) {
            enOjb[item.firstEnChart] = []
          }
          enOjb[item.firstEnChart].push(item)
        })

        const showList = []
        for (var key in enOjb) {
          showList.push({ en: key, list: enOjb[key] })
        }
        this.friendList = showList
      },
      async getMyAttentionCount() {
        try {
          const { code, data } = await this.$VoHttp.IM.apiImMyAttentionCount()
          if (code == '20001') {
            this.interestList[0]['name'] = `我的关注（${data.myAttentionTotal}）`
            this.interestList[1]['name'] = `关注我的（${data.attentionMeTotal}）`
            this.managerInfo = {
              userId: data.userId,
              platformCode: data.platformCode,
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
      initData() {
        this.getMyAttentionCount()
        this._init_func()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bg-white {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .address {
    width: 100%;
    height: 100%;
    &-title {
      width: 750rpx;
      height: 88rpx;
      text-align: center;
      line-height: 88rpx;
      font-size: 32rpx;
      font-weight: bold;
    }

    &-area {
      &__item {
        width: 100%;
        height: 96rpx;
        box-sizing: border-box;
        padding: 0rpx 38rpx 0rpx 32rpx;

        .item-left {
          height: 96rpx;
          display: flex;
          flex-direction: column;
          align-items: center;

          .item-line {
            width: 6rpx;
          }

          .line-top {
            background-color: #22284b;
            border-bottom-left-radius: 22rpx;
            border-bottom-right-radius: 22rpx;
          }

          .line-bottom {
            background-color: #22284b;
            border-top-left-radius: 22rpx;
            border-top-right-radius: 22rpx;
          }
        }

        .item-content {
          height: 96rpx;
          line-height: 96rpx;
          margin-left: 50rpx;
          margin-right: 20rpx;
        }
      }

      &__title {
        padding: 40rpx 32rpx 16rpx;
        font-size: 28rpx;
        color: #000000;
        line-height: 150%;
        font-weight: bold;
      }

      &__scroll {
        height: 100%;
        overflow-y: scroll;
        position: relative;
        //padding: 0rpx 32rpx;
        //margin: 0 32rpx;
        //box-sizing: border-box;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
        background: #ffffff;

        .scroll-title {
          width: 100%;
          height: 72rpx;
          line-height: 72rpx;
          padding: 0rpx 8rpx;
        }

        .scroll-item {
          //line-height: 96rpx;
          //height: 96rpx;
          //width: 100%;
          //padding: 0rpx 8rpx;
        }
      }
    }
  }
  .friend-section {
    padding: 0 32rpx;
    box-sizing: border-box;
  }
</style>
