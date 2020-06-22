<template>
  <div id="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
  }
</script>

<style  scoped>
  #back-top {
    position: fixed;
    right: 5px;
    bottom: 52px;
    /* width: 15px;
    height: 15px; */
    z-index: 10;
  }

  #back-top img {
    width: 60px;
    height: 60px;
  }
</style>
