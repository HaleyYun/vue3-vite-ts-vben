<template>
  <Transition name="down">
    <div class="xtx-message" :style="style[type]" v-show="visible">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <div class="message-box">
        <template v-if="style[type].tag === 1">
          <div class="success-icon"></div>
        </template>
        <template v-else-if="style[type].tag === 2">
          <div class="warn-icon"></div>
        </template>
        <template v-else>
          <div class="error-icon"></div>
        </template>
        <span class="text">{{ text }}</span>
      </div>
    </div>
  </Transition>
</template>
<script>
  import { onMounted, ref } from 'vue'
  export default {
    name: 'XtxMessage',
    props: {
      text: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        // warn 警告  error 错误  success 成功
        default: 'warn',
      },
    },
    setup() {
      // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
      const style = {
        success: {
          tag: 1,
          icon: 'icon-queren2',
          color: '#67C23A',
          backgroundColor: 'rgb(240, 249, 235)',
          borderColor: 'rgb(225, 243, 216)',
        },
        warn: {
          tag: 2,
          icon: 'close',
          color: '#E6A23C',
          backgroundColor: 'rgb(253, 246, 236)',
          borderColor: 'rgb(250, 236, 216)',
        },
        error: {
          tag: 3,
          icon: 'icon-shanchu',
          color: '#F56C6C',
          backgroundColor: 'rgb(254, 240, 240)',
          borderColor: 'rgb(253, 226, 226)',
        },
      }
      const visible = ref(false)
      onMounted(() => {
        visible.value = true
        setTimeout(() => {
          // visible.value = false
        }, 2000)
      })
      return { style, visible }
    },
  }
</script>
<style scoped lang="less">
  .xtx-message {
    width: 300px;
    height: 50px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    margin-left: -150px;
    top: 25px;
    line-height: 50px;
    padding: 0 25px;
    border: 1px solid #e4e4e4;
    background: #f5f5f5;
    color: #999;
    border-radius: 4px;
    i {
      margin-right: 4px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
  }
  .message-box {
    display: flex;
    flex-direction: row;
  }
  .success-icon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    margin-top: 16px;
    background: url('/@/components/VoAlert/svg/checkmark-circle-outlines.svg') no-repeat center;
    color: #67c23a;
    fill: currentColor;
  }
  .warn-icon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    margin-top: 16px;
    background: url('/@/components/VoAlert/svg/checkmark-circle-outlines.svg') no-repeat center;
    color: #67c23a;
    fill: currentColor;
  }
  .error-icon {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    margin-top: 16px;
    background: url('/@/components/VoAlert/svg/close-circle-outlines.svg') no-repeat center;
    color: #67c23a;
    fill: currentColor;
  }
</style>
