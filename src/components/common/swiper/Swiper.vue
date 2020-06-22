<template>
  <div id="mall-swiper">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator">
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{active: index === currentIndex - 1}"
          :key="index"
        >
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Swiper',
    props: {
      interval: {  // 轮播多长时间滚动一次
        type: Number,
        default: 3000
      },
      animDuration: {  // 每次轮播动画的时长
        type: Number,
        default: 300
      },
      moveRatio: {  // 滑动触发轮播的比率
        type: Number,
        default: 0.25
      },
      showIndicator: {  // 是否展示轮播指示圈
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        slideCount: 0,  // 图片个数
        totalWidth: 0,  // swiper的宽度
        swiperStyle: {},  // swiper样式
        currentIndex: 1,  // 当前active的index
        scrolling: false,  // 是否正在滚动
      }
    },
    mounted() {
      setTimeout(() => {
        this.handleDom();

        this.startTimer();
      }, 3000);
    },
    methods: {
      /**
       * 定时器，用于自动轮播
       */
      startTimer() {
        this.slideTimer = window.setInterval(() => {
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer() {
        window.clearInterval(this.slideTimer)
      },
      /**
       *  滚动位置计算
       */
      scrollContent(currentPosition) {
        // 设置正在滚动标识
        this.scrolling = true;

        // 开始滚动动画
        this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 判断滚动位置是否为边界情况
        this.checkPosition();

        // 滚动完成
        this.scrolling = false;
      },
      /**
       * 校验正确的位置
       */
      checkPosition() {
        window.setTimeout(() => {
          this.swiperStyle.transition = '0ms';

          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
          }

          this.setTransform(-this.currentIndex * this.totalWidth);
          this.$emit('transitionEnd', this.currentIndex - 1);
        }, this.animDuration)
      },
      /**
       * 设置滚动位置
       */
      setTransform(position) {
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px 0, 0)`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px 0, 0)`;
      },
      /**
       * 操作dom，在dom前后添加slide
       */
      handleDom() {
        let swiperEle = document.querySelector('.swiper');
        let slidesEles = swiperEle.getElementsByClassName('slide');


        this.slideCount = slidesEles.length;

        if (this.slideCount > 1) {
          let cloneFirst = slidesEles[0].cloneNode(true);
          let cloneLast = slidesEles[this.slideCount-1].cloneNode(true);

          swiperEle.insertBefore(cloneLast, slidesEles[0]);
          swiperEle.appendChild(cloneFirst);

          this.totalWidth = swiperEle.offsetWidth;
          this.swiperStyle = swiperEle.style;
        }

        this.setTransform(-this.totalWidth);
      },
      /**
       * 拖动事件
       */
      touchStart(e) {
        if (this.scrolling) 
          return;

        // 停止计时器
        this.stopTimer();

        // 保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },
      touchMove(e) {
        // 计算用户拖动的距离
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        
        let currentPosition = -this.currentIndex * this.totalWidth;
        let currentMoveDistance = this.distance + currentPosition;

        // 设置滚动位置
        this.setTransform(currentMoveDistance);
      },
      touchEnd(e) {
        // 获取移动距离
        let moveDistance = Math.abs(this.distance);

        // 判断最终移动距离和方向
        if (moveDistance === 0) {
          return;
        } else if (moveDistance > this.totalWidth * this.moveRatio) {
          if (this.distance > 0) {
            // 左滑成功
            this.currentIndex--;
          } else {
            // 右滑成功
            this.currentIndex++;
          }
        }

        // 滚动到正确位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 手的拖动完成后重新启动定时器
        this.startTimer();
      },
      /**
       * 控制上一个，下一个
       */
      previous() {
        this.changeItem(-1);
      },
      next() {
        this.changeItem(1);
      },
      changeItem(num) {
        this.stopTimer();

        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        this.startTimer();
      }
    }
  }
</script>

<style  scoped>
  #mall-swiper {
    position: relative;
    overflow: hidden;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
