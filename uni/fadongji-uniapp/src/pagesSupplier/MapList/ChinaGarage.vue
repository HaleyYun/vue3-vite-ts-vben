<template>
  <view class="container">
    <VoNav :is-fixed="false" is-have-more :title="title" />
    <view class="mapContainer" id="mapContainer" />
  </view>
</template>

<script>
  import img from '@/static/common/map/marker-orange.png'
  import { getLocationForNvue } from "@/common/helper";
  export default {
    data() {
      return {
        img: img,
        latitude: 34.795326, // 地图默认显示的维度
        longitude: 113.808754, // 地图默认显示的纬度
        markers: [
          // {
          //   "latitude": 34.795348,
          //   "longitude": 113.808776,
          //   "joinCluster": true,
          //   "id": 23
          // }, {
          //   "latitude": 34.795349,
          //   "longitude": 113.808777,
          //   "joinCluster": true,
          //   "id": 24
          // }, {
          //   "latitude": 34.79535,
          //   "longitude": 113.808778,
          //   "joinCluster": true,
          //   "id": 25
          // }, {
          //   "latitude": 34.795351,
          //   "longitude": 113.808779,
          //   "joinCluster": true,
          //   "id": 26
          // }, {
          //   "latitude": 34.795352,
          //   "longitude": 113.80878,
          //   "joinCluster": true,
          //   "id": 27
          // }, {
          //   "latitude": 34.795353,
          //   "longitude": 113.808781,
          //   "joinCluster": true,
          //   "id": 28
          // }, {
          //   "latitude": 34.795354,
          //   "longitude": 113.808782,
          //   "joinCluster": true,
          //   "id": 29
          // }, {
          //   "latitude": 34.795355,
          //   "longitude": 113.808783,
          //   "joinCluster": true,
          //   "id": 30
          // }, {
          //   "latitude": 34.795356,
          //   "longitude": 113.808784,
          //   "joinCluster": true,
          //   "id": 31
          // }, {
          //   "latitude": 34.795357,
          //   "longitude": 113.808785,
          //   "joinCluster": true,
          //   "id": 32
          // }, {
          //   "latitude": 34.795358,
          //   "longitude": 113.808786,
          //   "joinCluster": true,
          //   "id": 33
          // }, {
          //   "latitude": 34.795359,
          //   "longitude": 113.808787,
          //   "joinCluster": true,
          //   "id": 34
          // }, {
          //   "latitude": 34.79536,
          //   "longitude": 113.808788,
          //   "joinCluster": true,
          //   "id": 35
          // }, {
          //   "latitude": 34.795361,
          //   "longitude": 113.808789,
          //   "joinCluster": true,
          //   "id": 36
          // }, {
          //   "latitude": 34.795362,
          //   "longitude": 113.80879,
          //   "joinCluster": true,
          //   "id": 37
          // }, {
          //   "latitude": 34.795363,
          //   "longitude": 113.808791,
          //   "joinCluster": true,
          //   "id": 38
          // }, {
          //   "latitude": 34.795364,
          //   "longitude": 113.808792,
          //   "joinCluster": true,
          //   "id": 39
          // }, {
          //   "latitude": 34.795365,
          //   "longitude": 113.808793,
          //   "joinCluster": true,
          //   "id": 40
          // }, {
          //   "latitude": 34.795366,
          //   "longitude": 113.808794,
          //   "joinCluster": true,
          //   "id": 41
          // }, {
          //   "latitude": 34.795367,
          //   "longitude": 113.808795,
          //   "joinCluster": true,
          //   "id": 42
          // }, {
          //   "latitude": 34.795368,
          //   "longitude": 113.808796,
          //   "joinCluster": true,
          //   "id": 43
          // }, {
          //   "latitude": 34.795369,
          //   "longitude": 113.808797,
          //   "joinCluster": true,
          //   "id": 44
          // }, {
          //   "latitude": 34.79537,
          //   "longitude": 113.808798,
          //   "joinCluster": true,
          //   "id": 45
          // }, {
          //   "latitude": 34.795371,
          //   "longitude": 113.808799,
          //   "joinCluster": true,
          //   "id": 46
          // }, {
          //   "latitude": 34.795372,
          //   "longitude": 113.8088,
          //   "joinCluster": true,
          //   "id": 47
          // }, {
          //   "latitude": 34.795373,
          //   "longitude": 113.808801,
          //   "joinCluster": true,
          //   "id": 48
          // }, {
          //   "latitude": 34.795374,
          //   "longitude": 113.808802,
          //   "joinCluster": true,
          //   "id": 49
          // }, {
          //   "latitude": 34.795375,
          //   "longitude": 113.808803,
          //   "joinCluster": true,
          //   "id": 50
          // }, {
          //   "latitude": 34.795376,
          //   "longitude": 113.808804,
          //   "joinCluster": true,
          //   "id": 51
          // }, {
          //   "latitude": 34.795377,
          //   "longitude": 113.808805,
          //   "joinCluster": true,
          //   "id": 52
          // }, {
          //   "latitude": 34.795378,
          //   "longitude": 113.808806,
          //   "joinCluster": true,
          //   "id": 53
          // }, {
          //   "latitude": 34.795379,
          //   "longitude": 113.808807,
          //   "joinCluster": true,
          //   "id": 54
          // }, {
          //   "latitude": 34.79538,
          //   "longitude": 113.808808,
          //   "joinCluster": true,
          //   "id": 55
          // }, {
          //   "latitude": 34.795381,
          //   "longitude": 113.808809,
          //   "joinCluster": true,
          //   "id": 56
          // }, {
          //   "latitude": 34.795382,
          //   "longitude": 113.80881,
          //   "joinCluster": true,
          //   "id": 57
          // }, {
          //   "latitude": 34.795383,
          //   "longitude": 113.808811,
          //   "joinCluster": true,
          //   "id": 58
          // }, {
          //   "latitude": 34.795384,
          //   "longitude": 113.808812,
          //   "joinCluster": true,
          //   "id": 59
          // }
        ],
        map: {},
        title: '全国修理厂',
        type: 1,
        markerLayer: {},
      }
    },
    onLoad(opt) {
      if (+opt.type === 1) {
        this.title = '全国修理厂'
      } else if (+opt.type === 2) {
        this.title = '全国服务商'
      } else if (+opt.type === 3) {
        this.title = '全国仓库'
      }
      this.type = +opt.type
      uni.showLoading({
        title: '加载中',
      })
    },
    async onReady() {
      await this.getData()
    },
    methods: {
      async getData() {
        let param = {
          pageNo: 1,
          pageSize: 999999999,
        }
        if (this.type === 1) {
          try {
            let result = await getLocationForNvue()
            if (!result || result === '取消了') {
              this.$backFn()
              return
            }
            const { longitude, latitude } = result
            this.latitude = latitude
            this.longitude = longitude
          } catch (e) {
            this.$backFn()
          }
          param = {
            latitude: this.latitude,
            longitude: this.longitude,
          }
          param.platformCode = 'garage'
        } else if (this.type === 2) {
          param.platformCode = 'agent'
        } else if (this.type === 3) {
          param.platformCode = 'warehouse'
        }
        try {
          let data
          let res
          if (this.type === 1) {
            res = await this.$VoHttp.apiImportGarageMap(param, { noLoading: true })
          } else {
            res = await this.$VoHttp.apiCompanyInfoMapAllStatistical(param, { noLoading: true })
          }
          console.log(res)
          data = res.data
          let arr = []
          if (this.type === 1) {
            data.forEach((item) => {
              if (item.latitude) {
                arr.push({ position: new TMap.LatLng(item.latitude, item.longitude) })
              }
            })
          } else {
            data.records.forEach((item) => {
              if (item.latitude) {
                arr.push({ position: new TMap.LatLng(item.latitude, item.longitude) })
              }
            })
          }
          this.markers = arr
          this.initMap()
        } catch (e) {
          console.log(e)
          uni.hideLoading()
          this.$u.toast(e.message || '网络错误')
        }
      },
      // 地图初始化函数
      initMap() {
        console.log('window', window)
        console.log(window.TMap)
        // 定义地图中心点坐标
        let center = new window.TMap.LatLng(this.latitude, this.longitude)
        // 定义map变量，调用 TMap.Map() 构造函数创建地图
        this.map = new window.TMap.Map(document.getElementById('mapContainer'), {
          center: center, // 设置地图中心点坐标
          zoom: 17.2, // 设置地图缩放级别
          // pitch: 43.5, // 设置俯仰角
          // rotation: 45, // 设置地图旋转角度
        })
        // 点击地图新增标点 如果不给地图添加坐标点,这里可以忽略了
        // map.on("click", (e) => {
        //
        //   this.markerLayer.setGeometries([]);
        //   const position = e.latLng;
        //   this.addImgMarker(position);
        // });
        this.addImgMarker()
      },
      // 点击给地图增加标点
      // addImgMarker(data) {
      //   this.markerLayer = new TMap.MultiMarker({
      //     map: this.map,
      //     //样式定义
      //     styles: {
      //       //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
      //       myStyle: new TMap.MarkerStyle({
      //         width: 25, // 点标记样式宽度（像素）
      //         height: 35, // 点标记样式高度（像素）
      //         src:
      //           "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", //图片路径
      //         //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
      //         anchor: { x: 16, y: 32 },
      //       }),
      //     },
      //     //点标记数据数组
      //     geometries: [
      //       {
      //         id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
      //         styleId: "myStyle", //指定样式id
      //         position: data, //点标记坐标位置
      //       },
      //     ],
      //   });
      // },

      addImgMarker() {
        // 创建点聚合实例
        var markerCluster = new TMap.MarkerCluster({
          id: 'cluster',
          map: this.map,
          enableDefaultStyle: true, // 启用默认样式
          minimumClusterSize: 2, // 形成聚合簇的最小个数
          geometries: this.markers,
          // geometries: [
          //   { // 点数组
          //   position: new TMap.LatLng(39.953416, 116.480945)
          // },
          //   {
          //     position: new TMap.LatLng(39.984104, 116.407503)
          //   },
          //   {
          //     position: new TMap.LatLng(39.908802, 116.497502)
          //   },
          //   {
          //     position: new TMap.LatLng(40.040417, 116.373514)
          //   },
          //   {
          //     position: new TMap.LatLng(39.953416, 116.380945)
          //   },
          //   {
          //     position: new TMap.LatLng(39.984104, 116.307503)
          //   },
          //   {
          //     position: new TMap.LatLng(39.908802, 116.397502)
          //   },
          //   {
          //     position: new TMap.LatLng(40.040417, 116.273514)
          //   },
          // ],
          zoomOnClick: true, // 点击簇时放大至簇内点分离
          gridSize: 10, // 聚合算法的可聚合距离
          averageCenter: false, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
          maxZoom: 30, // 采用聚合策略的最大缩放级别
        })
        uni.hideLoading()
      },
    },
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    flex-wrap: nowrap;

    .mapContainer {
      width: 100%;
      height: 100%;
    }
  }
</style>
