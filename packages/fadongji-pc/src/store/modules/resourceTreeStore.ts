import { defineStore } from 'pinia'
import { store } from '/@/store'

interface selectTreeNode {
  title: string
  id?: number
}

interface TreeState {
  currentFolderId: number
  currentResrouceMode: string
  selectTreeList?: selectTreeNode[] | any
}

export const useResourceTreeStore = defineStore({
  id: 'resourceTree',
  state: (): TreeState => ({
    currentFolderId: 0,
    currentResrouceMode: 'img',
    selectTreeList: [],
  }),
  getters: {
    getCurrentFloderId(): number {
      return this.currentFolderId
    },
    getCurrentResrouceMode(): string {
      return this.currentResrouceMode
    },
    getSelectFolderList(): selectTreeNode[] {
      return this.selectTreeList
    },
  },
  actions: {
    setCurrentFloderId(id: number): void {
      // console.log(`setCurrentFloderId id is ${id}`)
      this.currentFolderId = id
    },
    setCurrentResrouceMode(mode: string): void {
      // console.log(`setCurrentResrouceMode is ${mode}`)
      this.currentResrouceMode = mode
    },
    setSelectFolderList(list: []): void {
      // console.log(`setSelectListNodes is`, list)
      this.selectTreeList = list
    },
  },
})

export function useResourceTreeStoreWithOut() {
  return useResourceTreeStore(store)
}
