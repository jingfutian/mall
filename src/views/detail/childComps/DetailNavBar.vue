<template>
  <nav-bar>
    <div class="navLeft" slot="nav-left" @click="detailBack">
      <img class="detailBackImg" src="~assets/img/common/back.svg" alt="back">
    </div>
    <div slot="nav-center" class="navCenter">
      <div 
        v-for="(item, index) in titles"
        class="navCenterItem"
        :class="{active: index === currentIndex}"
        :key="index"
        @click="titleClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    props: {
      titles: {
        type: Array,
        default: () => {
          return ['商品', '参数', '评论', '推荐']
        }
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      titleClick(index) {
        this.$emit('itemClick', index)
      },
      detailBack() {
        this.$router.back()
      }
    }
  }
</script>

<style  scoped>
  .navLeft {
    text-align: center;
  }

  img.detailBackImg {
    margin-top: 10px;
  }
  
  .navCenter {
    display: flex;
  }

  .navCenterItem {
    flex: 1;
  }
  

  .active {
    color: var(--color-high-text)
  }
</style>
