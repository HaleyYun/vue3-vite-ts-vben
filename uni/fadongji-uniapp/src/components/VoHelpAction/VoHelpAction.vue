<template>
  <view>
    <VoActionSheet
      class="action-sheet"
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      @select="actionSelect"
      @close="close"
    />
  </view>
</template>

<script>
  import { goOnlineCustomerFn, cellPhone } from '@/common/helper'
  import { storage } from '@/common/unifyGlobalReg'


// #ifdef APP-PLUS
//   const vocenService = uni.requireNativePlugin('vocen-qimoService')
  // #endif

  export default {
    name: 'VoHelpAction',
    props: {
      noMoor:{
        type:Boolean,
        default:false
      },
      actions:{
        type:Array,
        default:()=>[
          {
            type: 'im',
            name: '在线客服',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 'phone',
            name: '400-893-5518',
            phone: '400-893-5518',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          }
        ]
      }
    },
    data() {
      return {
        showAction: false,
      }
    },
    methods: {
      /**
       *  打开
       */
      open() {
        this.showAction = true
      },
      /**
       * 关闭
       */
      close() {
        this.showAction = false
      },
      /**
       * @description 帮助中心事件
       */
      actionSelect(e) {
        let that = this
        if (e.type === 'phone') {
          if(this.noMoor){
            cellPhone(e.phone)
          }else{
            this.$VoHttp.apiExtraCustomerMoor().then((res) => {
              cellPhone(e.phone)
            })
          }


        } else if (e.type === 'im') {
          goOnlineCustomerFn()
        }
        this.$emit('select', e)
      },
	  /**
	   * 跳转七陌客服
	   */
	  goService(type) {
	  	const userInfo = storage.get('userInfo')
	  	let param = {}
	  	param.userName = userInfo.userName
	  	param.userId = userInfo.id
		param.mobile = '400-893-5518'
	  	// 跳转不同的客服
	  	if (+type === 1) {
	  		param.appkey = 'b3c770c0-ab23-11ec-8fcc-d9e18082232d'
	  		param.peers = '10055349'

	  	} else if (+type === 2) {
	  		param.appkey = 'e663dc50-4932-11ed-9746-c593049817ab'
	  		param.peers = '10057414'
	  	} else {
	  		param.appkey = '0c936760-4933-11ed-9746-c593049817ab'
	  		param.peers = '10057415'
	  	}

	    // #ifdef APP-PLUS
	    // let that = this
	    // vocenService.voQiMoServiceData(
	    //   param,
	    //   (res) => {
	    //     let dict = res
	    //     console.log(dict)
	    //
	    //   },
	    // )
	    // #endif
	  }
    },
  }
</script>
