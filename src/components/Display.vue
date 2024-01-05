<script setup>
defineProps({
  w: String,
  h: String
})
</script>

<template>
    <div class="display">
        <div class="case">
    <component v-if="w && h" :is="'style'">
        .case {
            height: {{ h }};
        }

        iframe {
            width: {{ w }};
            height: {{ h }};
        }
    </component>
    <slot name="case"></slot> 
  </div>
  <slot name="statement"></slot> 
    </div>
  
</template>

<style lang="scss" scoped>

.display {
    max-width: var(--content-max-width);
    padding: var(--spacing);
    margin: 0 auto;

    .case {
        float: right;
        margin: 0 0 var(--spacing) var(--spacing);
        border-radius: 6px;
        overflow: hidden;

        :deep(iframe) {
            border-width: 0px;
            overflow: hidden;
            border-radius: 1px;
        }
    }
}
</style>
