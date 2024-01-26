<script setup>
</script>

<template>
<div id='landing-pad'>
  <div id='measurer'></div>
  <div id='marbled'>
    <img src='/src/assets/marbleBG.png' />
  </div>
  <div class='decoration'></div>
  <div id='portrait'>
    <img src='/src/assets/selfPortraitWarpCropped.jpg' />
    <img src='/src/assets/selfPortraitWarpCropped.jpg' />
    <img src='/src/assets/selfPortraitWarpCropped.jpg' />
    <span class='year'>Est. 1994</span>
  </div>
  <h1 id='landing-pad-title'>Alan Way</h1>
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
  background-color: var(--warm-sun);

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
  width: 45%;
  height: 105%;
  margin: 0 0 5% 45%;
  // overflow: hidden;
  position: absolute;

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
        transform: translate(-8%, -5%);
      }
      &:nth-child(3) {
        transform: translate(8%, 5%);
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
      0% 3%,
      100% 36%,
      100% 97%,
      0% 64%,
    );
      transform: translate(0%, 0%);

    &:nth-child(2) {
      clip-path: polygon(
        0% 0%,
        100% 33%,
        100% 36%,
        0% 3%
      );
      transform: translate(0%, calc(0% + 1px));
    }

    &:nth-child(3) {
      clip-path: polygon(
        0% 64%,
        100% 97%,
        100% 100%,
        0% 67%
      );
      transform: translate(0%, calc(0% + -1px));
    }
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
