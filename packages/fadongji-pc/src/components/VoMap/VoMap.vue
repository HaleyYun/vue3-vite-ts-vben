<template>
  <a-modal
    v-if="show"
    v-model:visible="show"
    :style="{ top: '40px' }"
    width="1200px"
    title="地图选择"
    destroy-on-close
    @cancel="closeHandler"
  >
    <div class="relative">
      <div ref="wrapRef" class="" :style="{ height, width }"></div>
      <div class="search absolute top-10px right-10px index-10">
        <a-input-search
          placeholder="请输入关键字搜索"
          enter-button
          @search="searchHandler"
          allow-clear
          v-model:value="address"
        />
        <div id="panel" class="w-300px border-transparent border-1 mt-10px max-h-800px"></div>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
  import { ref, nextTick, unref, watch } from 'vue'

  import { useScript } from '/@/hooks/web/useScript'

  const A_MAP_URL = 'https://webapi.amap.com/maps?v=2.0&key=5c4853057336afb9de60e93f3ad8de81'

  const map = ref<any>(null)

  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    markPosition: {
      type: Array,
      default() {
        return []
      },
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '650px',
    },
    center: {
      type: Array,
      default() {
        return [113.809286, 34.795011]
      },
    },
  })
  const emits = defineEmits(['update:visible', 'select'])
  const wrapRef = ref<HTMLDivElement | null>(null)
  const { toPromise } = useScript({ src: A_MAP_URL })
  let placeSearch: any = null

  const address = ref('')

  const show = ref(props.visible)

  async function initMap() {
    await toPromise()
    await nextTick()
    const wrapEl = unref(wrapRef)
    if (!wrapEl) return
    const AMap = (window as any).AMap
    map.value = new AMap.Map(wrapEl, {
      zoom: 13,
      center: props.markPosition.length ? props.markPosition : props.center,
      viewMode: '3D',
    })

    if (props.markPosition.length) {
      console.log(props.markPosition)
      let marker = new AMap.Marker({
        position: props.markPosition,
        title: '沃森',
      })
      map.value.add(marker)
    }

    // 地图点击事件-默认先不做处理
    map.value.on('click', (e) => {
      console.log(e)
    })

    // 搜索插件
    AMap.plugin(['AMap.PlaceSearch'], function () {
      //构造地点查询类
      placeSearch = new AMap.PlaceSearch({
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        citylimit: false, //是否强制限制在设置的城市内搜索
        map: map.value, // 展现结果的地图实例
        panel: 'panel', // 结果列表将在此容器中进行展示。
        autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        markerClick(e) {
          console.log(e)
        },
      })
      placeSearch.on('markerClick', (res) => {
        console.log('这是地图选择信息，临时展示', res.data)
        emits('select', res.data)
        emits('update:visible', false)
      })
      //关键字查询
      // placeSearch.search('木华广场')
    })
    if (props.value) {
      address.value = props.value
      placeSearch.search(props.value)
    }
  }

  const searchHandler = (val) => {
    placeSearch.search(val)
  }

  const closeHandler = () => {
    emits('update:visible', false)
  }

  watch(
    () => props.visible,
    (val) => {
      show.value = val
      if (val) {
        nextTick(() => {
          initMap()
        })
      } else {
        placeSearch.clear()
        map.value.destroy()
      }
    },
  )
</script>
