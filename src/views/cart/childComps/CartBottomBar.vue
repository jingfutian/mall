<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button 
        class="check-button" 
        :is-checked="isSelectAll"
        @click.native="checkSelectAll"
      />
      <span>全选</span>
    </div>
    <div class="total-price">
      合计: ￥{{ totalPrice }}
    </div>
    <div class="calculate">
      去计算({{ cartListLength }})
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import CheckButton from './CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.realPrice * item.count
        }, 0).toFixed(2)
      },
      // 购物车中选中的物品个数
      cartListLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        return this.cartLength > 0 && !this.cartList.find(item => !item.checked) 
        // return this.cartListLength === this.cartLength
      }
    },
    methods: {
      checkSelectAll() {
        // console.log(this.cartList);
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style  scoped>
  .cart-bottom-bar {
    display: flex;
    align-items: center;
    height: 40px;
    background: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }

  .check-content span {
    font-size: 16px;
  }

  .check-button {
    margin-right: 10px;
    height: 20px;
    width: 20px;
  }

  .total-price {
    flex: 1;
    margin-left: 20px;
  }

  .calculate {
    display: inline-block;
    width: 90px;
    height: 100%;
    line-height: 40px;
    background: red;
    color: #fff;
    text-align: center;
  }
</style>
