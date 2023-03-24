<template>
  <div class="card-box">
    <List :grid="{ xs: 1, sm: 4, md: 8, lg: 8, xl: 7, xxl: 8 }" :data-source="data">
      <template #renderItem="{ item }">
        <ListItem class="mb-0 list-item">
          <Card :title="item.name"><ListItemMeta :description="item.value" /></Card>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Card, List } from 'ant-design-vue'

  export default defineComponent({
    components: { Card, List, ListItem: List.Item, ListItemMeta: List.Item.Meta },
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    setup() {



      return {

      }
    },
  })
</script>
<style lang="less">
  .card-box {
    .ant-row > div {
      margin-right: -1px !important;
    }
    .ant-list-grid .ant-list-item {
      margin-bottom: -1px !important;
    }
  }
</style>
