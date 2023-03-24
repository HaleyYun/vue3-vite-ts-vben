<template>
  <div class="box-bg">
    <div class="box">
      <div class="px-30px pt-30px pb-5 bg-white">
        <a-steps :current="current">
          <a-step
            v-for="(step, index) in stepList"
            :key="index"
            :title="step.title"
            :description="step.description"
          />
        </a-steps>
      </div>
      <div class="box-steps__content">
        <div >
          <OneStepForm v-model:value="current" v-if="current === 0" />
          <TwoStepForm v-model:value="current" v-if="current === 1" />
          <ThreeStepForm v-model:value="current" v-if="current === 2" />
        </div>
      </div>
      <!-- 新增供应商 -- 下一步 -->
    </div>
  </div>
</template>

<script lang="ts" name="SuppierNewAdd" setup>
  import { ref } from 'vue'
  import { FormOutlined } from '@ant-design/icons-vue'
  import OneStepForm from './child/OneStepForm.vue'
  import TwoStepForm from './child/TwoStepForm.vue'
  import ThreeStepForm from './child/ThreeStepForm.vue'

  const stepList = ref([
    {
      title: '企业信息',
    },
    {
      title: '法人信息',
    },
    {
      title: '经营品类',
    },
  ])

  const current = ref(0)
</script>
<style lang="less" scoped>
  .box-bg {
    margin: 24px;
    .box {

      .box-steps {
        width: 100%;
        padding: 10px;
      }

      .box-steps__content {
        width: 100%;

        .box-title {
          .box-space {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            border-bottom: 1px solid #e4e4e4;
          }
        }
      }

      .bottom-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 15px;
        width: calc(100% - 30px);
        height: 50px;

        .form-btn {
          margin-right: 10px;
          width: 80px;
        }
      }
    }

    .box-form {
      margin-top: 10px;
      width: 100%;
    }

    .form-select {
      width: 246px;
    }
  }
</style>
