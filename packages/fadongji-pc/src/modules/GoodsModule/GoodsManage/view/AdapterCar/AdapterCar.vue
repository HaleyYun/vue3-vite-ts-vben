<template>
  <div class="specs">
    <div class="specs-index">
      <div class="specs-box">
        <div class="specs-list">
          <div
            v-for="(specsIndex, index) in Alphabetic"
            :key="index"
            :class="{ active: index === alphaIndex }"
            class="specs-list--item"
            @click="alphaIndexChoose(specsIndex, index)"
            >{{ specsIndex }}</div
          >
        </div>
      </div>
      <div class="specs-aside">
        <div class="specs-content">
          <div class="specs-choose flex pt-2">
            <div class="specs-choose--title">当前已选型号：</div>
            <div class="specs-choose-list flex-1 flex-wrap">
              <div v-for="(item, index) in chooseAready" :key="index" class="inline-block pb-2">
                <a-tag closable color="green" @close="chooseTagCloseHandler(item)">
                  {{ item }}
                </a-tag>
              </div>
            </div>
          </div>
          <div class="specs-operate">
            <div class="specs-operate--list pb-1">
              <div class="specs-operate--title text-14px pb-1 font-bold text-hex-333"></div>
              <div class="specs-operate--content">
                <a-checkbox-group
                  v-model:value="chooseValue[0]"
                  name="checkboxgroup"
                  :options="plainOptions"
                />
              </div>
            </div>
            <!-- <div class="specs-operate--list pb-1">
              <div class="specs-operate--title text-14px pb-1 font-bold text-hex-333">B</div>
              <div class="specs-operate--content">
                <a-checkbox-group
                  v-model:value="chooseValue[1]"
                  name="checkboxgroup"
                  :options="plainOptionsB"
                />
              </div>
            </div> -->
          </div>
        </div>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // VoSpecs 沃森规格属性组件 #1ABC9C
  // 字母索引
  import { nextTick, readonly, ref, unref, watch, watchEffect } from 'vue'
  const plainOptions = ['一汽大众', '上海大众', '进口大众']
  // const plainOptionsB = ['型号名称4', '型号名称5', '型号名称6']

  // 初始化选择绑定对象
  const choosedData = new Array<Array<any>>()
  watchEffect(() => {
    for (let i = 0; i < 26; i++) {
      choosedData.push([])
    }
  })

  const emit = defineEmits(['change'])

  // 已选择的数据列表
  const chooseAready = ref(new Array<any>())

  // 监控选择的型号
  const chooseValue = ref(choosedData)

  // 筛选索引列表
  const Alphabetic = readonly([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ])

  // 筛选的缩影
  const alphaIndex = ref(0)

  // 型号筛选的key
  const alphaKey = ref('')

  // 选择的型号
  // 索引选择
  const alphaIndexChoose = (alpha, index) => {
    alphaIndex.value = index
    alphaKey.value = alpha
  }

  // 监控选择的型号
  watch(
    () => chooseValue.value,
    (val) => {
      let choosedEffect = new Array<any>()
      const choosed = unref(val)
      choosed.forEach((item) => {
        if (item.length) {
          choosedEffect = choosedEffect.concat(item)
        }
      })
      // 增加更新操作 解决没有实时更新的操作问题
      chooseAready.value.length = 0
      nextTick(() => {
        chooseAready.value = choosedEffect
      })
      emit('change', choosedEffect)
    },
    {
      deep: true,
    },
  )
  // 选中删除触发
  const chooseTagCloseHandler = (val) => {
    const choosed = unref(chooseValue)
    choosed.map((item) => {
      const index = item.findIndex((i) => i === val)
      if (index > -1) {
        item.splice(index, 1)
      }
      return item
    })
    chooseValue.value = choosed
  }
</script>

<style scoped lang="less">
  .specs {
    &-choose {
      &--title {
        min-height: 30px;
      }
    }
    font-size: 13px;
    &-content {
      padding-left: 25px;
    }
    &-index {
      display: flex;
      padding: 15px;
    }
    &-aside {
      background-color: #fff;
      width: 88%;
    }
    &-box {
      width: 12%;
      background-color: #fff;
      border: 1px solid #c1c1c1;
    }
    &-title {
      padding: 0 10px;
      text-align: center;
      color: #999;
      font-size: 13px;
    }
    &-list {
      // display: flex;
      width: 60px;
      font-size: 24px;
      margin: 5px 20px;
      background-color: #fff;
      &--item {
        cursor: pointer;
        color: #1abc9c;
        text-align: center;
        // transition: all 0.01s;
        &:hover,
        &.active {
          color: #0960bd;
          font-weight: bold;
        }
      }
    }
  }
</style>
