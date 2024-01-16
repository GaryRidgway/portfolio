<template>
    <div class="display">
        <div class="content">
            <h1 v-if="title" class="title" >{{ title }}</h1>
            <div class="statement">
                <slot name="statement"></slot>
            </div> 
        </div>

        <div class="case">
            <div :id="galleryID">
                <a
                v-for="(work, key) in worksData"
                :key="key"
                :href="work.largeURL"
                :data-pswp-width="work.width"
                :data-pswp-height="work.height"
                target="_blank"
                rel="noreferrer"
                >
                <img :src="work.thumbnailURL" alt="" />
                </a>
            </div>
            <!-- <component v-if="w && h" :is="'style'">
                .case {
                min-width: {{ w }};
                min-height: {{ h }};
                }

                iframe {
                width: {{ w }};
                height: {{ h }};
                }
            </component>
            <slot name="case"></slot> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.display {
    max-width: var(--content-max-width);
    padding: var(--spacing);
    margin: 0 auto;
    display: flex;

    .title {
        margin-top: 0;
        font-family: 'Cinzel Decorative', serif;
        text-align: center;
    }

    .case {
        float: right;
        margin: 0 0 var(--spacing) var(--spacing);
        border-radius: 6px;
        overflow: hidden;
        flex-basis: 33%;

        :deep(iframe) {
            border-width: 0px;
            overflow: hidden;
            border-radius: 1px;
        }

        a:first-child {
            width: 100%;
            display: block;

            img {
                width: 100%;
            }
        }
    }

    .content {

        flex-basis: 67%;
    }

    .statement {
        
    }
}
</style>

<script>
// Found this example for photoswipe here:
// https://photoswipe.com/vue-image-gallery/
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default {
  name: 'Display',
  props: {
    title: String,
    galleryID: String,
    w: String,
    h: String,
    works: Array
},
  setup(props) {
    return {
        worksData: props.works
    }
  },
  mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: '#' + this.$props.galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {},
};
</script>
