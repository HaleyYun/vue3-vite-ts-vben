<template>
  <view>
    <VoNav is-fixed is-have-more>
      <view slot="title" class="flex flex-justify-c flex-vertical-c">
        <image class="h60 w60" :src="navInfo.logo" mode="aspectFit" />
        <view class="title m-l-10">{{ navInfo.name }}</view>
      </view>
      <view slot="back" class="flex flex-vertical-c">
        <view @click.stop="backHandler('back')">
          <VoIcon name="nav-back" color="#000" opacity="0.45" />
        </view>
        <view @click.stop="toChooseBrand">
          <VoIcon class="m-l-30" name="close-x" size="18" color="#000" opacity="0.45" />
        </view>
      </view>
    </VoNav>
    <view class="px-32 bg-white">
      <scroll-view
        class="w-full overflow-hidden bg-white h90"
        style="white-space: nowrap"
        scroll-x="true"
        scroll-with-animation
        :scroll-left="scrollLeft"
      >
        <view
          v-for="(item, index) in routeList"
          :key="index"
          class="inline-block m-t-25"
          @click="backHandler(index)"
        >
          <view class="flex flex-vertical-c">
            <view
              class="fz-28"
              :class="[index < routeList.length - 1 ? 'color-blue' : 'color-black-85']"
            >
              {{ item.name }}
            </view>
            <VoIcon
              v-if="index < routeList.length - 1"
              class="mx-14"
              name="arrow-right"
              size="18"
              color="#000"
              opacity="0.45"
            />
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CarBreadCrumb',
    data() {
      return {
        routeList: [],
        navInfo: {
          name: '',
          logo: '',
        },
        scrollLeft: 0,
        previewData: null,
        routeLength: 0,
      }
    },
    mounted() {
      const previewData = this.$storage.get('CarTypeChooseProgress')
      if (previewData) {
        this.navInfo = previewData.navData
        this.routeList = previewData.routeInfoList
        this.previewData = previewData
        this.routeLength = this.routeList.length
        this.$nextTick(() => {
          this.scrollLeft = 10000
        })
      }
    },
    methods: {
      // 返回 和 点击 任意一个返回逻辑处理
      async backHandler(index) {
        // 点击所有品牌
        if (index === 0) {
          this.toChooseBrand()
          return
        }
        // 点击自己
        if (this.routeLength - 1 === index) {
          console.log('点击自己,不执行')
          return
        }

        let list = []
        let delta = 1
        if (index === 'back') {
          delta = 1
          list = this.previewData.routeInfoList.slice(0, this.routeLength - 1)
        } else {
          // 返回到制定路由
          delta = this.previewData.routeInfoList.length - 1 - index
          list = this.previewData.routeInfoList.slice(0, index + 1)
        }
        let newQueryParams = {}
        list.forEach((item) => {
          newQueryParams = {
            ...newQueryParams,
            ...item.query,
          }
        })
        this.previewData.routeInfoList = list
        this.previewData.queryParams = newQueryParams
        await this.$storage.set('CarTypeChooseProgress', this.previewData)
        uni.navigateBack({ delta })
      },
      toChooseBrand() {
        this.$storage.set('CarTypeChooseProgress', this.previewData)
        uni.navigateBack({
          delta: this.previewData.delta,
        })
      },
    },
  }
</script>

<style scoped></style>
