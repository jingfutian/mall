<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '', duration = 1500) {
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.message = ''
          this.isShow = false
        }, duration);
      }
    }
  }
</script>

<style  scoped>
.toast {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  border-radius: 2px;
  font-size: 16px;
  color: #fff;
  background: rgba(0, 0, 0, .75);
  z-index: 1000;
}
</style>
