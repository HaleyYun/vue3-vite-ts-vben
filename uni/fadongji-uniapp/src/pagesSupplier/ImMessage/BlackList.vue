<template>
  <view class="container">
    <VoNav is-fixed is-have-more isShadow title="黑名单">

    </VoNav>
    <view v-show="loading" class="loading-more">
      <VoIcon :size="20" color="#D3D4DB" name="refresh" />
    </view>
    <view class="flex1 overflow-y">
      <MyConcernList
        v-for="(concern, index) of myConcernList"
        :key="index"
        :attention="3"
        :my-concern-list="concern"
        @blackChange="blackChange"
      />
      <VoNoData v-if="!loading && myConcernList.length == 0" />
    </view>
    <VoModal
      v-if="showModal"
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModal"
      :showCancelButton="true"
      @cancel="showModal = false"
      @confirm="confirm"
    />
  </view>
</template>

<script>
  import MyConcernList from './components/MyConcernList'

  export default {
    name: 'BlackList',
    components: { MyConcernList },
    data() {
      return {
        loading: false,
        showModal: false,
        content: '',
        myConcernList: [],
        backInfo: {},
      }
    },
    created() {
      this.getBlackList()
    },
    methods: {
      // apiImFriendBlackList
      async getBlackList() {
        try {
          this.loading = true
          const { code, data } = await this.$VoHttp.IM.apiImFriendBlackList()
          if (code == '20001') {
            this.myConcernList = data ? data : []
          }
          this.loading = false
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      },
      async updateBlack() {
        // 解除黑名单 apiImFriendBlackSave   加入黑名单 apiImFriendBlackSave
        try {
          const { code } = await this.$VoHttp.IM.apiImFriendBlackRelieve({
            id: this.backInfo.targetUserId,
          })
          if (code == '20001') {
            this.$u.toast('解除拉黑成功')
            uni.$emit('updateMessageList')

            this.getBlackList()
          }
        } catch (e) {
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
        }
      },
      blackChange(data) {
        this.showModal = true
        this.backInfo = data
        console.log(this.backInfo)
        this.content = '是否移除黑名单'
      },
      confirm() {
        this.updateBlack()
        this.showModal = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
