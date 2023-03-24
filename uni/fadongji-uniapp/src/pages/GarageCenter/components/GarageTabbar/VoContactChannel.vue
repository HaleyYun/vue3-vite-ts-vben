<template>
  <view>
    <VoActionSheet
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      class="action-sheet"
      @close="close"
      @select="actionSelect"
    />
  </view>
</template>

<script>
  import { cellPhone } from '@/common/helper'
  export default {
    name: 'VoContactChannel',
    props: {
      channelInfo: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        phoneNum: '037188888888',
        actions: [
          {
            type: 'im',
            name: '在线聊',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 'phone',
            name: '打电话给他',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        showAction: false,
      }
    },
    methods: {
      /**
       *  打开
       */
      open() {
        this.showAction = true
      },
      /**
       * 关闭
       */
      close() {
        this.showAction = false
      },
      /**
       * 到聊天界面
       */
      goImUrl() {
        const data = {
          targetId: this.channelInfo.userId, // 聊天对象用户id
          type: 0,
          note: this.channelInfo.contractName, // 聊天对象用户名称
          platformCode: 'channelManager', // 聊天对象用户角色
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      /**
       * @description 打电话
       */
      actionSelect(e) {
        if (e.type === 'phone') {
          cellPhone(this.channelInfo.userName)
        } else {
          this.goImUrl()
        }
      },
    },
  }
</script>

<style scoped></style>
