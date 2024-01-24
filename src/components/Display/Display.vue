<template>
    <div class="display">
        <div class="content">
            <!-- <div class="decorative-title">{{ title }}</div> -->
            <h1 v-if="title" class="title" >{{ title }}</h1>
            <span class="detail date">{{ date }}</span>
            <span class="detail size">{{ size }}</span>
            <span class="detail medium">{{ medium }}</span>
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

    .detail {
      display: block;
      text-align: right;
      letter-spacing: 7px;
      color: #ffffff8a;
    }

    .decorative-title {
      font-family: 'Cinzel Decorative', serif;
      position: absolute;
      z-index: -2;
      font-size: 9rem;
      line-height: 0.8;
      opacity: 0.2;
      width: 100%;
      letter-spacing: 1rem;
    }

    .title {
      margin-top: 0;
      margin-block-end: 0.5rem;
      padding-bottom: 0.5rem;
      font-family: 'Cinzel Decorative', serif;
      text-align: right;
      position: relative;
      letter-spacing: 0.5rem;

      &:before {
        content: "";
        display: block;
        background: transparent;
        position: absolute;
        width: 100%;
        height: 1px;
        right: 0;
        bottom: 0;
        background: var(--border-color);
      }
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
      margin-top: 1.5rem;
      padding: var(--spacing);
      border: 1px solid var(--border-color);
      background: var(--textblock-bg);
    }
}
</style>

<script>
export default {
  name: 'Display',
  props: {
    title: String,
    medium: String,
    size: String,
    date: String
},
  methods: {},
};
</script>
