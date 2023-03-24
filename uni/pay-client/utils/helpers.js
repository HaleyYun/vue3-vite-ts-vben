export const linkToEasy = (url, type = 'default') => {
    if (type === 'default') {
        uni.navigateTo({
            url,
            fail (err) {
                console.log(err)
                uni.switchTab({
                    url,
                    fail (e) {
                        modal(e.errMsg)
                    }
                })
            }
        })
    }
}
