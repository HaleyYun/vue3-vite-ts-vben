<template>
    <div class="Er-tabs">
        <ATabs v-model:activeKey="activeKey" @change="tabsChange" >
            <ATabPane v-for="(item) of tabsList" :key="item.key"  >
                <template #tab>
                    <span>
                        {{item.name}}
                    </span>
                    <span v-if="item.totalCount">(<span :class="item.key == activeKey?'count-acitve':'count'">{{item.totalCount}}</span>)</span>
                </template>
            </ATabPane>
        </ATabs>
    </div>

</template>

<script lang="ts" setup>
    import { ref,defineProps,defineEmits,watchEffect} from 'vue';
    const props = defineProps({
        tabsActive: {
            type:String,
            default: 'one',
        },
        tabsList:{
            type:Array,
            default:[]
        }
    });
    const activeKey = ref();
    watchEffect(()=>{
        activeKey.value = props.tabsActive;
    });
    const emit = defineEmits(['tabsChange']);
    function tabsChange(key) {
        console.log(key);
        emit('tabsChange',key)

    }

</script>

<style scoped lang="less">
  .Er-tabs{
     background: #fff;
     padding: 0 16px;
     position: fixed;
     z-index: 999;
      /* width: 100%; */
     width: calc(100% - 210px);
     top: 48px;
     flex: 0 0 auto;
     transition: width 0.2s;
  }

  .count{
      color: #F86060;
  }

  .count-acitve{
    color: #1890ff;
  }


</style>
