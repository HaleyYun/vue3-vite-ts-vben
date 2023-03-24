<template>
  <view class="vocenButton" :class="returnClass()">按钮2</view>
</template>

<script>
  import propJs from './prop.js';
  export default {
    name: 'VocenButton',
    props: propJs,
    data() {
      return {};
    },
    methods: {
      /**
       *  根据props  返回需要的class
       * @returns {string}
       */
      returnClass: () => {
        return 'bg-primary';
      },
    },
  };
</script>

<style lang="scss" scoped>
  //@import '../../theme-default/index.scss';
</style>
