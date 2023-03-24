export const transCallBackData = (currentMap, originMap) => {
    Object.keys(originMap).forEach(key => {
        originMap[key] = currentMap[key] || originMap[key]
    })
    return originMap
}