<template>
  <a-modal
    class="material"
    :id="getUniqueId"
    v-model:visible="show"
    :width="width"
    title="上传图片/视频"
    :footer="null"
    destroy-on-close
    :get-container="getContainer"
    :mask="false"
    :wrap-class-name="getUniqueId"
    style="top: 20px; left: 0"
    @cancel="cancel"
  >
    <div class="p-4">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane :key="1" tab="图片库" />
        <a-tab-pane :key="2" tab="视频库" />
      </a-tabs>
      <div v-if="activeKey === 1" class="warning-text items-center flex justify-between">
        <div>
          <exclamation-circle-filled :style="iconStyle" />
          <span class="ml-2 text-hex-999">只展示尺寸800*800，格式jpg,jpge的图片</span>
        </div>
        <div>
          <EraUpload
            list-type="text"
            :maxSize="50"
            :maxNumber="9"
            :multiple="true"
            upload-type="img"
            uploadFuncChannel="localStore"
            @done="handlerAllUploadDone"
            :accept="['jpg', 'jpeg', 'png']"
            :show-help-text="false"
            :show-upload-list="false"
          >
            <template #target>
              <a-button type="primary">
                <template #icon>
                  <CloudUploadOutlined />
                </template>
                本地上传
              </a-button>
            </template>
          </EraUpload>
        </div>
      </div>
      <div v-if="activeKey === 2" class="warning-text items-center flex justify-between">
        <div>
          <exclamation-circle-filled :style="iconStyle" />
          <span class="ml-2 text-hex-999">只展示格式是mp4的视频。</span>
        </div>
        <div>
          <EraUpload
            :maxSize="200"
            :maxNumber="1"
            list-type="text"
            uploadType="video"
            uploadFuncChannel="localStore"
            :multiple="true"
            @done="handlerAllUploadDone"
            :accept="['mp4']"
            :show-help-text="false"
            :show-upload-list="false"
          >
            <template #target>
              <a-button type="primary">
                <template #icon>
                  <CloudUploadOutlined />
                </template>
                本地上传
              </a-button>
            </template>
          </EraUpload>
        </div>
      </div>
      <div class="pt-4">
        <a-form layout="inline" :model="formState" ref="formRef">
          <a-form-item label="图片名称：">
            <a-input v-model:value="formState.name" placeholder="输入图片名称搜索" allow-clear />
          </a-form-item>
          <a-form-item label="图片排序：">
            <a-select
              v-model:value="formState.sortType"
              style="width: 180px"
              placeholder="请选择"
              allow-clear
            >
              <a-select-option value="1">名称正序</a-select-option>
              <a-select-option value="2">名称倒叙</a-select-option>
              <a-select-option value="3">创建时间正序</a-select-option>
              <a-select-option value="4">创建时间倒叙</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item class="!mr-0">
            <div class="flex flex-end" :size="25">
              <a-button type="primary" @click.stop="searchHeadImg" html-type="submit">
                <template #icon>
                  <SearchOutlined />
                </template>
                查询
              </a-button>
              <a-button class="ml-4" @click="reSetting">重置</a-button>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div v-if="activeKey === 1">
        <a-image-preview-group>
          <div class="img-list pt-20px flex flex-wrap">
            <div
              v-for="(image, index) in imageList"
              :key="index"
              class="img-item mb-4 shadow-lg bg-gray-100 pb-1 rounded-5px cursor-pointer overflow-hidden w-190px"
              @click="chooseHandler(image, 1)"
            >
              <div v-if="props.value.includes(image.src)" class="selected-icon">
                <check-outlined :style="selectedIcon" />
              </div>
              <div class="img-item--target h-190px overflow-hidden bg-white text-0">
                <a-image :height="190" :width="190" :src="image.src" :preview="false" />
              </div>
              <div class="img-item--name px-2 flex justify-center items-center cursor-pointer">
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>{{ image.name }}</span>
                  </template>
                  <div class="img-name--content">
                    {{ image.name }}
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-image-preview-group>
      </div>
      <div v-if="activeKey === 2">
        <a-image-preview-group>
          <div class="img-list pt-20px flex flex-wrap">
            <div
              v-for="(video, index) in videoList"
              :key="index"
              class="img-item mb-4 shadow-lg bg-gray-100 pb-1 cursor-pointer rounded-5px overflow-hidden w-190px"
              @click="chooseHandler(video, 2)"
            >
              <PlayCircleFilled :style="playStyle" class="icon-play" />
              <div v-if="props.value.includes(video.src)" class="selected-icon">
                <check-outlined :style="selectedIcon" />
              </div>
              <div class="img-item--target h-190px w-190px overflow-hidden bg-white text-0">
                <a-image :preview="false" :width="190" :height="190" :src="video.poster" />
              </div>
              <div class="img-item--name px-2 flex justify-center items-center cursor-pointer">
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>{{ video.name }}</span>
                  </template>
                  <div class="img-name--content">
                    {{ video.name }}
                  </div>
                </a-tooltip>
              </div>
            </div>
          </div>
        </a-image-preview-group>
      </div>
      <div class="flex px-2 justify-between">
        <div class="text-hex-07b4b4 cursor-pointer" @click="toMaterialHandler">进入素材库>></div>
        <div>
          <VoPagination
            :total="pagination.total"
            :current="pagination.current"
            :page-size="pagination.pageSize"
            @pagination="paginationChange"
          />
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  // VoMaterialLibrary 组件
  import { onMounted, reactive, ref, watch, nextTick } from 'vue'
  // @ts-ignore
  import {
    ExclamationCircleFilled,
    SearchOutlined,
    CloudUploadOutlined,
    CheckOutlined,
    PlayCircleFilled,
  } from '@ant-design/icons-vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const classUniqueName = 'vo-material-' + new Date().getTime()

  const getUniqueId = classUniqueName + ' vo-material'

  const width = 1036
  const playStyle = {
    fontSize: '40px',
    color: '#07b4b4',
  }
  const imageList = ref<any>([])
  const videoList = ref<any>([])

  // form的Ref
  const formRef = ref()
  const getContainer = () => {
    return props.container
      ? document.querySelector(props.container) || document.body
      : document.body
  }
  const reSetting = () => {
    formState.name = ''
    formState.sortType = null
  }

  const toMaterialHandler = () => {
    router.push('/goodsManage/goodsTemplate/source')
  }
  const searchHeadImg = () => {
    pagination.current = 1
    if (activeKey.value === 1) {
      getImages()
    } else {
      getVideo()
    }
  }

  const pagination = reactive({
    total: 158,
    current: 1,
    pageSize: 10,
  })
  // 字体图标样式
  const selectedIcon = {
    color: '#fff',
    fontSize: '30px',
    position: 'absolute',
    bottom: '35px',
    right: 0,
    transform: 'rotate(-45deg)',
  }
  const iconStyle = {
    fontSize: '16px',
    color: '#ff0505',
  }

  // 分页变化
  const paginationChange = ({ current, pageSize }) => {
    pagination.current = current
    pagination.pageSize = pageSize
    if (activeKey.value === 2) {
      getVideo()
    } else {
      getImages()
    }
    // 请求更多的数据
  }
  // 获取目标元素的相对位置
  const getActualPosition = (element) => {
    let actualLeft = element.offsetLeft
    let actualTop = element.offsetTop
    let curElement = element.offsetParent
    while (curElement) {
      actualLeft += curElement.offsetLeft
      actualTop += curElement.offsetTop
      curElement = curElement.offsetParent
    }
    return {
      left: actualLeft,
      top: actualTop,
    }
  }

  // 选择操作
  const chooseHandler = (img, type) => {
    if (props.value.includes(img.src)) return
    emits('change', {
      ...img,
      type,
    })
  }

  // 更改modal组件位置
  const changeModalPosition = () => {
    const modal = document.querySelector('.' + classUniqueName) as HTMLElement

    if (props.target && props.container && modal) {
      const targetEl = document.querySelector(props.target) as HTMLElement
      const container = document.querySelector(props.container) as HTMLElement
      container.style.position = 'relative'
      const h = targetEl.clientHeight
      const targetElProp = getActualPosition(targetEl)
      const containerElProp = getActualPosition(container)
      container.style.width = '100%'
      container.style.overflowY = 'scroll'
      modal.style.top = `${targetElProp.top - containerElProp.top + h}px`
      modal.style.left = `${targetElProp.left - containerElProp.left}px`
      // document.querySelector('.material').style.left =
    }
  }

  const initDrag = () => {
    const el = document
    const dialogHeaderEl = el.querySelector('.ant-modal-header') as HTMLElement // 类名一定要替换成自己的 我本地改了前缀
    const dragDom = el.querySelector('.ant-modal') as HTMLElement // 类名一定要替换成自己的 我本地改了前缀
    dialogHeaderEl.style.cssText += ';cursor:move;'

    // dragDom.style.cssText += ';bottom:0px;'

    // 获取原有属性 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
      return (dom: any, attr: any) => getComputedStyle(dom, null)[attr]
    })()

    dialogHeaderEl.onmousedown = (e: any) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomheight = dragDom.offsetHeight // 对话框高度

      // 获取到的值带px 正则匹配替换
      let styL: any = sty(dragDom, 'left')
      // 为兼容ie
      if (styL === 'auto') styL = '0px'
      let styT: any = sty(dragDom, 'top')

      // console.log(styL)
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
      } else {
        styL = +styL.replace(/px/g, '')
        styT = +styT.replace(/px/g, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 边界处理

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      document.onmouseup = function (e: any) {
        document.onmousemove = null
        document.onmouseup = null
      }
      return false
    }
  }

  // 监控显示隐藏
  watch(
    () => props.visible,
    (val) => {
      show.value = val
      if (val) {
        nextTick(() => {
          changeModalPosition()
          getImages()
          setTimeout(() => {
            initDrag()
          }, 1000)
        })
      } else {
        const container = document.querySelector(props.container) as HTMLElement
        container.style.position = 'inherit'
      }
    },
  )

  // 渲染完执行一次位置初始化
  onMounted(() => {
    setTimeout(() => {
      changeModalPosition()
    }, 500)
  })

  // 定义属性值
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    target: {
      type: String,
      require: true,
      default: '',
    },
    value: {
      type: Array,
      default() {
        return []
      },
    },
    container: {
      type: String,
      default: '',
    },
  })
  const show = ref(props.visible)

  // 获取图片
  const getImages = async () => {
    const { data } = await adminHttp.GOODS.goodsResourceFileList({
      ...formState,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      folderId: '',
      type: 1,
    })
    imageList.value = data.records.map((item) => {
      return {
        ...item,
        src: item.url,
      }
    })
    pagination.total = data.total
  }

  // 获取vidoe
  const getVideo = async () => {
    const { data } = await adminHttp.GOODS.goodsResourceFileList({
      ...formState,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      folderId: '',
      type: 2,
    })
    videoList.value = data.records.map((item) => {
      return {
        ...item,
        src: item.url,
        poster: item.videoPicUrl,
      }
    })
    pagination.total = data.total
  }

  // 控制是图片还是视频库  1 图片素材  2 视频素材
  const activeKey = ref(1)

  // 搜索表单
  const formState = reactive({
    name: '', // 图片分类
    sortType: null, // 图片名称
  })

  const emits = defineEmits(['update:visible', 'change'])

  const handlerAllUploadDone = async ({ info, file }) => {
    //const currentFloderId = resourceTreeStore.getCurrentFloderId;
    console.log(file)
    emits('change', {
      ...file,
      src: file.filePath,
      type: activeKey.value,
    })
  }

  const cancel = () => {
    emits('update:visible', false)
  }
  watch(activeKey, (newVal) => {
    if (newVal === 2) {
      getVideo()
    } else {
      getImages()
    }
  })
</script>
<style lang="less">
  .material {
    position: relative;
    top: 20px;
    left: 0;

    .ant-col {
      width: auto !important;
    }

    .ant-image-img {
      height: 100% !important;
      object-fit: cover;
    }
  }

  .vo-material.ant-modal-wrap {
    position: absolute !important;
    height: 100%;
    width: 1036px;
    overflow: inherit !important;
  }

  html,
  body {
    overflow-x: visible !important;
  }
</style>
<style scoped lang="less">
  :deep(.material) {
    .ant-image-img {
      height: 100% !important;
    }
  }

  .img-list {
    .img-item {
      margin-left: 10px;
      width: 190px;
      position: relative;

      .icon-play {
        position: absolute;
        left: 50%;
        top: 30px;
        z-index: 99;
        background-color: #fff;
        border-radius: 50%;
        transform: translateX(-50%);
      }

      .selected-icon {
        width: 100px;
        height: 100px;
        position: absolute;
        left: -50px;
        top: -50px;
        transform: rotate(45deg);
        background-color: #1abc9c;
        z-index: 99;
      }

      .img-item--name {
        height: 40px;
        font-size: 13px;
      }

      .img-name--content {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        max-height: 40px;
        line-height: 1.5;
      }
    }
  }
</style>
