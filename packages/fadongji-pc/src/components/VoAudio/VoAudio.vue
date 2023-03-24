<template>
  <div>
    <div
      class="h-40px flex items-center text-0px border-1px rounded-md cursor-pointer"
      @click="toggleHandler"
    >
      <VoIcon class="ml-10px" name="voice-icon" size="18" color="#ff6400" />
      <div class="text-14px pl-15px text-gray-600">{{ timeLong }}``</div>
      <div v-if="playing" class="ml-auto text-14px pr-10px">播放中...</div>
      <div v-else class="ml-auto text-14px pr-10px">已暂停</div>
    </div>
    <p v-if="error" class="text-12px text-red-500 mt-10px mb-0">语音加载失败-无法播放</p>
  </div>
  <audio :src="source" :autoplay="autoplay" ref="audio" @ended="endHandler"></audio>
</template>

<script setup lang="ts">
  import { defineProps, onMounted, ref, watch } from 'vue'
  import { message } from 'ant-design-vue'
  import VoIcon from '/@/components/VoIcon/VoIcon.vue'

  const props = defineProps({
    source: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  })

  const audio = ref()
  const error = ref(false)

  const playing = ref(props.autoplay)
  const timeLong = ref<number>(0)

  watch(
    () => props.source,
    () => {
      audioTimeLong()
    },
    {
      deep: true,
    },
  )

  onMounted(() => {
    audioTimeLong()
  })

  const endHandler = () => {
    playing.value = false
  }

  const toggleHandler = () => {
    if (error.value) {
      message.info('语音加载失败、无法播放')
      return
    }
    if (playing.value) {
      playing.value = false
      audio.value.pause()
    } else {
      audio.value.play()
      playing.value = true
    }
  }

  const audioTimeLong = () => {
    let audio = document.createElement('audio')
    audio.src = props.source

    audio.addEventListener('canplay', () => {
      timeLong.value = Math.floor(audio.duration)
    })
    audio.addEventListener('error', () => {
      timeLong.value = 0
      playing.value = false
      error.value = true
      message.info('语音加载失败、无法播放')
    })
  }

  //
</script>

<style scoped lang="less"></style>
