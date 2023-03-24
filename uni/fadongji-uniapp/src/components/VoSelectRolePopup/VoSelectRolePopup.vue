<template>
  <view>
    <view v-if="showBoo">
      <u-picker-era
        :columns="roleArr"
        :defaultIndex="defaultIndex"
        :show="show"
        confirmColor="rgba(0, 0, 0, 0.85)"
        keyName="roleName"
        title="角色选择"
        @cancel="cancel"
        @confirm="confirm"
        ref="pickerRef"
      >
      </u-picker-era>
    </view>
  </view>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'VoSelectRolePopup',
    props: {
      roleCode: {
        type: String,
        default: '',
      },
      show: {
        type: Boolean,
        default: true,
      },
      // 新增邀请筛选（不可自主注册角色：招商经理、渠道经理、回收公司）
      notArr: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        showBoo: true,
        defaultIndex: [],
        roleArr: [[]],
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        roleArrGet: 'role/roleArrGetter',
      }),
    },
    created() {
      this.initFn()
    },
    methods: {
      async initFn(role) {
        this.showBoo = false
        //拿vuex里面的角色列表
        const roleArr = await this.$store.dispatch('role/getRoleArr')
        let roleCode = this.roleCode
        if (role) {
          roleCode = role
        }
        roleArr.map((item, index) => {
          if (item.roleCode === roleCode) {
            this.defaultIndex[0] = index
          }
          // 新增邀请筛选（不可自主注册角色：招商经理、渠道经理、回收公司）
          if (this.notArr.length > 0) {
            if (this.notArr.indexOf(item.roleCode) === -1) {
              this.roleArr[0].push(item)
            }
          } else {
            this.roleArr[0].push(item)
          }
        })
        this.showBoo = true
      },
      confirm(e) {
        const role = this.roleArr[0][e.indexs[0]].roleCode
        this.$emit('confirmFn', role)
      },
      cancel() {
        this.$emit('update:show', false)
        this.$emit('cancelFn')
      },
    },
  }
</script>

<style lang="scss" scoped></style>
