<template>
  <div className="h-full">
    <div ref="domRef" @click.stop></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import Player from 'xgplayer'

  const domRef = ref<HTMLElement>()
  const player = ref<Player>()

  const props = defineProps({
    url: {
      type: String,
      default:
        'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
    },
    poster: {
      type: String,
      default: '',
    },
  })

  function renderXgPlayer() {
    console.log(props.poster, '000000000000')

    if (!domRef.value) return
    const url = props.url
    player.value = new Player({
      el: domRef.value,
      url,
      volume: 0.3,
      videoInit: true,
      loop: false,
      autoplay: true,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      poster: props.poster,
    })
  }

  function destroyXgPlayer() {
    player.value?.destroy()
  }

  onMounted(() => {
    renderXgPlayer()
  })

  onUnmounted(() => {
    destroyXgPlayer()
  })
</script>
<style scoped></style>
