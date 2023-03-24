<template>
  <div v-if="getStayTime(nextStageTime) > 0" class="countDownStyle">
    剩余 &nbsp;
    <a-statistic-countdown
            :value="getStayTime(nextStageTime)"
            :format="format"
    />
  </div>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,defineProps} from 'vue';

  const props = defineProps({
    nextStageTime:{
      default:null,
      type:String,
    }
  })
  const  format = ref('H 时 m 分 s 秒')
  const getStayTime = (nextStageTime) => {
    let time = new Date(nextStageTime).getTime()
    let nowTime = new Date().getTime()
    let duration = time-nowTime;
    // 计算出小时数
    let residue1 = duration % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    let hours = Math.floor(residue1 / (3600 * 1000))

    // 计算相差分钟数
    let residue2 = residue1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(residue2 / (50 * 1000))

    // 计算相差秒数
    let residue3 = residue2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    let seconds = Math.round(residue3 / 1000)

    if(minutes <= 0 && hours < 0){
      format.value = 's 秒'
    }if(hours <= 0 &&minutes > 0){
      format.value = 'm 分 s 秒'
    }else {
      format.value = 'H 时 m 分 s 秒'
    }
    if(duration > 0){
      return time
    }else {
      return 0
    }
  }
</script>

<style scoped lang="less">
  .countDownStyle {
    font-size: 14px;
    color: #f86060;
    display: flex;
    align-items: baseline;

    ::v-deep(.ant-statistic-content-value) {
      font-size: 14px;
      color: #f86060;
    }
  }

</style>
