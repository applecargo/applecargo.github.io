<template>
  <div>
    <btn title="S!" color="red" bg-off="bg-purple" size="1"></btn>
    <btn title="Go!" color="orange" bg-off="bg-green" size="2"></btn>
    <btn title="Yes" color="yellow" bg-off="bg-black" size="3"></btn>
    <btn title="No" color="green" bg-off="bg-lime" size="4"></btn>
    <btn title="안녕하세요" color="hot-pink" bg-off="bg-purple" size="5"></btn>
    <btn title="반갑다잉" color="white" size="6"></btn>
    <btn size="1"></btn>
    <btn size="2"></btn>
    <btn size="3"></btn>
    <btn size="4"></btn>
    <btn size="5"></btn>
    <btn size="6"></btn>
  </div>
</template>

<script>
import Btn from './Btn.vue'

export default {
  name: 'app',
  components: {
    Btn
  }
}
</script>
