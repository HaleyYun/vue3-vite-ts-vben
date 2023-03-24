<template>
  <div class="body-list">
    <div class="body-list__header">
      <span> 大小不超过10M </span>
      <span class="body-list__header-btn">
        <label for="file-id">
          <span class="span-btn">上传文件</span>
          <input type="file" title="" id="file-id" class="file-input" />
        </label>
      </span>
    </div>

    <div class="body-list__content">
      <PhotoPickerItem v-for="item of 18" :key="item" />
    </div>

    <PhotoFooter />
  </div>
</template>

<script setup lang="ts">
  import PhotoPickerItem from './PhotoPickerItem.vue'
  import PhotoFooter from './PhotoFooter.vue'
</script>

<style scoped lang="less">
  .body-list {
    flex: 1;

    &__header {
      height: 36px;
      padding: 0px 32px;
      font-size: 14px;
      color: #9a9a9a;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &-btn {
        margin-left: 20px;

        border: 1px solid #eee;
        border-radius: 4px;
        display: inline-block;
        position: relative;
        cursor: pointer !important;
        width: 96px;
        line-height: 36px;
        height: 36px;
        overflow: hidden;

        .span-btn {
          display: inline-block;
          width: 96px;
          height: 36px;
          line-height: 36px;
          background: #f6f7f8;
          text-align: center;
          cursor: pointer;

          &:hover {
            background-color: #eeeeee !important;
          }
        }

        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          display: none;
        }
      }
    }

    &__content {
      width: 100%;
      margin: 30px 20px;
      max-height: 474px;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
