<template>
  <div class="hello">
    <btn title="밥돌이!" color="yellow" bg-off="bg-lime" size="1" onclick=""></btn>
    <btn title="Go!" color="gold" bg-off="bg-green" size="2"></btn>
    <btn title="Done." color="yellow" bg-off="bg-black" size="3"></btn>
    <btn title="No" color="green" bg-off="bg-lime" size="4"></btn>
    <btn title="안녕하세요" color="hot-pink" bg-off="bg-purple" size="5"></btn>
    <btn title="반갑다잉" color="white" size="6"></btn>
    <btn size="1"></btn>
    <btn size="2"></btn>
    <btn size="3"></btn>
    <btn size="4"></btn>
    <btn size="5"></btn>
    <btn size="6"></btn>
    <tgl size="1" @on="tglon" @off="tgloff" @change="chg"></tgl>
    <tgl size="1" bwidth="3" @on="tglon"></tgl>
  </div>
</template>

<script>
import Btn from './ui/Btn.vue'
import Tgl from './ui/Tgl.vue'

export default {
  name: 'hello',
  components: {
    Btn,
    Tgl
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    tglon: function () {
      console.log('tgl-on'); // we cannot use.. console.log or alert.. in templates... well.. not nice. but :( ..
    },
    tgloff: function () {
      console.log('tgl-off');
    },
    chg: function () {
      console.log('changed');
    }
  }
}
</script>
