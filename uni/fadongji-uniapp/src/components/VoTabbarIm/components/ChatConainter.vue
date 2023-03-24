<template>
  <scroll-view
    :refresher-threshold="20"
    :refresher-triggered="triggered"
    :scroll-y="true"
    class="chart-container"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    refresher-enabled="true"
    scroll-top="0"
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scroll="onScroll"
    @scrolltolower="scrolltolower"
  >
    <!-- 下拉刷新组件 -->
    <VoListFresh :show="loadingStatus" />
    <template v-if="getChatList.length > 0">
      <ChatListItem
        v-for="(info, index) in getChatList"
        :key="index"
        :chat-item-info="info"
        @click.native="goChatPage(info)"
      />
      <VoLoadingText :has-more="getChatList.length < total" :loading="loading" />
    </template>
    <vo-no-data v-else-if="getChatList.length === 0 && !loading" no-data-tips="暂无聊天记录" />
    <VoModal
      v-if="showModal"
      :closeOnClickOverlay="true"
      title="提示"
      :content="content"
      :show="showModal"
      :showCancelButton="true"
      @cancel="showModal = false"
      @confirm="showModal = false"
      @close="showModal = false"
    />
  </scroll-view>
</template>

<script>
  import ChatListItem from '@/components/VoTabbarIm/components/ChatListItem'

  export default {
    name: 'ChatConainter',
    components: { ChatListItem },
    data() {
      return {
        // 聊天列表
        chatList: [],
        loading: false,
        pageNo: 1,
        pageSize: 10,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total: 0,
        noMore: false,
        showModal: false,
        content: '',
      }
    },
    computed: {
      getChatList() {
        const chatList= this.$store.getters['im/GET_MESSAGE'] ? this.$store.getters['im/GET_MESSAGE'] : []

        chatList.map(item=>{
          if(item.recordTimeLast){
            item.recordTimeLastText=this.$vocenApi.VoUtils.IMTimeTransfer(item.recordTimeLast || item.createTime)
          } else {
            item.recordTimeLastText=this.$vocenApi.VoUtils.IMTimeTransfer(item.createTime)
          }
        })


        console.log(chatList,"ccccccccc")

        return chatList
      },
    },
    created() {
      this.pageNo = 1
      this._init_func()
      uni.$on('updateMessageList', () => {
        this.pageNo = 1
        console.log('监听到了2222222')
        this._init_func()
      })
    },
    methods: {
      /**
       * 去聊天详情页
       */
      goChatPage(data) {
        console.log(data, '聊天列表页面进入')
        const info = {
          targetId: data.targetId,
          type: 0,
          note: data.targetName,
          platformCode: data.targetPlatformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      async _init_func(refresh) {
        if (this.loading) return
        if (refresh) {
          this.pageNo = 1
        }
        // this.chatList = []
        try {
          this.loading = true
          let { data } = await this.$VoHttp.IM.apiImMessageListSelectMessageList(
            {
              top: false,
              pageNo: this.pageNo,
              pageSize: this.pageSize,
            },
            { noLoading: true },
          )
          this.total = data.notTopPage.total + data.topList.length
          let chatList = []
          if (this.pageNo === 1) {
            chatList = this.chatList.concat(data.topList).concat(data.notTopPage.records)
          } else {
            chatList = this.getChatList.concat(data.notTopPage.records)
          }
          this.$store.commit('im/SET_MESSAGE', chatList)
        } catch (res) {
          if (!res || !res.data || !res.data.message) return
          this.content = `加载聊天记录失败:${res.data.message}`
          this.showModal = true
        }
        this.loading = false
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.pageNo = 1
          this._init_func()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.getChatList.length >= this.total) {
            // uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
          this.pageNo++
          this._init_func()
        }, 2000)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .chart-container {
    height: 100%;
  }
</style>
