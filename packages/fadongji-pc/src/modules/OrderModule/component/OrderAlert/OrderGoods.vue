<template>
    <div class=" flex items-center justify-between messageList" :class="statusName == '已完成'?'messageList-success':'messageList-error'">
      <div class="flex-col flex1">
        <div class="text-16px flex items-center">
          <div class="mr-15px">
            <check-circle-outlined v-if="statusName == '已完成'"  style="font-size: 24px;color: #82BBB1" />
            <exclamation-circle-outlined v-else  style="font-size: 24px;color: #82BBB1" />
          </div>
          当前订单状态：{{statusName}}
          <span class="text-14px ml-16px">
            <slot name="description">
              <div v-if="cancelReason">取消原因: {{cancelReason ?cancelReason : '---' }}</div>
            </slot>
          </span>
        </div>
      </div>
  
    </div>
  
  </template>
  
  <script lang="ts" setup>
    import { ref,defineProps} from 'vue';
    import { CheckCircleOutlined,ExclamationCircleOutlined } from '@ant-design/icons-vue'
    const props = defineProps({
      statusName: {
        type: String,
        default: '',
      },
      cancelReason: {
        type: String,
        default: '',
      },
    })
  
  </script>
  
  <style scoped lang="less">
    .messageList{
      border-radius: 2px;
      align-items: flex-start;
      padding: 16px 26px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
    }
    .messageList-error{
      background: #DEEBE9;
      border: 1px solid #82BBB1;
    }
    .messageList-success{
      background: #DEEBE9;
      border: 1px solid #82BBB1;
    }
  
  </style>