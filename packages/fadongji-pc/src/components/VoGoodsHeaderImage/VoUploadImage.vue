<template>
  <div :key="new Date().getTime()" class="goods" :id="target">
    <draggable
      :list="imageFile"
      item-key="src"
      class="goods-image"
      ghost-class="ghost"
      filter=".undrag"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element, index }">
        <div :class="{ undrag: !element.src, borderSolid: element.src }" class="goods-image--item">
          <div v-if="element.type === 1" class="image-type">
            <div v-if="!element.src" class="icon-plus" @click="uploadHandler">
              <plus-outlined :style="plusStyle" />
              <p class="plus-text">{{ title }}</p>
            </div>
            <div class="image-prev" v-else>
              <a-image
                :fallback="fallback"
                align="middle"
                style="width: 100%; height: 100%; overflow: hidden"
                :src="element.src"
                :preview="false"
              />
              <div
                class="absolute operate-mask z-11 pb-5px left-10px right-10px bottom-10px top-10px z-10 flex items-end"
              >
                <div class="flex-1 text-center" @click.stop="reUpload(index)">
                  <img
                    class="w-16px h-16px inline-block"
                    src="https://dcp.fdjcyl.com/GongChuangJi/2023/2/1/1675242131477lQLPJxvxBicj87BAQLDZOmsYZnW8rQPUqzy1QKIA_64_64.png"
                    alt="发动集"
                  />
                </div>
                <div class="flex-1 text-center" @click.stop="removeSource(element)">
                  <img
                    class="w-16px h-16px inline-block"
                    src="https://dcp.fdjcyl.com/GongChuangJi/2023/2/1/1675242099320lQLPJx1l6s6-gTBAQLBu54XBH7qRYwPUqzbqgAEA_64_64.png"
                    alt="发动集"
                  />
                </div>
              </div>
            </div>
            <div
              v-if="element.name && element.src && false"
              class="absolute text-center leading-9 text-hex-666 left-0 bottom-0 right-0 h-35px pl-1 pr-1 truncate"
            >
              {{ element.name }} {{ element.type }}
            </div>
          </div>
          <div v-if="element.type === 2" class="image-type">
            <div v-if="!element.src" class="icon-plus" @click="uploadHandler">
              <plus-outlined :style="plusStyle" />
              <p class="plus-text">{{ title }}</p>
            </div>
            <div class="image-prev overflow-hidden" v-else>
              <div class="overflow-hidden relative">
                <img class="object-cover w-102px h-92px" :src="element.src + '&type=3'" />
                <img class="icon-play" src="../../assets/images/play.png" />
                <div class="image-mask" @click.stop="showPreviewVideo(element.src)"></div>
                <div
                  class="absolute operate-mask z-11 pb-5px left-0 right-0 bottom-0 top-0 z-10 flex items-end"
                >
                  <div class="flex-1 text-center" @click.stop="reUpload(index)">
                    <img
                      class="w-16px h-16px inline-block"
                      src="https://dcp.fdjcyl.com/GongChuangJi/2023/2/1/1675242131477lQLPJxvxBicj87BAQLDZOmsYZnW8rQPUqzy1QKIA_64_64.png"
                      alt="发动集"
                    />
                  </div>
                  <div class="flex-1 text-center" @click.stop="removeSource(element)">
                    <img
                      class="w-16px h-16px inline-block"
                      src="https://dcp.fdjcyl.com/GongChuangJi/2023/2/1/1675242099320lQLPJx1l6s6-gTBAQLBu54XBH7qRYwPUqzbqgAEA_64_64.png"
                      alt="发动集"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <a-modal
      v-model:visible="visible"
      :width="750"
      title="视频播放"
      :destroy-on-close="true"
      :footer="null"
    >
      <div class="flex p-10 justify-center">
        <VoVideo :url="video_source" />
      </div>
    </a-modal>
  </div>
  <VoMaterialLibrary
    :key="key"
    v-if="num"
    :value="imagesValue"
    :target="`#${target}`"
    :container="props.container"
    v-model:visible="visibleMaterial"
    @change="selectImage"
  />
</template>

<script lang="ts" setup>
  // images = id  name  src  type
  import draggable from 'vuedraggable'
  import VoMaterialLibrary from '/@/components/VoMaterialLibrary/VoMaterialLibrary.vue'

  import { ref, toRaw, unref, watch, onBeforeMount, computed } from 'vue'
  // @ts-ignore  />
  import { PlusOutlined } from '@ant-design/icons-vue'
  import VoVideo from '/@/components/VoVideo/VoVideo.vue'
  import { message } from 'ant-design-vue'
  import { Pattern, VoUtils } from '@vocen/shared'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import IconPicker from '/@/components/Icon/src/IconPicker.vue'

  const emits = defineEmits(['change', 'update:images'])

  const dragging = ref(false)
  const visible = ref(false)
  const visibleMaterial = ref(false)
  const video_source = ref('')
  const target = ref('target' + new Date().getTime())
  const fallback =
    'data:image/png;base64,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'
  const props = defineProps({
    num: {
      type: [String, Number],
      default: 1,
    },
    title: {
      type: String,
      default: '上传图片',
    },
    images: {
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

  const key = computed(() => {
    return new Date().getTime()
  })

  const imageFile = ref<any[]>([])
  const choosedImage = ref<any[]>([])
  const imagesValue = ref<any[]>([])
  const title = ref<string>(props.title)

  const reUploadIndex = ref<number>(-1)

  // 反显的文件
  const selectImage = (file: any) => {
    if (reUploadIndex.value !== -1) {
      choosedImage.value = choosedImage.value.map((item, index) => {
        return index === reUploadIndex.value ? file : item
      })
      return
    }
    if (choosedImage.value.length >= props.num) {
      return message.info(`最多上传${props.num}张图片`)
    }
    choosedImage.value.push(file)
  }

  // 重新上传
  const reUpload = (index) => {
    reUploadIndex.value = index
    visibleMaterial.value = true
  }
  // 删除资源
  const removeSource = (file) => {
    choosedImage.value = choosedImage.value.filter((item) => {
      return file.src !== item.src
    })
    const imageListArr = toRaw(choosedImage.value)
      .filter((item) => item.src)
      .map((item) => item.src)
    console.log(imageListArr)
    emits('update:images', imageListArr)
  }

  watch(visibleMaterial, (newVal) => {
    if (!newVal) {
      reUploadIndex.value = -1
    }
  })

  onMountedOrActivated(() => {
    choosedImage.value = []
    initImageFile()
  })

  watch(
    () => props.images,
    (val) => {
      if (val?.length === choosedImage.value.length) return
      initImageFile()
    },
  )

  watch(visibleMaterial, (val) => {
    if (!val) {
      const imageList = toRaw(choosedImage.value)
      const imageListArr = imageList.filter((item) => item.src).map((item) => item.src)
      emits('update:images', imageListArr)
    }
  })

  // 组件初始化
  const initImageFile = () => {
    const imgList: any = []
    for (let i = 0; i < +props.num; i++) {
      const imgItem = {
        id: new Date().getTime(),
        src: '',
        name: '',
        type: 1,
        poster: '',
      }
      imgList.push(imgItem)
    }
    imageFile.value = imgList
    imagesValue.value = []
    if (VoUtils.isArray(props.images)) {
      choosedImage.value = props.images.map((item: string) => {
        return {
          id: new Date().getTime(),
          src: item,
          name: '',
          type: Pattern.isImgUrl(item.toLocaleLowerCase()) ? 1 : 2,
          poster: '',
        }
      })
    } else {
      choosedImage.value = []
    }
  }

  watch(
    choosedImage,
    (newVal: any) => {
      const tmpImg = unref(newVal)
      imagesValue.value.length = 0
      imageFile.value = imageFile.value.map((item, index) => {
        if (index <= tmpImg.length - 1) {
          imagesValue.value.push(newVal[index].src)
          return {
            id: new Date().getTime(),
            src: newVal[index].src,
            name: newVal[index].name,
            type: newVal[index].type,
            poster: newVal[index].type === 1 ? '' : newVal[index]?.poster,
          }
        } else {
          return {
            id: new Date().getTime(),
            src: '',
            name: '',
            type: 1,
          }
        }
      })
    },
    {
      deep: true,
    },
  )
  const checkMove = (e) => {
    const index = e.draggedContext.futureIndex
    if (!imageFile.value[index].src) return false
    // 抛出最新的排序
    const value: any = imageFile.value.filter((item) => item.src).map((item) => unref(item))
    emits(
      'change',
      value.map((item) => toRaw(item)),
    )
  }
  const plusStyle = {
    fontSize: '10px',
    color: '#262626',
  }
  const playStyle = {
    fontSize: '25px',
    color: '#000000',
  }
  const uploadHandler = () => {
    reUploadIndex.value = -1
    visibleMaterial.value = true
  }
  const showPreviewVideo = (video) => {
    video_source.value = video
    visible.value = true
  }
</script>
<style lang="less">
  .goods-image {
    .ant-image {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .ant-image-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
<style scoped lang="less">
  .hover-operate {
    height: 25px;
    line-height: 25px;
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: all 0.25s;
    transform: translateY(25px);

    .operate-item {
      text-align: center;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }

  .not-draggable {
    cursor: no-drop;
  }

  .image-prev {
    width: 112px;
    height: 112px;
    position: relative;
    padding: 10px;
    background: #fff;
    border-radius: 2px;
    overflow: hidden;

    .icon-play {
      width: 25px;
      height: 25px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .image-mask {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 10;
    }
  }

  .goods {
    .goods-image {
      display: flex;
      flex-wrap: wrap;

      .goods-image--item {
        margin-bottom: 20px;

        .operate-mask {
          visibility: hidden;
          background-color: rgba(0, 0, 0, 0.2);
        }
        &:hover {
          .icon-play {
            display: none;
          }
          .operate-mask {
            visibility: visible;
          }
          .hover-operate {
            transform: translateY(0);
          }
        }

        overflow: hidden;

        &:last-child {
          margin-right: 0;
        }

        /*width: 150px;*/
        /*height: 170px;*/
        width: 112px;
        height: 112px;
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        background: #f8f8f8;
        border: 1px dashed #d9d9d9;
        border-radius: 2px;

        .plus-text {
          margin-top: 5px;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          text-align: center;
          color: #8c8c8c;
        }

        .icon-plus {
          text-align: center;
          position: absolute;
          top: 50%;
          width: 100%;
          font-size: 10px;
          color: #262626;
          transform: translate(0, -50%);
        }
      }

      .borderSolid {
        border: 1px solid #d9d9d9;
      }
    }
  }
</style>
