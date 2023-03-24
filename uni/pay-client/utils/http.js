export const apiBaseHost = 'https://gate.fdjcyl.com/vocen-wolverine/'//'http://121.4.27.219:7280/develop';
export const objectQuery = (obj)=>{
    const args = []
    for(var key in obj){
        args.push(`${key}=${obj[key]}`)
    }
    return args.join(',')
}

const getOpenId = async(code)=>{
    const appsecret = '8cd24227ba98af3135c0180eacecfb98'
    const appid = 'wx1b6f6ebe45927575'
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
    const wxReqResult = await get({url,options:{addHost:false}}).then(res=>{
        return res
    }).catch(err=>{
        console.log(err)
    })
    console.log(wxReqResult)
}

const request = ({url,method,params,options={tip:'加载中',addHost:true}})=>{
    var strParams = ''
    if(method==='get' && params){
        strParams = objectQuery(params)
    }
    if(strParams){
        if(url.indexOf('?')>-1){
            strParams = '?'+strParams
        }else{
            if(url.indexOf('&')>-1)strParams = '&'+strParams
        }
    }

    const token = uni.getStorageSync('access_token')||options.token
    var headers = {
        'sign-debug':1,
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Expose-Headers': 'content-disposition',
        'Authorization':'Bearer ' + token
    }
    console.log(headers)

    const opts = Object.assign({},{
        url:(options.addHost?apiBaseHost:'')+url+strParams,
        method,
        header:headers,
        data:method==='post'?params:{}
    })
    if(options.tip)uni.showLoading({title:options.tip})
    return new Promise((resolve, reject) => {
        uni.request({
            ...opts,
            success:(res)=>{
                if (+res.data.code === 20001) {
                    resolve(res)
                } else {
                    reject(Error(res.data.message))
                }

            },
            complete(){
                if(options.tip)uni.hideLoading()
            },
            fail:(err)=>{
                reject(Error(err.errMsg))
            }
        })

    })
}

const post = ({url,method='post',params,options})=>request({url,method,params,options})

const get = ({url,method='get',params,options})=>request({url,method,params,options})

export default {
    getOpenId,
    request,post,get
}
