<template>
  <div class="box" :style="{background: propsBgColor}">
    <div v-for="(item, index) of propsArray" :key="index">
      <div class="box-item">
        <template v-if="VoUtils.hasOwn(item, 'label')">
          <div class="box-item__label">{{item.label}}</div>
          <template v-if="VoUtils.hasOwn(item, 'slots')">
            <div class="box-item__edit">
              <slot name="content" :row="item"></slot>
            </div>
          </template>
          <template v-else>
            <div class="box-item__edit">
              <Input v-model:value="item.value" :placeholder="item.placeHolder" />
            </div>
          </template>
        </template>
      <!--  没有按钮的区域-->
        <template v-else>
          <slot name="operation"></slot>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import { Input } from 'ant-design-vue'
// import { VoUtils } from '@vocen/shared';
// import { VoUtils } from '../../../../../shared/src/index'
import {VoUtils} from '../../../../shared/src/index'
  export default defineComponent({
    name: 'EraSearchTable',
    components: { Input },
    props: {
      itemWidth: {
        type: Number,
        default: 246
      },
      searchData: {
        type: Array,
        default: [],
      },
      backColor: {
        type: String,
        default: '#ffffff'
      },
    },
    setup (props) {
      const propsContent = ref(props.itemWidth)
      const propsArray = ref(props.searchData)
      console.log(propsArray.value)
      const propsBgColor = ref(props.backColor)
      watch(
          () => props.itemWidth,
          (newVal, oldVal) => {
            if (newVal !== oldVal) propsContent.value = newVal
          },
          { deep: true },
      )
      watch(
          () => props.searchData,
          (newVal, oldVal) => {
            if (newVal !== oldVal) propsArray.value = newVal
          },
          { deep: true },
      )
      return {
        VoUtils,
        propsContent,
        propsArray,
        propsBgColor,
      }
    }
  })
</script>
<style lang="less">
  .box {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 10px 10px 0  10px;
    .box-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 40px;
      margin-bottom: 10px;
      .box-item__label {
        padding-right: 10px;
        width: 110px;
      }
      .box-item__edit {
        width: 246px;
      }
    }
  }
</style>