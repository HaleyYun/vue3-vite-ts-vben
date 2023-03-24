import { defineStore } from 'pinia'
import { store } from '/@/store'

// interface selectTreeNode {
//   title: string
//   id?: number
// }

interface specValueItem {
  name: string
  check: boolean
}

interface specItem {
  name: string
  id: number
  value: [specValueItem]
}

interface GoodsFormState {
  specs: specItem[]
  // currentResrouceMode: string
  // selectTreeList: [selectTreeNode]
}

export const useGoodsFormStore = defineStore({
  id: 'goodsFormStore',
  state: (): GoodsFormState => ({
    specs: [],
    // currentResrouceMode: 'img',
    // selectTreeList:[],
  }),
  getters: {
    // getCurrentFloderId(): number {
    //   return this.currentFolderId
    // },
    // getCurrentResrouceMode(): string {
    //   return this.currentResrouceMode
    // },
    getGoodsSpecList(): any {
      return this.specs
    },
  },
  actions: {
    // setCurrentFloderId(id: number): void {
    //   console.log(`setCurrentFloderId id is ${id}`)
    //   this.currentFolderId = id
    // },
    // setCurrentResrouceMode(mode: string): void {
    //   console.log(`setCurrentResrouceMode is ${mode}`)
    //   this.currentResrouceMode = mode
    // },
    setGoodsSpecsList(list: []): void {
      // console.log(`set specs is`, list)
      this.specs = list
    },
  },
})

export function useGoodsFormStoreWithOut() {
  return useGoodsFormStore(store)
}
