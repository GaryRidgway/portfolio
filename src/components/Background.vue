<script setup>
</script>

<template>
  <div class="bg-image">
    <img :src="bgUrl">
  </div>
</template>

<style lang="scss" scoped>
.bg-image {
  position: absolute;
  z-index: -1;
  opacity: 0.08;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  img {
    width: 200%;
    height: 200%;
    object-fit: cover;
    left: -50%;
    position: absolute;
    top: -50%;
    transform: rotate(-30deg);
    filter: saturate(3) contrast(1.2);
  }
}
</style>

<script>
export default {
  name: 'Background',
  props: {
    bgUrl: String
  }
}
</script>
