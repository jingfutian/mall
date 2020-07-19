<template>
  <div>
    <ul id="subCategory">
      <li
        v-for="(item, index) in categoryData.list"
        :key="index"
      >
        <a :href="item.link">
          <img :src="item.image" alt="" class="item-img">
          <span class="item-text">{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'CategoryContent',
    props: {
      categoryData: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style  scoped>
  #subCategory {
    display: grid;
    grid-template-columns: 80px 80px 80px;
    row-gap: 12px;
    justify-content: space-evenly;
    padding: 20px 0;
  }

  #subCategory li a{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }

  #subCategory img {
    display: block;
    margin-bottom: 10px;
    width: 80%;
  }
</style>
