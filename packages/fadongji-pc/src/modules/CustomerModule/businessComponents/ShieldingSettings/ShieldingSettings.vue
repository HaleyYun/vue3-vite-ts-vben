<template>
  <div class="category">
    <div class="category-item">
      <div class="category-label">屏蔽品牌：</div>
      <div class="category-content">
        <a-button @click="addBlockedBrands">
          <template #icon>
            <plus-outlined/>
          </template>
          添加屏蔽品牌
        </a-button>
        <ACard size="small" class="card-style">
          <a-tag closable style="margin-bottom: 10px" v-for="(item,index) of blockedBrandsList" :key="item.id+'blocked'"
                 @close.prevent="handleClose(item)">{{item.name}}
          </a-tag>
        </ACard>
      </div>
    </div>
    <a-modal
            v-model:visible="visible"
            title="添加屏蔽品牌"
            centered
            destroy-on-close
            :confirmLoading="loading"
            @cancel="modalCloseHandler"
            width="600px"
            @ok="submitHandler"
    >
      <div class="max-h-60vh overflow-y-auto overflow-x-hidden	min-h-200px relative">
        <div>
          <div class="flex px-24px py-16px">
            <span>当前已选择品牌：</span>
            <a-checkable-tag v-for="(item,index) of selectedBrandsList.slice(0,3)"  style="width: 88px" :checked="true" >
              <div class="truncate text-xs" :title="item.name">{{item.name}}</div>
            </a-checkable-tag>
            <span class="text-base" v-if="selectedBrandsList.length > 3">+{{selectedBrandsList.length-3}}</span>
          </div>
          <a-divider style="padding: 0;margin: 0" />
        </div>
        <div>
          <div class="absolute -right-22px">
            <a-tabs v-model:activeKey="brandsActive" tab-position="left" @tabClick="targetHandler(brandsActive)" animated>
              <a-tab-pane  v-for="(section, idx) in brandsList" :key="idx" :tab="section.en" ></a-tab-pane>
            </a-tabs>
          </div>
          <div class="flex pt-16px pl-24px mb-10px" v-for="(section, idx) in brandsList" :key="idx" :id="section.en">
            <div v-for="tag in section.list" :key="tag" class="flex">
              <a-checkable-tag style="margin-bottom: 10px;width: 88px" :checked="brandsChecked(tag)" @change="checked => handleChange(tag, checked)">
                <div class="truncate text-xs" :title="tag.name">{{ tag.name }}</div>
              </a-checkable-tag>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>

</template>

<script lang="ts" setup>
  import {ref, reactive, onBeforeMount, computed} from 'vue';
  import adminHttp from '/@/utils/http/adminHttp'
  import {getChineseFirstName} from '/@/utils/helper/pinyin'
  import {PlusOutlined} from '@ant-design/icons-vue';
  import {useMessage} from '/@/hooks/web/useMessage'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const {createMessage} = useMessage();


  const blockedBrandsList = ref([]) // 屏蔽品牌数据
  const brandsId = ref(''); // 品牌id
  const loading = ref(false);


  const props = defineProps({
    companyId: {
      type: String,
      default: '',
    },
  });
  const getInfo = async () => {
    const {code, data} = await adminHttp.GOODS.goodsBrandApplyShieldBrandList({companyId: props.companyId});
    if (code == '20001') {
      brandsId.value = data.id ? data.id : '';
      blockedBrandsList.value = data.brands ? data.brands : [];
    }
  };


  // -----添加品类---------
  const visible = ref(false)
  const brandsActive = ref(0); // 品牌按首字母选择
  const brandsList = ref([]) // 所有品牌列表
  const selectedBrandsList = ref([]) // 选择品牌
  const brandsChecked = computed(() => {
    return function (tag) {
      let brands = selectedBrandsList.value.map(item => {
        return item.id;
      })
      if (brands.includes(tag.id)) {
        return true
      } else {
        return false
      }
    }
  })
  const addBlockedBrands = () => {
    selectedBrandsList.value = blockedBrandsList.value;

    goodsCategoryCategoryAdd()
    visible.value = true;
  }
  const goodsCategoryCategoryAdd = async () => {
    try {
      const {code, data} = await adminHttp.GOODS.goodsBrandBrandShield()
      if (code == '20001') {
        const showList = []
        data.forEach(item=>{
          for (var key in item) {
            showList.push({en: key, list: item[key]})
          }
        })

        brandsList.value = showList;
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 删除屏蔽品牌
  const handleClose = (item) => {
    console.log(item)
    let brandsList = blockedBrandsList.value.filter(tag => tag.id !== item.id);
    CategoryAdd(brandsList)
  }

  const handleChange = (tag: string, checked: boolean) => {
    const selectedTags = selectedBrandsList.value;
    selectedBrandsList.value = checked
        ? [...selectedTags, tag]
        : selectedTags.filter(t => t.id !== tag.id);
  };


  // 按字母排序 这是前端的方法暂时先不用
  const alphabeticalSorting = (list) => {
    const brandsList = list.map((item) => {
      return {
        ...item,
        firstEn: getChineseFirstName(item.name),
      }
    })
    const enOjb = []
    brandsList.forEach((item) => {
      if (!enOjb.hasOwnProperty(item.firstEn)) {
        enOjb[item.firstEn] = []
      }
      enOjb[item.firstEn].push(item)
    })

    const showList = []
    for (var key in enOjb) {
      showList.push({en: key, list: enOjb[key]})
    }
    return showList
  }

  // 定位
  const targetHandler = (index, target) => {
    let id = '#'+brandsList.value[brandsActive.value].en
    document.querySelector(id).scrollIntoView({ behavior: 'smooth',block:'start',inline:'start' })
  }


  //关闭弹出框
  const modalCloseHandler = () => {
    visible.value = false
  }
  const submitHandler = async () => {
    if (selectedBrandsList.value.length == 0) {
      createMessage.error('请至少选中一个品牌!')
      return;
    }
    CategoryAdd(selectedBrandsList.value)
  }
  // goodsCategoryCertificationCategoryAdd
  const CategoryAdd = async (selectedList) => {
    try {
      loading.value = true;
      let params = {}
      let ids = selectedList.map((item => {
        return item.id
      }))

      if (brandsId.value) {
        params = {brand: ids, companyId: props.companyId, id: brandsId.value}
      } else {
        params = {brand: ids, companyId: props.companyId}
      }
      const {code, data} = await adminHttp.GOODS.goodsBrandApplyShieldBrand(params)
      if (code == '20001') {
        visible.value = false
        createMessage.success('操作成功')
        getInfo()
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false;
    }
  }


  onMountedOrActivated(() => {
    getInfo();
  })


</script>

<style scoped lang="less">

  .category {
    width: 80%;
    .card-style {
      margin-top: 24px;
      min-height: 70px;
    }
    .grid {
      width: 25%;
      text-align: center;
      margin: 15px;
    }
    .category-item {
      display: flex;
      margin-bottom: 30px;
      .category-label {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: #262626;
        width: 90px;
      }
      .category-content {
        width: calc(100% - 90px);
        text-align: left;
      }
    }

  }

  ::v-deep(.ant-tag-checkable) {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    padding: 2px 5px;
    font-size: 14px;
    text-align: center;
  }

  ::v-deep(.ant-tag-checkable-checked) {
    border: 1px solid #1890ff;
  }


</style>
