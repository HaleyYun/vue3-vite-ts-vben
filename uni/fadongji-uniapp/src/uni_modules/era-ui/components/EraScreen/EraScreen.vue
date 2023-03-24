<template>
  <view class="flex flex-justify-c flex-vertical-c" :style="itemStyle" @click="itemClick(text)">
    <view>{{text}}</view>
	<view :class="this.selected ? 'transform' : ''">
		<VoIcon :name="icon" />
	</view>
  </view>
</template>

<script>
  export default {
    name: 'EraScreen',
	
    /**
     * text 标题
     * icon 图标 默认arrow-bottom-fill
     */
    props: {
      text: {
        type: String,
        default: '',
      },
      icon: {
        type: String,
        default: 'arrow-bottom-fill',
      },
	  //菜单选择中时的样式
	  itemStyle: {
	      type: Object,
		  default:() => {return {padding: '20rpx',color:'#333333',fontSize:"16px"}}
	  },
    },
	data() {
		return{
			selected:false
		}
	},
	methods:{
		itemClick(item) {
			this.selected = !this.selected
			
			if(this.selected) {
				this.$emit("eraScreenClick",item)
			}	
		}
	}
  }
</script>

<style scoped>
  .transform {
    transform: rotate(180deg);
  }
</style>
