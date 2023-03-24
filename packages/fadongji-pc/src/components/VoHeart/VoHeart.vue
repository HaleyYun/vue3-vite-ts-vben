<template>
  <div class="heart">
    <a-space>
      <Icon
        v-for="(item, index) in props.level"
        :key="index"
        icon="bi:star-fill"
        color="#FFD959"
        :size="props.size"
      />
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, withDefaults } from 'vue'
  import { Icon } from '/@/components/Icon'

  interface Props {
    level?: number
    size?: number
    icon?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    level: 5,
    size: 35,
    icon: 'https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-05/8a121131d2ea29cc12fcad0c64a096b4.png',
  })
</script>

<style scoped lang="less">
  .heart {
    display: inline-block;
    font-size: 0;
    &-icon {
      width: 35px;
      display: inline-block;
      font-size: 0;
    }
  }
</style>
