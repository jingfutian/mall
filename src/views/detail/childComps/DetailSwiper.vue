<template>
  <swiper class="swiper" :options="swiperOptions">
    <swiper-slide
      v-for="(item, index) in topImages"
      :key="index"
    >
      <img :src="item" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      topImages: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        swiperOptions: {
          autoplay: true,
          pagination: {
            el: ".swiper-pagination"
          },
          loop: true
        }
      }
    }
  }
</script>

<style  scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }

  .swiper-container {
    --swiper-pagination-color: red;
  }

  .swiper-container .swiper-slide{
    height: 300px;
    overflow: hidden;
  }

  .swiper-container img {
    width: 100vw;
  }
</style>
