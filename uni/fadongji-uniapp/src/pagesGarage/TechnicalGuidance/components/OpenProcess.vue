<template>
  <scroll-view class="scroll-list" :scroll-with-animation="true" :scroll-y="true" :scroll-into-view="scrollIntoView">
    <CourseBox
      v-for="(item, index) in dataList"
      :id="'cate'+index"
      :key="index"
      :title="item.text"
      @moreClick="toPage(item)"
    >
      <view class="course-list">
        <CourseItem v-for="listItem in item.list" :key="listItem.id" :dataObj="listItem" @click="toDetail(listItem)" />
      </view>
    </CourseBox>
  </scroll-view>
</template>
<script>
  import CourseBox from '@/pagesSupplier/BusinessUniversity/components/CourseBox'
  import CourseItem from '@/pagesSupplier/BusinessUniversity/components/CourseItem'
  export default {
    name: 'openProcess',
    components: { CourseBox, CourseItem },
    props: {
      tabList:{
        required:true,
        defualt:()=>[]
      },
      scrollIntoView:{
        type:String,
        default:'cate0'
      },
      list: {
        type: Array,
      },
    },
    data() {
      return {
        dataList: [
          //{
          //  text: '开店课程',
          //  detailPage: '1',
          //  list: [
          //    {
          //      id: '1',
          //    },
          //    {
          //      id: '9',
          //    },
          //  ],
          //},
          //{
          //  text: '仓储运营',
          //  detailPage: '2',
          //  list: [
          //    {
          //      id: '11',
          //    },
          //  ],
          //},
          //{
          //  text: '内容营销',
          //  detailPage: '3',
          //  list: [
          //    {
          //      id: '12',
          //    },
          //  ],
          //},
          //{
          //  text: '数据工具',
          //  detailPage: '4',
          //  list: [
          //    {
          //      id: '13',
          //    },
          //  ],
          //},
          //{
          //  text: '客户管理',
          //  detailPage: '5',
          //  list: [
          //    {
          //      id: '14',
          //    },
          //  ],
          //},
        ],
      }
    },
    methods: {
      async _init_func(){
        this.dataList = this.tabList.map(item=>{
          return {
            text:item.name,
            pageNo:1,
            pageSize:10,
            cateId:item.id,
            list:[]
          }
        })

        this.dataList.forEach(item=>{
          this.$VoHttp.apiContentUniversitySelectCourse({
            data:{
              categoryId:item.cateId
            }
          }).then(res=>{
            item.list= res.data.records||[]
            item.total = res.data.total
          })
        })
      },
      toPage(item) {
        console.log(item.detailPage)
      },
      toDetail(listItem){
        this.$linkToEasy(`/pagesSupplier/BusinessUniversity/CourseDetail?id=${listItem.id}`)
      },
    },
    created() {
      this._init_func()
    }
  }
</script>
<style lang="scss" scoped>
  .scroll-list {
    height: 100%;
    overflow-y: auto;
    .course-list {
      width: 100%;
      column-count: 2; //分为两列,用于瀑布流
      column-gap: 18upx;
    }
  }
</style>
