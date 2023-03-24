<template>
	<div class="page-wrap">
    <duv class="section section-box section-head">
      <div class="logo">
        <image class="logo__img" mode="heightFix" src="/static/image/logo.png" />
        <h3 class="logo__text">成为汽修厂快速发展的支持平台</h3>
      </div>
<!--      <div class="menu">-->
<!--        <ul class="menu-list">-->
<!--          <li class="menu-item"><span class="menu-item__text active">首页<div class="underline"></div></span><div class="space"></div></li>-->
<!--          <li class="menu-item"><span class="menu-item__text">公司介绍<div class="underline"></div></span><div class="space"></div></li>-->
<!--          <li class="menu-item"><span class="menu-item__text">联系我们<div class="underline"></div></span></li>-->
<!--        </ul>-->
<!--      </div>-->
      <div class="link"><div class="link__label">联系电话：</div><span @click="cellPhone" class="link__number">400-893-5518</span></div>
    </duv>
    <!--head section end-->

    <!--swiper section start-->
    <div class="section section-swiper">
      <!-- <image class="section-swiper-img" src="/static/image/swiper_bg_1.png"></image> -->
      <div class="section-box" style="position: relative;z-index: 3;">
        <image class="swiper-item" mode="widthFix" src="/static/image/swiper_bg_1.png" />
      </div>
    </div>
    <!--swiper section end-->

    <!--about section start-->
    <div class="section section-box section-about">
      <div class="row">
        <div class="col-sm-12 col-md-6 about-left">
          <div class="about-content" style="position: relative">
            <image src="/static/image/about_bg_1.png" mode="widthFix" class="about-content__bg"></image>
            <div style="position: relative;z-index: 3">
              <h6 class="about-content__label">公/司/介/绍</h6>
              <h2 class="about-content__title">郑州发动集产业链科技有限公司</h2>
              <p class="about-content__text">发动集共创产业链平台是郑州发动集产业链科技有限公司面向中国汽车后市场汽配行业汽配人，以发动机为基础打造的一个共享、共创、共赢的数字化产业链平台。平台联结中国汽配行业上游优质供应商与下游专业维修厂商，用科技手段搭建汽车后市场基础设施，为汽车汽配行业人士提供即时供求商机，降低汽配交易门槛，用“一站式”快捷服务助力行业健康、有序的发展。</p>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 about-right">
          <image class="about-right__img" mode="widthFix" src="/static/image/about_img_1.png" />
        </div>
      </div>
    </div>
    <!--about section end-->

    <!--concat section start-->
    <div class="section section-concat" >
      <div class="section-box wrap">
        <div class="row">
          <div class="col-md-8 col-sm-12 map-wrap"><map class="map-container" scale="16" :latitude="latitude" :longitude="longitude" :markers="covers"></map><div class="map-container-mask"></div></div>
          <div class="col-md-4 col-sm-12">
            <div class="concat-right">
              <h6 class="concat-right__label">Contact Us</h6>
              <h2 class="concat-right__title">联系我们</h2>
              <div class="concat-right__space"></div>
              <div class="concat-content">
                <h6 class="concat-content__linklabel">联系电话：</h6>
                <a href="tel:400-123-4567" class="concat-content__linknumber">400-893-5518</a>
                <!--                        <div class="concat-content__email">邮箱：dahecai@admin.com</div>-->
                <div class="concat-content__address">地址：河南省郑州市郑东新区明理路266号正商木华广场3号楼A座7层</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--concat section end-->

    <!--footer section start-->
    <div class="section" id="section-footer">
      <div class="section-box copyright">Copyright © 2001-2021 郑州发动集产业链科技有限公司 版权所有 豫ICP备2022012993号-1</div>
    </div>
    <!--footer section end-->
  </div>
</template>

<script>
	export default {
		data() {
			return {
        latitude:34.794985,
        longitude:113.80933,
        covers:[{
          latitude: 34.794985,
          longitude: 113.80933,
          iconPath: '/static/image/icon_location.png'
        }]
			}
		},
		onLoad() {
      uni.setNavigationBarTitle({
        title: '发动集'
      });
		},
		methods: {
		  cellPhone(){
		    uni.makePhoneCall({phoneNumber:'400-893-5518'})
      }
		}
	}
</script>

<style scoped lang="scss">
$primary-color: #E00213;

//generate Grid
@mixin generateGrid($scr_flag) {
  @if $scr_flag {
    @for $i from 1 through 12 {
      .col-md-#{$i} {
        float: left;
        width: (100% / 12 * $i);
      }
    }
  } @else {
    @for $i from 1 through 12 {
      .col-sm-#{$i} {
        float: left;
        width: (100% / 12 * $i);
      }
    }
  }
}

//reset css style
@mixin resetCSS {
  margin: 0;
  padding: 0;
  border: 0;
}

@mixin verticalFlex() {
  display: flex;
  align-items: center;
}

* {
  @include resetCSS();
}

*::-webkit-scrollbar{
  visibility: hidden;
  display: none;
  width: 0;

}

.page-wrap {
  font-family: Microsoft YaHei,serif;
  background: #ffffff;
}

.img {
  vertical-align: top;
}

ul, li {
  list-style: none;
}

a{
  color: #333;
  text-decoration: none;
}


.row {
  box-sizing: border-box;
  width: 100%;
}

.row:before, .row:after {
  content: "";
  display: table;
  clear: both;
}

@include generateGrid(false);


.section-head {
  height: 75px;
  @include verticalFlex();

  .logo {
    @include verticalFlex();

    &__img {
      height: 38px;
    }

    &__text {
      margin-left: 16px;
      font-size: 12px;
      font-weight: 300;
      font-style: italic;
      color: #919191;
    }
  }

  .link {
    @include verticalFlex();

    &__label {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 27px;
    }

    &__number {
      font-size: 17px;
      font-weight: bold;
      color: #E00213;
      line-height: 34px;
    }
  }

  .menu {
    flex: 1;
    padding-right: 133px;

    &-list {
      display: flex;
      justify-content: flex-end;
    }

    &-item {
      display: flex;
      justify-content: center;

      position: relative;
      cursor: pointer;
      &:hover{
        .menu-item__text{
          color: $primary-color;
        }
        .underline {
          visibility: visible;
        }
      }

      .space {
        position: absolute;
        width: 1px;
        height: 16px;
        background: #DEDEDE;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      &__text {
        display: inline-block;
        position: relative;
        height: 75px;
        line-height: 75px;
        margin: 0 auto;


        .underline {
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          height: 3px;
          background: #DF242A;
          visibility: hidden;
        }

        &.active {
          .underline {
            //visibility: visible;
          }
        }
      }

    }
  }
}

.section-about {
  box-sizing: border-box;
  padding: 45px 0;
  .about-left {

    .about-content{
      //background-image: url("/static/image/about_bg_1.png");
      //background-repeat: no-repeat;
      //background-position: left top;
      &__bg{
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
      }
      margin-top: 10px;
      padding-top: 30px;
      &__label{
        font-size: 16px;
        font-weight: 400;
        color: #5A5A5A;
        line-height: 27px;
        margin-bottom: 10px;
      }
      &__title{
        font-size: 28px;
        font-weight: bold;
        color: #333333;
        line-height: 29px;
      }
      &__text{
        margin-top: 45px;
        font-size: 15px;
        font-weight: 400;
        color: #666666;
        line-height: 30px;
      }
    }
  }
  .about-right{
    text-align: right;
    &__img{
      max-width: 100%;
    }
  }
}

.section-concat{
  padding: 38px 0 36px;
  background: #F3F3F3;
  .wrap{
    background: #fff;
    box-shadow: rgba(50,50,50,.15) 0 0 10px 0;
    .map-wrap{
      position: relative;
    }
    .map-container{
      width: 100%;
      height: 400px;
    }
    .map-container-mask{
      display: none;
    }
    .concat{
      &-right{
        height: 320px;
        background-image: url("/static/image/concat-right-bg.png");
        background-repeat: no-repeat;
        background-position: right top;
        background-size: 290px 144px;
        margin-top: 70px;
        padding:0 10px 10px 52px;
        &__label{
          font-size: 14px;
          font-weight: 400;
          color: #535353;
          line-height: 21px;
        }
        &__title{
          font-size: 28px;
          font-weight: bold;
          color: #333333;
          line-height: 34px;
          margin: 8px 0 24px;
        }
        &__space{
          width: 42px;
          height: 1px;
          background: #2C2C2C;
        }
      }
      &-content{
        margin-top: 66px;
        &__linklabel{
          font-size: 16px;
          font-weight: bold;
          color: #333333;
          line-height: 27px;
        }
        &__linknumber{
          font-size: 32px;
          font-weight: bold;
          color: #E00213;
          line-height: 44px;
        }
        &__email{
          font-size: 16px;
          font-weight: 400;
          color: #808080;
          line-height: 27px;
          margin: 10px 0 5px;
        }
        &__address{
          font-size: 16px;
          font-weight: 400;
          color: #808080;
          line-height: 27px;
        }
      }
    }
  }
}

#section-footer{
  height: 49px;
  background: #2C2C2C;
  .copyright{
    text-align: center;
    line-height: 49px;
    font-size: 14px;
    font-weight: 400;
    color: #AAAAAA;
  }
}

.section-box {
  margin: 0 10px;
}
.swiper-item {
  width: 100%;
}
.about-left{
  margin-bottom: 15px;
}

.section-head{
  height: 60px;
  justify-content: space-between;
  .logo__img{
    height: 32px;
  }
  .logo__text{
    display: none;
  }
  .menu{
    display: none;
  }
}
.section-about{
  padding: 15px 0;
  .about-content{
    padding-top: 10px !important;
    background-size: 90% auto;
  }
  .about-content__text{
    margin-top: 25px !important;
  }
}
.section-concat{
  .map-container-mask{
    display: block !important;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 3;
    background: transparent;
  }
}

.section-swiper {
  position: relative;
  &-img{
    z-index: 1;
    position: absolute;
    left: 0;
    right:0;
    bottom: 0;
    top: 0;
    width: auto;
    height: auto;
  }
  //background-image: url("/static/image/swiper_bg_1.png");
  //background-repeat: no-repeat;
  //background-size: cover;
  //background-position: center;
}
</style>
