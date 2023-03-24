<template>
  <view class="content">
    <u-tabs
      :current="current"
      :lineColor="lineColor"
      :scrollable="scrollable"
      :list="tabList"
      @click="clickTabFn"
    />

    <swiper class="content-swiper" :circular="circular" :current="current" @change="changeSwiperFn">
      <swiper-item v-for="(item, index) of tabList" :key="index">
        <scroll-view
          :refresher-enabled="refresherEnabled"
          class="content-swiper__scroll"
          :scroll-y="true"
          @scrolltolower="scrolltolowerFn(index)"
        >
          <slot :name="'swiper' + index"></slot>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    name: 'VoTabSwiper',
    props: {
      //是否可滑动顶部tab
      scrollable: {
        type: Boolean,
        default: true,
      },
      //选中颜色
      lineColor: {
        type: String,
        default: '#3c9cff',
      },
      //播放到末尾后是否重新回到开头
      circular: {
        type: Boolean,
        default: false,
      },
      refresherEnabled: {
        type: Boolean,
        default: true,
      },
      //tab数组
      tabList: {
        type: Array,
        default: () => [
          {
            name: '关注',
          },
          {
            name: '推荐',
          },
          {
            name: '电影',
          },
        ],
      },
    },
    data() {
      return {
        current: 0,
      }
    },
    methods: {
      /**
       *  点击tabbar
       */
      clickTabFn(e) {
        this.current = Number(e.index)
        this.$emit('clickTabFn', this.current)
        console.warn(e, '11111111111')
      },
      /**
       *  滑动swiper
       */
      changeSwiperFn(e) {
        this.current = Number(e.detail.current)
      },
      /**
       * scroll 触底事件
       * @param index tablist index
       */
      scrolltolowerFn(index) {
        this.$emit('scrolltolowerFn', index)
        console.log(index, '触底触底')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 750rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &-swiper {
      flex: 1;
      overflow: hidden;
      width: 100%;

      &__scroll {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
  }
</style>
