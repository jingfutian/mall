<template>
  <div id="category">
    <nav-bar>
      <div slot="nav-center">商品分类</div>
    </nav-bar>
    <div class="content">
      <category-side-menu
        :categoryList="categoryList"
        @selectItem="selectItem"
      />
      <scroll 
        id="category-main" 
        :data="[categoryData]"
        @onScroll="fixTabControl"
      >
        <div>
          <category-content :categoryData="showSubCategory" />
          <tab-control ref="tabControl" :titles="['综合', '新品', '销量']" @tabClick="tabClick" />
          <category-tab-content :category-detail="showCategoryDetail" />
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  
  import {POP, NEW, SELL} from "common/const"

  import CategorySideMenu from './childComps/CategorySideMenu'
  import CategoryContent from './childComps/CategoryContent'
  import CategoryTabContent from './childComps/CategoryTabContent'

  import {getCategory, getSubCategory, getCategoryDetail} from 'network/category'

  export default {
    name: 'Category',
    components: {
      NavBar,
      Scroll,
      TabControl,
      CategorySideMenu,
      CategoryContent,
      CategoryTabContent
    },
    data () {
      return {
        categoryList: [],
        categoryData: {},
        currentIndex: -1,
        currentType: POP,
      }
    },
    computed: {
      showSubCategory() {
        if (this.currentIndex === -1) return {}

        return this.categoryData[this.currentIndex].subCategory
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []

        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      this._getCategory()
    },
    methods: {
      // 获取左侧分类列表
      _getCategory() {
        getCategory().then(res => {
          // console.log(res.data.category.list);
          this.categoryList = res.data.category.list

          let len = this.categoryList.length
          for (let i = 0; i < len; i++) {
            this.categoryData[i] = {
              subCategory: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          
          this._getSubCategory(0)
        })
      },
      // 获取子列表的数据
      _getSubCategory(index) {
        this.currentIndex = index

        const maitKey = this.categoryList[index].maitKey
        getSubCategory(maitKey).then(res => {
          this.categoryData[index].subCategory = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
      },
      _getCategoryDetail(type) {
        const miniWallkey = this.categoryList[this.currentIndex].miniWallkey

        getCategoryDetail(miniWallkey, type).then(res => {
          // console.log(res);
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      selectItem(index) {
        this._getSubCategory(index)
        console.log(this.categoryData);
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        this.$refs.tabControl.currentIndex = index
      }
    }
  }
</script>

<style  scoped>
  #category {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  #category .content {
    display: flex;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  #category-main {
    flex: 1;
  }
</style>
