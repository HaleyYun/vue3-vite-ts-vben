<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="workbench"
  >
    <VoNav is-fixed is-have-more title="工作台设置" />
    <view class="workbench-content">
      <view v-for="(item, index) of workbenchList" :key="index">
        <view class="workbench-content__item flex flex-justify-between flex-vertical-c">
          <view class="title"> {{ item.name }}</view>
          <view class="flex flex-vertical-c">
            <EraSwitch
              v-model="item.status"
              activeColor="#00B359"
              inactiveColor="rgba(24, 34, 65, 0.25)"
              size="18"
              @change="changeSelecte($event,index)"
            />
            <block v-if="userInfo.roleCode!='supplier'">
              <VoIcon
                @click="upFn(index)"
                v-if="index>0"
                :opacity="0.45"
                :size="20"
                class="paddingLeft"
                color="#000"
                name="up-arrow"
              />
              <view v-else :size="20" class="upStatus" color="#8C8C8C" />
              <VoIcon
                @click="downFn(index)"
                v-if="index!=workbenchList.length-1"
                :opacity="0.45"
                :size="20"
                class="paddingLeft"
                color="#000"
                name="down-arrow"
              />
              <view v-else :size="20" class="upStatus" color="#8C8C8C" />
            </block>
          </view>
        </view>
        <EraLine customStyle="margin-left: 32rpx;" />
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        workbenchList: [],
      }
    },
    methods: {
      moveFn(a, b) {
        const seq=this.workbenchList[a].seq

        this.workbenchList[a].seq=this.workbenchList[b].seq
        this.workbenchList[b].seq=seq

        this.workbenchList.splice(b, 0, this.workbenchList.splice(a, 1)[0]);

        let arr=[]
        this.workbenchList.map(item=>{
          arr.push(item.seq)
        })


        this.changeListFn()
      },
      upFn(index){
        this.moveFn(index,index-1)
      },
      downFn(index){
        this.moveFn(index,index+1)
      },
      changeSelecte(boo,index) {
        this.workbenchList[index].status=boo
        this.changeListFn()
      },
      changeListFn(){
        let param={
          workbenchList:this.workbenchList
        }
        this.$VoHttp.apiAccountWorkbench$POST(param).then(res=>{
          uni.$u.toast('修改成功')
        })
      },
      initFn(){
        this.$VoHttp.apiAccountWorkbench$GET().then(res=>{
            this.workbenchList=res.data.workbenchList||[]
        })
      }
    },
    onLoad(){
      this.initFn()
    }
  }
</script>

<style lang="scss" scoped>
  .workbench {
    width: 750rpx;
    height: 100vh;

    &-content {
      margin-top: 16rpx;
      width: 100%;
      background-color: #ffffff;

      &__item {
        margin: 0rpx 32rpx;
        height: 92rpx;

        .title {
          color: $v-c0-85;
          font-size: 32rpx;
        }
        .paddingLeft {
          padding-left: 32rpx;
        }

        .upStatus {
          padding-left: 32rpx;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
</style>
