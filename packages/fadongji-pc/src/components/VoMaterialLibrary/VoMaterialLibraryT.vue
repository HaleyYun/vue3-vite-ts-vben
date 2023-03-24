<template>
  <transition name="fade">
    <teleport v-if="visible" :to="container">
      <div class="dialog-wrapper"
           style="position: absolute;top:550px;left:320px;color:white;background-color:#ff6400;z-index: 999"
      >
        <div class="dialog">
          <div class="dialog-header">
            <slot name="title">
              <span class="dialog-title"> 标题 </span>
            </slot>
          </div>
          <div class="dialog-body">
            <slot></slot>
          </div>
          <div class="dialog-footer">
            <slot name="footer">
              <button @click="cancel">关闭</button>
            </slot>
          </div>
        </div>
      </div>
    </teleport>
  </transition>

</template>

<script setup lang="ts">
// VoMaterialLibrary 组件

// 定义属性值
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  target: {
    type: String,
    require: true,
    default: '',
  },
  value: {
    type: Array,
    default() {
      return []
    },
  },
  container: {
    type: String,
    default: 'body',
  },
})

console.log(props.container)

const emits = defineEmits(['update:visible'])

const cancel = () => {
  emits('update:visible', false)
}
</script>
<style lang="less">
.dialog-wrapper {
  transition: all 0.3s;
}

.material {
  position: relative;
  top: 20px;
  left: 0;
}

.vo-material.ant-modal-wrap {
  position: absolute !important;
  height: 100%;
  width: 1036px;
  overflow: inherit !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html,
body {
  overflow-x: visible !important;
}
</style>
<style scoped lang="less">


.img-list {
  .img-item {
    margin-left: 10px;
    width: 190px;
    position: relative;

    .icon-play {
      position: absolute;
      left: 50%;
      top: 30px;
      z-index: 99;
      background-color: #fff;
      border-radius: 50%;
      transform: translateX(-50%);
    }

    .selected-icon {
      width: 100px;
      height: 100px;
      position: absolute;
      left: -50px;
      top: -50px;
      transform: rotate(45deg);
      background-color: #1abc9c;
      z-index: 99;
    }

    .img-item--name {
      height: 40px;
      font-size: 13px;
    }

    .img-name--content {
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      max-height: 40px;
      line-height: 1.5;
    }
  }
}
</style>
