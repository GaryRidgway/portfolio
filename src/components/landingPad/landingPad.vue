<script setup>
import GlassPane from '../glassPane/glassPane.vue';

</script>

<template>
<div id='landing-pad'>
  <div id='measurer'></div>
  <!-- <div id='marbled' class='paper-border'>
    <img class="prevent-select" draggable="false" src='/src/assets/images/PaperTex2.png' />
  </div>
  <div class='backdrop-paper paper-border'>
    <img class="prevent-select" draggable="false" src='/src/assets/images/PaperTex2.png' />
  </div>
  <div class="ripped-fabric">
    <img class="prevent-select" draggable="false" src='/src/assets/images/FabricRippedColor.png' />
  </div>
  <div id='portrait'>
    <img class="prevent-select" draggable="false" src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img class="prevent-select" draggable="false" src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img class="prevent-select" draggable="false" src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img class="prevent-select" draggable="false" src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <img class="prevent-select" draggable="false" src='/src/assets/images/selfPortraitWarpCropped.jpg' />
    <span class='year'>Est. 1994</span>
  </div>
  <div id='landing-pad-title' class='paper-border'>
    <img class="prevent-select" draggable="false" src='/src/assets/images/PaperTex2.png' />
    <h1 class="step-down-shadow prevent-select">Alan Way</h1>
    <h1 class="name-clip">Alan Way</h1>
  </div>
  <GlassPane :idPrefix='"1"' classes="" text='Developer' :wave='false'></GlassPane>
  <GlassPane :idPrefix='"2"' classes="" text='Artist' :wave='false'></GlassPane>
  <GlassPane :idPrefix='"3"' classes="" text='Performer' :wave='false'></GlassPane> -->
</div>
</template>

<style lang="scss" scoped>
.paper-border {
  border-top: 1px solid rgb(255 245 224);
  border-left: 1px solid rgb(198 190 171);
  filter: var(--sm1);
  background-color: var(--warm-sun);

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
  // filter: var(--sm3);

  .backdrop-paper {
    width: 24%;
    height: 120%;
    position: absolute;
    left: 78%;
    top: -7%;
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
}

.ripped-fabric {
  position: absolute;
  width: 70%;
  left: -77px;
  top: -161px;
  transform: rotate(32deg);
  filter: saturate(1.2);

  // position: absolute;
  // width: 89%;
  // left: -19px;
  // top: -223px;
  // transform: rotate(231deg);

  img {
    width: 100%;
    height: auto;
  }
}

#portrait {
  width: 45%;
  height: 126%;
  margin: 6.5% 0 0 45%;
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
  left: -5%;
  top: 21%;
  padding: 1.4% 9% 1.9%;
  position: absolute;
  filter: var(--sm3);
  // background-color: #ebac0c;
  background-color: var(--yellow-paper-bg);
  border-left-color: var(--yellow-paper-left-color);
  border-top-color: var(--yellow-paper-top-color);

  img {
    position: absolute;
    height: 200%;
    width: 200%;
    left: 0;
    top: 0;
    z-index: -1;
    clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%);
    opacity: 0.155;
    filter: invert(28%) sepia(100%) hue-rotate(4deg) saturate(3);
  }

  &:before {
    // content: "";
    // position: absolute;
    // height: 100%;
    // width: 100%;
    // left: 0;
    // top: 0;
    // opacity: 1;
    // background-image: url(/src/assets/images/PaperTex2.png);
  }

  h1 {
    font-family: "Playfair Display", serif;
    text-transform: uppercase;
    font-size: 4.25rem;
    margin: 0;

    &.step-down-shadow {
      position: absolute;
      z-index: -1;
      left: -1px;
      top: -3px;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--yellow-paper-dark-shadow)
    }

    &.name-clip {
      color: transparent;
      background-color: rgb(24 34 43);
      background-clip: text;

      &:before {
        content: "Alan Way";
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0.15;
        background-image: url(/src/assets/images/PaperTex2.png);
        background-clip: text;
        pointer-events: none;
      }
    }
  }
}

#details {
  position: absolute;
  left: 0;
  bottom: 0;

  p {
    background-clip: text;
    color: transparent;
    background-color: rgb(24 34 43);
    font-family: 'Nothing You Could Do', cursive;

    &:before {
      content: "Alan Way";
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0.15;
      background-image: url(/src/assets/images/PaperTex2.png);
      background-clip: text;
      pointer-events: none;
    }
  }
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

<style lang="scss">
  .fullglass {
    &#glass1 {
      --gPosX: -30vw;
      --gPosY: 1vh;
    }

    &#glass2 {
      --gPosX: -28vw;
      --gPosY: 10vh;
    }

    &#glass3 {
      --gPosX: -26vw;
      --gPosY: 19vh;
    }
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
