<template>
  <div class="nav-bar">
    <div class="nav-left">
      <slot name="nav-left"></slot>
    </div>
    <div class="nav-center">
      <slot name="nav-center"></slot>
    </div>
    <div class="nav-right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
  }
</script>

<style  scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    z-index: 10;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .nav-left, .nav-right {
    width: 60px;
  }

  .nav-center {
    flex: 1;
    text-align: center;
  }
</style>
