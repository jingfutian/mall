import { debounce } from "./utils"
import {POP, NEW, SELL} from "./const"
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

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
