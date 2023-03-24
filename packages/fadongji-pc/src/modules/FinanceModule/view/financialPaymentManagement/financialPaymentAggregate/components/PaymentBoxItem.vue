<template>
  <div class='components-area'>
     <div class='flex-box payment-box'>
       <div class='payment-item margin-b-10' v-for='(item, index) of data' :key='index'>
         <div class='item-title'>{{item.title}}</div>
         <div class='item-cash'>{{item.cash}}</div>
         <div class='item-time'>{{item.time}}</div>
       </div>
     </div>
  </div>
</template>
<script lang='ts'>
import {defineComponent} from 'vue'
 export default defineComponent({
   name: 'PaymentBoxItem',
   props: {
     data: {
       type: Array,
       default: [],
     }
   },
   setup() {
     return {
     }

   }
 })
</script>
<style lang='less' scoped>
  .payment-box {
    justify-content: space-between;
    flex-wrap: wrap;

  }
  .payment-item {
    width: 250px;
    height: 140px;
    display: flex;
    flex-direction: column;
    border: 1px solid #E9E9E9;
    border-radius: 5px;
    justify-content: center;
  }
  .item-title {
    display: flex;
    justify-content: center;
    font-size: 24px;
  }
  .item-cash {
    display: flex;
    justify-content: center;
    font-size: 28px;
    color: #D9001B;
  }
  .item-time {
    display: flex;
    justify-content: center;
  }
</style>