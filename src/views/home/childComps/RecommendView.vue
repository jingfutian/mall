<template>
  <div class="recommend">
    <div 
      v-for="(item, index) in recommends"
      class="recommend-item"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style  scoped>
  .recommend {
    display: flex;
    justify-content: center;
    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    font-size: 0.75em;
    text-align: center;
  }

  .recommend-item img {
    width: 5.5em;
    height: 5.5em;
    border-radius: 50%;
    margin-bottom: 10px;
  }
</style>
