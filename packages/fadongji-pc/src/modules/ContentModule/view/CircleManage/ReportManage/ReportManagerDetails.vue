<template>
  <div class="box">
    <div class="box-question">
      <div class="box-question__title">问题</div>
      <div class="box-question__content">空调滤芯的采购成本如何降低？有没有大佬给带带路？</div>
    </div>
    <div class="box-question">
      <div class="box-question__title">补充内容</div>
      <div class="box-question__content">空调滤芯的采购成本如何降低？有没有大佬给带带路？</div>
      <div class="box-question__audio">占位</div>
    </div>
    <div class="box-author">
      <div class="box-author__item ">
        <div class="box-author__label">发布时间</div>
        <div class="box-author__value">2022-3-22 09:45:58</div>
      </div>
      <!-- 作者 -->
      <div class="box-author__item ">
        <div class="box-author__label">作者</div>
        <div class="box-author__value">蓝湖/13212345678</div>
      </div>
      <!--  发布人 -->
      <div class="box-author__item ">
        <div class="box-author__label">发布人</div>
        <div class="box-author__value">蓝湖/13212345678</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent } from 'vue';
export default defineComponent({
  name: 'ThinkAlertDetail',
  setup() {
    return {};
  },
});
</script>
<style lang="less">
.box {
  margin: 15px;
  display: flex;
  flex-direction: column;
  .box-question {
    margin-bottom: 50px;
    .box-question__title {
      color: #000000;
    }
    .box-question__content {
      margin-top: 10px;
      color: #979797

    }
    .box-question__img {
      margin-top: 10px;
      height: 150px;
      width: 150px;
      background-color: gray;
    }
    .box-question__audio {
      margin-top: 10px;
      height: 40px;
      line-height: 40px;
      background-color: gray;
    }
  }
  .box-author {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .box-author__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .box-author__label {
        color: #000000;
        margin-right: 10px;
      }
      .box-author__value {
        color: #979797;
      }
    }
  }
}
</style>