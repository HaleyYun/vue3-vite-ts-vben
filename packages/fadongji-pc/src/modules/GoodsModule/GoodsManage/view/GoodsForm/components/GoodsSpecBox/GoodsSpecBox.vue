<template>
  <div class="spec-box">
    <div class="spec-row" v-for="(row, idx) in specsList" :key="idx">
      <div class="spec-row__title" v-if="row.value.length > 0">{{ row.name }}：</div>
      <div class="spec-row__attr" v-if="row.value.length > 0">
        <a-checkbox-group style="width: 100%" v-model:value="row.checks">
          <a-row>
            <a-col v-for="(item, index) in row.value" class="mb-30px" :key="index" :span="3">
              <a-checkbox :disabled="disabled" :value="item">
                <div class="break-words break-all">{{ item.model ? item.model : item }}</div>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useGoodsFormStoreWithOut } from '/@/store/modules/goodsFormStore'
  import { VoUtils } from '@vocen/shared'

  const goodsFormStore = useGoodsFormStoreWithOut()

  const props = defineProps({
    templateData: {
      type: Array,
      default() {
        return []
      },
    },
    specs: {
      required: true,
      default: [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: String,
      default: '',
    },
  })
  const specsList = ref([])

  watch(
    () => props.specs,
    (arr) => {
      if (!props.specs) {
        return
      }
      const checks: string[] = []
      props.templateData?.forEach((item: any) => {
        item.templateSkus.forEach((t: any) => checks.push(t.value))
      })

      const uniqueArrChecks = VoUtils.dedupe(checks)
      const list: any = []
      console.log(arr, uniqueArrChecks, 'uniqueArrChecks')
      arr.forEach((row: any) => {
        list.push({
          ...row,
          checks: row.value.filter((item) =>
            item.id ? uniqueArrChecks.includes(item.model) : uniqueArrChecks.includes(item),
          ),
        })
      })
      console.log(arr)
      goodsFormStore.setGoodsSpecsList(list)
      specsList.value = goodsFormStore.getGoodsSpecList
      console.log(goodsFormStore.getGoodsSpecList)
    },
  )
</script>

<style lang="scss" scoped>
  .spec {
    &-box {
    }

    &-row {
      display: flex;
      margin-bottom: 10px;

      &__title {
        min-width: 70px;
      }

      &__attr {
        flex: 1;
      }
    }
  }
</style>
