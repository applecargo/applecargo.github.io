<template>
  <input type="checkbox" class="input-reset br-pill mb2 dib ba" :class="[color, bcolor, 'bw' + bwidth, 'f' + fontsize, 'pa' + padsize, isOn ? bgOn : bgOff]" @click="toggle()">
</template>

<script>
export default {
  props: {
    title: { default: '' },
    color: { default: 'black' },
    bcolor: { default: 'b--gold' },
    bgOn: { default: 'bg-yellow' },
    bgOff: { default: 'bg-blue' },
    size: { default: 2 },
    bwidth: { default: 2 }
  },
  data: function () {
    return {
      isOn: false
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
    toggle: function () {
      this.isOn = !this.isOn;
      this.$emit('change');
      if (this.isOn == true) {
        this.$emit('on');
      } else {
        this.$emit('off');
      }
    }
  }
}
</script>
