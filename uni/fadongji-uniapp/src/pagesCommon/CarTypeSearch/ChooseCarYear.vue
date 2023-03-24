<template>
  <view class="flex flex-column vh-full overflow-hidden">
    <CarBreadCrumb />
    <scroll-view scroll-y class="flex1 bg-white overflow-hidden">
      <view v-if="dataList.length && loaded">
        <view class="bg-F7F7F8 h16 w-full" />
        <view class="bg-white px-26">
          <view class="p-t-16 p-b-10 lh150 fz-32 fz-b color-block-85">按年份</view>
        </view>
        <view>
          <view
            v-for="(item, index) in dataList"
            :key="index"
            class="p-l-32 bg-white"
            @click="toNextHandler(true, item)"
          >
            <view class="p-r-42 border-bottom">
              <view class="py-24 flex flex-vertical-c flex-justify-between">
                <view class="color-block-85 fz-28 lh150 font-weight-500">{{ item }}</view>
                <VoIcon name="arrow-right" size="18" color="#000" opacity="0.45" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <VoNoData
        v-if="!dataList.length && loaded"
        :no-data-tips="['暂无匹配信息']"
        :paddingTop="0"
      />
    </scroll-view>
    <view class="px-47 bg-white border-top">
      <view class="p-t-22 p-b-80">
        <EraButton size="large" text="跳过" @click="toNextHandler(false, { name: '年款' })" />
      </view>
    </view>
  </view>
</template>

<script>
  import CarBreadCrumb from './components/CarBreadCrumb'
  export default {
    name: 'ChooseCarYear',
    components: {
      CarBreadCrumb,
    },
    data() {
      return {
        queryParams: {
          filterType: 2,
        },
        dataList: [],
        previewData: null,
        loaded: false,
      }
    },
    onShow() {
      // 获取上一级选择数据
      const previewData = this.$storage.get('CarTypeChooseProgress')
      if (previewData) {
        this.previewData = previewData
        this.queryParams = {
          ...this.queryParams,
          ...previewData.queryParams,
        }
        this.initData()
      }
    },
    methods: {
      async initData() {
        const { data } = await this.$VoHttp.apiBusinessVehicleFilter(this.queryParams)
        console.log(data)
        this.dataList = data.yearList.reverse() || []
        this.loaded = true
      },

      jumpHandler() {
        this.previewData.queryParams['year'] = ''
        this.previewData.delta = 3
        this.$storage.set('CarTypeChooseProgress', this.previewData)
        uni.navigateTo({
          url: '/pagesCommon/CarTypeSearch/ChooseCardDisplacement',
        })
      },
      toNextHandler(flag, item) {
        const { queryParams, routeInfoList } = this.previewData
        const newQueryParams = {
          ...queryParams,
          year: flag ? item : '',
        }
        const newRouteInfoList = [
          ...routeInfoList,
          {
            name: flag ? item : '年款',
            query: {
              year: flag ? item : '',
            },
          },
        ]
        this.previewData.queryParams = newQueryParams
        this.previewData.delta = 3
        this.previewData.routeInfoList = newRouteInfoList
        this.$storage.set('CarTypeChooseProgress', this.previewData)

        uni.navigateTo({
          url: '/pagesCommon/CarTypeSearch/ChooseCarEngine',
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .title {
    @include black-size-color(32, 0.85);
  }
</style>
