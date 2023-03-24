<template>
  <view
    class="select"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoSelectPro @initFn="initBackFn" :list="list"></VoSelectPro>
  </view>
</template>

<script>
export default {
  name: 'WarehouseSelectPro',
  data() {
    return {
      list:[],
      total:0,
      pageNo:1,
      pageSize:20,
      goodsName:''
    }
  },
  methods:{
    initBackFn(data){
      this.goodsName=data
      this.initFn(true)
    },
    initFn(init){
      if(init){
        this.list=[]
        this.pageNo=1
      }
      this.$VoHttp.apiWarehouseGoodsList({pageNo:this.pageNo,pageSize:this.pageSize,goodsName:this.goodsName}).then(res=>{
          if(res.data){
            res.data.records.map(item=>{
              item.pic=JSON.parse(item.pic)
              this.list.push(item)
            })
            this.total=res.data?res.data.total:0
          }
      })
    }
  },
   onLoad(options){
    this.warehouseId=options.warehouseId
    this.initFn('init')
   },
  onReachBottom(){
    if(this.total>this.list.length){
      this.pageNo++
      this.initFn()
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
