TS
<template>
  <div class="horizon-table">
    <v-table
      ref="table"
      :table-data="dataSource"
      :hidden-handle="'false'"
      :columns="columns"
      :show-handle-column="1"
      @onDelete="onDelete"
      @onChange="onChange"
      @onCheck="onCheck"
      :header-color="''"
    >
      <template #order="{ text }">
        <div>
          <v-input
            :msg="text"
            :width="100"
            :color="'blue'"
            :font-size="'20px'"
            :height="40"
            :border-radius="20"
            :text-aligns="'center'"
          />
        </div>
      </template>
      <template #name="{ text }">
        <div style="color: red">
          <input :value="text" />
        </div>
      </template>
    </v-table>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import vTable from '/@/components/vTable/vTable.vue'
  import VInput from '/@/components/vInput/src/vInput.vue'
  export default defineComponent({
    components: {
      vTable,
      VInput,
    },
    setup() {
      console.log('4444')

      const columns = [
        {
          id: '0',
          title: '序号',
          dataIndex: 'order',
          slots: { customRender: 'order' },
          ellipsis: true,
          width: 120,
        },
        {
          id: '1',
          title: '商品编码',
          dataIndex: 'productCode',
          width: 150,
        },
        {
          id: '2',
          title: '商品名称',
          dataIndex: 'productName',
          width: 200,
        },
        {
          id: '3',
          title: '品牌',
          dataIndex: 'branch',
          width: 200,
        },
        {
          id: '4',
          title: '商品助记码',
          dataIndex: 'productHelpCode',
          width: 250,
        },
        {
          id: '5',
          title: '商品条码',
          dataIndex: 'productBarCode',
          width: 200,
        },
      ]
      const dataSource = [
        {
          order: '0',
          key: '4',
          name: 'Edward King 0',
          age: 32,
          address: 'London, Park Lane no. 0',
          productCode: '100200300',
          productName: '发动机',
          branch: '奇瑞汽车整车配件',
          productHelpCode: 'WWW-4020',
          productBarCode: '999-100',
        },
        {
          order: '1',
          key: '1',
          name: 'Edward King 1',
          age: 32,
          address: 'London, Park Lane no. 1',
          productCode: '10020030021',
          productName: '制冷系统',
          branch: '本田配套零部件',
          productHelpCode: 'AAA-14020',
          productBarCode: '999-100-111',
        },
      ]
      const onDelete = (item) => {
        console.log('onDelete===', item)
      }
      const onChange = (item) => {
        console.log('onChange===', item)
      }
      const onCheck = (item) => {
        console.log('onCheck===', item)
      }
      return {
        columns,
        dataSource,
        onDelete,
        onChange,
        onCheck,
      }
    },
  })
</script>
<style lang="less">
  .editable-cell {
    position: relative;

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
      padding-right: 24px;
    }

    .editable-cell-text-wrapper {
      padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;
    }

    .editable-cell-icon {
      margin-top: 4px;
      display: none;
    }

    .editable-cell-icon-check {
      line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
      color: #108ee9;
    }

    .editable-add-btn {
      margin-bottom: 8px;
    }
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .horizon-table {
    margin-top: 10px;
    width: 100%;
    overflow-x: scroll;
  }
  // .horizon-table {
  //   margin: 20px auto;
  //   width: 90;
  // }
</style>
