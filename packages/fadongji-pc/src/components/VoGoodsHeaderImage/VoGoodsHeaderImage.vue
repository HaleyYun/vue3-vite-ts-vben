<template>
  <div class="goods" :id="target">
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
        <div :class="{ undrag: !element.src }" class="goods-image--item">
          <div v-if="element.type === 1" class="image-type">
            <div v-if="!element.src" class="icon-plus" @click="uploadHandler">
              <plus-outlined :style="plusStyle" />
              <p class="plus-text">{{ title }}</p>
            </div>
            <div class="image-prev" v-else>
              <a-image
                :fallback="fallback"
                align="middle"
                :width="125"
                :height="125"
                :src="element.src"
                :preview="false"
              />
            </div>
            <div
              v-if="element.name && element.src"
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
            <div class="image-prev" v-else @click="showPreviewVideo(element.src)">
              <a-image
                :fallback="fallback"
                :preview="false"
                align="middle"
                :width="125"
                :height="125"
                :src="element.src+'&type=3'"
              />
              <PlayCircleFilled :style="playStyle" class="icon-play" />
            </div>
          </div>
          <div
            v-if="element.src && !props.preview"
            class="hover-operate bg-hex-f2f2f2 pl-2 pr-2 flex"
          >
            <div class="operate-item text-hex-1ABC9C flex-1" @click.stop="reUpload(index)">
              重新上传
            </div>
            <div
              v-if="element.type === 1"
              class="operate-item text-hex-1ABC9C flex-1"
              @click.stop="removeSource(element)"
            >
              删除图片
            </div>
            <div
              v-if="element.type === 2"
              class="operate-item text-hex-1ABC9C flex-1"
              @click.stop="removeSource(element)"
            >
              删除视频
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
        <VoVideo />
      </div>
    </a-modal>
    <VoMaterialLibrary
      :value="imagesValue"
      :target="`#${target}`"
      :container="props.container"
      v-model:visible="visibleMaterial"
      @change="selectImage"
    />
  </div>
</template>

<script lang="ts" setup>
  // images = id  name  src  type
  import draggable from 'vuedraggable'
  import VoMaterialLibrary from '/@/components/VoMaterialLibrary/VoMaterialLibrary.vue'

  import { ref, toRaw, toRef, unref, watch, watchEffect } from 'vue'
  // @ts-ignore  />
  import { PlusOutlined, PlayCircleFilled } from '@ant-design/icons-vue'
  import VoVideo from '/@/components/VoVideo/VoVideo.vue'
  import { message } from 'ant-design-vue'

  const emits = defineEmits(['change', 'storeType'])

  const dragging = ref(false)
  const enabled = ref(false)
  const visible = ref(false)
  const visibleMaterial = ref(false)
  const video_source = ref('')
  const target = ref('target' + new Date().getTime())
  const fallback =
    'data:image/png;base64,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'
  const props = defineProps({
    titles: {
      type: String,
      default: '上传商品头图',
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

  const imageFile = ref<any[]>([])
  const choosedImage = ref<any[]>([])
  const imagesValue = ref<any[]>([])
  const title = ref<string>(props.titles)

  const reUploadIndex = ref<number>(-1)

  // 反显的文件
  const selectImage = (file: any) => {
    if (reUploadIndex.value !== -1) {
      choosedImage.value = choosedImage.value.map((item, index) => {
        return index === reUploadIndex.value ? file : item
      })
      return
    }
    if (choosedImage.value.length >= props.images?.length) {
      return message.info(`最多上传${props.images?.length}张图片`)
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
  }

  watch(visibleMaterial, (newVal) => {
    if (!newVal) {
      reUploadIndex.value = -1
    }
  })

  watchEffect(() => {
    imageFile.value = props.images
    choosedImage.value = props.images?.filter((item: any) => item.src)
    console.log(choosedImage.value, 'xx')
  })

  watch(
    () => props.images,
    (val) => {
      imageFile.value = val
    },
    {
      deep: true,
    },
  )

  watch(
    () => props.titles,
    (newValue) => {
      title.value = newValue
    },
  )

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
      emits('change', toRaw(newVal))
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
    fontSize: '35px',
    color: '#8d8a8a',
  }
  const playStyle = {
    fontSize: '40px',
    color: '#07b4b4',
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
    width: 125px;
    height: 125px;
    overflow: hidden;
    margin: 10px auto 0;
    position: relative;

    .icon-play {
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .goods {
    .goods-image {
      display: flex;
      flex-wrap: wrap;

      .goods-image--item {
        margin-bottom: 20px;

        &:hover {
          .hover-operate {
            transform: translateY(0);
          }
        }

        overflow: hidden;

        &:last-child {
          margin-right: 0;
        }

        width: 150px;
        height: 170px;
        border: 1px solid #e4e4e4;
        margin-right: 20px;
        cursor: pointer;
        position: relative;

        .plus-text {
          font-size: 16px;
          margin-top: 5px;
          color: #666;
        }

        .icon-plus {
          text-align: center;
          position: absolute;
          top: 50%;
          width: 100%;
          transform: translate(0, -50%);
        }
      }
    }
  }
</style>
