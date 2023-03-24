<template>
	<view>
    <view class="page-wrap">
      <div class="p-30">
        <div class="result">
          <image class="icon" mode="widthFix" src="/static/WeUIsuccess.png"></image>
          <div class="c9">请返回app完成后续操作</div>
        </div>
        <div class="m-t-30">
          <button open-type="launchApp" type="primary" @error="launchAppError">点击返回应用</button>
        </div>
      </div>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
      launchAppError (e) {
        console.log(e.detail.errMsg)
        var msg = e.detail.errMsg
        if(msg === 'invalid scene')msg ='场景值不符,只有APP唤起的小程序才可以返回'
        uni.showModal({title:'唤起app失败',content:msg})
      },
      backApp(){

      }
		}
	}
</script>

<style scoped lang="scss">
.result{
  text-align: center;
  .icon{
    width: 160rpx;
    margin-bottom: 30rpx;
  }
}
</style>
