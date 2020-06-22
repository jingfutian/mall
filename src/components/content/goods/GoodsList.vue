<template>
  <div class="goods">
    <goods-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    ></goods-item>
  </div>
</template>

<script>
  import GoodsItem from 'components/content/goods/GoodsItem'

  import BScroll from "better-scroll";

  export default {
    name: 'GoodsList',
    components: {
      GoodsItem
    },
    props: {
      goods: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // this.scroll = new BScroll('.goods')
    }
  }
</script>

<style  scoped>
  .goods {
    display: grid;
    grid-template-columns: 47% 47%;
    justify-content: space-evenly;
  }

  .goods img {
    border-radius: 5px;
  }
</style>
