<template>
  <view class="flex flex-column vh-full overflow-hidden">
    <CarBreadCrumb />
    <scroll-view scroll-y class="flex1 bg-white overflow-hidden">
      <view v-if="engineList.length && loaded">
        <view class="bg-F7F7F8 h16 w-full" />
        <view class="bg-white px-26">
          <view class="p-t-16 p-b-10 lh150 fz-32 fz-b color-block-85">按发动机</view>
        </view>
        <view>
          <view
            v-for="(item, index) in engineList"
            :key="index"
            class="p-l-32 bg-white"
            @click="toNextHandler(true, item)"
          >
            <view class="p-r-42 border-bottom">
              <view class="py-24 flex flex-vertical-c flex-justify-between">
                <view class="color-block-85 fz-28 lh150 font-weight-500">{{ item.name }}</view>
                <VoIcon name="arrow-right" size="18" color="#000" opacity="0.45" />
              </view>
            </view>
          </view>
        </view>
      </view>
	  <VoNoData
		v-if="!engineList.length && loaded"
		:no-data-tips="['暂无匹配信息']"
		:paddingTop="0"
	  />
    </scroll-view>
    
    <view class="px-47 bg-white border-top">
      <view class="p-t-22 p-b-80">
        <EraButton size="large" text="跳过" @click="toNextHandler(false, { name: '发动机' })" />
      </view>
    </view>
  </view>
</template>

<script>
  import CarBreadCrumb from './components/CarBreadCrumb'
  export default {
    name: 'ChooseCarEngine',
    components: {
      CarBreadCrumb,
    },
    data() {
      return {
        queryParams: {
          filterType: 4,
        },
        previewData: null,
        engineList: [],
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
        this.engineList = (data.engineList || []).map((item) => {
          return {
            ...item,
            name: `${item.engineModel} ${item.powerKw}${item.powerKw ? 'KW' : ''}`,
            queryName: `${item.engineModel}${item.powerKw}`,
          }
        })
        this.loaded = true
      },
      jumpHandler() {
        this.previewData.queryParams['engineModel'] = ''
        this.previewData.delta = 5
        this.$storage.set('CarTypeChooseProgress', this.previewData)
        uni.navigateTo({
          url: '/pagesCommon/CarTypeSearch/ChooseCarResult',
        })
      },
      toNextHandler(flag, item) {
        const { queryParams, routeInfoList } = this.previewData
        const newQueryParams = {
          ...queryParams,
          engineModel: flag ? item.queryName : '',
        }
        const newRouteInfoList = [
          ...routeInfoList,
          {
            name: item.name,
            query: {
              engineModel: flag ? item.queryName : '',
            },
          },
        ]
        this.previewData.queryParams = newQueryParams
        this.previewData.routeInfoList = newRouteInfoList
        this.previewData.delta = 5
        this.$storage.set('CarTypeChooseProgress', this.previewData)
        uni.navigateTo({
          url: '/pagesCommon/CarTypeSearch/ChooseCarResult',
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
