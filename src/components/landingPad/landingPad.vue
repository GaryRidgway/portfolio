<script setup>
import GlassPane from '../glassPane/glassPane.vue';

</script>

<template>
<div id='landing-pad'>
  <div id='measurer'></div>
  <div id='marbled' class='paper-border'>
    <img src='/src/assets/images/PaperTex2.png' />
  </div>
  <div class='backdrop-paper paper-border'>
    <img src='/src/assets/images/PaperTex2.png' />
  </div>
  <!-- <div class='decoration'></div> -->
  <div id='portrait'>
    <img src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <span class='year'>Est. 1994</span>
  </div>
  <h1 id='landing-pad-title'>Alan Way</h1>
  <GlassPane text='Alan Way'></GlassPane>
</div>
</template>

<style lang="scss" scoped>
.paper-border {
  border-top: 3px solid rgb(255 245 224);
  border-left: 3px solid rgb(198 190 171);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.3;
  }
}

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
  filter: var(--sm3);

  .backdrop-paper {
    width: 24%;
    height: 120%;
    position: absolute;
    left: 78%;
    top: -7%;
    background-color: var(--warm-sun);
    filter: var(--sm2);
  }
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
  // overflow: hidden;
  aspect-ratio: 1/0.65;
  // filter: contrast(1.6) saturate(0.4) brightness(1);
  background-color: var(--warm-sun);
  filter: var(--sm1);
}

#portrait {
  width: 45%;
  height: 126%;
  margin: 7.5% 0 0 45%;
  // overflow: hidden;
  position: absolute;
  filter: var(--sm2);

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
    // background-color: #ffcd00;
    z-index: 1;
  }

  &:hover {
    img {
      &:nth-child(2) {
        transform: translate(calc(-24%), calc(-24% * 0.23 - 2%));
      }
      &:nth-child(3) {
        transform: translate(calc(-8%), calc(-8% * 0.23 - 1%));
      }
      &:nth-child(4) {
        transform: translate(calc(8%), calc(8% * 0.23 + 1%));
      }
      &:nth-child(5) {
        transform: translate(calc(24%), calc(24% * 0.23 + 2%));
      }
    }
  }

  img {
    height: 100%;
    // filter: saturate(0);
    aspect-ratio: 1.78 / 1;
    width: 100%;
    object-fit: cover;
    object-position: top 0% right 0;
    // transform: scaleX(-1);
    position: absolute;
    transition: 0.3s ease-in-out;
    clip-path: polygon(
      0% 10%,
      100% 33%,
      100% 81%,
      0% 58%,
    );
    transform: translate(0%, 0%);
    filter: saturate(1.1) contrast(1.1);

    &:nth-child(2) {
      clip-path: polygon(
        0% 0%,
        100% 23%,
        100% 27%,
        0% 4%
      );
      transform: translate(0%, 0%);
    }

    &:nth-child(3) {
      clip-path: polygon(
        0% 5%,
        100% 28%,
        100% 32%,
        0% 9%
      );
      transform: translate(0%, 0%);
    }

    &:nth-child(4) {
      clip-path: polygon(
        0% 59%,
        100% 82%,
        100% 86%,
        0% 62%
      );
      transform: translate(0%, 0%);
    }

    &:nth-child(5) {
      clip-path: polygon(
        0% 63%,
        100% 87%,
        100% 91%,
        0% 67%
      );
      transform: translate(0%, 0%);
    }
  }
}

#landing-pad-title {

  font-family: 'Playfair Display', serif;
  text-transform: uppercase;
  color: #202020;
  left: -4%;
  top: 3%;
  // background-color: #d19a42;
  padding: 5px 60px 9px;
  position: absolute;
  font-size: clamp(2.25rem, calc(11.4074vw - 2.0278rem), 6.1rem);
  // filter: var(--sm2);
  // background-image: url('/src/assets/images/textured-paper.png');
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
