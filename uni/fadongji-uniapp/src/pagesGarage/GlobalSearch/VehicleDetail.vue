<template>
  <view class="vehicle">
    <VoNav title="车型详情" is-have-more />


    <!--  基本信息  -->
    <view class="bg-f7f7f8 w-full h16"></view>
    <view class="vehicle-title">基本信息</view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">品牌</view>
      <view class="color-block-65 flex1 ">{{ vehicleInfo.brand }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">厂家</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.manufactor }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">车系</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.series }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">车型</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.model }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">销售名称</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.salesName }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">年款</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.year }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">排放标准</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.emissionStandard }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">车辆类型</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.vehicleType }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">车辆级别</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.vehicleSize }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">代数（换代）</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.generation }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">生产年份</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.producedYear }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">国别</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.country }}</view>
    </view>




    <!--  发动机  -->
    <view class="bg-f7f7f8 w-full h16"></view>
    <view class="vehicle-title">发动机</view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">发动机型号</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.engineModel }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">排量</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.displacement }}</view>
    </view>



    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">气缸容积</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.cylinderVolume }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">气缸数</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.cylinders }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">气缸排列形式</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.cylinderArrangement }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">每缸气门数（个）</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.valvesPerCylinder }}</view>
    </view>


    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">进气形式</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.induction }}</view>
    </view>


    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">缸径</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.bore }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">燃油类型</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.fuelType }}</view>
    </view>


    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">最大功率（KW）</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.powerKw }}</view>
    </view>


    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">燃油标号</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.fuelGrade }}</view>
    </view>

    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">供油方式</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.compressionRatio }}</view>
    </view>

    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">压缩比</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.fueliInjection }}</view>
    </view>



    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">冲程</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.stroke }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">发动机描述</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.engineDescription }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">发动机特有技术</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.engineKnowhow }}</view>
    </view>








    <!--  车身信息  -->
    <view class="bg-f7f7f8 w-full h16"></view>
    <view class="vehicle-title">车身信息</view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">驱动方式</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.driveMode }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">驱动形式</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.driveModel }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">变速器类型</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.transmissionType }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">变速器描述</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.transmissionDescription }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">档位数</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.gearNumber }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">车门数</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.doors }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">座位数</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.seats }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">车身型式</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.bodyType }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">油箱容积</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.fuelTankCapacity }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">行李箱容积</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.luggagePlace }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">整备质量</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.curbWeight }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">最大载重质量</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.maxLoading }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">车顶形式</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.roofType }}</view>
    </view>
    <view class="vehicle-item">
      <view class="m-r-32 color-block-85 vehicle-item__name">发动机位置</view>
      <view class="color-block-65 flex1">{{ vehicleInfo.engineLocation }}</view>
    </view>




  </view>
</template>

<script>

export default {
  name: 'VehicleDetail',
  data() {
    return {
      levelId:'',
      vehicleInfo:{}
    }
  },
  onLoad(options){
    this.levelId=options.levelId||''
    this.initFn()
  },
  methods:{
    initFn(){
          this.$VoHttp.apiBusinessVehicleQueryVehicleDetail({
            levelId:this.levelId
          }).then(res=>{
            this.vehicleInfo=res.data
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.vehicle{
  width: 750rpx;
  min-height: 100vh;
  background-color: #FFFFFF;
  overflow-x: hidden;

  &-title{
    height: 88rpx;
    padding: 0rpx 32rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    line-height: 88rpx;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
  }
  &-item{
    width: 718rpx;
    margin-left: 32rpx;
    font-size: 32rpx;
    padding: 16rpx 32rpx 16rpx 0rpx;
    line-height: 150%;
    border-bottom: 2rpx solid #f7f7f8;
    display: flex;
    box-sizing: border-box;
    &__name{
      width: 160rpx;
    }
    &:last-child{
      border-bottom: 0rpx;
    }
  }

  .bg-f7f7f8{
    background-color: #f7f7f8;
  }
}


</style>
