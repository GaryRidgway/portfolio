<script setup>
import { nextTick } from 'vue'
const props = defineProps({
  w: String,
  h: String,
  handleStartingPos: {
    type: Number,
    default: 50
  }
});

nextTick(() => {
  // set vars
  const imageSliderContainer = document.querySelector(".image-slider-container");
  const slider = document.getElementById("range-slider");
  const image = document.getElementsByClassName("image")[1];
  const buttonRange = document.getElementsByClassName("slider-control")[0];

  // Move slider and buttonRange at change of value
  slider.addEventListener("input", (e) => {
    const sliderPos = e.target.value;

    image.style.width = sliderPos + "%";
    buttonRange.style.left = sliderPos + "%";
  });

  image.style.width = props.handleStartingPos + "%";
  buttonRange.style.left = props.handleStartingPos + "%";
});

</script>

<template>
    <div class="image-slider-container">
        <!-- Upper Image -->
        <div class="image background-image">
            <img src="/src/assets/images/Rage/RageGoldMin.png">
        </div>
        <!-- Lower Image -->
        <div class="image foreground-image">
            <img src="/src/assets/images/Rage/RageStartMin.png">
        </div>

        <!-- Range Input -->
        <input id="range-slider" class="range-slider" name="slider" type="range" min="1" max="100" value="50" />

        <!-- Slider Control -->
        <div class="slider-control">
            <span class="slider-control-btn left"></span>
            <span class="slider-control-btn right"></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.image-slider-container {
  position: relative;
  width: 100%;
  height: auto;
  transform-style: preserve-3d;
  overflow: hidden;

  .image {
    &.background-image {
      display: flex;
    }

    &.foreground-image {
      width: 50%;
      height: 100%;
      position: absolute;

      img {
        height: 100%;
        width: 100%;
        object-position: left;
        object-fit: cover;
      }
    }
  }
}
.image-slider-container .image {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: auto;
  left: 0;
  top: 0;
  background-size: cover;
  background-position: center;

  img {
    width: 100%;
    height: auto;
  }
}

.image-slider-container .range-slider {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0%;
  margin: 0;
  background: transparent;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  z-index: 2;
  transition: all 200ms linear;
  cursor: ew-resize;
}
.image-slider-container .range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 6px;
  height: 100%;
  background: white;
  cursor: move;
}

.slider-control {
  position: absolute;
  display: block;
  width: 30px;
  cursor: move;
  height: 30px;
  margin-left: 3px;
  border-radius: 50%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -50%);
  cursor: grab;

  &::before {
    content: "";
    position: absolute;
    height: 100vh;
    top: -50vh;
    left: calc(50% - 4px);
    backdrop-filter: blur(6px);
    background-color: rgba(44, 113, 145, 0.2);
    width: 8px;
    box-shadow: 0px 0px 16px 1px #0e0e0ea8;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    background: white;
    border-radius: 50%;
    width: 100%;
    box-shadow: 0px 0px 16px 1px #0e0e0ea8;
    z-index: 0;
  }
}

</style>
