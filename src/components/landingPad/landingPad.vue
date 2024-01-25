<script setup>
</script>

<template>
<div id='landing-pad'>
  <div id='measurer'></div>
  <div id='marbled'>
    <img src='/src/assets/marbleBG.png' />
  </div>
  <div id='portrait'>
    <img src='/src/assets/simpleheadshot.png' />
    <span class='year'>Est. 1994</span>
  </div>
  <h1 id='landing-pad-title'>Alan Way</h1>
  <div class='decoration'></div>
</div>
</template>

<style lang="scss" scoped>

#landing-pad {
  position: absolute;
  aspect-ratio: 2/1;
  width: 100%;
  // max-width: calc(min(var(--content-max-width) + 228px, 100vw - 186px));
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#measurer { 
  position: absolute;
  width: 100%;
  height: 89%;
  top: 3%;
  pointer-events: none;
}

#marbled {
  position: absolute;
  width: calc(100% - 15%);
  height: calc(100% - 2%);
  margin: 2% 15% 0 0;
  overflow: hidden;
  aspect-ratio: 1/0.65;
  filter: contrast(1.6) saturate(0.4) brightness(1);
  z-index: -1;
  background-color: #fafafa;

  img {
    height: 100%;
    aspect-ratio: 1/0.65;
    width: 100%;
    object-fit: cover;
    object-position: center;
    display: none;
  }
}

#portrait {
  width: calc(100% - 35%);
  height: calc(100% - 5%);
  margin: 0 0 5% 35%;
  overflow: hidden;
  aspect-ratio: 1/.75;
  position: absolute;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 36% 100%, 0% 52%);
  z-index: -1;

  .year {
    font-family: 'Playfair Display', serif;
    position: absolute;
    top: 100%;
    right: 0;
    transform-origin: top right;
    transform: rotate(90deg);
    padding: 6px 4px;
    display: none;
  }

  &:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 5px;
    left: calc(100% - 5px);
    background-color: #ffcd00;
    z-index: 1;
  }

  img {
    height: 100%;
    filter: saturate(0);
    aspect-ratio: 1.78 / 1;
    width: 100%;
    object-fit: cover;
    object-position: right;
    transform: scaleX(-1);
  }
}

#landing-pad-title {

  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  color: #202020;
  left: 10%;
  top: 3%;
  position: absolute;
  font-size: clamp(2.25rem, calc(11.4074vw - 2.0278rem), 6.1rem);
}

.decoration {
    width: 93%;
    height: 96%;
    margin-bottom: 1.5%;
    border: 2px solid #acacacb8;
    position: absolute;
    pointer-events: none;
}

</style>

<script>
export default {
  name: 'Landing Pad',
  props: {
    msg: String
  }
}
</script>
