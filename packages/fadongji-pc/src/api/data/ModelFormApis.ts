import adminHttp from '/@/utils/http/adminHttp'

// 获取车辆品牌型号-下拉列表使用// VEHICLE.VehicleBrandSelectOne()
export const getGoodsSelectOne = (keyword) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.VEHICLE.VehicleBrandSelectOne({
      keyword,
    })
    let nameArr = []
    const list = data.detail.forEach((item) => {
      const arr = item.list.map((value) => {
        return { value: value.id, label: value.name }
      })
      nameArr = [...nameArr, ...arr]
    })
    resolve(nameArr)
  })
}

// 获取发动机型号-下拉列表使用
export const getGoodsModelList = (keyword) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsModelSelectList({
      keyword,
    })
    const list = data.map((item) => {
      return {
        label: item.model,
        value: item.id,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动查询车型
export const motorcycleTypeList = (brand) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (brand) {
      params.brand = brand
    }

    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.brandList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动查询车系
export const motorcycleSeriesList = (series) => {
  return new Promise(async (resolve) => {
    let params = {}

    if (series) {
      params.series = series
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.seriesList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动查询车型
export const motorcycleModelList = (model) => {
  let params = {}
  if (model) {
    params.model = model
  }
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.modelList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动发动机型号
export const motorcycleEngineList = (engineModel) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (engineModel) {
      params.engineModel = engineModel
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.engineModelList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动燃油类型
export const motorcycleFuelList = (fuelType) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (fuelType) {
      params.fuelType = fuelType
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.fuelTypeList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动排量
export const displacementList = (displacement) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (displacement) {
      params.displacement = displacement
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.displacementList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动进气方式
export const inductionList = (induction) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (induction) {
      params.induction = induction
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.inductionList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}


// 获取车型库-条件联动功率
export const powerKwList = (powerKw) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (powerKw) {
      params.powerKw = powerKw
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.powerKwList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动年款
export const yearList = (year) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (year) {
      params.year = year
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.yearList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动变速器类型
export const transmissionTypeList = (transmissionType) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (transmissionType) {
      params.transmissionType = transmissionType
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.transmissionTypeList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动排放标准
export const emissionStandardList = (emissionStandard) => {
  return new Promise(async (resolve) => {
    let params = {}
    if (emissionStandard) {
      params.emissionStandard = emissionStandard
    }
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const list = data.emissionStandardList.map((item) => {
      return {
        label: item,
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取车型库-条件联动查询
export const motorcycleTypeListMap = (params) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.VEHICLE.communityVehicleModelCondition(params)
    const res = {}
    Object.keys(data).map(item => {
      const val = data[item] ? data[item].map(m => { 
        return {
          label: m,
          value: m,
        }
      }):[]
      res[item] = val
    })
    resolve(res)
  })
}

// 获取零部件列表
export const getGoodsModelCompensateUnitList = (keyword) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsModelCompensateUnitList({ keyword })
    const list = Object.keys(data).map((item) => {
      return {
        label: data[item],
        value: item,
      }
    })
    resolve(list)
  })
}

// 获取省份
export const getProvince = () => {
  return new Promise((resolve) => {
    adminHttp.GOODS.goodsModelCommissionProvince()
      .then((res) => {
        //businessType: 2/v1/goods/category/list
        // columnCode: "C000001"
        // columnName: "栏目111"
        const global = [
          {
            label: '全国',
            value: '86',
          },
        ]
        resolve(
          global.concat(
            res.data.map((item) => ({
              label: item.name,
              value: item.code,
            })),
          ),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

// 根据code获取地域
export const getSixHotAreaSub = () => {
  return new Promise((resolve) => {
    adminHttp.COMMON.sixHotAreaSub({ parentCode: 86 })
      .then((res) => {
        //businessType: 2/v1/goods/category/list
        // columnCode: "C000001"
        // columnName: "栏目111"
        const global = [
          {
            label: '全国',
            value: '1',
          },
        ]
        resolve(
          global.concat(
            res.data.map((item) => ({
              label: item.name,
              value: item.code,
            })),
          ),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

// 获取售后服务订单状态枚举数据
export const getAfterSaleStatus = () => {
  return new Promise((resolve) => {
    adminHttp.ORDER.orderAfterSaleEnumStatus()
      .then((res) => {
        //businessType: 2/v1/goods/category/list
        // columnCode: "C000001"
        // columnName: "栏目111"

        resolve(
          Object.keys(res.data).map((item) => ({
            label: res.data[item],
            value: Number(item),
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}
