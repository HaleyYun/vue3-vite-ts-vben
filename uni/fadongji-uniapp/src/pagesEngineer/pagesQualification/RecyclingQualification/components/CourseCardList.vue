<template>
  <scroll-view @scrolltolower="scrolltolower" :scroll-y="true" class="scroll_list" scroll-left="120" v-on="$listeners">
    <view class="container">
      <CourseCard
        v-for="(item, key) in data"
        :key="key"
        :data="item"
        :isShowStatus="qualifyStatus"
        @nextPage="nextPage(item)"
      />
    </view>
  </scroll-view>
</template>

<script>
  import CourseCard from '../../components/CourseCard/CourseCard'

  export default {
    name: 'CourseCardList',
    components: {
      CourseCard,
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        },
      },
      qualifyType: {
        type: [String, Number],
        default: '',
      },
      qualifyStatus: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
    methods: {
      scrolltolower(){
        this.$emit('scrolltolower')
      },
      nextPage(item) {
        console.log(item)
        if (item.type === 1) {
          this.$linkToEasy(
            `/pagesEngineer/pagesQualification/RecyclingQualification/CourseDetailText?id=${item.contentId}&qualifyType=${this.qualifyType}`,
          )
        } else if (item.type === 2) {
          this.$linkToEasy(
            `/pagesEngineer/pagesQualification/RecyclingQualification/CourseDetail?id=${item.contentId}&qualifyType=${this.qualifyType}`,
          )
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .scroll_list {
    height: 100%;
    overflow-y: scroll;
  }
  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>
