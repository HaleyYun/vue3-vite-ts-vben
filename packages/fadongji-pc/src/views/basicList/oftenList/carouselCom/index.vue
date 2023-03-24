<template>
  <div class="carousel">
    <h1 class="titleCarousel">Carousel 走马灯</h1>
    <h2>当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。</h2>
  </div>
  <div class="carouselList">
    <h1> 常用于一组图片或卡片轮播。 </h1>
    <Carousel :after-change="onChange">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
    <br />
    <br />
    <h1> 切换效果为渐显。 </h1>
    <Carousel effect="fade">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {  },
    setup() {
      const onChange = (current: number) => {
        console.log(current)
      }

      return {
        onChange,
      }
    },
  })
</script>

<style>
  .carousel {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleCarousel {
    font-size: 30px;
  }

  .carouselList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }

  .ant-carousel .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
</style>
