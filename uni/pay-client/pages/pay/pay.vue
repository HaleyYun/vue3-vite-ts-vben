<template>
  <view class="page-wrap">
    <div class="p-t-20 p-l-15 p-r-15">
      <div class="form">
        <div class="group-cell">
          <div class="cell-item">
            <div class="label">订单号</div>
            <div class="content">{{req.orderId}}</div>
          </div>
          <div class="cell-item bor-b">
            <div class="label">待付金额</div>
            <div class="content"><span class="color-red">￥{{req.cashAmount}}</span></div>
          </div>
        </div>
      </div>
      <div class="m-t-30">
        <button @click="getPayParmsFn" type="primary">立即支付</button>
      </div>
    </div>
	<div v-if="showMask" class="mask">
		<div class="mask-content">
			<div class="content-title">是否放弃本次支付</div>
			<div style="display: flex;">
				<button @click="showMask=false" open-type="launchApp" class="sure" type="primary" @error="launchAppError">放弃</button>
				<button @click="getPayParmsFn" class="cancel" type="primary" >继续支付</button>
			</div>
		</div>
	</div>
  </view>
</template>

<script>
import http from "../../utils/http";
import Promisify from "../../utils/Promisify";
import {linkToEasy} from "../../utils/helpers";

export default {
  data() {
    return {
		showMask:false,
        req:{},
    }
  },
  onLoad(options) {
    let req=JSON.parse(options.req)
    this.req=req
    uni.setStorageSync('access_token',req.access_token)

  },
  methods: {
	  launchAppError (e) {
	    console.log(e.detail.errMsg)
	    var msg = e.detail.errMsg
	    if(msg === 'invalid scene')msg ='场景值不符,只有APP唤起的小程序才可以返回'
	    uni.showModal({title:'唤起app失败',content:msg})
	  },
	  async prePay(){
		  try {
		  		  this.showMask=false
		    const wxLoginRt = await Promisify('login').catch(() => {
		      throw Error('微信login错误')
		    })
		  		console.log(wxLoginRt,"wxLoginRt");
		    const { code } = wxLoginRt
		  
		  
		    const getPayConifParams={
		        licenseId:'133960256299597825',
		        req:{...this.req}
		    }
		  
		  
		  		getPayConifParams['req']['payKey']=code
		  
		    console.log(getPayConifParams,"dddd");
		  		let payOpts=''
		  		if(this.req&&this.req.repaymentOrderLogBOList){
		  			 payOpts= await http.post({url: 'http://pregate.fdjcyl.com/vocen-wolverine/pay/repayment/pay', params: {req:getPayConifParams.req},options:{tip:'加载中',addHost:false}}).then(res => {
		  			  console.log(res)
		  			  return JSON.parse(res.data.data.payInfo)
		  			}).catch(err => {
		  			  uni.showToast({
		  			  	title: err.message||'拉起微信错误',
		  			  			icon:'none'
		  			  });
		  			  return
		  			})
		  		}else{
		  			payOpts= await http.post({url: 'pay/pay', params: getPayConifParams}).then(res => {
		  			  console.log(res)
		  			  return JSON.parse(res.data.data.payInfo)
		  			}).catch(err => {
		  			  uni.showToast({
		  			  	title: err.message||'拉起微信错误',
		  			  			icon:'none'
		  			  });
		  			  return
		  			})
		  		}
		  		
		  		
		   
		  
		  
		    console.log(payOpts,"payOptspayOptspayOpts");
		  
		    const provider = 'wxpay'
		  
		    var payConf = {
		      ...payOpts,
		      // timeStamp: payOpts.timeStamp,
		      // nonceStr: payOpts.nonceStr,
		      // package: payOpts.package,
		      // signType: 'MD5',
		      // paySign: payOpts.paySign,
		      provider
		    }
		    await Promisify('requestPayment', payConf).catch(err => {
		      throw Error(err.errMsg)
		    })
		  
		    linkToEasy('/pages/done/done')
		  }catch (e) {
		  		 
		  		 
		  }
	  },
    async getPayParmsFn(){
		
		

      try {
		  this.showMask=false
        const wxLoginRt = await Promisify('login').catch(() => {
          throw Error('微信login错误')
        })
		console.log(wxLoginRt,"wxLoginRt");
        const { code } = wxLoginRt


        const getPayConifParams={
            licenseId:'133960256299597825',
            req:{...this.req}
        }


		getPayConifParams['req']['payKey']=code

        console.log(getPayConifParams,"dddd");
		let payOpts=''
		if(this.req&&this.req.repaymentOrderLogBOList){
			 payOpts= await http.post({url: 'pay/repayment/pay', params: {req:getPayConifParams.req}}).then(res => {
			  console.log(res)
			  return JSON.parse(res.data.data.payInfo)
			}).catch(err => {
			  uni.showToast({
			  	title: err.message||'拉起微信错误',
			  			icon:'none'
			  });
			  return
			})
		}else{
			payOpts= await http.post({url: 'pay/pay', params: getPayConifParams}).then(res => {
			  console.log(res)
			  return JSON.parse(res.data.data.payInfo)
			}).catch(err => {
			  uni.showToast({
			  	title: err.message||'拉起微信错误',
			  			icon:'none'
			  });
			  return
			})
		}
		
		
       


        console.log(payOpts,"payOptspayOptspayOpts");

        const provider = 'wxpay'

        var payConf = {
          ...payOpts,
          // timeStamp: payOpts.timeStamp,
          // nonceStr: payOpts.nonceStr,
          // package: payOpts.package,
          // signType: 'MD5',
          // paySign: payOpts.paySign,
          provider
        }
        await Promisify('requestPayment', payConf).catch(err => {
          throw Error(err.errMsg)
        })

        linkToEasy('/pages/done/done')
      }catch (e) {
		 
		 
      }
    }
  }
}
</script>

<style>
.mask{
	width: 750rpx;
	height: 100%;
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.45);
}
.mask-content{
	position: fixed;
	width: 640rpx;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	border-radius: 8rpx;
	
}
.mask-content button {
	  background-color: rgb(247, 247, 247);
	  border-radius: 0rpx;
	  padding: 0rpx;
	  margin: 0rpx;
	  display: inline-block;
	  line-height: 1;
	}
	 
.mask-content button::after {
	  /*button的边框样式是通过::after方式实现的*/
	  border: none;
	
	}
.content-title{
	color: rgba(0, 0, 0, 0.85);
	font-size: 32rpx;
	text-align: center;
	width: 100%;
	height: 208rpx;
	line-height: 208rpx;
	border-bottom: 2rpx solid rgba(0, 0, 0, 0.08);;
}
.mask-content .sure{
	width: 320rpx;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	color: rgba(0, 0, 0, 0.65);
	font-size: 32rpx;
	box-sizing: border-box;
	border-right: 2rpx solid rgba(0, 0, 0, 0.08);;
	background-color: #FFFFFF;
}
.mask-content .cancel{
	width: 320rpx;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	color: rgba(0, 0, 0, 0.85);
	font-size: 32rpx;
	box-sizing: border-box;
	background-color: #FFFFFF;
}
</style>
