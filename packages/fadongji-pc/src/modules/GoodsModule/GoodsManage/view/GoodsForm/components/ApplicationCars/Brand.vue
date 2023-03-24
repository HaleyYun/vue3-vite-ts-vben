<template>
  <div class="brand flex overflow-hidden">
    <div class="flex-1 overflow-y-scroll overflow-x-hidden" @scroll="brandScrollHandler">
      <div ref="indexStickyRef" v-if="scrollTop > 0" style="position: sticky; top: 0">
        <div class="brand-title bg-gray-200 py-8px text-14px pl-55px font-bold text-color-#333">
          {{ currentIndex }}
        </div>
      </div>
      <div
        :ref="setItemRef"
        v-for="(item, i) of brandList"
        :key="i"
        :id="`IndexRef-${item.initials}`"
        class="brand-list"
      >
        <div class="brand-inner">
          <div class="bg-gray-200 py-6px text-14px pl-55px font-bold text-color-#333">
            {{ item.initials }}
          </div>
          <div class="py-5px">
            <div
              v-for="(v, index) in item.list"
              :key="index"
              class="brand-item cursor-pointer flex pl-55px p-y-3px"
              @click.stop="selectBrandHandler(v)"
            >
              <div class="brand-logo">
                <img class="w-25px h-25px" :src="v.logo" />
              </div>
              <div class="brand-text text-gray-600 pl-10px">{{ v.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="indexListData.length" class="brand-index">
      <div class="brand-index--list">
        <div
          class="brand-index--item"
          :class="{ active: currentIndex === item.key }"
          v-for="(item, index) in indexListData"
          :key="index"
          @click="chooseIndexHandler(item)"
        >
          {{ item.key }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  //
  // 生成字母
  import { ref, onBeforeUpdate, watchEffect, nextTick, toRaw } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'

  const redirect = ref<boolean>(false)

  // 顶部控制显示的索引值
  const indexStickyRef = ref<any>(null)

  // 滚动距离的记录
  const scrollTop = ref<number>(0)

  // v-for 绑定的多个ref
  const refIndexArr = ref<HTMLElement[]>([])

  // 当前选中的字母
  const currentIndex = ref<string>('A')

  // 遍历创建多ref节点
  const setItemRef = (el: HTMLElement) => {
    if (el) {
      refIndexArr.value.push(el)
    }
  }

  // 品牌数据
  const brandList = ref<any>([])

  // 存储渲染后的各个节点的scrollTop值
  const refScrollTopList = ref<number[]>([])

  const emits = defineEmits(['select'])

  // 监控变化前控制ref
  onBeforeUpdate(() => {
    refIndexArr.value.length = 0
  })
  // 定义字初始化
  const indexListData = ref<any>([])

  // 根据字母选择品牌
  const chooseIndexHandler = (row) => {
    const { key } = row
    redirect.value = true
    currentIndex.value = key
    const target = document.querySelector(`#IndexRef-${row.key}`) as HTMLElement
    target.scrollIntoView({ behavior: 'smooth' })
  }

  // 滑动监控定时器-滑动结束后调用-可扩展滑动结束钩子调用
  let scrollTimer: any = null

  // 滚动事件的监控
  const brandScrollHandler = (res) => {
    const scrollTopNumber = res.target.scrollTop
    const stickyHeight = indexStickyRef.value ? indexStickyRef.value.clientHeight : 0
    scrollTop.value = scrollTopNumber
    refScrollTopList.value.forEach((item, index) => {
      // 边界控制 - 暂不处理
      if (index === 0) {
      }
      if (index > 0 && index < refScrollTopList.value.length - 1) {
        if (scrollTopNumber >= refScrollTopList.value[index - 1] && scrollTopNumber < item) {
          const distance = scrollTopNumber - refScrollTopList.value[index - 1]
          const move = distance > stickyHeight ? 0 : distance
          indexStickyRef.value ? (indexStickyRef.value.style.top = -move + 'px') : null
          if (!redirect.value) {
            currentIndex.value = indexListData.value[index - 1].key
          }
        }
      }
      // 边界控制 - 暂不处理
      if (index === refScrollTopList.value.length) {
      }

      // 监控滚动结束
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        redirect.value = false
      }, 300)
    })
  }

  // 获取一级品牌列表
  const initBrandData = async () => {
    const { data } = await AdminHttp.VEHICLE.VehicleBrandSelectOne()
    // 按照字母排序
    brandList.value = data.detail
    const indexTmpData = brandList.value.map((item) => {
      return {
        key: item.initials,
        id: item.initials,
      }
    })
    indexListData.value = indexTmpData
    currentIndex.value = indexTmpData[0].key

    await nextTick(() => {
      const targetVal: number[] = []
      refIndexArr.value.forEach((el) => {
        const scrollTop = el.offsetTop
        targetVal.push(scrollTop)
      })
      refScrollTopList.value = targetVal
    })
  }

  // 选择当前品牌
  const selectBrandHandler = (row) => {
    emits('select', toRaw(row))
  }

  watchEffect(() => {
    initBrandData()
  })
</script>

<style scoped lang="less">
  .brand {
    position: relative;
    height: 100%;

    &-index {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      padding: 0 0;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0px 0px 5px rgb(0 0 0 / 35%);
      &--list {
      }

      &--item {
        text-align: center;
        color: #666;
        cursor: pointer;
        transition: all 0.3s;
        width: 40px;
        height: 25px;
        line-height: 29px;

        &:hover {
          transform: scale(1.02);
          font-weight: bolder;
          background-color: #1890FF;
          color: #fff;
        }

        &.active {
          color: #fff;
          font-weight: bolder;
          transform: scale(1.02);
          background-color: #1890FF;
        }
      }
    }
  }
</style>
