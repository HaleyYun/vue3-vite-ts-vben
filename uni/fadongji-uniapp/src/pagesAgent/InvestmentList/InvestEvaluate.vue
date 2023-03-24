<template>
  <view
    class="evaluate flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="全部评价" />
    <EvaluateTags class="evaluate-tag" :tags="tagList"></EvaluateTags>
    <view v-for="(item, index) in evaluateData" :key="index">
      <view class="evaluate-line"></view>
      <EvaluateItem class="evaluate-item" :evaluate-data="item" />
    </view>
  </view>
</template>

<script>
import EvaluateTags from './components/EvaluateTags'
import EvaluateItem from './components/EvaluateItem'
	export default {
  components: {
    EvaluateTags,
    EvaluateItem,
  },
		data() {
			return {
        tagList: [
          { name: '全部', number: '3' },
          { name: '安装简单', number: '256' },
          { name: '省油', number: '256' },
          { name: '服务热情', number: '999+' },
          { name: '耐磨好用', number: '256' },
        ],
        evaluateData: [
          {
            logo: '/static/logo-2.png',
            name: '河南新乡',
            score: '5',
            time: '2022.06.21',
            number: '4',
            content:
              '保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限。',
            imageUrl: [
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
            ],
          },
          {
            logo: '/static/logo-2.png',
            name: '河南新乡',
            score: '5',
            time: '2022.06.21',
            number: '4',
            content:
              '保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限。',
            imageUrl: [
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              {
                type: '2',
                videoPoster: 'https://cdn.uviewui.com/uview/album/1.jpg',
                url:
                  'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
              },
            ],
          },
          {
            logo: '/static/logo-2.png',
            name: '河南新乡',
            score: '5',
            time: '2022.06.21',
            number: '4',
            content:
              '保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限。',
            imageUrl: [
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
            ],
          },
          {
            logo: '/static/logo-2.png',
            name: '河南新乡',
            score: '5',
            time: '2022.06.21',
            number: '4',
            content:
              '保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限。',
            imageUrl: [
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
            ],
          },
          {
            logo: '/static/logo-2.png',
            name: '河南新乡',
            score: '5',
            time: '2022.06.21',
            number: '4',
            content:
              '保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限。',
            imageUrl: [
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
            ],
          },
          {
            logo: '/static/logo-2.png',
            name: '河南新乡',
            score: '5',
            time: '2022.06.21',
            number: '4',
            content:
              '保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限，保险那么多，自己预算有限。',
            imageUrl: [
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
              { type: '1', url: 'https://cdn.uviewui.com/uview/album/1.jpg' },
            ],
          },
        ],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.evaluate {
  width: 750rpx;
  min-height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
  
  &-tag {
    padding: 0rpx 32rpx;
  }
  
  &-item {
    padding: 0rpx 32rpx;
  }
  &-line {
    height: 16rpx;
    width: 750rpx;
    background-color: $v-bg-light;
  }
}
</style>
