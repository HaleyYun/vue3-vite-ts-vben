<template>
  <view class="vocenButton" :class="returnClass()">按钮2</view>
</template>

<script setup>
  import propJs from './prop.js';

  //父组件的参数
  const props = defineProps(propJs);

  /**
   *  根据props  返回需要的class
   * @returns {string}
   */
  const returnClass = () => {
    return 'bg-primary';
  };
</script>
<script>
  export default {
    name: 'VocenButton',
  };
</script>

<style lang="scss" scoped>
  //@import '../../theme-default/index.scss';
</style>
