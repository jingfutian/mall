<template>
  <div id="detail">
    <detail-nav-bar 
      class="detail-nav"
      @itemClick="titleClick"
      :current-index="currentIndex"
    />
    <scroll
      class="content"
      ref="scroll"
      @onScroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info ref="base" :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" :imgLoad="imgLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <detail-recommend-info ref="recommend" :recommendList="recommendList" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top v-show="isShowBackTop" @click.native="backTopClick"/>

    <toast :message="toastMessage" v-show="toastShow" />
  </div>
</template>

<script>
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import Toast from 'components/common/toast/Toast'

  import { imgLoadListenerMixin, backTopMixin } from "common/mixin";

  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      Scroll,
      Toast,
    },
    data () {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        currentIndex: 0,
        themeTops: [], // 记录详情页各个组件的位置,
        toastMessage: '',
        toastShow: false,
      }
    },
    mixins: [imgLoadListenerMixin, backTopMixin],
    created() {
      this._getDetailData()
      this._getRecommend()
    },
    updated() {
		  // 获取需要的四个offsetTop
      this._getOffsetTops()
    },
    destroyed() {
      this.$bus.$off('goodsImgLoad', this.imgLoadListener)
    },
    methods: {
      ...mapActions(['addCart']),
      _getDetailData() {
        // 保存商品id
        this.iid = this.$route.params.iid

        // 请求商品信息
        getDetail(this.iid).then(res => {
          const data = res.data.result

          // 商品详情页轮播图片
          this.topImages = res.data.result.itemInfo.topImages
          // 详情页商品信息
          this.goods = new Goods(data.columns, data.itemInfo, data.shopInfo.services)
          // 详情页店铺信息
          this.shop = new Shop(data.shopInfo)
          // 详情页下面的详情信息
          this.detailInfo = data.detailInfo
          // 参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          // 评价信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      _getRecommend() {
        getRecommend().then((res, error) => {
          if (error) {
            return
          }

          this.recommendList = res.data.data.list
        }) 
      },
      _listenScrollTheme(position) {
        let length = this.themeTops.length

        for (let i = 0; i < length; i++) {
          const iPos = this.themeTops[i];
          
          if (position >= iPos && position < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }

            break;
          }
        }
      },
      _getOffsetTops() {
		    this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      imgLoad() {
        this.refresh()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
      contentScroll(position) {
        // 判断backTop是否显示
        this.isShowBackTop = -position.y >= 1000 ? true : false
        // 监听滚动到哪一个主题
        this._listenScrollTheme(-position.y)
      },
      addToCart() {
        const product = {
          'iid': this.iid,
          'title': this.goods.title,
          'desc': this.goods.desc,
          'realPrice': this.goods.realPrice,
          'imgUrl': this.topImages[0],
        }

        // this.$store.commit('addCart', product)
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res)
        })

      }
    }
  }
</script>

<style  scoped>
  #detail {
    position: relative;
    height: 100vh;
    background: #fff;
    z-index: 100;
  }

  .detail-nav {
    position: relative;
    z-index: 10;
    background: #fff;
  }

  .content {
    height: calc(100% - 93px);
  }
</style>
