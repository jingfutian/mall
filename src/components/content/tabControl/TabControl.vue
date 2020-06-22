<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      :key="index"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        // this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style  scoped>
  .tab-control {
    display: flex;
    position: sticky;
    top: 44px;
    height: 44px;
    line-height: 44px;
    font-size: 1em;
    background: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
    text-align: center;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .tab-control-item.active span {
    border-bottom: 2px solid var(--color-high-text);
    color: var(--color-high-text);
  }
</style>
