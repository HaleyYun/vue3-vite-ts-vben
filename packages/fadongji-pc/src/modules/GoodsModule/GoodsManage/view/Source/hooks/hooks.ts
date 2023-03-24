import { ref, unref } from 'vue'

export const useFolderTree = () => {
  const treeRef = ref(null)

  function register(instance) {
    treeRef.value = instance
    //methods.loadTreeData()
      console.log(111111)
  }

  const methods = {
    getTreeRef: () => unref(treeRef),
    loadTreeData: (isReset)=> unref(treeRef)?.loadTreeData(isReset),
  }

  return [register, methods]
}

/**
 * exploer hooks
 * @param opts
 */
export const useExploer = () => {
  const exploerRef = ref(null)

  const methods = {
    getExploerRef: () => unref(exploerRef),
    loadExploerList: () => unref(exploerRef)?.loadExploerData(),
  }

  function register(instance) {
    console.log(instance)
    exploerRef.value = instance
    //methods.loadExploerList()
  }

  return [register, methods]
}
