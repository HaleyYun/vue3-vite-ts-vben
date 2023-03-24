<template>
  <div class="picker-item">
    <!--    active-item-->
    <div class="picker-item__block">
      <span class="block-checkbox selected"></span>
      <img src="https://qn.antdv.com/vue.png" class="block-img" />
    </div>
    <div class="picker-item__text">红色旅游等等</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .picker-item {
    cursor: pointer;
    position: relative;
    float: left;
    width: 110px;
    height: 138px;
    margin: 0 13px 20px 0;

    &__block {
      width: 110px;
      height: 110px;
      margin-bottom: 8px;
      position: relative;

      .block-img {
        width: 100%;
      }

      &:hover {
        box-shadow: 0 0 0 2px #07c160 inset;
      }

      .block-checkbox {
        position: absolute;
        top: 5px;
        left: 5px;
        width: 20px;
        height: 20px;
        border: 1px solid #fff;
        border-radius: 1px;
        background-color: rgba(0, 0, 0, 0.2);
      }

      .selected {
        background-color: #07c160;

        &:before {
          content: '';
          position: absolute;
          top: 5px;
          left: 4px;
          width: 11px;
          height: 6px;
          border-left: 1px solid #ffffff;
          border-bottom: 1px solid #ffffff;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      }
    }

    .active-item {
      box-shadow: 0 0 0 2px #07c160 inset;
    }

    &__text {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
      line-height: 20px;
      height: 20px;
      font-size: 14px;
      color: #353535;
      text-align: center;
      box-sizing: border-box;
      padding: 0px 4px;
    }
  }
</style>
