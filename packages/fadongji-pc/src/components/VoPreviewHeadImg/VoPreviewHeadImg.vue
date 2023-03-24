<template>
  <div class="images flex flex-wrap">
    <div
      v-for="(item, index) in sources"
      :key="index"
      class="flex-item justify-center flex items-center mr-10px mb-10px w-150px h150px"
    >
      <a-image
        v-if="item.type === 1"
        style="width: 150px; height: 150px; border-radius: 5px"
        :src="transferCosUrl(item.src, 1)"
        :preview="{
          src: item.src,
        }"
      />
      <div v-else class="relative">
        <img
          :src="poster ? transferCosUrl(poster, 1) : transferCosUrl(item.src, 3)"
          class="w-150px h-150px rounded-5px object-cover"
        />
        <img class="icon-play absolute w-35px h-35px z-10 top-55px left-55px" src="../../assets/images/play.png"  @click="showVideo(item)"/>
        <!-- <PlayCircleFilled
          class="icon-play absolute z-10 top-55px left-55px"
          :style="playStyle"
          @click="showVideo(item)"
        /> -->
      </div>
    </div>
  </div>
  <div v-if="videoVisible">
    <a-modal width="600px" v-model:visible="videoVisible" @ok="videoVisible = false">
      <VoVideo :poster="poster" :url="video" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  //
  import { ref, watch, onBeforeMount } from 'vue'
  import VoVideo from '../VoVideo/VoVideo.vue'
  import { Pattern } from '@vocen/shared'
  import { PlayCircleFilled } from '@ant-design/icons-vue'
  import { transferCosUrl } from '/@/utils'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const props: any = defineProps({
    dataSource: {
      type: Array,
      default() {
        return []
      },
    },
    poster: {
      type: String,
    },
    type: {
      type: [Number, String],
      default: 0,
    },
  })
  const playStyle = {
    fontSize: '40px',
    color: '#07b4b4',
  }

  const sources = ref<any>([])
  const video = ref('')

  const showVideo = (item) => {
    video.value = item.src
    videoVisible.value = true
  }

  const formatSource = (list: []) => {
    return (
      list &&
      list
        .map((item: any) => {
          return {
            src: item,
            type: item && Pattern.isVideoUrl(item.toLowerCase()) ? 2 : 1,
            poster: item && Pattern.isVideoUrl(item.toLowerCase()) ? '' : '',
          }
        })
        .filter((item) => {
          if (+props.type === 0) {
            return true
          }
          if (+props.type === 1) {
            return item.type === 1
          }
          if (+props.type === 2) {
            return item.type === 2
          }
        })
    )
  }

  const videoVisible = ref(false)

  onMountedOrActivated(() => {
    sources.value = formatSource(props.dataSource)
  })

  watch(
    () => props.dataSource,
    (val: any) => {
      sources.value = formatSource(val)
    },
  )
</script>

<style scoped lang="less"></style>
