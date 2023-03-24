<template>
  <div>
    <ADescriptions :column="2" :data="info"  bordered :schema="DescItemData">
      <ADescriptionsItem v-for="(item,index) of DescItemData" :key="index+'ADescriptionsItem'" :label="item.label">
        <div v-if="item.field == 'level'" class="flex items-center justify-between">
          <span>{{info[item.field]}}</span>
          <a class="ml-20px" @click="assetsReport()">查看明细</a>
        </div>
        <div v-else-if="item.field == 'sourceStr'" >
          {{info.sourceStr}} {{info.invitorName}}
        </div>
        <div v-else-if="item.field == 'qualify'">
          <span>{{ info.qualify }}</span><br/>
          <a-tooltip v-if="info.qualifyAfterSaleStatus && info.qualifyInstallStatus && info.qualifyRecycleStatus" placement="topLeft" title="无资质可点击">
            <AButton type="link"  disabled>开通资质</AButton>
          </a-tooltip>
          <AButton v-else type="link" @click="openQualification(info)">开通资质</AButton>
        </div>

        <div v-else> {{info[item.field]}}</div>
      </ADescriptionsItem>
    </ADescriptions>
  </div>


</template>

<script lang="ts" setup>
  import {defineComponent, ref,defineProps,reactive,defineEmits} from 'vue';
  import { useRouter } from 'vue-router'
  import {DescItemData} from './data/configuration'
  import { Description } from '/@/components/Description/index';


  let router = useRouter()
  const emit = defineEmits(['openQualification'])
  const props = defineProps({
    info:{
      type:Object,
      default:{}
    }
  })
  // 资产明细
  const assetsReport = () => {
    router.push({path:'/customerModule/TechnicalWorkers/Report',
      query:{companyId: props.info.id,userId:props.info.userId,level:props.info.level}
    })
  };

  const openQualification = (record)=>{
    emit('openQualification',record)
  }


</script>

<style scoped lang="less">

</style>
