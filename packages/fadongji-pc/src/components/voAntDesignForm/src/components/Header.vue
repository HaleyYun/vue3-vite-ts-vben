<template>
  <a-layout-header class="btn-bar">
    <a-popconfirm
      placement="bottom"
      ok-text="确定"
      cancel-text="取消"
      @confirm.stop="$emit('importJson')"
    >
      <template #title>
        <p>确定要导入Json文件吗？</p>
      </template>
      <a-button v-if="$attrs.upload" type="link" size="small">
        <template #icon>
          <SvgIcon iconClass="upload" />
        </template>
        导入JSON
      </a-button>
    </a-popconfirm>

    <a-popconfirm
      placement="bottom"
      ok-text="确定"
      cancel-text="取消"
      @confirm.stop="$emit('exportJson')"
    >
      <template #title>
        <p>确定要导出Json文件吗？</p>
      </template>
      <a-button v-if="$attrs.upload" type="link" size="small">
        <template #icon>
          <SvgIcon iconClass="upload" />
        </template>
        导出JSON
      </a-button>
    </a-popconfirm>

    <a-button v-if="$attrs.clearable" type="link" size="small" @click.stop="$emit('clear')">
      <template #icon>
        <SvgIcon iconClass="clearable" />
      </template>
      清空
    </a-button>
    <a-button v-if="$attrs.preview" type="link" size="small" @click.stop="$emit('preview')">
      <template #icon>
        <SvgIcon iconClass="preview" />
      </template>
      预览
    </a-button>
    <a-button v-if="$attrs.generateJson" type="link" size="small" @click.stop="$emit('getJson')">
      <template #icon>
        <SvgIcon iconClass="generate-json" />
      </template>
      生成JSON
    </a-button>
    <a-button v-if="$attrs.generateCode" type="link" size="small" @click.stop="$emit('getCode')">
      <template #icon>
        <SvgIcon iconClass="generate-code" />
      </template>
      生成代码
    </a-button>

    <!-- <a-button v-if="$attrs.generateCode" type="link" size="small" >
      <template #icon>
        <SvgIcon iconClass="generate-code" />
      </template>
      生成SFC
    </a-button> -->
  </a-layout-header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SvgIcon from './SvgIcon.vue'

  export default defineComponent({
    name: 'Header',
    components: {
      SvgIcon,
    },
    emits: ['clear', 'getJson', 'getCode', 'exportJson', 'importJson'],
    setup() {},
  })
</script>
