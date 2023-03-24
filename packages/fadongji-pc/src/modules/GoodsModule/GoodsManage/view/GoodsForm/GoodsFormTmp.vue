<template>
  <div>
    <div class="page-wrap">
    <div class="page-left" :class="{ toggle: menuSetting.collapsed }">
      <div class="page-left-container">
        <ASteps v-model:current="current" direction="vertical">
          <a-step
            class="step-title"
            title="商品信息"
            @click.stop="targetHandler(0, 0, '#basic-list')"
          >
            <template #description>
              <div class="step-title" @click.stop="targetHandler(0, 0, '#basic-list')">
                基本信息
              </div>
              <div class="step-title" @click.stop="targetHandler(1, 0, '#attribute')">
                属性及价格区间
              </div>
            </template>
          </a-step>
          <a-step
            class="step-title"
            title="商品描述及服务"
            @click.stop="targetHandler(2, 1, '#service')"
          >
            <template #description>
              <div class="step-title" @click.stop="targetHandler(2, 1, '#service')">服务信息</div>
              <div class="step-title" @click.stop="targetHandler(3, 1, '#picture')">商品头图</div>
              <div class="step-title" @click.stop="targetHandler(4, 1, '#details')">图文详情</div>
            </template>
          </a-step>
          <a-step class="step-title" title="提交" @click.stop="targetHandler(4, 2, '#picture')" />
        </ASteps>
      </div>
    </div>
    <div class="page-right" id="container">
      <section>
        <div id="basic-list">
          <div class="basic section">
            <div class="basic--title section-title">基础信息</div>
            <div class="basic-content section-content">
              <Form :label-col="{ style: { width: '70px' } }" :wrapper-col="{ span: 6 }">
                <FormItem label="商品类别">
                  <span>{{ categoryName }}</span>
                </FormItem>
                <FormItem label="运营类别">
                  <span>{{ operateName }}</span>
                </FormItem>
                <FormItem label="商品品牌">
                  <a-cascader
                    v-model:value="brandSelectId"
                    :options="brandSelectOptions"
                    :field-names="{ label: 'name', value: 'id' }"
                    placeholder="请输入商品品牌"
                    @change="getBrandId"
                  />
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="attribute">
          <div class="price section">
            <div class="price--title section-title">属性及价格区间</div>
            <div class="price-content section-content">
              <div class="section-mtitle">规格属性：</div>
              <GoodsSpecBox :template-data="templateData" :specs="specs" />
              <div class="section-mtitle">价格区间：</div>
              <GoodsSkuBox :template-data="templateData" :id="initID" ref="skuRef" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="service">
          <div class="sales section">
            <div class="sales--title section-title">服务信息</div>
            <div class="sales-content section-content">
              <div class="margin-b-10 font-bold">
                <a-checkbox v-model:checked="serviceConfig.checkOne"> 售卖物料支持</a-checkbox>
              </div>
              <div v-if="serviceConfig.checkOne">
                <p>1、售卖物料:</p>
                <VoGoodsHeaderImage
                  container="#container"
                  :images="material"
                  titles="上传图片/视频"
                  @change="getEramaterialFunc($event, transType.MATERIAL)"
                />
                <p class="text-upload">支持上传jpg、jpge图片、mp 4视频，每张不超过5M</p>
                <p>2、售卖物料缩略图:</p>
                <VoGoodsHeaderImage
                  container="#container"
                  :images="OriginMaterialImg"
                  titles="上传原材料"
                  @change="getEraOriginMaterialFunc($event, transType.ORIGINMATERIALIMG)"
                />
                <p class="text-upload">支持上传1张jpg、jpge图片，尺寸800*800，最大仅不超过2M</p>
                <a-divider />
              </div>

              <div class="tutorial">
                <div class="font-bold">
                  <a-checkbox v-model:checked="serviceConfig.checkThree">
                    安装指导、安装视频
                  </a-checkbox>
                </div>
                <div v-if="serviceConfig.checkThree" class="mt-10px">
                  <div class="pb-10px">1.安装指导:</div>
                  <VoGoodsHeaderImage
                    container="#container"
                    :images="InstallGuide"
                    titles="上传图片"
                    @change="getInstallGuideFunc($event, transType.INSTALLGUIDE)"
                  />
                  <p class="text-upload pt-10px">
                    仅支持上传1张jpg、jpge图片，建议宽度790px，最大不超过2M
                  </p>
                  <div>
                    <span>2.安装视频:</span>
                    <div>
                      <VoGoodsHeaderImage
                        container="#container"
                        :images="video"
                        titles="上传视频"
                        @change="getInstallVideoFunc($event, transType.VIDEO)"
                      />
                    </div>
                    <p class="text-upload">仅支持上传1个 mp4文件，最大不超过15M</p>
                    <a-divider />
                  </div>
                  <div class="font-bold">
                    <a-checkbox v-model:checked="serviceConfig.checkThree">
                      7*24小时人工技术支持
                    </a-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="picture">
          <div class="figure section">
            <div class="figure--title section-title">商品头图</div>
            <div class="figure-content section-content">
              <div class="figure-content-header pt-10px">
                <VoGoodsHeaderImage
                  container="#container"
                  :images="images"
                  @change="imgHeadChange($event, transType.IMAGES)"
                />
              </div>
              <p class="figure-content-text">
                上传3张，最多5张图片，建议尺寸800*800px，图片大小不超过2M，视频至少不超过15M，JPG,JPEG，mp
                4格式，您可以拖拽图片/视频顺序调整
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="details">
          <div class="situation section">
            <div class="situation--title section-title">商品详情</div>
            <div class="situation-content section-content pt-10px">
              <VoGoodsHeaderImage
                container="#container"
                :images="goodsDetails"
                titles="商品详情"
                @change="getGoodsDetailFunc($event, transType.GOODSDETAILS)"
              />
            </div>
            <p class="figure-content-text pl-10px">
              建议宽度790px，图片使用JPG,JPEG格式，大小不超过2M，视频使用mp4格式，大小不超过15M，图片+视频总量不超过10个，您可以拖拽图片/视频调整顺序
            </p>
          </div>
        </div>
      </section>
      <section>
        <div id="edit-content">
          <div class="edit-btn">
            <a-space :size="15">
              <Button type="warning" size="large" @click="saveExit()">保存草稿并退出</Button>
              <Button size="large" @click="saveReleased()">保存到待发布</Button>
              <Button type="primary" size="large" @click="release()">发布商品</Button>
            </a-space>
          </div>
        </div>
      </section>
    </div>
  </div>
  <EraParameter container="#container" v-model:visible="parameterVisible" />
  <VoBenefit v-model:visible="benefitVisible" />
  </div>
</template>

<script lang="ts">
  import { useMessage } from '/@/hooks/web/useMessage'
  // 传递给图片弹框内容，系统弹框退出后，触发相对应的图片区域的函数
  import { useRoute, useRouter } from 'vue-router'
  import VoBenefit from '/@/components/VoBenefit/VoBenefit.vue'
  import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
  import EraParameter from '../../component/EraParameter.vue'
  import { caseContent } from '/@/modules/GoodsModule/GoodsManage/mock'
  import { draftContent } from '/@/modules/GoodsModule/GoodsManage/component'
  import { Button, Form } from 'ant-design-vue'
  import VoGoodsHeaderImage from '/@/components/VoGoodsHeaderImage/VoGoodsHeaderImage.vue'
  import { transmitEnum } from '/@/modules/GoodsModule/GoodsTemplate/data/data'
  import { useAppStore } from '/@/store/modules/app'
  import adminHttp from '/@/utils/http/adminHttp'
  import { detailsImgDefault, transUploadDataPipeEvent } from './data'
  import GoodsSpecBox from '/@/modules/GoodsModule/GoodsManage/view/GoodsForm/components/GoodsSpecBox/GoodsSpecBox.vue'
  import GoodsSkuBox from '/@/modules/GoodsModule/GoodsManage/view/GoodsForm/components/GoodsSkuBox/GoodsSkuBox.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  // 商品详情
  const goodsDetails = ref(detailsImgDefault)
  // 上传视频
  const videoImg = ref([
    {
      id: 'video-1',
      name: '视频1',
      src: '',
      type: 2,
    },
  ])

  const defaultMaterial = [
    {
      id: new Date().getTime(),
      name: new Date().getTime(),
      src: '',
      type: 1,
    },
  ]
  const material = ref<any>(defaultMaterial)

  const defaultOriginMaterialImg = [
    {
      id: new Date().getTime(),
      name: new Date().getTime(),
      src: '',
      type: 1,
    },
  ]
  const OriginMaterialImg = ref(defaultOriginMaterialImg)

  const defaultInstallGuide = [
    {
      id: new Date().getTime(),
      name: new Date().getTime(),
      src: '',
      type: 1,
    },
  ]
  const InstallGuide = ref(defaultInstallGuide)

  const defaultVideo = [
    {
      id: new Date().getTime(),
      name: new Date().getTime(),
      src: '',
      type: 2,
    },
  ]
  const video = ref(defaultVideo)

  // 商品头图
  const images = ref([
    {
      id: 1,
      name: '测试1',
      src: '',
      type: 1,
    },
    {
      id: 2,
      name: '22',
      src: '',
      type: 1,
    },
    {
      id: 3,
      name: '3',
      src: '',
      type: 1,
    },
    {
      id: 4,
      name: '4',
      src: '',
      type: 1,
    },
    {
      id: 5,
      name: '5',
      src: '',
      type: 1,
    },
  ])

  const serviceConfig = reactive({
    checkOne: true,
    checkTwo: true,
    checkThree: true,
  })

  // "新增商品模板"的form
  interface goodFormItem {
    operateName: string | undefined
    categoryName: string | undefined
    randSelectOptions: Array<[string]>
    categoryId: string | undefined
  }

  export default defineComponent({
    name: 'GoodsForm',
    components: {
      GoodsSkuBox,
      GoodsSpecBox,
      Button,
      Form,
      FormItem: Form.Item,
      VoBenefit,
      VoGoodsHeaderImage,
      EraParameter,
      // VoMaterialLibrary,
    },
    setup() {
      const $router = useRouter()
      const skuRef = ref()
      const templateData = ref<any>([])
      // categoryId name
      const baseModel = reactive({
        categoryId: '',
        name: '',
      })
      // 创建“发布”数据模型
      const templateModel: any = {
        picture: [] as any[], // 头图
        detailsPicture: [] as any[], // 商品详情图
        serviceConfig: [
          {
            id: 'material',
            key: '售卖物料', //  material
            value: [],
          },
          {
            id: 'OriginMaterialImg',
            key: '售卖物料缩略图', // OriginMaterialImg
            value: [],
          },
          {
            id: 'InstallGuide',
            key: '安装指导', // InstallGuide
            value: [],
          },
          {
            id: 'video',
            key: '安装视频', // video
            value: [],
          },
          {
            id: 'serviceKey',
            key: '7*24小时人工技术支持',
            value: true,
          },
        ],
        status: 0,
        goodsTemplateList: [] as any[],
      }

      // salesLocation: 售卖位置
      const salesLocation = ref<any>()

      // 点击了某个图片区域
      const transType = ref('')
      const brandSelectId = ref<string[]>([])
      // 商品id
      const brandID = ref('')
      // 详情里面的对象
      const draftDetailsData = ref({})
      // 上传视频
      const router = useRoute()
      const initID = router.query.categoryId
      const { createMessage } = useMessage()
      const goodsFrom = reactive<goodFormItem>({
        operateName: '',
        categoryName: '',
        categoryId: '',
        brandSelectOptions: [],
      })
      const brandData = ref([])
      // 类别
      // let categoryName = ref(router.query.categoryName)
      const appStore = useAppStore()
      const current = ref(0)
      const visible = ref(false)
      const target = ref('#basic-list')
      const style = reactive({})
      const menuSetting = appStore.getMenuSetting
      //-----
      // 获取元素的绝对位置坐标（像对于页面左上角）
      const targetHandler = (stepIndex, target) => {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
        current.value = Number(stepIndex)
      }

      //-----
      // const target = ref('')
      const numberValue = ref<number>(3)
      const codeValue = ref<number>(1111)

      const getGoodsDetailFunc = (res) => {
        const tempImages = goodsDetails.value.map((item: any, i) => {
          if (i < res.length) {
            item['src'] = res[i].src
            item['name'] = res[i].name
          } else {
            item['src'] = ''
            item['name'] = ''
          }
          return item
        })
        goodsDetails.value = tempImages
      }
      watch(
        () => serviceConfig.checkOne,
        (val) => {
          if (!val) {
            material.value = defaultMaterial
            OriginMaterialImg.value = defaultOriginMaterialImg
          }
        },
      )
      watch(
        () => serviceConfig.checkTwo,
        (val) => {
          if (!val) {
            InstallGuide.value = defaultInstallGuide
            video.value = defaultVideo
          }
        },
      )
      watch(
        () => serviceConfig.checkThree,
        (val) => {
          if (!val) {
            material.value = defaultMaterial
          }
        },
      )
      const getEramaterialFunc = (res) => {
        const materialData = transUploadDataPipeEvent(material, res)
        console.log(materialData, 'ttttttttttttt')
        material.value = materialData
      }
      const getEraOriginMaterialFunc = (res) => {
        const materialData = transUploadDataPipeEvent(OriginMaterialImg, res)
        OriginMaterialImg.value = materialData
      }
      const getInstallGuideFunc = (res) => {
        const materialData = transUploadDataPipeEvent(InstallGuide, res)
        InstallGuide.value = materialData
      }
      const getInstallVideoFunc = (res) => {
        const materialData = transUploadDataPipeEvent(OriginMaterialImg, res)
        video.value = materialData
      }
      /**
       *@desc 提交 草稿箱 以及 发布商品 公共入参 处理
       *@return map
       */
      const handleCommonParamFunc = () => {
        let getGoodsTemplateList = skuRef.value.saveSkuDataFunc()
        templateModel.picture = handleGoodsPicture(images.value)
        templateModel.detailsPicture = handleGoodsPicture(goodsDetails.value)
        templateModel.serviceConfig[0]['value'] = handleGoodsPicture(material.value)
        templateModel.serviceConfig[1]['value'] = handleGoodsPicture(OriginMaterialImg.value)
        templateModel.serviceConfig[2]['value'] = handleGoodsPicture(InstallGuide.value)
        templateModel.serviceConfig[3]['value'] = handleGoodsPicture(video.value)
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree
        templateModel.status = 1
        templateModel.goodsTemplateList = getGoodsTemplateList

        const templateContentValue = JSON.stringify({
          templateContentVal: getGoodsTemplateList,
          picture: templateModel.picture,
          detailsPicture: templateModel.detailsPicture,
          serviceConfig: templateModel.serviceConfig,
        })
        return {
          categoryId: goodsFrom.categoryId,
          brandId: brandID.value,
          name: baseModel.name,
          templateContent: templateContentValue,
        }
      }
      /**
       *@desc 获取商品品牌list
       *@return brandSelectOptions--品牌列表
       */
      const initBrand = async (filterParams = {}) => {
        try {
          const { data } = await adminHttp.goodsBrandList(filterParams)
          goodsFrom.brandSelectOptions = data
        } catch (error) {
          createMessage.error({ content: `操作失败:${error}`, key: 'failed' })
        }
      }

      const specs = ref([])
      /**
       *@desc 获取【新增模板】信息
       *@return 类别+属性及价格区间
       */
      const initTemplateInfo = async () => {
        try {
          const categoryParam = { categoryId: goodsFrom.categoryId }
          const res = await adminHttp.goodsTemplateInfoInit(categoryParam)
          goodsFrom.operateName = res.data.operateName.replaceAll('-', '>')
          baseModel.name = res.data.categoryName
          const { skuProperty, categoryId } = res.data
          goodsFrom.categoryId = categoryId
          specs.value = skuProperty
        } catch (error) {
        } finally {
        }
      }
      /**
       *@desc toDraftDetailsLinkId [去编辑] - 草稿箱
       * @param  { string } == [ID]
       *@return
       */
      const toDraftDetailsLinkId = async () => {
        let ids = router.query.id + ''
        if (!ids) {
          return new Error('id不能为空')
        }
        try {
          const DraftDetailsMap = { id: ids }
          const { data } = await adminHttp.goodsTemplateDraftDetails(DraftDetailsMap)
          draftDetailsData.value = data
          const templateContent = JSON.parse(data.templateContent)
          console.log(templateContent, 'xx111')
          const { picture, detailsPicture } = templateContent
          if (picture) {
            images.value = images.value.map((item, index) => {
              return {
                ...item,
                name: '',
                src: index < picture.length ? picture[index] : '',
              }
            })
            console.log(picture, 'picture')
          }
          if (detailsPicture) {
            goodsDetails.value = goodsDetails.value.map((item, index) => {
              return {
                ...item,
                name: '',
                src: index < detailsPicture.length ? detailsPicture[index] : '',
              }
            })
            console.log(picture, 'picture')
          }
          const materialObj = templateContent.serviceConfig.find((item) => item.key === '售卖物料')
          const OriginMaterialImgObj = templateContent.serviceConfig.find(
            (item) => item.key === '售卖物料缩略图',
          )
          const InstallGuideObj = templateContent.serviceConfig.find(
            (item) => item.key === '安装指导',
          )
          const videoObj = templateContent.serviceConfig.find((item) => item.key === '安装视频')
          const CheckThree = templateContent.serviceConfig.find(
            (item) => item.key === '7*24小时人工技术支持',
          )
          if (CheckThree) {
            serviceConfig.checkThree = CheckThree.value
          }
          if (materialObj) {
            material.value = material.value.map((item, index) => {
              return {
                ...item,
                name: '',
                src: index < materialObj.value.length ? materialObj.value[index] : '',
              }
            })
          }
          if (OriginMaterialImgObj) {
            OriginMaterialImg.value = OriginMaterialImgObj.value.map((item, index) => {
              return {
                id: index,
                name: index,
                src: item,
                type: 1,
              }
            })
          }
          if (InstallGuideObj) {
            InstallGuide.value = InstallGuideObj.value.map((item, index) => {
              return {
                id: index,
                name: index,
                src: item,
                type: 1,
              }
            })
          }
          if (videoObj) {
            video.value = videoObj.value.map((item, index) => {
              return {
                id: index,
                name: index,
                src: item,
                type: 2,
              }
            })
          }
          //
          templateData.value = templateContent.templateContentVal
          console.log(templateContent.templateContentVal, '我是数据')
          goodsFrom.categoryName = router.query.categoryName + ''
          goodsFrom.operateName = data.name
          goodsFrom.categoryId = data.categoryId
          brandSelectId.value = [data.brandId]
          brandID.value = data.brandId
          await initTemplateInfo()
        } catch (error) {
        } finally {
        }
      }
      onMountedOrActivated(async () => {
        material.value = defaultMaterial
        InstallGuide.value = defaultInstallGuide
        video.value = defaultVideo
        OriginMaterialImg.value = defaultOriginMaterialImg
        // 初始化品牌列表
        await initBrand()
        if (router.query.type === transmitEnum.Add) {
          goodsFrom.categoryName = router.query.categoryName + ''
          goodsFrom.categoryId = router.query.categoryId + ''
          // 初始化规格属性
          await initTemplateInfo()
        } else {
          // 编辑数据
          // initTemplateInfo()
          if (router.query.from) {
            //  模板详情

            const { data } = await adminHttp.goodsTemplateDetail({
              id: router.query.id,
            })
            console.log(data, 'dddddddddddddddddddddddddddd')
            goodsFrom.categoryName = data.categoryName
            goodsFrom.operateName = data.operateName
            goodsFrom.categoryId = data.categoryId
            brandSelectId.value = [data.brandId]
            brandID.value = data.brandId
            // brandID.value = router.query.brandId
            // specs.value = data.skuProperty
            // alert(2)

            // 模板-构建回显数据
            templateData.value = [
              {
                name: data.name,
                oeCodes: data.oeId,
                paramProperties: data.paramsProperty,
                priceCap: data.priceCap,
                priceFloor: data.priceFloor,
                templateSkus: data.skuProperty,
                profitShare: data.profitSharing,
                vehicleModelBOS: data.vehicleVOS,
              },
            ]

            const { picture, detailsPicture, serviceConfiguration } = data
            if (picture) {
              images.value = images.value.map((item, index) => {
                return {
                  ...item,
                  name: '',
                  src: index < picture.length ? picture[index] : '',
                }
              })
              console.log(images.value, 'picture')
            }
            if (detailsPicture) {
              goodsDetails.value = goodsDetails.value.map((item, index) => {
                return {
                  ...item,
                  name: '',
                  src: index < detailsPicture.length ? detailsPicture[index] : '',
                }
              })
            }
            // 构建回显服务信息

            const materialObj = serviceConfiguration.find((item) => item.key === '售卖物料')
            const OriginMaterialImgObj = serviceConfiguration.find(
              (item) => item.key === '售卖物料缩略图',
            )
            const InstallGuideObj = serviceConfiguration.find((item) => item.key === '安装指导')
            const videoObj = serviceConfiguration.find((item) => item.key === '安装视频')
            const CheckThree = serviceConfiguration.find(
              (item) => item.key === '7*24小时人工技术支持',
            )
            if (CheckThree) {
              serviceConfig.checkThree = !!+CheckThree.value
            }
            if (materialObj) {
              materialObj.value = JSON.parse(materialObj.value)
              material.value = material.value.map((item, index) => {
                return {
                  ...item,
                  name: '',
                  src: index < materialObj.value.length ? materialObj.value[index] : '',
                }
              })
            }
            if (OriginMaterialImgObj) {
              console.log(OriginMaterialImgObj, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
              OriginMaterialImg.value = JSON.parse(OriginMaterialImgObj.value)

              OriginMaterialImg.value = OriginMaterialImg.value.map((item, index) => {
                return {
                  id: index,
                  name: index,
                  src: item,
                  type: 1,
                }
              })
            }
            if (InstallGuideObj) {
              InstallGuideObj.value = JSON.parse(InstallGuideObj.value)

              InstallGuide.value = InstallGuide.value.map((item, index) => {
                return {
                  id: index,
                  name: index,
                  src: item,
                  type: 1,
                }
              })
            }
            if (videoObj) {
              videoObj.value = JSON.parse(videoObj.value)

              video.value = video.value.map((item, index) => {
                return {
                  id: index,
                  name: index,
                  src: item,
                  type: 2,
                }
              })
            }

            await initTemplateInfo()
          } else {
            // 草稿箱进入 -详情页面
            await toDraftDetailsLinkId()
          }
        }
      })

      //以上售后支持
      const benefitVisible = ref(false)
      const parameterVisible = ref(false)
      const openFen = () => {
        benefitVisible.value = true
      }
      const openPg = () => {
        parameterVisible.value = true
      }
      const state = reactive({
        value1: [],
      })
      //内容
      const content = reactive({ caseContent })

      interface formValue {
        goodsClassfy: string[]
        initClassfy: string
      }

      const formState = reactive<formValue>({
        goodsClassfy: [],
        initClassfy: '机油>润滑油',
      })
      const choiceInitClassfy = () => {
        formState.goodsClassfy = ['machine-oil', 'runhua-oil']
      }
      const aChecked = ref<boolean>(false)
      //按钮 保存草稿箱
      const saveExit = async () => {
        try {
          if (router.query.edit) {
            const storeDraftMap = {
              ...handleCommonParamFunc(),
              id: router.query.id,
            }
            const { code } = await adminHttp.goodsTemplateDraftUpdate(storeDraftMap)
            if (code == '20001') {
              createMessage.success('保存草稿成功')
              $router.push({
                path: '/goodsManage/goodsTemplate/draftBox',
              })
            }
          } else {
            const storeDraftMap = handleCommonParamFunc()
            // return
            const { code } = await adminHttp.goodsTemplateDraftSave(storeDraftMap)
            if (code == '20001') {
              createMessage.success('保存草稿成功')
              $router.push({
                path: '/goodsManage/goodsTemplate/draftBox',
              })
            }
          }
        } catch (err: any) {
          createMessage.error('操作失败===' + err)
        }
      }
      const saveReleased = async () => {
        let getGoodsTemplateListss = skuRef.value.saveSkuDataFunc()
        console.log(getGoodsTemplateListss, 'ss')
        const categoryId = router.query.categoryId

        templateModel.serviceConfig[0]['value'] = JSON.stringify(handleGoodsPicture(material.value))
        templateModel.serviceConfig[1]['value'] = JSON.stringify(
          handleGoodsPicture(OriginMaterialImg.value),
        )
        templateModel.serviceConfig[2]['value'] = JSON.stringify(
          handleGoodsPicture(InstallGuide.value),
        )
        templateModel.serviceConfig[3]['value'] = JSON.stringify(handleGoodsPicture(video.value))
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree ? 1 : 0
        const categoryIds = router.query.categoryId

        if (!categoryIds) {
          return new Error('类别id为空')
        }
        if (router.query.edit) {
          const result = getGoodsTemplateListss[0]
          const maps = {
            categoryId: categoryId,
            brandId: brandID.value,
            name: result.name,
            oeCodes: result.oeCodes,
            pramProperties: result.paramProperties || [],
            priceCap: result.priceCap,
            priceFloor: result.priceFloor,
            profitShare: result.profitShare || [],
            serviceConfig: templateModel.serviceConfig,
            templateSkus: result.templateSkus,
            vehicleModelBOS: result.vehicleModelBOS,
            picture: handleGoodsPicture(images.value),
            detailsPicture: handleGoodsPicture(goodsDetails.value),
            status: 0,
          }
          const { code } = await adminHttp.goodsTemplateUpdate({
            ...maps,
            id: router.query.id,
          })
          if (code == '20001') {
            createMessage.success('保存待发布成功')
            $router.push({
              path: '/goodsManage/goodsTemplate/goodsCase',
            })
          } else {
            createMessage.error('保存失败')
          }
        } else {
          const categoryIds = router.query.categoryId
          const maps = {
            categoryId: categoryId,
            brandId: brandID.value,
            name: goodsFrom.categoryName,
            picture: handleGoodsPicture(images.value),
            detailsPicture: handleGoodsPicture(goodsDetails.value),
            serviceConfig: templateModel.serviceConfig,
            status: 0,
            goodsTemplateList: getGoodsTemplateListss,
          }
          const { code } = await adminHttp.goodsTemplateSave(maps)
          if (code == '20001') {
            createMessage.success('保存待发布成功')
            $router.push({
              path: '/goodsManage/goodsTemplate/goodsCase',
            })
          } else {
            createMessage.error('保存失败')
          }
        }
      }
      const release = async () => {
        let getGoodsTemplateListss = skuRef.value.saveSkuDataFunc()
        const categoryId = router.query.categoryId

        templateModel.serviceConfig[0]['value'] = JSON.stringify(handleGoodsPicture(material.value))
        templateModel.serviceConfig[1]['value'] = JSON.stringify(
          handleGoodsPicture(OriginMaterialImg.value),
        )
        templateModel.serviceConfig[2]['value'] = JSON.stringify(
          handleGoodsPicture(InstallGuide.value),
        )
        templateModel.serviceConfig[3]['value'] = JSON.stringify(handleGoodsPicture(video.value))
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree ? 1 : 0
        const maps = {
          categoryId: categoryId,
          brandId: brandID.value,
          name: goodsFrom.categoryName,
          picture: handleGoodsPicture(images.value),
          detailsPicture: handleGoodsPicture(goodsDetails.value),
          serviceConfig: templateModel.serviceConfig,
          status: 1,
          goodsTemplateList: getGoodsTemplateListss,
        }
        const categoryIds = router.query.categoryId
        if (!categoryIds) {
          return new Error('类别id为空')
        }

        try {
          const { code } = await adminHttp.goodsTemplateSave(maps)
          if (code == '20001') {
            createMessage.success('发布成功')
            $router.push({
              path: '/goodsManage/goodsTemplate/goodsCase',
            })
          }
        } catch (err: any) {
          // createMessage.error('发布失败')
        }
      }

      // 获取 brandId
      const getBrandId = (item) => {
        if (item) {
          const brandId = item[0]
          brandID.value = brandId
        } else {
          brandID.value = ''
        }
      }
      const imgHeadChange = (res) => {
        const tempImages = images.value.map((item, i) => {
          return {
            ...item,
            name: '',
            src: i < res.length ? res[i].src : '',
            type: 1,
          }
        })
        images.value = tempImages
      }
      /**
       *@desc 处理图片区域
       */
      const handleGoodsPicture = (picArr: any) => {
        let handlePic = [] as any[]
        picArr.filter((item) => {
          if (item.src) {
            handlePic.push(item.src)
          }
        })
        return handlePic
      }
      return {
        templateData,
        specs,
        imgHeadChange,
        ...toRefs(goodsFrom),
        handleCommonParamFunc,
        saveExit,
        saveReleased,
        release,
        targetHandler,
        initID,
        skuRef,
        videoImg,
        visible,
        menuSetting,
        style,
        //-----
        target,
        aChecked,
        numberValue,
        codeValue,
        checked: ref(true),
        parameterVisible,
        benefitVisible,
        goodsDetails,
        images,
        material,
        OriginMaterialImg,
        InstallGuide,
        video,
        openPg,
        ...toRefs(state),
        ...toRefs(content),
        serviceConfig,
        current,
        formState,
        choiceInitClassfy,
        baseModel,
        draftContent,
        templateModel,
        openFen,
        brandData,
        brandSelectId,
        getGoodsDetailFunc,
        getInstallVideoFunc,
        getInstallGuideFunc,
        getEraOriginMaterialFunc,
        getEramaterialFunc,
        getBrandId,
        brandID, // 商品ID
        draftDetailsData, // 草稿箱详情页面
        transType,
        salesLocation,
      }
    },
  })
</script>
<style>
  html,
  body {
    overflow-x: visible !important;
  }
</style>
<style lang="less" scoped>
  .section {
    //border: 1px solid #e7e7e7;
    margin-bottom: 15px;
    //border-radius: 2px;
    &-title {
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #e7e7e7;
    }

    &-mtitle {
      padding: 10px 0;
      font-size: 14px;
      font-weight: bold;
    }

    &-content {
      padding: 10px;
      background: #fff;
    }
  }

  .page-wrap {
    border-radius: 4px;
    display: flex;
    margin: 15px;
    height: calc(100vh - 80px);

    .page-left {
      background: #fff;
      margin-right: 15px;
      padding: 15px;
      display: flex;
      justify-content: center;

      &-container {
        transition: all 0.3s;
        width: 200px;
      }

      //position: fixed;
      //left: 230px;
      //top: 250px;
      //z-index: 99;
      &.toggle {
        left: 70px;
      }

      .step-title {
        font-size: 16px;
        font-weight: 800;
        margin-top: 10px;
      }
    }

    .page-right {
      background: #fff;
      flex: 1;
      padding: 15px;
      //position: relative;
      //padding-left: 230px;
      //border-left: 1px solid #e7e7e7;

      overflow-y: scroll;

      .basic {
        & {
          //margin-top: 15px;
          //border: 1px solid #e7e7e7;
          // background: #ff6400;
          //&--title {
          //  padding: 10px;
          //  font-size: 18px;
          //  //font-weight: bold;
          //  //background: #c1c1c1;
          //  border-bottom: 1px solid #e7e7e7;
          //}
          //&-content {
          //  padding: 10px;
          //  background: #fff;
          //}
        }
      }

      .price {
        & {
          //margin-top: 15px;
          //border: 1px solid #c1c1c1;
          &--title {
            //padding: 10px;
            //font-size: 24px;
            //font-weight: bold;
            //background: #c1c1c1;
            //border-bottom: 1px solid #c1c1c1;
          }

          &-content {
            //padding: 10px;
            //// height: 200px;
            //background: #fff;
            &-model {
            }

            &-check {
              display: flex;
              align-items: center;
              padding-left: 10px;
              background-color: #f9fafc;
              margin-top: 10px;
            }

            &-title {
              color: #999999;
            }

            &-choose {
              padding-left: 42px;
            }
          }

          &-interval {
            padding: 10px;
            background: #fff;

            &--title {
              font-size: 16px;
              font-weight: 600px;
              padding: 10px;
            }
          }
        }
      }

      .sales {
        //margin-top: 15px;
        //border: 1px solid #c1c1c1;
        &--title {
          //padding: 10px;
          //font-size: 24px;
          //font-weight: bold;
          //background: #c1c1c1;
          //border-bottom: 1px solid #c1c1c1;
        }

        &-content {
          //background: #fff;
          //padding: 10px;
          &-upload {
            margin: 10px 0;
            width: 150px;
            height: 170px;
            border: 1px solid #e4e4e4;
            margin-right: 20px;
            cursor: pointer;
            position: relative;

            .plus-icon {
              position: absolute;
              left: 55px;
              top: 40px;
              font-size: 35px;
              color: #8d8a8a;
            }

            .plus-text {
              position: absolute;
              font-size: 16px;
              margin-top: 5px;
              color: #666;
              left: 40px;
              top: 80px;
            }
          }

          &-materials {
            margin: 10px 0;
            width: 150px;
            height: 170px;
            border: 1px solid #e4e4e4;
            margin-right: 20px;
            cursor: pointer;
            position: relative;

            .materials-icon {
              position: absolute;
              left: 55px;
              top: 40px;
              font-size: 35px;
              color: #8d8a8a;
            }

            .materials-text {
              position: absolute;
              font-size: 16px;
              margin-top: 5px;
              color: #666;
              left: 40px;
              top: 80px;
            }
          }

          .text-upload {
            color: #9d9d9d;
          }

          .tutorial {
            &-group {
              padding: 20px 0;
            }

            &-quality {
              display: flex;

              &-item {
                margin-right: 20px;
              }
            }
          }

          .code {
            display: flex;
            padding: 15px 0;

            &-item {
              margin-right: 10px;
            }
          }
        }
      }

      .figure {
        //margin-top: 15px;
        //border: 1px solid #c1c1c1;
        &--title {
          //padding: 10px;
          //font-size: 24px;
          //font-weight: bold;
          //background: #c1c1c1;
          //border-bottom: 1px solid #c1c1c1;
        }

        &-content {
          //background: #fff;
          //padding: 10px;
          &-header {
            margin-bottom: 20px;
          }

          &-text {
            color: #9d9d9d;
          }
        }
      }

      .situation {
        //margin-top: 15px;
        //border: 1px solid #c1c1c1;
        &--title {
          //padding: 10px;
          //font-size: 24px;
          //font-weight: bold;
          //background: #c1c1c1;
          //border-bottom: 1px solid #c1c1c1;
        }

        &-content {
          //background: #fff;
          //padding: 10px;
        }
      }

      .edit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 240px;

        .btn-item {
          //width: 250px;
          //margin-left: 30px;
        }
      }
    }
  }
</style>
