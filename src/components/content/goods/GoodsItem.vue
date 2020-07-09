<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="imgSrc" alt="" @load="imgLoad">
    <div class="goodsItemSpanInfo">
      <p class="goodsItemTitle">{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collection">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsItem',
    props: {
      goodsItem: {
        type: Object,
        default: {}
      }
    },
    computed: {
      imgSrc() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit('goodsImgLoad')
      },
      itemClick() {
        if (this.goodsItem.iid) {
          this.$router.push('/detail/' + this.goodsItem.iid)
        } else {
          // this.$router.replace('/detail/' + this.goodsItem.item_id)
        }
      }
    }
  }
</script>

<style  scoped>
  .goods-item {
    margin-bottom: 5px;
    text-align: center;
  }
  .goods-item img {
    width: 100%;
    height: 265px;
    border-radius: 5px;
  }

  .goods-item .goodsItemTitle {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goodsItemSpanInfo .price {
    margin-right: 22px;
    color: var(--color-high-text);
  }

  .goodsItemSpanInfo .collection {
    position: relative;
  }

  .goodsItemSpanInfo .collection::before {
    content: '';
    position: absolute;
    top: 1px;
    left: -15px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>
