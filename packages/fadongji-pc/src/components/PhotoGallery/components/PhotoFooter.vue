<template>
  <div class="footer">
    <svg
      t="1646027141410"
      class="icon footer-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6976"
      width="24"
      height="24"
    >
      <path
        d="M616.401455 720.756364L418.909091 523.310545 616.401455 325.818182l32.907636 32.907636-164.584727 164.584727 164.584727 164.538182z"
        p-id="6977"
        fill="#8a8a8a"
      />
    </svg>
    <span class="footer-page">
      <span>1</span>
      <span class="footer-page__division">/</span>
      <span>9</span>
    </span>
    <svg
      t="1646027220715"
      class="icon footer-icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="8128"
      width="24"
      height="24"
    >
      <path
        d="M407.59854499 303.243636L605.090909 500.689455 407.598545 698.18181801l-32.907636-32.90763601 164.584727-164.584727-164.584727-164.538182z"
        p-id="8129"
        fill="#8a8a8a"
      />
    </svg>

    <input type="number" class="page-number" />

    <span class="footer-btn">跳转</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .footer {
    padding: 10px 20px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-icon {
      cursor: pointer;

      &:hover {
        background-color: #eeeeee;
      }
    }

    &-page {
      font-size: 14px;
      color: #4c4d4e;
      padding: 0px 6px;

      &__division {
        margin: 0px 3px;
      }
    }

    .page-number {
      margin-left: 16px;
      box-sizing: border-box;
      width: 42px;
      padding: 0 6px;
      height: 24px;
      line-height: 24px;
      border: none;
      color: #b1b2b3;
      text-align: center;
      background-color: #f6f7f8;

      &::-webkit-inner-spin-button {
        // webkit内核input[number]默认箭头样式
        -webkit-appearance: none !important;
        margin: 0;
        -moz-appearance: textfield;
      }

      &[type='number'] {
        // molilla内核input[number]默认箭头样式
        -moz-appearance: textfield;
      }

      &:focus {
        border-color: #2e95ff;
        outline: 0;
      }
    }

    &-btn {
      margin-left: 12px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      color: #576b95;
      cursor: pointer;
    }
  }
</style>
