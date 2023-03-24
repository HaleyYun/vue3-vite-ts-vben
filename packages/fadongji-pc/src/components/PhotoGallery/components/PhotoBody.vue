<template>
  <div class="body">
    <div class="body-directory">
      <div class="body-directory__list">
        <div class="item">最近使用(170)</div>
        <div class="item">我的图片(170)</div>
        <div class="item item-children">未分组(170)</div>
        <div class="item item-children">分组1(170)</div>
        <div class="item item-children">分组2(170)</div>
      </div>
      <div class="body-directory__add">新建分组</div>
    </div>
    <PhotoBodyList />
  </div>
</template>

<script setup lang="ts">
  import PhotoBodyList from './PhotoBodyList.vue'
</script>

<style scoped lang="less">
  .body {
    width: 100%;
    height: auto;
    display: flex;

    &-directory {
      width: 190px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      border-right: 1px solid #e3e4e5;

      &__list {
        font-size: 14px;
        color: #1a1b1c;
        width: 100%;
        height: auto;

        .item {
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0px 0px 0px 28px;
          cursor: pointer;

          &:hover {
            background-color: #f6f7f8;
          }
        }

        .item-children {
          padding-left: 36px;
        }
      }

      &__add {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 0px 0px 0px 32px;
        font-size: 14px;
        color: #576b95;
        cursor: pointer;
      }
    }

    &-list {
      flex: 1;
    }
  }
</style>
