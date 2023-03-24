<template>
    <div class="items-center">
      <div>
        <div @click.stop class="w-40px h-40px m-15px" v-if="source && sourceType === 1">
          <a-image style="width: 40px; height: 40px" :src="source" />
        </div>
        <div v-if="source && sourceType === 2" @click="visibleVideo = true">
          <div class="w-60px h-60px rounded-5px overflow-hidden relative">
            <img class="object-cover w-60px h-60px" :src="poster" alt="" />
            <div
              class="absolute top-15px left-15px z-10 bg-[#fff] rounded-50px text-0 w-25px h-25px flex justify-center items-center"
            >
              <PlayCircleOutlined style="color: #ff6400" class="text-green-600 text-25px" />
            </div>
          </div>
        </div>
        <div
          @click.stop
          v-if="source && sourceType === 3"
          class="text-green-500 text-14px"
          @click="showAudio = true"
        >
          语音[{{ timeLong }}``]
        </div>
      </div>
      <div class="pl-10px">
        <div v-if="title" class="text-blue-600 text-14px font-bold">{{ title }}</div>
        <div v-if="content" class="text-gray-600 text-14px mt-2">{{ content }}</div>
      </div>
      <div>
        <a-modal destroy-on-close title="语音" @ok="showAudio = false" v-model:visible="showAudio">
          <VoAudio :source="source" />
        </a-modal>
        <a-modal
          v-model:visible="visibleVideo"
          :width="750"
          title="视频播放"
          :destroy-on-close="true"
          @ok="visibleVideo = false"
        >
          <div class="flex p-10 justify-center" @click.stop>
            <VoVideo :poster="poster" :url="source" />
          </div>
        </a-modal>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    //
    import { computed, defineProps, ref } from 'vue'
    import { Pattern } from '@vocen/shared'
    import VoAudio from '/@/components/VoAudio/VoAudio.vue'
    import VoVideo from '/@/components/VoVideo/VoVideo.vue'
    import { PlayCircleOutlined } from '@ant-design/icons-vue'
  
    const props = defineProps({
      title: {
        type: String,
        default: '标题',
      },
      content: {
        type: String,
        default: '内容',
      },
      source: {
        type: String,
        default: '',
      },
      poster: {
        type: String,
        default: '',
      },
    })
  
    const visibleVideo = ref(false)
    const showAudio = ref(false)
    const timeLong = ref<number>(0)
    const sourceType = computed(() => {
      console.log(props.source)
      if (Pattern.isImgUrl(props.source.toLocaleLowerCase())) {
        return 1
      }
      if (Pattern.isVideoUrl(props.source.toLocaleLowerCase())) {
        return 2
      }
      if (Pattern.isAudioUrl(props.source.toLocaleLowerCase())) {
        audioTimeLong()
        return 3
      }
      return 0
    })
  
    const audioTimeLong = () => {
      let audio = document.createElement('audio')
      audio.src = props.source
  
      audio.addEventListener('canplay', () => {
        timeLong.value = Math.floor(audio.duration)
      })
      audio.addEventListener('error', () => {
        timeLong.value = 0
      })
    }
  </script>
  
  <style scoped lang="less"></style>
  