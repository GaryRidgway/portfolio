<script setup>
import { nextTick } from 'vue'
defineProps({
  w: String,
  h: String
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
});

</script>

<template>
    <div class="image-slider-container">
        <!-- Upper Image -->
        <div class="image background-image">
            <img src="/src/assets/Monupaint.png">
        </div>
        <!-- Lower Image -->
        <div class="image foreground-image">
            <img src="/src/assets/Monusketch.png">
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
  width: 1065px;
  height: 1468px;
  border: 5px solid #fff;
  border-radius: 20px;
  overflow: hidden;
  transform: scale(1) rotate(0);
  transition: transform 300ms ease;
  transform-style: preserve-3d;
}
.image-slider-container .image {
    overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-size: cover;
  background-position: center;

  img {
    height: 100%;
    width: auto;
  }
}
.image-slider-container .image:nth-child(2) {
  width: 50%;
}
.image-slider-container .range-slider {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  background: rgba(242, 242, 242, 0.2);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  z-index: 2;
  transition: all 200ms linear;
}
.image-slider-container .range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 6px;
  height: 800px;
  background: white;
  cursor: move;
  transition: all 300ms ease;
}

.slider-control {
  z-index: 0;
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -50%);
  cursor: grab;
}
.slider-control::after, .slider-control::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.slider-control::after {
  content: "";
  right: 3px;
}
.slider-control::before {
  content: "";
  left: 3px;
}

@keyframes focusToSlider {
  from {
    box-shadow: inset 0 0 200px;
  }
  to {
    box-shadow: inset 0 0 0 0;
  }
}

</style>
