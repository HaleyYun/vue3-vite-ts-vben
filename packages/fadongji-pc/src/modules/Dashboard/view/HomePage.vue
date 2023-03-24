<template>
  <div class="m-24px">
    <div class="p-5 bg-white welcome-box flex justify-center items-center">
      <div class="text-center welcome-text">
        <div class="relative">
          <img src="../../../assets/images/welcome.png" alt="" />
          <div
            class="w-175px h-100px absolute top-125px left-225px flex justify-center items-center"
          >
            <div class="welcome-time font-bold leading-normal">
              <div>{{ description.title }}</div>
              <div>{{ description.content }}</div>
            </div>
          </div>
        </div>
        <div class="font-bold text-42px mt-32px">WELCOME</div>
        <div class="text-20px mt-12px">欢迎进入发动集共创平台</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { dayjs } from '@vocen/shared'
  import { onBeforeMount, ref } from 'vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const nowTime = dayjs().format('YYYY-MM-DD')
  const nowTimeStamp = dayjs().unix()

  const description = ref({
    title: '',
    content: '',
  })

  const calcTimeToDescription = () => {
    const dis_time_one = [dayjs(nowTime + ' 6:00').unix(), dayjs(nowTime + ' 9:30').unix()]
    const dis_time_two = [dayjs(nowTime + ' 9:30').unix(), dayjs(nowTime + ' 11:30').unix()]
    const dis_time_three = [dayjs(nowTime + ' 11:30').unix(), dayjs(nowTime + ' 14:00').unix()]
    const dis_time_four = [dayjs(nowTime + ' 14:00').unix(), dayjs(nowTime + ' 16:00').unix()]
    const dis_time_five = [dayjs(nowTime + ' 16:00').unix(), dayjs(nowTime + ' 18:00').unix()]
    const dis_time_six = [dayjs(nowTime + ' 18:00').unix(), dayjs(nowTime + ' 23:00').unix()]
    const dis_time_seven = [dayjs(nowTime + ' 23:00').unix(), dayjs(nowTime + ' 24:59:00').unix()]
    const dis_time_eight = [dayjs(nowTime + ' 00:00').unix(), dayjs(nowTime + ' 6:00').unix()]

    const timeList = [
      {
        time: dis_time_one,
        description: {
          title: '早上好',
          content: '新的一天加油哦',
        },
      },
      {
        time: dis_time_two,
        description: {
          title: '上午好',
          content: '专注时时间过的真快呀',
        },
      },
      {
        time: dis_time_three,
        description: {
          title: '中午啦',
          content: '好好休息下吧',
        },
      },
      {
        time: dis_time_four,
        description: {
          title: '下午好',
          content: '喝杯咖啡休息下',
        },
      },
      {
        time: dis_time_five,
        description: {
          title: '',
          content: '充实的一天就要过去了',
        },
      },
      {
        time: dis_time_six,
        description: {
          title: '晚上好',
          content: '早点休息哦',
        },
      },
      {
        time: dis_time_seven,
        description: {
          title: '夜深啦',
          content: '好好休息吧',
        },
      },
      {
        time: dis_time_eight,
        description: {
          title: '夜深啦',
          content: '好好休息吧',
        },
      },
    ]

    const nowDisTimeObj = timeList.filter((item) => {
      return nowTimeStamp >= item.time[0] && nowTimeStamp < item.time[1]
    })
    description.value = nowDisTimeObj[0].description
  }

  onMountedOrActivated(() => {
    calcTimeToDescription()
  })
</script>
<style lang="less" scoped>
  .welcome-box {
    min-height: calc(100vh - 96px);

    .welcome-time {
      color: #8999be;
      font-size: 16px;
      font-weight: bold;
    }

    .welcome-text {
      color: #474c5a;
    }
  }
</style>
