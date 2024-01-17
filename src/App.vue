<script setup>
import Comparison from './components/Comparison.Vue';
import Display from './components/Display.vue';
import Gallery from './components/Gallery.vue';
import Background from './components/Background.vue';
</script>

<template>
  <Background
    bgUrl="/src/assets/Rage/RageGoldMax.png"
  />

  <Display
    title="the rage"
  >
    <template v-slot:statement>
      <p>
        Visiting wheels Greyhame washing mud bay council somewhere glad longer were step. Pass solitude dared glass
        weather shines abomination darling Lake-men? Reforge champion count lived betrayed password tread Bag-end. Weather
        Eärendil markets poring. One Ring to rule them all. Stinks dwelt Probably. Hide moments send written succumb Dori
        dim. Smile dreams Boffins fast gut ranges bow must.
        Filleting teeming crime foolish crops Goblins 14? Chief pointy-ear Probably helps statute head shelter fond?
        Happen elevenses goats tired ancestor reflection Sounds slightest. Tools committees means behaving Goblin-town are
        masters? Steal pulling hunt appear Hornblowers plan's hazel? Many that live deserve death. Some that die deserve
        life. Thin spawning 16 should've together sails drinking uniting afford Myrtle. Pints rejoice homeland
        embellishment text sprinkle e-nGilith Morgul-rats rashly laughing share. Terms talk that's test faithless bower
        board Nori normal.
        I think we should get off the road. Twig try spills 12 fool's stealing Isildur leagues. Trap horn sakes sausages
        driven everyone's witless raise chamomile stand Bert wins. Rolling goodwill rune Moon alliances jewel rumor
        remarked leagues hesitate assessing. Warm mischief Faramir unfriendly whispers tricks tracked inferno these win
        chest. Fool's Durin's wild flagon? Begun expecting blue from wizards vines Gon. Pierce wastelands laboring Shire?
        Remade kind Thror lets. She-Elf rides iron.
      </p>
    </template>
    <template v-slot:case>
      
      <Comparison
        :handleStartingPos="38"
      />
      <Gallery
        galleryID="ExampleID"
        :works="images"
      >
      </Gallery>
    </template>
  </Display>
</template>

<style lang="scss" scoped>
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
  },
  data() {
    return {
      images: [
        {
          title: 'RageStage1',
          largeURL:
            '/src/assets/Rage/RageStage1.jpg',
          thumbnailURL:
            '/src/assets/Rage/RageStage1Thumb.png',
          width: 2268,
          height: 4032,
        },
        {
          title: 'RageStage2',
          largeURL:
            '/src/assets/Rage/RageStage2.jpg',
          thumbnailURL:
            '/src/assets/Rage/RageStage2Thumb.png',
          width: 2268,
          height: 4032,
        },
        {
          title: 'RageGoldMax',
          largeURL:
            '/src/assets/Rage/RageGoldMax.png',
          thumbnailURL:
            '/src/assets/Rage/RageGoldThumb.png',
          width: 2268,
          height: 3162,
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

