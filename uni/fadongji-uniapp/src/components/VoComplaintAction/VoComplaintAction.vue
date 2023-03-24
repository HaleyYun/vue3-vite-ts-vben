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
  import { goOnlineCustomerFn, cellPhone } from '@/common/helper'

  export default {
    name: 'VoComplaintAction',
    props: {
      isHack: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        actions: [
          {
            type: 'im',
            name: '在线投诉',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 'phone',
            name: '电话投诉',
            subname: '400-893-5518',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 'submit',
            name: '留言投诉',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          // {
          //   type: 'look',
          //   name: '查看投诉记录',
          //   color: 'rgba(0, 0, 0, 0.85)',
          //   fontSize: '14',
          // },
        ],
        showAction: false,
      }
    },
    methods: {
      /**
       *  打开
       */
      open() {
        if (this.isHack) {
          this.actions.unshift({
            type: 'demo',
            name: '拉黑此人',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          })
        }

        this.showAction = true
      },
      /**
       * 关闭
       */
      close() {
        this.showAction = false
      },
      /**
       * @description 帮助中心事件
       */
      actionSelect(e) {
        if (e.type === 'phone') {
          this.$VoHttp.apiExtraCustomerMoor().then((res) => {
            cellPhone(e.subname)
          })
        }
        if (e.type === 'submit') {
          this.$linkToEasy('/pagesCommon/ComplaintPage/ComplaintForm')
        }
        if (e.type === 'look') {
          this.$linkToEasy('/pagesCommon/ComplaintPage/ComplaintRecord')
        }
        if (e.type === 'im') {
          goOnlineCustomerFn(3)
        }
        if (e.type === 'demo') {
          uni.$u.toast('拉黑成功')
        }
        this.$emit('select', e)
      },
    },
  }
</script>
