<template>
  <div class="box-flex">
    <div class="box-date-picker">
      <a-datepicker style="width: 130px" v-model:value="changeDate" format="YYYY-MM-DD" @change="changeDatePicker()" />
    </div>
    <div class="box-btn-item">
      <div v-for="(item, index) of btnItems" :key="index" class="box-item"
           :class="changeIndex === index ?  'box-item__have': 'box-item__none'"
           @click="changeDateEvent(index, item.name)">{{item.name}}</div>
    </div>
  </div>
</template>
<script lang="ts">
  import {
  defineComponent,
  reactive,
  ref,
  } from 'vue'

  import { rulesDateEnum, transDate } from "/@/modules/ContentModule/component";
  import dayjs from "dayjs";
  interface btnItem  {
    name: string,
    index: string
  }
  export default  defineComponent({
    name: 'EraTimePicker',
    components: {

    },
    emits: ['propsTimePicker'],
    setup (_, { emit }) {
      const btnItems = reactive<btnItem[]>([
        {
          name: rulesDateEnum.Today,
          index: '0',
        },
        {
          name: rulesDateEnum.Yesterday,
          index: '1',
        },
        {
          name: rulesDateEnum.SevenDay,
          index: '2',
        },
        {
          name: rulesDateEnum.ThirdDay,
          index: '3',
        },

      ])
      // 日期 （2022-05-22）
      const changeDate = ref(dayjs())
      const changeIndex = ref()
      // 点击“changeDateEvent”改变选中按钮，改变日期
      const changeDateEvent = (index, des) => {
        changeIndex.value = index
        changeDate.value = dayjs(transDate(des))
        propsDatePicker()
      }
      // 日期选择器触发
      const changeDatePicker = () => {
        changeIndex.value = ''
        propsDatePicker()
      }
      const propsDatePicker = () => {
        emit('propsTimePicker', dayjs(changeDate.value).format('YYYY-MM-DD'))
      }
      return {
        changeDate,
        btnItems,
        changeIndex,
        propsDatePicker,
        changeDatePicker,
        changeDateEvent,
      }
    }
  })
  </script>
  <style lang="less">
    .box-flex {
      display: flex;
      align-items: center;
      .box-date-picker {
        display: flex;

      }
      .box-btn-item {
        flex-grow: 1;
        display: flex;
        align-content: flex-start;
        .box-item {
          height: 25px;
          line-height: 25px;
          padding: 0 1px;
          margin-left: 2px;
          font-size: 0.1vw;
        }
        .box-item__have {
          background-color: #1890ff;
          color: white;
        }
        .box-item__none {
          background-color: white;
          color: #000000;
          border: 1px solid #d9d9d9;
        }
      }
    }
  </style>
