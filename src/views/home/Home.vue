<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-center">购物商城</div>
    </nav-bar>
    <tab-control
        v-show="isTabFixed"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
      />

    <scroll
      class="content"
      ref="scroll"
      @onScroll="showBackTop"
      @pullingUp="loadMore"
      :probe-type="3"
      :pull-up-load="true"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="goodsList" />
    </scroll>

    <back-top v-show="isShowBackTop" @click.native="backTopClick"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import { getHomeMultiData, getHomeGoods } from 'network/home'  

  import { imgLoadListenerMixin, backTopMixin } from "common/mixin"

  export default {
    name: 'Home',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentTabType: 'pop',
        tabKinds: ['pop', 'new', 'sell'],
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed: {
      goodsList() {
        return this.goods[this.currentTabType].list;
      }
    },
    mixins: [imgLoadListenerMixin, backTopMixin],
    created() {
      this.getMultiData();

      this.getGoods('pop');
      this.getGoods('new');
      this.getGoods('sell');
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()

      this.$bus.$off('goodsImgLoad', this.imgLoadListener)
    },
    methods: {
      /**
       * 事件
       */
      tabClick(index) {
        this.currentTabType = this.tabKinds[index];

        //保持两个tabControl的active标签一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      showBackTop(position) {
        // 判断backTop是否显示
        this.isShowBackTop = -position.y >= 1000 ? true : false

        // 判断tabControl是否吸顶
        this.isTabFixed = -position.y >= this.tabOffsetTop ? true : false
      },
      loadMore() {
        this.getGoods(this.currentTabType)
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求数据
       */
      getMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getGoods(type) {
        const page = this.goods[type].page + 1;

        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page++;

          this.$refs.scroll.finishPullUp();
        })
      }
    },
  }
</script>

<style  scoped>
  #home {
    position: relative;
    height: 100vh;
  }

  .home-nav {
    background: var(--color-tint);
    color: #fff;
    font-size: 1.1em;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
