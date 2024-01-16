<template>
  <div :id="galleryID">
    <a
    v-for="(work, key) in worksData"
    :key="key"
    :href="work.largeURL"
    :data-pswp-type="work.type"
    :data-pswp-width="work.width"
    :data-pswp-height="work.height"
    :data-pswp-containerModWidth="
      'containerMod' in work && 'width' in work.containerMod ? work.containerMod.width : 0
    "
    :data-pswp-containerModHeight="
      'containerMod' in work && 'height' in work.containerMod ? work.containerMod.height : 0
    "
    target="_blank"
    rel="noreferrer"
    >
    <img :src="work.thumbnailURL" alt="" />
    </a>
</div>
</template>

<style lang="scss">
.pswp__google-map-container {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.pswp__google-map-container iframe {
  background: #444;
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 600px;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
// Found this example for photoswipe here:
// https://photoswipe.com/vue-image-gallery/
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default {
  name: 'Gallery',
  props: {
    galleryID: String,
    works: Array,
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

      // parse data attributes.
      this.lightbox.addFilter('itemData', (itemData, index) => {
        const containerModWidth = itemData.element.dataset.pswpContainermodwidth;
        if (containerModWidth) {
          itemData.containerModWidth = parseInt(containerModWidth);
        }

        const containerModHeight = itemData.element.dataset.pswpContainermodheight;
        if (containerModHeight) {
          itemData.containerModHeight = parseInt(containerModHeight);
        }

        const title = itemData.element.dataset.title;
        if (title) {
          itemData.title = title;
        }
        return itemData;
      });

      // override slide content
      this.lightbox.on('contentLoad', (e) => {
          const { content } = e;
          if (content.type === 'google-map') {
            // prevent the deafult behavior
            e.preventDefault();

            // Create a container for iframe
            // and assign it to the `content.element` property
            content.element = document.createElement('div');
            content.element.className = 'pswp__google-map-container';

            const iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');
            iframe.src = content.data.src;
            content.element.appendChild(iframe);
          }
          else if (content.type === 'true-iframe') {
            // prevent the deafult behavior
            e.preventDefault();

            // Create a container for iframe
            // and assign it to the `content.element` property
            content.element = document.createElement('div');
            content.element.className = 'pswp__true-iframe-container';

            const css = '\
              .pswp__true-iframe-container {\
                overflow: hidden;\
                min-width: ' + content.data.width + 'px;\
                min-height: ' + content.data.height + 'px;\
              }\
              \
              .pswp__true-iframe-container iframe {\
                border-width: 0px;\
                overflow: hidden;\
                border-radius: 1px;\
                min-width: ' + (content.data.width + content.data.containerModWidth) + 'px;\
                min-height: ' + (content.data.height + content.data.containerModHeight) + 'px;\
              }\
            ';
            const styles = document.createElement('style');
            styles.appendChild(document.createTextNode(css))
            content.element.appendChild(styles);

            const iframe = document.createElement('iframe');
            iframe.setAttribute('allowfullscreen', '');
            iframe.src = content.data.src;
            content.element.appendChild(iframe);
          }
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
