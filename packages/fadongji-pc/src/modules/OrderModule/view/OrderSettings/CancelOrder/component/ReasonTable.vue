<template>
  <div class="table-box">
    <!--table header-->
    <div class="table-list">
      <div class="table-list-title">
        <div class="title-strip-sort flex flex-vertical-c">
          <span><slot name="tableName"></slot></span>
          <slot name="total" v-if="total">
            <VoIcon name="category" :size="20" />
            共{{ total }}条数据
          </slot>
        </div>
        <div class="edit">
          <slot name="tableEdit"></slot>
        </div>
      </div>
    </div>
    <div>
      <div class="table-inner-space">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="table-footer">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import VoIcon from '/@/components/VoIcon/VoIcon.vue'

  export default defineComponent({
    components: { VoIcon },
    props: {
      changeSpace: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      total: {
        type: Number,
        default: 0,
      },
    },
  })
</script>

<style lang="less" scoped>
  .com-item {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }

  .table-list {
    .table-list-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      background-color: #fff;
    }
  }

  .table-box {
    .table-inner-space {
      background-color: #fff;
    }

    .table-footer {
      display: flex;
      justify-content: flex-end;
      padding: 15px 0;
      background-color: #fff;
    }
  }
</style>
