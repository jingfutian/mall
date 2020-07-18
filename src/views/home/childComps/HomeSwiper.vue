<template>
  <!-- <swiper>
      <swiper-item 
        v-for="(item, index) in banners"
        :key="index"
      >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper> -->
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide 
      v-for="(item, index) in banners"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  // import { Swiper, SwiperItem } from 'components/common/swiper/index'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperSlide
      // SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isLoad: false,
        swiperOptions: {
          autoplay: true,
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    methods: {
      imgLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(1, 300, false)
      // this.swiper.update()
      // this.swiper.slideToLoop()
    }
  }
</script>

<style  scoped>
  .swiper-container {
    width: 100%;
    height: 195px;
    /* z-index: 100; */
    --swiper-pagination-color: red;
  }

  .swiper-container img {
    width: 100%;
  }
</style>
