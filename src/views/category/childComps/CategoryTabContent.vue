<template>
  <div id="category-tab-content">
    <goods-list :goods="categoryDetail" />
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    name: 'CategoryTabContent',
    components: {
      GoodsList
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style  scoped>
  #category-tab-content {
    width: calc(100vw - 100px);
  }
</style>
