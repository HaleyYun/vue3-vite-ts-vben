<template>
  <view class="bg-white">
      <VoNav :is-fixed="true" title="社区管理制度" />
     <view class="container">
      <view class="title">序言</view>
      <view class="content">
        发动集平台为了组织一个更完善的网络社区，维护社区的基本秩序，共同打造健康有序的内容生态保障会员的权利和利益，订立本公约。
      </view>
      <view class="content">
        发动集平台严格遵守《互联网信息搜索服务管理规定》及《七条底线》、《互联网信息服务管理办法》及相关法律法规，如你发布的内容存在以下问题，将无法通过审核，违规情节严重的，将对帐号进行暂停使用或封号处理。请各位创作者严格遵守平台的内容创作规范，持续创作更多优质内容。
      </view>
      <view class="title">内容创作规范</view>
      <view class="content">平台不允许 违反法律法规和相关政策</view>
      <view class="content" style="margin-bottom: 10rpx">
        违反法律法规和相关政策的行为及内容，包含但不限于以下场景：
      </view>
      <ul style="margin-bottom: 32rpx">
        <li>违反宪法确定的基本原则，煽动抗拒或者破坏宪法、法律、行政法规实施；</li>
        <li>
          危害国家统一、主权和领土完整，泄露国家秘密，危害国家安全，损害国家尊严、荣誉和利益，宣扬恐怖主义、极端主义；
        </li>
        <li>
          诋毁民族优秀文化传统，煽动民族仇恨、民族歧视，侵害民族风俗习惯、歪曲民族历史和民族历史人物，损害革命领袖、英雄烈士形象，伤害民族感情，破坏民族团结；
        </li>
        <li>
          煽动破坏国家宗教政策，宣扬宗教狂热，危害宗教和睦，伤害信教公民宗教感情，破坏信教公民和不信教公民团结，宣扬邪教、封建迷信；
        </li>
        <li>
          危害社会公德，扰乱社会秩序，破坏社会稳定，宣扬淫秽色情、赌博、吸毒，渲染暴力、恐怖，教唆犯罪或者传授犯罪方法；
        </li>
        <li>教唆、教授、组织他人进行违法乱纪活动，以非法民间组织名义活动的，宣传违法违规物品；</li>
        <li>侵害未成年人合法权益或者损害未成年人身心健康；</li>
        <li>侵犯他人隐私，侮辱或者诽谤他人，侵害他人合法权益；</li>
        <li>侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利；</li>
        <li>含有法律、行政法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容。</li>
      </ul>
      <view class="content" style="margin-bottom: 10rpx">
        违反法律法规和相关政策的行为及内容，包含但不限于以下场景：
      </view>
      <view class="title">地图不规范</view>
      <view class="content">涉及中国地图残缺、地名不完整、地名篡改等违法违规内容。</view>
      <view class="content" style="margin-bottom: 10rpx">中国版图常见错误示例：</view>
      <view class="title">抄袭侵权</view>
      <view class="content" style="margin-bottom: 10rpx">包含但不限于以下场景：</view>
      <ul style="margin-bottom: 32rpx">
        <li>
          未经授权使用他人享有著作权的内容，包括但不限于以洗稿、复制拼凑等方式重新整合，在表达上与在先作品存在实质性的相同或近似的内容；
        </li>
        <li>
          违规使用「原创」功能的：指在平台申请声明「原创」，但内容被证实不符合原创标准要求的。
        </li>
      </ul>
      <view class="title">无资质发布专业领域内容</view>
      <ul style="margin-bottom: 32rpx">
        <li>
          未取得互联网新闻信息服务许可，不得发布新闻信息，新闻信息指：时政类新闻信息，包括有关政治、经济、军事、外交等社会公共事务的报道、评论，以及有关社会突发事件的报道、评论；
        </li>
        <li>
          我国法律法规要求必须取得特定资质方可从事特定行为的其他情形，依该等法律法规要求处理。
        </li>
      </ul>
      <view class="title">发布谣言或不实内容</view>
      <view class="content" style="margin-bottom: 10rpx">包含但不限于以下场景：</view>
      <ul style="margin-bottom: 32rpx">
        <li>
          明显谣言或虚假：与事实相悖或违背科学常理，凭空杜撰、拼凑、编造或曲解事实，制造耸人听闻的谣言，影响较为恶劣；
        </li>
        <li>疑似谣言：无可信来源，断章取义或以讹传讹，存在诋毁、人身攻击等负面影响的；</li>
        <li>信息有误 ：发布内容与事实不一致、关键信息不准确，或歪曲事实、亏大事实等行为。</li>
        <li>
          隐藏事实
          ：隐藏部分事实或无法证明其真实性的内容误导他人，冒充发动集平台官方栏目或热团内容。
        </li>
      </ul>
      <view class="content">
        以上行为将被删除或警告，严重者可能封禁或永久封禁。违规行为处罚程度界定
      </view>
      <view class="title">违规推广</view>
      <view class="content" style="margin-bottom: 10rpx">被认定为违规推广的内容包括但不限于：</view>
      <ul style="margin-bottom: 32rpx">
        <li>借领导人/重大会议营销，借国家重大会议或领导人形象、名号等为企业或产品宣传推广；</li>
        <li>宣传传销组织、违规网贷，或不合规的汽车等相关推广行为；</li>
        <li>分享汽配行业以外的商品；</li>
        <li>内容拼凑或重复，前后内容没有衔接，无关内容占比较大；</li>
        <li>
          内容除了商品信息（参数、价格等）外，没有任何信息增量（信息增量指专业知识、科学测评、亲身体验、理性观点等）；
        </li>
        <li>通过机器或软件等非人力手段把商品详情页的商品参数信息拼凑形成一段描述；</li>
      </ul>
      <view class="title">流量作弊</view>
      <view class="content" style="margin-bottom: 10rpx">
        滥用产品功能进行流量作弊，批量发布重复、无意义的低质内容，恶意刷粉刷赞，影响用户体验、破坏平台规则且损害他人权益的行为。包含但不限于以下场景：
      </view>
      <ul style="margin-bottom: 32rpx">
        <li>
          违规批量发文：
          <ul>
            <li>
              批量发布重复内容：一段时间内，用非正常手段连续发布大量重复内容，或高度相似内容；
            </li>
            <li>
              批量发无意义/低质内容：连续或大量发布无意义元素，包括但不限于无意义图片、符号、表情、乱码、无序文字等；
            </li>
          </ul>
        </li>
        <li>
          违规刷粉刷赞：通过非正常手段进行作弊，获取虚假粉丝、虚假点赞数据的行为。冒充发动集平台官方栏目或社团发布内容。
        </li>
      </ul>
      <view class="content">
        以上行为将被删除、警告或转水处理，严重者可能封禁或永久封禁。违规行为处罚程度界定
      </view>
      <view class="title">危及未成年人安全</view>
      <view class="content" style="margin-bottom: 10rpx">
        1. 平台禁止任何下列损害未成年人身心健康和合法权益的行为和内容：
      </view>
      <ul style="margin-bottom: 32rpx">
        <li>涉及未成年人色情低俗的内容</li>
        <li>涉及侵害未成年人身体/财产/人格/隐私的行为</li>
        <li>涉及未成年人不当行为的内容</li>
        <li>涉及毒害未成年身心健康和价值观的内容</li>
        <li>涉及对未成年人产生潜在危险的行为</li>
        <li>涉及过度消费未成年人的内容</li>
        <li>其他危害未成年人生命、财产、健康的行为和内容</li>
      </ul>
      <view class="content" style="margin-bottom: 10rpx">
        2.
        未成年人在发动集平台平台注册帐号应当得到其监护人的同意，否则监护人可以通过合理方式通知发动集平台平台处理相关帐号。
      </view>
      <view class="title">攻击引战、不友善行为</view>
      <view class="content" style="margin-bottom: 10rpx">
        发动集平台禁止攻击引战和不友善行为，包括但不限于如下行为：
      </view>
      <view class="content" style="margin-bottom: 10rpx">1. 人身攻击</view>
      <view class="content" style="margin-bottom: 10rpx">2. 群体攻击</view>
      <view class="content" style="margin-bottom: 10rpx">3. 恶意挑衅引战，恶意煽动其他网友</view>
      <view class="content" style="margin-bottom: 10rpx">
        4. 骚扰、威胁、诱骗、欺诈、泄露隐私、诽谤、诋毁、诬陷等侵犯发动集平台网友合法权益的内容。
      </view>
      <view class="content">5. 禁止任何形式的造谣和造假行为</view>
      <view class="content">包括但不限于如下行为：</view>
      <view class="title">引人不适或反感</view>
      <view class="content" style="margin-bottom: 10rpx">包含但不限于以下场景：</view>

      <div>
        <p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >血腥暴力：对真实的人或动物实施暴力，煽动他人施暴；内容中有大量血腥画面，未经过马赛克遮挡，引起用户不适，如尸体、内脏器官等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >密集恐惧：密集排列、分布的事物，造成感官不适；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >猎奇：以猎奇为目的，描述或展现异常事物，引起不适或有不良诱导；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >恶心：引起强烈刺激的事物，如排泄物，吃活物、体验恶心食物等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >恐怖：内容惊悚的事件，或让人产生恐惧心理的生物，具有令人不寒而栗的特征，如人尸、蛇等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >虐待动物：如展示摔打或使用其他工具伤害动物的行为，渲染虐待动物的快感。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold"
            >宣扬不良价值观</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >挑战公序良俗或游走在社会道德边缘的行为；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >展示违背伦理道德的糜烂生活；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >宣扬不良生活方式和不良流行文化，渲染消极情绪，宣扬颓废的人生观、世界观和价值观；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >宣扬拜金主义和享乐主义；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >宣传和宣扬丧文化、自杀游戏；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >以肯定、赞许的基调或引入模仿的方式表现打架斗殴、羞辱他人、污言秽语；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >恶意对比、引战行为。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold">诱导低俗</span></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >渲染低俗及宣扬低级趣味的行为和内容。包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >对性部位和性行为进行展示、过度描述或内涵表述的；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >有明显的性挑逗、性骚扰、性侮辱或类似效果的画面、台词、音乐及音效等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >以成人电影、情色电影、三级片、偷拍、走光、露点及各种挑逗性文字或图片作为内容标题、分类或宣传推广；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布和传播其他有伤社会风化的内容。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold">不文明用语</span></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >骚扰辱骂：使用污言秽语、蔑称、外号、同音近音词等直接辱骂或言语骚扰他人；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >歧视恶搞：恶搞、歧视特定群体，或言论带有明显的性别歧视、种族歧视、地域歧视等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >情绪宣泄：通过粗俗不堪的口头禅、网络用语等发泄情绪，表达不满的。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold">恶意营销</span></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >以营利、获益为目的，内容附带联系方式、售卖链接，或诱导私信联系转线下交易，引导用户消费但可能存在风险的行为。包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >联系方式：如电话号码、微信号、公众号、二维码、微信群等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >营销链接：带有明显营销意图的第三方网址，或诱导用户在第三方电商平台领取红包、购买交易的口令和店铺号等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">引导交易：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >票务售卖：明确公示价格，买卖转让演唱会门票等；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >虚拟交易：推广虚拟货币、虚拟商品、虚拟服务类交易，如游戏点卡、游戏在线服务、网游装备、QQ号码、Q币、软件序列号、电子书等；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >求资源/诱导私信联系：诱导读者通过私信渠道联系或获取资源（如联系方式、链接、加微信群等）；</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold"
            >社区内容不规范</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >通过平台社区功能推荐商品，但内容不符合《</span
          ><span style="color: #19439c; font-family: 宋体; font-size: 12pt">发动集平台</span
          ><span style="color: #19439c; font-family: 宋体; font-size: 12pt">内容创作管理规范</span
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >》要求的，包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">故事诱导推广：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >文字部分虚构、捏造与事实不符的故事进行营销推广；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >文字部分以故事形式吸引点击，下文内容与故事主题不相关</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >内容除了故事外，没有任何信息增量（信息增量指专业知识、科学测评、亲身体验、理性观点等）</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >内容与平台定位毫不契合：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >内容与汽配行业无相关性；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >前文是独立完整的故事、资讯，且未提及商品，或前文与商品无直接逻辑关系，仅存在间接关联，通过拼凑、归因、强行关联、多次转折引出商品，转折生硬，且商品介绍篇幅较长；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >虚假夸大宣传：包含但不限于夸大商品属性功效、使用虚构或无法验证的信息进行推广、编造典型案例等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >其他平台不鼓励的内容。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold">标题低质</span></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >通过夸张描述、隐瞒信息、扭曲原意等方式增加标题吸引力，引诱用户阅读，但与内文真实情况不符，造成用户阅读后心理落差与不良体验。包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">标题夸张：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >夸张式标题：将感受、范围、结果、程度等夸张夸大描述，造成耸人听闻的效果；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >悬念式标题：标题滥用转折、隐藏关键性信息，营造悬念、故弄玄虚；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >强迫式标题：标题采用挑衅恐吓、强迫建议等方式，诱导用户阅读；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >标题与内容原意有偏差：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >标题存在歧义
                  ：标题对要素信息的表达不清晰、不对称或不完整，形成冲突，对用户产生误导；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >标题无中生有
                  ：标题捏造内容中不存在的人、物、情节、言论等，或用猜测、不确定消息诱导用户点击；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >标题滥用名称、题材不明确：标题未明确所涉及题材，滥用演员名代替剧中人物名，或用新闻式标题描述影视剧情节，引起歧义，误导用户认为是明星花边或社会时政负面；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >封面与标题不符：
                  封面图与内容主体完全不相关，或封面图结合标题易使读者产生误解；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >标题不规范：标题含有错别字或存在语病、滥用标点符号、语义不通顺等，影响理解与阅读体验。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >话题无关</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >发布内容与所带话题的内容不相关，如内容未提及话题主体、内容与话题城市异地、只带话题不写内容等。</span
          ></p
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >封面/配图低质</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >封面或配图内容质量差，与文章主体无关且不能为文章增补信息量。包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >图片与内容毫无关联，且图片质量差的；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >图文明显不相关，带不良图片蹭流量的，图片类型包含但不限于如下：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >有不良诱导倾向的图片；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >偷拍类图片；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >男女亲密同框，易引发低俗、恶俗等不良想象图片等。</span
                ></li
              ></ul
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold">内容低质</span></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >图文格式混乱或不美观，音画质量差等影响阅读体验。包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >图文低质的内容，包含但不限于以下场景：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >排版混乱：文章乱码、无段落或无标点；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >语意不明：病句或错别字较多、乱码符号，有碍于读者理解内容；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >逻辑混乱：内容拼凑或重复，前后内容没有衔接，无关内容占比较大；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >音画低质的内容，包括但不限于以下场景：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >视频缩放画面：视频中角标/logo/字幕被剪切，导致显示不全，或画面中人物面部被部分剪切；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >视频添加边框：视频添加边框且占比较大，或水印遮挡画面严重，无法识别视频主体；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >视频添加滤镜：画面带有严重滤镜至色彩失真，或人物明显发白、发红，呈现不正常色调；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >视频画面倾斜：画面整体被侧置或倒置，字幕、logo、左右等特征为镜像翻转，或画面被非正常拉长或挤压变形。</span
                ></li
              ></ul
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold"
            >发布已过时效内容</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >指发布的资讯、消息等是已经过期的内容，并非新近发生的，因时间不明确、隐藏时间词或时间词过期等引起读者理解偏差、混淆了事件的真实发生时间。包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">旧闻新发：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >明确时间陈旧：时间明确且已过时，事件已结束，近期无后续、无持续影响和相关讨论的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >时间不明：文章中提到的事件为很久之前发生的，特意隐去时间，易误导他人是新近发生的事件；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >信息陈旧：指事件持续发酵，已经有新进展、数据有更新、有新的结论，但仍发布陈旧的信息；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >时间词过时：有明确的时间限定词，如「今天」「本月」等，而内容发布时间与限定范围不符，容易引起阅读误解的。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold">引导互粉</span></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >指以承诺回关（关注对方）、回粉（成为对方粉丝）等为前提，引导用户关注自己的行为。</span
          ></p
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold"
            >称呼表述不规范</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >指涉及对于国家机构、人名地名、民族等表述不规范。包含但不限于以下场景：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >公众人物人名的错误书写；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >称呼国家为GJ等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >称呼“宁夏回族自治区”为“宁夏省”、称呼“内蒙古自治区”为“内蒙古省”、称呼“蒙古族”为“蒙族”等。</span
            ></li
          ></ul
        ><p style="font-size: 14pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 14pt; font-weight: bold">惩罚举措</span></p
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold"
            >涉及以下违规行为，平台将采取相应措施：</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >通过平台功能（包括但不仅限于「私信」）进行违规推广或违规提供医疗、财经服务：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >违规推广医疗、医美机构等</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >使用平台功能或引导至第三方平台违规提供医疗服务，包括但不仅限于「开药」「看诊」「药品代购」「推广试药」等</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >推荐购买指定股票、博彩（包含彩票、足彩、六合彩、赌球、跑马）等高风险投资产品；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >含诱导他人参与投资的各类推广话术，包括但不限于P2P、区块链、各种网赚等；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >健康、财经类帐号违规推广联系方式或引导关注第三方平台、帐号。</span
            ></li
          ></ul
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt">&nbsp;</span></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >违规情况处理措施包括但不仅限于：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >限制帐号功能，如限制或禁止发布私信等</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">帐号禁言</span></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">帐号封禁</span></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >依法追究法律责任</span
            ></li
          ></ul
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt">&nbsp;</span></p
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold"
            >涉及以下严重违规行为，即刻封禁帐号：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >违反法律法规和相关政策的行为及内容，包含但不限于以下场景：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >违反宪法确定的基本原则的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >危害国家安全，泄露国家秘密，颠覆国家政权、破坏祖国统一、民族团结的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >破坏国家宗教政策，宣扬邪教、封建迷信的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >危害社会公德，扰乱社会秩序，破坏社会稳定，宣扬淫秽色情、赌博、吸毒，渲染暴力、恐怖，教唆犯罪或者传授犯罪方法的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >私自制造、买卖、使用、持有、储存、运输、进出口违规物品，如枪支弹药、管制刀具、毒品、违禁药品、走私商品等；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布赌博、传销等违规内容；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >损害革命领袖、英雄烈士形象；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布法律、法规禁止的其他内容。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布或诱导色情低俗的内容：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >对性部位和性行为进行展示、过度描述或内涵表述的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >有明显的性挑逗、性骚扰、性侮辱或类似效果的画面、台词、音乐及音效等；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >传播色情网站、色情交易或联系方式的。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布或传播虚假信息并造成恶劣影响的：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >杜撰、编造或曲解事实，制造与事实相悖或违背科学常理的谣言；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >伪造或恶意传播虚假系统信息，包括但不限于系统通知、系统数据；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >杜撰、编造社会负面/敏感事件进行商品分享。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >仿冒机构、个人，包括但不限于名人明星、党政机关、新闻机构、公职人员、</span
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">发动集平台</span
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">官方人员、</span
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">发动集平台</span
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >官方活动等，诱骗他人或造成恶劣影响的。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >恶意攻击谩骂，使用污言秽语、侮辱性语言或称呼等直接辱骂、骚扰平台或用户。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布暴力、血腥或其他引人不适的内容：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >自残自杀写实画面、过程实拍，展示暴力实施场景；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >内容中渲染虐待动物的快感，展示伤害动物的行为。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布或传播损害未成年人身心的行为及内容，包含但不限于以下场景：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >标题或内容含有猥亵未成年，接触未成年性器官，未成年人模拟性行为；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >出现未成年裸露、三点部位衣着不整齐、性器官特写或强调未成年性部位衣着；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >殴打、虐待未成年；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >鼓动未成年人使用或贩卖非法药品、毒品。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >无资质发布专业领域内容并造成恶劣影响的：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >无健康领域专业资质发布疾病诊疗、用药指导、针灸拔罐等内容；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >无财经相关专业资质发布股票买卖指导、投资指南等内容。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布恶意营销内容，包括但不限于以下形式：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >推广微信或微信公众号时使用变体，如薇欣、伽这个 薇、微^信`公`众`号等；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >联合推广，即多个帐号重复多次推荐同一产品或同一联系方式；</span
                ><ul style="margin: 0pt; padding-left: 0pt" type="square"
                  ><li
                    style="
                      color: #494949;
                      font-family: serif;
                      font-size: 10pt;
                      line-height: 150%;
                      margin: 0pt 0pt 0pt 27.58pt;
                      padding-left: 8.42pt;
                      text-indent: 0pt;
                    "
                    ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                      >产品：包括但不限于网赚兼职、养生健康、优惠券、交友软件、两性用品、收藏品等；</span
                    ></li
                  ><li
                    style="
                      color: #494949;
                      font-family: serif;
                      font-size: 10pt;
                      line-height: 150%;
                      margin: 0pt 0pt 0pt 27.58pt;
                      padding-left: 8.42pt;
                      text-indent: 0pt;
                    "
                    ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                      >联系方式：包括但不限于qq号、qq群、微信号、微信公众号等；</span
                    ></li
                  ></ul
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布风险医疗内容：</span
                ><ul style="margin: 0pt; padding-left: 0pt" type="square"
                  ><li
                    style="
                      color: #494949;
                      font-family: serif;
                      font-size: 10pt;
                      line-height: 150%;
                      margin: 0pt 0pt 0pt 27.58pt;
                      padding-left: 8.42pt;
                      text-indent: 0pt;
                    "
                    ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                      >推广非正规医疗场所或医疗服务，包括未知安全性的药品、保健品、医美项目、医疗活动等；</span
                    ></li
                  ><li
                    style="
                      color: #494949;
                      font-family: serif;
                      font-size: 10pt;
                      line-height: 150%;
                      margin: 0pt 0pt 0pt 27.58pt;
                      padding-left: 8.42pt;
                      text-indent: 0pt;
                    "
                    ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                      >宣传违法违规的医疗行为，如非法代孕，胎儿性别鉴定，非法器官移植等；</span
                    ></li
                  ></ul
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布风险投资内容：</span
                ><ul style="margin: 0pt; padding-left: 0pt" type="square"
                  ><li
                    style="
                      color: #494949;
                      font-family: serif;
                      font-size: 10pt;
                      line-height: 150%;
                      margin: 0pt 0pt 0pt 27.58pt;
                      padding-left: 8.42pt;
                      text-indent: 0pt;
                    "
                    ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                      >荐股荐彩：推荐购买指定股票、博彩（包含彩票、足彩、六合彩、赌球、跑马）等高风险投资产品，含有联系方式或引导关注第三方帐号的；</span
                    ></li
                  ><li
                    style="
                      color: #494949;
                      font-family: serif;
                      font-size: 10pt;
                      line-height: 150%;
                      margin: 0pt 0pt 0pt 27.58pt;
                      padding-left: 8.42pt;
                      text-indent: 0pt;
                    "
                    ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                      >诱导投资：含诱导他人参与投资的各类推广话术，包括但不限于P2P、区块链、各种网赚等；</span
                    ></li
                  ></ul
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发表贵重收藏品内容中含有联系方式或诱导关注第三方帐号；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >宣传直销、网赚兼职并鼓吹小成本获大收益，脱离现实（例：住家创业，手机操作即可月入xx万）；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >售卖高仿表、假烟、假冒名牌服饰等；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >宣传推广封建迷信内容时，如风水转运、画符解咒等，含联系方式或引导关注的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布PUA内容，或情感挽回、婚姻挽回等含有联系方式的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布的视频、音频内容含有语音推广信息；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >宣传刷粉刷量工具、外挂工具、违规查他人隐私信息等违规工具或产品；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >通过美女图片/视频、低俗小说/段子，引导关注第三方帐号的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >恶意发布社会负面/敏感事件进行商品分享并造成恶劣影响的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >恶意借国家领导人、公检法军、国家机关、国徽国旗等形象为企业或产品宣传推广。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布大量低质内容：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布大量内容低质文章，标题、内文夸张耸动；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布大量语句不通、机器编译的内容。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >恶意躲避或对抗平台规则，包括但不限于以下行为：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >恶意批量注册头条号，养号囤号，买卖帐号；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >买卖或使用虚假、伪造、变造的身份资料、专业资格证明、版权证明、机构资质等证明材料进行帐号注册、认证、开通或使用平台其他功能；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >存在刷粉、刷量、刷赞或其他作弊行为；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >通过非正常手段发布大量内容；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布视频时恶意缩放画面、变速、添加滤镜、变声并影响恶劣的；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >使用转发抽奖功能时，出现违规不兑现奖品或通过抽奖索要钱财等行为。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >滥用平台功能进行违规推广：</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >在「自定义菜单」或「扩展链接」中添加违规推广内容；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >使用平台链接类功能进行推广（包括但不限于「自定义菜单」「文章插入外链」「扩展链接」）时，插入直接下载的APK链接；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >文中引导二次跳转到其他违规推广页面。</span
                ></li
              ></ul
            ></li
          ></ul
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt">&nbsp;</span></p
        ><p style="margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 14pt; font-weight: bold">禁言机制</span></p
        ><p style="margin: 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 12pt">禁言机制是</span
          ><span style="color: #222222; font-family: 宋体; font-size: 12pt">发动集平台</span
          ><span style="color: #222222; font-family: 宋体; font-size: 12pt"
            >规范平台内容创作行为的机制之一，旨在维护平台健康有序的内容生态，给创作者和用户创造更好的使用体验。创作者若出现违反社区规范的行为，将被限制账号功能，受到全局禁言等处罚。</span
          ></p
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt">&nbsp;</span></p
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt; font-weight: bold"
            >禁言定义</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >对于发布违法违规或其他有害内容的作者，平台将短期或长期地，取消该作者账号发布各体裁内容及发布私信、评论的功能，这种处罚即为禁言</span
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt">&nbsp;</span
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt">。</span></p
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt; font-weight: bold"
            >禁言规则</span
          ></p
        ><table cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-left: 0pt"
          ><tbody
            ><tr style="height: 22.5pt"
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt; text-align: center"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >不当内容</span
                  ></p
                ></td
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt; text-align: center"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >对应禁言天数</span
                  ></p
                ></td
              ></tr
            ><tr style="height: 22.5pt"
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >政治谣言</span
                  ></p
                ></td
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >首次禁言10天</span
                  ></p
                ></td
              ></tr
            ><tr style="height: 22.5pt"
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >其他谣言</span
                  ></p
                ></td
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >5天以上</span
                  ></p
                ></td
              ></tr
            ><tr style="height: 22.5pt"
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >涉时政有害信息</span
                  ></p
                ></td
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >5天以上</span
                  ></p
                ></td
              ></tr
            ><tr style="height: 22.5pt"
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >涉历史虚无注意有害信息</span
                  ></p
                ></td
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >5天以上</span
                  ></p
                ></td
              ></tr
            ><tr style="height: 22.5pt"
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >低俗、色情</span
                  ></p
                ></td
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >5天以上</span
                  ></p
                ></td
              ></tr
            ><tr style="height: 22.5pt"
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >违规推广</span
                  ></p
                ></td
              ><td
                style="
                  border-bottom-color: #000000;
                  border-bottom-style: solid;
                  border-bottom-width: 0.75pt;
                  border-left-color: #000000;
                  border-left-style: solid;
                  border-left-width: 0.75pt;
                  border-right-color: #000000;
                  border-right-style: solid;
                  border-right-width: 0.75pt;
                  border-top-color: #000000;
                  border-top-style: solid;
                  border-top-width: 0.75pt;
                  padding-bottom: 2.62pt;
                  padding-top: 2.62pt;
                  vertical-align: top;
                  width: 230.25pt;
                "
                ><p style="margin: 0pt"
                  ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                    >利用国旗和国徽等党和政府的标识，进行炒作，推广，禁言10天</span
                  ></p
                ></td
              ></tr
            ></tbody
          ></table
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="font-family: 宋体; font-size: 13pt; font-weight: bold"
            >禁言场景详述</span
          ></p
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >政治谣言</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt">主要包括：</span></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >针对政治人物的谣言</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >主要指个人或集团为了其特定的政治目的，对党和国家领导人，以及具有政治意义的公众人物进行的有意诬陷和诽谤。</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >针对政治事件的谣言</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >在某些重大突发事件、灾情等发生后不断扩散的谣言，往往以扰乱政治生态、制造社会混乱、等为目的。</span
                ></li
              ></ul
            ></li
          ></ul
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt">&nbsp;</span></p
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >其他谣言</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt">包括但不限于：</span></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >涉及编造或传播虚假内容</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >杜撰事实，完全编造、拼凑，或虚设某权威主体的态度，制造耸人听闻的谣言；以讹传讹，无可信来源或断章取义，传播未经证实的虚假消息误导读者；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >内容中关键信息与事实不符</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >发布内容与已发生事实相悖，关键信息不准确，或歪曲实际情节等；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >涉及违背科学常理的内容</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >如不实健康信息、对医药食品等疗效过度夸大，曲解科学探索，或对科学常识进行颠覆、扭曲等。</span
                ></li
              ></ul
            ></li
          ></ul
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt">&nbsp;</span></p
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >涉时政有害信息</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >时政有害信息包括根据现行法律法规危害国家及社会安全的信息，主要表现为：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >反对宪法确定的基本原则。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >危害国家统一、主权和领土完整。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >泄露国家秘密、危害国家安全或者损害国家荣誉和利益。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >破坏国家宗教政策，宣扬邪教、迷信。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >散布谣言，扰乱社会秩序，破坏社会稳定。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >宣扬赌博、暴力、凶杀、恐怖或者教唆犯罪。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >煽动非法集会、结社、游行、示威、聚众扰乱社会秩序。</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >含有法律、行政法规和国家规定禁止的其他内容。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >涉历史虚无主义有害信息</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
            >历史虚无主义有害信息，其本质是企图从根本上否定马克思主义的指导地位，否定中国走向社会主义的历史必然性，否定中国共产党的领导，主要表现为：</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >歪曲党史、新中国史、改革开放史、社会主义发展史，攻击党的领导、指导思想、方针政策；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >诋毁英雄烈士；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >否定中华优秀传统文化、革命文化、社会主义先进文化。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >低俗色情</span
          ></p
        ><p style="font-size: 12pt; line-height: 150%; margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 12pt">包括但不限于：</span></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >展示、教唆未成年人进行吸烟喝酒等低俗行为；</span
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt">淫秽色情内容</span
            ><ul style="margin: 0pt; padding-left: 0pt" type="circle"
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >涉未成年人生殖器裸露，以及任何恋童、娈童等涉未成年色情的内容；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >露点、激凸、过分暴露，或对性行为过程进行露骨描写或展示；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >展示色情的影视、动漫、音乐、绘画/雕塑作品等</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >展示性工作者、表演者的相关内容等；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >展示情趣用品且导向低俗；</span
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >展示违背良俗的伦理关系；</span
                ><ul style="margin: 0pt; padding-left: 0pt" type="square"
                  ><li
                    style="
                      color: #494949;
                      font-family: serif;
                      font-size: 10pt;
                      line-height: 150%;
                      margin: 0pt 0pt 0pt 27.58pt;
                      padding-left: 8.42pt;
                      text-indent: 0pt;
                    "
                    ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                      >如乱伦关系，或古代宫廷低俗野史等；</span
                    ></li
                  ></ul
                ></li
              ><li
                style="
                  color: #494949;
                  font-family: serif;
                  font-size: 10pt;
                  line-height: 150%;
                  margin: 0pt 0pt 0pt 29pt;
                  padding-left: 7pt;
                  text-indent: 0pt;
                "
                ><span style="color: #494949; font-family: 宋体; font-size: 11pt"
                  >展示猎奇的性癖好、性风俗等；</span
                ></li
              ></ul
            ></li
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >发布和传播其他有伤社会风化的低俗内容。</span
            ></li
          ></ul
        ><p style="font-size: 13pt; line-height: 115%; margin: 5pt 0pt"
          ><span style="color: #222222; font-family: 宋体; font-size: 13pt; font-weight: bold"
            >违规推广</span
          ></p
        ><ul style="margin: 0pt; padding-left: 0pt" type="disc"
          ><li
            style="
              color: #494949;
              font-family: serif;
              font-size: 10pt;
              line-height: 150%;
              margin: 0pt 0pt 0pt 27.6pt;
              padding-left: 8.4pt;
              text-indent: 0pt;
            "
            ><span style="color: #494949; font-family: 宋体; font-size: 12pt"
              >利用国旗国徽、党旗党徽、国家领导人形象等党和政府的标志标识，进行商业炒作、推广等。</span
            ></li
          ></ul
        ><p style="margin: 0pt"
          ><span style="color: #494949; font-family: 宋体; font-size: 11pt">&nbsp;</span></p
        ><p style="margin: 0pt; orphans: 0; text-align: justify; widows: 0"
          ><span style="font-family: 等线; font-size: 10.5pt">&nbsp;</span></p
        ></div
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: 'PrivacyPolicy',
    data() {
      return {
        show: false,
      }
    },
    onLoad(opt) {
      this.show = opt?.show || false
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    font-size: 28rpx;
    .red {
      color: #ff5319;
    }
    > view {
      margin-bottom: 32rpx;
      line-height: 150%;
    }
    .title {
      font-size: 32rpx;
      margin-top: 8rpx;
      margin-bottom: 24rpx;
      font-weight: bold;
    }
    .title1 {
      margin-top: -8rpx;
      margin-bottom: 16rpx;
      font-weight: bold;
    }
  }
</style>
