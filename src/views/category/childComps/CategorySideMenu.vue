<template>
  <scroll>
    <div id="category-side-menu">
      <ul>
        <li
          v-for="(categoryItem, index) in categoryList"
          :key="index"
          :class="{active: index === currentIndex}"
          @click="categoryItemClick(index)"
        >
          <span class="title">{{ categoryItem.title }}</span>
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: 'CategorySideMenu',
    components: {
      Scroll
    },
    props: {
      categoryList: Array
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      categoryItemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    }
  }
</script>

<style  scoped>
  #category-side-menu {
    width: 100px;
    background-color: rgb(243, 242, 242);
  }

  #category-side-menu li {
    height: 45px;
    line-height: 45px;
    text-align: center;
  }

  #category-side-menu li.active {
    border-left: 3px solid var(--color-high-text);
    color: var(--color-high-text);
    font-weight: 700;
    background: #fff;
  }
</style>
