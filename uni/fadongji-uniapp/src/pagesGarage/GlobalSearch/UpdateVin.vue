<template>
  <view class="vin">
    <VoNav is-fixed :title="title" is-have-more />

    <view v-if="imageInfoVO" class="vin-mask ">
      <image src="/static/garage/mask.jpg" class="w-full h-full"></image>
      <image @click="previewFn" v-if="imageInfoVO" :src="imageInfoVO" mode="aspectFit" class="block"></image>
    </view>
    <view class="fz-32 color-block-85 m-t-32 p-l-32  lh150">{{type===2?'未识别成功，请重新再试或选其他方式':'修改识别结果'}}</view>

    <view class="flex vin-group m-t-16" v-if="type===1">
      <block  v-for="(item,index) of codeInput"
              :key="index">
        <view
          class="group-input"
          :class="{'selected':selectIndex===index}"
          @click="changeFn(index)"
        >{{item}}</view>
      </block>
    </view>
    <block v-else-if="type===2">
      <u--input
        placeholder="请输入车架号或发动机识别码"
        v-model.trim="vinVal"
        clearable
        class="m-l-32 m-r-32 input-vin m-t-16"
        placeholderClass="placeholderClass"
        fontSize="18"
        @input="inputFn"
      ></u--input>
    </block>


    <view class="w-full border-box p-l-32 p-r-32 flex flex-vertical-c flex-justify-between">
      <EraButton size="small" @click.native="sureFn">
        <block slot="default">
          <view class="flex flex-vertical-c">
            <VoIcon :size="20" color="#fff" class="m-r-16"  name="garage-search" />
            <view class="fz-28 color-white">确认无误查询</view>
          </view>
        </block>
      </EraButton>
      <EraButton size="small" theme-type="default" @click="vinFn">
        <block slot="default">
          <view class="flex flex-vertical-c">
            <VoIcon opacity="0.85" :size="20" color="#000" class="m-r-16"  name="scan-not-vin" />
            <view class="fz-28 color-block-85">重新扫描</view>
          </view>
        </block>
      </EraButton>
    </view>



    <VoKeyboard @chooseFn="chooseFn"  ref="keyboardRef"></VoKeyboard>
  </view>
</template>

<script>

import EraButton from "@/uni_modules/era-ui/components/EraButton/EraButton";
import VoKeyboard from "@/components/VoKeyboard/VoKeyboard";
import { chooseImageOcrByPromise, hideLoading, vocenCameraFn } from "@/common/helper";
export default {
  name: 'UpdateVin',
  components: { VoKeyboard, EraButton },
  data() {
    return {
      type:1,// 1修改  2输入
      selectIndex:-1, // -1未选择
      code:'',
      codeInput:[],
      vinVal:'',
      title:'修改VIN码',
      imageInfoVO:'',
    }
  },
  onLoad(options){
    if(options.type){
      this.type=Number(options.type)
    }
    if(this.type===2){
      this.title='识别结果'
    }
    this.imageInfoVO=options.imageInfoVO
    if(options.code){
      this.code=options.code
      this.codeInput=this.code.split('')
    }

  },
  methods:{
    sureFn(){
      if(this.type===1){
        // 修改
        this.$linkToEasy(`/pagesGarage/GlobalSearch/QueryResult?code=${this.codeInput.join('')}&type=handInput&imageInfoVO=${this.imageInfoVO}`)
      }else{
        // 输入
        if(!this.vinVal){
          this.$u.toast('请输入车架号或发动机识别码')
          return
        }
        this.$linkToEasy(`/pagesGarage/GlobalSearch/QueryResult?code=${this.vinVal}&type=handInput&imageInfoVO=${this.imageInfoVO}`)

      }

    },
    async vinFn(){
        let res=null

        // #ifdef APP-PLUS
        res=await vocenCameraFn('/v1/api/business/vehicle/scan/vinoreno')
        // #endif
        // #ifndef APP-PLUS
        res = await chooseImageOcrByPromise({
          count: 1,
          sizeType: ['compressed'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/scan/vinoreno',
        })
        res.type='scan'
        // #endif


        if (res && res.data) {
          let data = JSON.parse(res.data)
          if (+data.data.scanResultType === 1) {
            // 商品
            this.$linkToEasy(`/pagesGarage/GlobalSearch/QueryResult?code=${data.data.code}&type=${res.type}&imageInfoVO=${data.data&&data.data.imageInfoVO&&data.data.imageInfoVO.filePath?data.data.imageInfoVO.filePath:''}`)
          } else if (+data.data.scanResultType === 2) {
            // 售后
            this.$linkToEasy(`/pagesGarage/GlobalSearch/AfterSalesService?code=${data.data.code}`)
          }else{
            this.$u.toast('未识别成功')
            this.type=2
            if(data.data&&data.data.imageInfoVO&&data.data.imageInfoVO.filePath){
              this.imageInfoVO=data.data.imageInfoVO.filePath
            }
          }
        }


    },
    chooseFn(e){
      if(e!=-1){
        this.codeInput[this.selectIndex]=e
      }
      this.selectIndex=''
    },
    changeFn(index){
      this.selectIndex=index
      this.$refs.keyboardRef.showFn()
    },
    inputFn(e){
      setTimeout(()=>{
        this.vinVal=e.replace(/[^0-9a-zA-Z]/g,'')
      },10)
    },
    previewFn(){
      uni.previewImage({
        urls:[this.imageInfoVO]
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.vin{
  width: 750rpx;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #FFFFFF;
  &-mask{
    width: 750rpx;
    height: 480rpx;
    position: relative;

  }
  &-group{
    width: 750rpx;
    height: 60rpx;
    margin-bottom: 64rpx;
  }
  .group-input{
    flex: 1;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    box-sizing: border-box;
    border-top: 2rpx solid #ebebeb;
    border-left: 2rpx solid #ebebeb;
    border-bottom: 2rpx solid #ebebeb;
    font-size: 32rpx;
    color:rgba(0, 0, 0, 0.85) !important; ;
    border-radius: 0rpx !important;
  }
  .block{
    display: block;
    position: absolute;
    left: 60rpx;
    width: 630rpx;
    top: 30rpx;
    height: 420rpx;
  }
  .input-vin{
    height: 96rpx;
    line-height: 96rpx;
    box-sizing: border-box;
      background-color: #f7f7f8 !important;
    border-radius: 8rpx;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    margin-bottom: 64rpx;
  }
  .placeholderClass{
    color: rgba(0, 0, 0, 0.25) !important;
    font-size: 28rpx !important;
  }
  .selected{
    background: #FFECE5!important;
    border: 2rpx solid #ffb299 !important;
    color:#FF5319!important; ;
  }
}

</style>
