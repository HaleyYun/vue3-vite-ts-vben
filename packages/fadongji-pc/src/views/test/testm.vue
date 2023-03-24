<template>
  <div class="form-box m-2">
    <div class="form-step" :class="{ toggle: menuSetting.collapsed }">
      <a-steps direction="vertical" v-model:current="current">
        <a-step
          title="第一步"
          description="This is a description."
          @click.stop="targetHandler(0, '#step1')"
        />
        <a-step
          title="第二步"
          description="This is a description."
          @click.stop="targetHandler(1, '#step2')"
        />
        <a-step
          title="第三步"
          description="This is a description."
          @click.stop="targetHandler(2, '#step3')"
        />
        <a-step
          title="第四步"
          description="This is a description."
          @click.stop="targetHandler(3, '#step4')"
        />
        <a-step
          title="第五步"
          description="This is a description."
          @click.stop="targetHandler(4, '#step4')"
        />
        <a-step
          title="第六步"
          description="This is a description."
          @click.stop="targetHandler(5, '#step4')"
        />
      </a-steps>
      <a-button @click="queryScroll">获取scroll</a-button>
    </div>
    <div class="form-content p-3" id="container">
      <div class="w-200px operate bg-gary-500" :style="style">操作框</div>
      <div id="step1" class="h-600px mb-20px">
        <div class="title">step1</div>
        <div
          >内容
          <a-button @click="dingHandler('#target1')" id="target1">+</a-button>
        </div>
      </div>
      <div id="step2" class="h-600px mb-20px">
        <div class="title">step2</div>
        <div
          >内容
          <a-button @click="dingHandler('#target2')" id="target2">+</a-button>
        </div>
      </div>
      <div id="step3" class="h-600px mb-20px">
        <div class="title">step3</div>
        <div
          >内容
          <a-button @click="dingHandler('#target3')" id="target3">+</a-button>
        </div>
      </div>
      <div id="step4" class="h-600px mb-20px">
        <div class="title">step4</div>
        <div
          >内容
          <a-button @click="dingHandler('#target4')" id="target4">+</a-button>
        </div>
      </div>
      <div id="step5" class="h-600px mb-20px">
        <div class="title">step5</div>
        <div
          >内容
          <a-button @click="dingHandler('#target5')" id="target5">+</a-button>
        </div>
      </div>
      <div id="step6" class="h-600px mb-20px">
        <div class="title">step6</div>
        <div
          >内容
          <a-button @click="dingHandler('#target6')" id="target6">+</a-button>
        </div>
      </div>
    </div>
    <VoMaterialLibrary container="#container" :target="target" v-model:visible="visible" />
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '/@/store/modules/app'
  import { reactive, ref } from 'vue'
  import VoMaterialLibrary from '/@/components/VoMaterialLibrary/VoMaterialLibrary.vue'

  const appStore = useAppStore()
  const current = ref(0)
  const visible = ref(false)
  const target = ref('#step1')
  const style = reactive({})
  const menuSetting = appStore.getMenuSetting

  // 获取元素的绝对位置坐标（像对于页面左上角）

  const targetHandler = (index, target) => {
    document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
    current.value = index
  }

  const dingHandler = (targetEl) => {
    target.value = targetEl
    visible.value = true
  }
  const queryScroll = () => {
    const c = document.querySelector('#container') as HTMLElement
    // console.log(c.scrollTop)
  }
</script>
<style>
  html,
  body {
    overflow-x: visible !important;
  }
</style>
<style scoped lang="less">
  .form-box {
    .operate {
      position: absolute;
      left: 0;
      top: 0;
      background-color: #ff6300;
      display: none;
    }

    .title {
      padding: 20px;
    }

    .form-step {
      transition: all 0.3s;
      width: 200px;
      position: fixed;
      left: 230px;
      top: 100px;
      z-index: 99;

      &.toggle {
        left: 70px;
      }
    }

    background-color: #fff;
    min-height: calc(100vh - 100px);

    .form-content {
      position: relative;
      padding-left: 230px;
      height: calc(100vh - 100px);
      overflow-y: scroll;
    }
  }
</style>
