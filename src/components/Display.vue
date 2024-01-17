<template>
    <div class="display">
        <div class="content">
            <h1 v-if="title" class="title" >{{ title }}</h1>
            <div class="statement">
                <slot name="statement"></slot>
            </div> 
        </div>

        <div class="case">
          <slot name="case"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.display {
    max-width: var(--content-max-width);
    padding: var(--spacing);
    margin: 0 auto;

    @media (min-width: 600px) {
      display: flex;
      .case {
        margin: 0 0 var(--spacing) var(--spacing);
      }
    }

    .title {
        margin-top: 0;
        font-family: 'Cinzel Decorative', serif;
        text-align: center;
    }

    .case {
        overflow: hidden;
        flex-basis: 38.2%;

        :deep(.gallery-container) {
          margin-top: var(--element-spacing);
        }
    }

    .content {

        flex-basis: 61.8%;
    }

    .statement {
        
    }
}
</style>

<script>
export default {
  name: 'Display',
  props: {
    title: String,
},
  methods: {},
};
</script>
