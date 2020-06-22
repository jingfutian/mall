import { debounce } from "./utils";
import BackTop from 'components/common/backTop/BackTop';

export const imgLoadListenerMixin = {
  data() {
    return {
      imgLoadListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    
    this.imgLoadListener = () => {
      refresh()
    }

    this.$bus.$on('goodsImgLoad', this.imgLoadListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {    
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}