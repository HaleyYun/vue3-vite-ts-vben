<template>
  <div>
    <div class="box">
      <!-- 分类 -->
      <div class="category">
        <div class="category-title"><span class="category-star">*</span>请选择可以供货的品类:<span class="category-subtitle">最多选择5个，最少选择1个</span></div>
        <div class="category-cascade">
          <Cascader
              v-model:value="categoryValue"
              style="width: 50%"
              multiple
              max-tag-count="responsive"
              :options="options"
              placeholder="请选择品类名称"
          ></Cascader>
        </div>
      </div>

    <!-- 品牌 -->
      <div class="brand">
        <div class="brand-title">
          <div class="brand-title__label"><span class="brand-star">*</span>请选择品牌:</div>
          <div class="brand-subtitle">至少选择1个</div>
          <Button type="primary" class="brand-add__btn" @click="brandAdeEvent">增加品牌</Button>
        </div>
        <div class="brand-item">
          <template v-for="item of addBrandList" :key="item.id">
            <BrandListItem @deleteBrandItem="deleteBrandItemEvent" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue'
import type { CascaderProps } from 'ant-design-vue';
import BrandListItem from "/@/modules/CustomerModule/SupplierModule/SuppierNewAdd/components/BrandListItem.vue";
  export default defineComponent({
    name: 'SupplierBusinessCategory',
    components: {

      BrandListItem,
    },
    setup () {
      // 增加品牌
      let addBrandList = ref([
        {id: 'brand001', name: '江陵动力',},
        {id: 'brand002', name: '东风动力',},
        {id: 'brand003', name: '宏仓动力',},
      ])
      const categoryValue = ref<string[]>([])
      const options: CascaderProps['options'] = [
        {
          label: 'Light',
          value: 'light',
          children: new Array(20)
              .fill(null)
              .map((_, index) => ({ label: `Number ${index}`, value: index })),
        },
        {
          label: 'Bamboo',
          value: 'bamboo',
          children: [
            {
              label: 'Little',
              value: 'little',
              children: [
                {
                  label: 'Toy Fish',
                  value: 'fish',
                },
                {
                  label: 'Toy Cards',
                  value: 'cards',
                },
                {
                  label: 'Toy Bird',
                  value: 'bird',
                },
              ],
            },
          ],
        },
      ];
      const brandAdeEvent = () => {
        alert('3333333')
      }
      const deleteBrandItemEvent = (item) => {
        alert(item)
      }
      return {
        options,
        categoryValue,
        addBrandList,
        brandAdeEvent,
        deleteBrandItemEvent,
      }
    }
  })
</script>
<style lang="less" scoped>
  .box {
    background-color: white;
    width: 100%;
    .category {
      padding-left: 10px;
      width: 100%;
      .category-title {
        font-size: 14px;
        color: #000000;
        font-weight: bold;
        .category-star {
          color:red;
        }
        .category-subtitle {
          padding-left:5px;
          color: #979797;
          font-size: 12px;
        }
      }
      .category-cascade {
        margin-top: 10px;
      }
    }
    .brand {
      padding: 10px;
      .brand-title {
        display: flex;
        align-items: center;
        .brand-title__label {
          font-size: 14px;
          color: #000000;
          font-weight: bold;
          .brand-star {
            color: red;
          }
        }
        .brand-subtitle {
          margin-left:5px;
          color: #979797;
          font-size: 12px;
        }
        .brand-add__btn {
           margin-left: 5px;
        }

      }
      .brand-item {
        margin-top: 10px;
        width: 100%;
        max-height: 450px;
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }
  }
</style>
