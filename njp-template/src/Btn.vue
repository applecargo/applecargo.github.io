<template>
  <a class="grow no-underline br-pill mb2 dib" :class="[color, 'f' + fontsize, 'pa' + padsize, isActive ? bgOn : bgOff]" @click="blink()">{{title}}</a>
</template>

<script>
export default {
  props: {
    title: { default: '' },
    color: { default: 'black' },
    bgOn: { default: 'bg-yellow' },
    bgOff: { default: 'bg-blue' },
    size: { default: 2 }
  },
  data: function () {
    return {
      isActive: false
    }
  },
  computed: {
    fontsize: function () { return this.size },
    padsize: function () {
      if (this.size >= 5) {
        return 2
      } else if (this.size >= 3) {
        return 3
      } else if (this.size >= 1) {
        return 4
      } else {
        return 5
      }
    }
  },
  methods: {
    blink: function () {
      // console.log('blink')
      this.isActive = true
      setTimeout(function () {
        this.isActive = false
      }.bind(this), 200)
    }
  }
}
</script>
