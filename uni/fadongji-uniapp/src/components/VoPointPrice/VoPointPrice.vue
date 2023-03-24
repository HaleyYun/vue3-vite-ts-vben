<template>
  <view
    :style="{
      color: color,
      display: display,
    }"
    class="point-pirce"
  >
    <text
      v-if="+price>0"
      :style="{
        'font-size': leftSize + 'px',
        ...leftFontStyle,
      }"
      class="fz-b"
      >{{ showPrice[0] }}</text
    >
    <text
      v-if="+price>0"
      :style="{
        'font-size': rightSize + 'px',
      }"
    >
      .{{ showPrice[1] || '00' }}
    </text>
    <!-- 兼容是0元的情况	-->
    <text
      v-if="price<=0"
      :style="{
        'font-size': leftSize + 'px',
        ...leftFontStyle,
      }"
      class="fz-b"
      >0</text
    >
    <text
      v-if="showUnit"
      :style="{
        'font-size': rightSize + 'px',
      }"
      >元</text
    >
  </view>
</template>

<script>
  export default {
    name: 'VoPointPrice',
    props: {
      showUnit: {
        type: Boolean,
        default: false,
      },
      display: {
        type: String,
        default: 'block',
      },
      price: {
        type: [String, Number],
        default: 0.0,
      },
      color: {
        type: String,
        default: '#F20014',
      },
      leftSize: {
        type: Number,
        default: 14,
      },
      rightSize: {
        type: Number,
        default: 12,
      },
      leftFontStyle: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        showPrice: [],
      }
    },
    watch: {
      price: {
        // 数据发生变化就会调用这个函数
        handler(newVal) {
          // console.log(newVal);
          if (String(newVal).split('.').length === 2) {
            this.showPrice = String(newVal).split('.')
            if ((this.showPrice[1] + '').length < 2) {
              this.showPrice[1] = this.showPrice[1] + '0'
            }
          } else {
            this.showPrice[0] = newVal
            this.showPrice[1] = '00'
          }
          // console.log(newVal,"99999999",this.showPrice);
        },
        // 立即处理 进入页面就触发
        immediate: true,
        deep: true,
      },
    },
  }
</script>

<style lang="scss" scoped></style>
