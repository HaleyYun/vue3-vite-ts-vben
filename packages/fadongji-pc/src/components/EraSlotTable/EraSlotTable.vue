<template>
  <div class="table-box">
    <!--table header-->
    <div class="table-list">
      <div class="table-list-title">
        <div class="title-strip-sort">
          <slot name="leftContent">{{ slotContent }}</slot>
        </div>
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
    components: {},
    props: {
      changeSpace: {
        type: String,
        default: '',
      },
      slotContent: {
        type: String,
        default: '数据列表',
      },
    },
    setup(props) {
      let changeSpace = ref(props.changeSpace)
      return {
        changeSpace,
      }
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
      padding: 10px;
      justify-content: space-between;
      align-items: center;
      border-bottom: none;
      background-color: #fff;
    }
  }

  .table-box {
    margin: 24px 24px 10px 24px;

    .table-inner-space {
      background-color: #fff;
      padding: 0 10px;
    }

    .table-footer {
      display: flex;
      justify-content: flex-end;
      padding: 10px 10px 10px 0;
      background-color: #fff;
    }
  }
</style>
