<script setup>
import Comparison from './components/Comparison/Comparison.vue';
import Display from './components/Display/Display.vue';
import Gallery from './components/Gallery/Gallery.vue';
import Background from './components/Background/Background.vue';
import FlowBorder from './components/flowBorder/flowBorder.vue';
import landingPad from './components/landingPad/landingPad.vue';
</script>

<template>
  <flow-border></flow-border>
  <div class='vignette'></div>
  <div class='test-container'>
    <div class='test'>
      <!-- <Display
        title="RaGe"
        medium="Ink on paper"
        size="4 inches by 6 inches"
        date="Completed 01/15/2024"
      >
        <template v-slot:statement>
          <p>
            I had been thinking of this piece for a while, but was never really able to put to paper what I was imagining.
            The background for this piece comes from a world of my own creation, and is steeped in loss.
          </p>
          <p>
            Rage is an "Ego knight", a manifestation of the death throes of a dying god. Trying to hold on to the last pieces of their life, 
            this god's death has manifested eight Ego knights, each inhabiting an animal, a stage of the moon, and a stage of grief. Rage itself embodies a boar, a half empty moon, and anger.
          </p>
          <p>
            Rage itself is composed of a colony of worms that work together as a hivemind. When they need a new host, they consume all but the bones
            of a creature. Then, they place the bones together like scaffolding to use to traverse the world. They kill indiscriminately and blindly,
            unwilling to cease save for leaving the last person in an area alive. This person is allowed to leave, and harbor hatred against Rage.
          </p>
          <p>
            When Rage itself is killed, it reaches out to those that hold it in hatred in their hearts, and takes one of them by force to be its new host. They are consumed, and the hatred outlives the hateful.
          </p>
          <br>
          <p>
            One day while browsing the web, I came across <a href="https://www.instagram.com/p/C0ZoqJ4Ood0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==">this piece by artist Shawn Coss</a>, and was so struck by it.
            It was exactly what I was feeling for Rage, and I wanted to try my own hand at making something that evoked the same feeling.
          </p>
        </template>
        <template v-slot:case>
          <Gallery
            galleryID="RageGallery"
            :works="images"
          >
          </Gallery>
        </template>
      </Display> -->
      <landing-pad/>
    </div>
  </div>
  <!-- <Background
    bgUrl="/src/assets/images/Rage/RageGoldMax.png"
  /> -->

  
</template>

<style lang="scss" scoped>
.vignette {
  width: 100%;
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 200;
  background: rgb(var(--mariana-d-n));
  --gradient-opacity: 0.8;
  background: 
    radial-gradient(circle,
      rgba(var(--mariana-d-n), 0) 75%,
      rgba(var(--mariana-d-n), var(--gradient-opacity)) 94%,
      rgba(var(--mariana-d-n), var(--gradient-opacity)) 98%
    ),
    linear-gradient(0deg,
      rgba(var(--mariana-d-n), var(--gradient-opacity)) 0%,
      rgba(var(--mariana-d-n), 0) 14%,
      rgba(var(--mariana-d-n), 0) 86%,
      rgba(var(--mariana-d-n), var(--gradient-opacity)) 100%
    ),
    linear-gradient(90deg,
      rgba(var(--mariana-d-n), var(--gradient-opacity)) 0%,
      rgba(var(--mariana-d-n), 0) 11%,
      rgba(var(--mariana-d-n), 0) 89%,
      rgba(var(--mariana-d-n), var(--gradient-opacity)) 100%
    );
  pointer-events: none;
}
.test-container {
  overflow: hidden;
}
.test {
  height: calc(100vh - 100px);
  margin: 50px auto;
  position: relative;
  width: min(var(--landing-max-width), 100vw - 186px);
  justify-content: center;
  align-items: center;
  display: flex;
  // background: #e89090;
  // border-radius: 13px;
  // overflow-y: scroll;
  // box-shadow: 0 14px 28px rgb(0 0 0 / 77%), 0 10px 10px rgb(0 0 0 / 64%);
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}</style>

<script>
export default {
  name: 'App',
  components: {
    Display,
    Gallery,
    FlowBorder,
  },
  data() {
    return {
      images: [
        {
          title: 'RageGoldMax',
          largeURL:
            '/src/assets/images/Rage/RageGoldMax.png',
          thumbnailURL:
            '/src/assets/images/Rage/RageGoldMin.png',
          width: 2268,
          height: 3162,
        },
        {
          title: 'RageStage1',
          largeURL:
            '/src/assets/images/Rage/RageStage1.jpg',
          thumbnailURL:
            '/src/assets/images/Rage/RageStage1Thumb.png',
          width: 2268,
          height: 4032,
        },
        {
          title: 'RageStage2',
          largeURL:
            '/src/assets/images/Rage/RageStage2.jpg',
          thumbnailURL:
            '/src/assets/images/Rage/RageStage2Thumb.png',
          width: 2268,
          height: 4032,
        },
        // {
        //   title: 'img1',
        //   largeURL:
        //     'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg',
        //   thumbnailURL:
        //     'https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-400.jpg',
        //   width: 1875,
        //   height: 2500,
        // },
        // {
        //   title: 'game',
        //   width: 400,
        //   height: 600,
        //   containerMod: {
        //     width: 0,
        //     height: 4
        //   },
        //   type: 'true-iframe',
        //   largeURL:
        //     'https://garyridgway.github.io/ShipGame/',
        //   thumbnailURL:
        //     'src/assets/shipgame.PNG',
        // },
        // {
        //   title: 'gMap',
        //   type: 'google-map',
        //   largeURL:
        //     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325518.68780316407!2d30.252511957059642!3d50.4016990487754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1647422169265!5m2!1sru!2sua" href="https://maps.google.com/maps?ll=50.402036,30.532691&z=10&t=m&mapclient=embed&q=%D0%9A%D0%B8%D0%B5%D0%B2%2002000',
        //   thumbnailURL:
        //     'https://cdn.photoswipe.com/photoswipe-demo-images/photos/map-thumb.png',
        // },
        // {
        //   title: 'img2',
        //   largeURL:
        //     'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
        //   thumbnailURL:
        //     'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg',
        //   width: 1669,
        //   height: 2500,
        // },
        // {
        //   title: 'img3',
        //   largeURL:
        //     'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg',
        //   thumbnailURL:
        //     'https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg',
        //   width: 2500,
        //   height: 1666,
        // },
      ],
    };
  },
};
</script>

