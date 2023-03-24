<template>
  <div class="table-box">
    <!--table header-->
    <div class="table-list">
      <div class="table-list-title">
        <slot name="title"><div v-if="title" class="title-strip-sort">{{title}}</div></slot>
        <div>
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
export default defineComponent({
  name: 'AgentTable',
  components: {},
  props: {
    changeSpace: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
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
    // padding: 0 10px;
  }
  .table-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 10px 0;
    background-color: #fff;
  }
}
</style>
