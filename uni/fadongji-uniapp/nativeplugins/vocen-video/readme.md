本插件为uniapp提供iOS移动端视频播放的功能。
######原生插件暴露给js的id为：vocen-video
#接口说明
###### 此插件为组件格式，uniapp 只能为nvue为容器
// uniapp调用方式为：类似于调用组件的方式调动插件
```
<vocen-video 
      ref="video" 
      style="width: 100%;height: 100%;" 
      @voVideoComment="voVideoComment"
      @voVideoShare="voVideoShare" 
      @voVideoBack="voVideoBack" 
      @voVideoCollect="voVideoCollect"
      @voVideoLike="voVideoLike" />
```
##### 方法说明
|  方法名  | 方法说明   |
|  ----  |--------|
| voVideoComment   | 点击评论   |
| voVideoShare  | 点击分享   |
| voVideoBack  | 点击返回   |
| voVideoCollect  | 点击收藏   |
| voVideoLike  | 点击点赞   |
| voVideoUser  | 点击用户头像 |


```注:```
```1.voVideoShare/voVideoComment 返回参数和后端返回的对象一致，原封不动的返回给uniapp```
```2.voVideoCollect 返回参数和后端返回的对象一致，新增isCollect(BOOL)，用于判断收藏与否。YES 收藏  NO 取消收藏```
```3.voVideoLike 返回参数和后端返回的对象一致，新增isLike(BOOL)，用于判断点赞与否。YES 点赞  NO 取消点赞```

###### 示例 接收的时候res.detail 是固定写法
```
voVideoLike(res) {
    if (res.detail.isLike) {
        //点赞
        this.giveLike(res.detail.id)
    } else {
        //取消点赞
        this.giveLikeCancel(res.detail.id , res.detail.userId)
    }
},
```

###### uniapp 传原生方法 调用方式如普通组件调用方式一样
|  方法名  | 方法说明 |
|  ----  | ----  |
| VideoListType   | 列表数据 |
| VideoCommentType  | 列表评论数据 |
| VideoLikeType  | 点赞数据 |
| VideoCollectType  | 收藏数据 |
| VideoCancelLikeType  | 取消点赞数据 |
| VideoCancelCollectType  | 取消收藏数据 |
| voVideoLookDetailType  | 查看视频详情 |
   
###### VideoListType 参数说明
|  参数 | 类型 | 描述 |
|  ----  | ----  | ----  |
| type   | String | 上述方法名对应字段 |
| pageNo  |  String | 请求分页 |
| pageSize  |  String  | 请求分页的数量 |
| total  |  String  | 列表总共条数 |
| current  |  String  | 当前点击的视频对象 |
| data  |  Object | 视频列表数据 |
| moreType  |  String | 是否是上拉加载 0.初始值 1.上拉加载 |
| code  |  String | 后台返回的code 20001 成功 其他参考后端接口文档 |

###### VideoCommentType 参数说明
|  参数 | 类型 | 描述 |
|  ----  | ----  | ----  |
| type   | String | 上述方法名对应字段 |
| data  |  Object | {contentId 帖子ID,commentNum：评论总条数} |
| code  |  String | 后台返回的code 20001 成功 其他参考后端接口文档 |

###### VideoLikeType/VideoCollectType/VideoCancelLikeType/VideoCancelCollectType参数说明
|  参数 | 类型 | 描述 |
|  ----  | ----  | ----  |
| type   | String | 上述方法名对应字段 |
| data  |  Object | {contentId 帖子ID} |
| code  |  String | 后台返回的code 20001 成功 其他参考后端接口文档 |

###### 插件内部方法 调用方式如普通组件调用方式一样

```this.$refs.video.voVideoColseScroll()```
```this.$refs.video.voVideoOpenScroll()```

##### 方法说明
|  方法名  | 方法说明 |
|  ----  | ----  |
| voVideoColseScroll   | 禁止上下滚动 |
| voVideoOpenScroll  | 开启上线滚动 |
