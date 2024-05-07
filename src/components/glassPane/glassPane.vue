<script setup>
import glassPaneBase from './glassPaneBase.vue';
</script>

<template>
    <div v-if="positioner" class="glass-positioner">
        <!-- <glassPaneBase
            :idPrefix='idPrefix' :classes="classes" :text='text' :wave='wave'
        /> -->
    </div>
    <!-- <glassPaneBase v-else
        :idPrefix='idPrefix' :classes="classes" :text='text' :wave='wave'
    /> -->
</template>

<script>
    export default {
        name: 'glassPane',
        props: {
            text: String,
            classes: String,
            idPrefix: String,
            wave: Boolean,
            positioner: {
                type: Boolean,
                default: true
            }
        },
        components: {
            glassPaneBase,
        },
        data() {
            return {
            count: 0
            }
        },
        // https://stackoverflow.com/questions/56411378/how-to-add-vanilla-javascript-to-vue-js-project
        mounted() {}
    }
</script>

<style lang="scss">
    .glass-positioner {
        position: relative;

        & > .fullglass {
            position: absolute;
        }
    }
</style>