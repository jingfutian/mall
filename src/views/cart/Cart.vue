<template>
  <div class="cart">
    <nav-bar class="cart-navbar">
      <div slot="nav-center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import NavBar from "components/common/navbar/NavBar"
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    width: 100vw;
  }

  .cart-navbar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
