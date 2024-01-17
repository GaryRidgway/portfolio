<script setup>
</script>

<template>
  <div class="bg-image">
    <img :src="bgUrl">
    <div class="gradient"></div>
  </div>
</template>

<style lang="scss" scoped>
.bg-image {
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  img {
    opacity: 0.2;
    width: 200%;
    height: 200%;
    object-fit: cover;
    left: -50%;
    position: absolute;
    top: -50%;
    transform: rotate(-30deg);
    filter: saturate(3) contrast(1.2);
  }

  .gradient {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(25,25,25);
    background: linear-gradient(155deg, rgba(25,25,25,0) 0%, rgba(25,25,25,0.34499737394957986) 21%, rgba(25,25,25,0.6783307072829132) 38%, rgba(25,25,25,0.8996192226890756) 64%, rgba(25,25,25,0.8968181022408963) 100%);
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
