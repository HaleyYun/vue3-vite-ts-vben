<template>
  <div class="group">
    <div class="group-sure disable">确定</div>
    <div class="group-cancel">取消</div>

    <div class="group-check">
      <span>已选择</span>
      <span class="group-check__text">0 / 100 项</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .group {
    position: relative;
    padding: 32px;
    height: 100px;
    display: flex;
    justify-content: center;

    &-sure {
      width: 96px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      background-color: #07c160;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }

    &-cancel {
      position: relative;
      width: 96px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 14px;
      color: #1a1b1c;
      margin-left: 14px;
      border: 1px solid #e3e4e5;
      background-color: #f6f7f8;
      cursor: pointer;
      border-radius: 2px;

      &:hover {
        background-color: #eeeeee;
      }
    }

    .disable {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        background-color: hsla(0, 0%, 100%, 0.5);
      }
    }

    &-check {
      position: absolute;
      left: 38px;

      &__text {
        color: #576b95;
        margin-left: 6px;
        cursor: pointer;
      }
    }
  }
</style>
