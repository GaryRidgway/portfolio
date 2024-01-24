<script setup>
import p5 from 'p5';
import s1 from './sketch.js'
const props = defineProps({
    id: {
      type: String,
      default: 'p5-sketch'
    }
  });
</script>

<template>
  <div class="flow-border" :id='id'></div>
</template>

<style scoped>
.flow-border {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>

<script>
import { nextTick } from 'vue';
export default {
  name: 'Flow Border',
  mounted() {
		document.flowSketch = new p5(s1);
    document.flowSketchId = this.id;
	}
}
</script>
