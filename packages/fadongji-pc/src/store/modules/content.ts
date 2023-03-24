import { defineStore } from 'pinia'
import { store } from '/@/store'

export const useContentStore = defineStore({
  id: 'contentStore',
  state: () => ({
    detail: {},
  }),
  getters: {

    getDetail(): Object {
      let sessionDetail = sessionStorage.getItem('detail');
      console.log(this.detail,sessionDetail)
      let datail = this.detail.categoryId?this.detail:(sessionDetail?JSON.parse(sessionDetail):'');
      return datail
    },
  },
  actions: {
    setDetailList(detail: {}): void {
      console.log(`set specs is`, detail)
      const {categoryId,duration,content,name,type,isEnable,fileUrl,platformCode,id,keyword,model} = detail;
      this.detail = {categoryId,duration,content,name,type,isEnable,fileUrl,platformCode,id,model,keyword}
      console.log(this.detail)
      sessionStorage.setItem('detail',JSON.stringify(this.detail));
    },
  },
})

export function useContentWithOut() {
  return useContentStore(store)
}
