<script setup>
import GlassPane from '../glassPane/glassPane.vue';
</script>

<template>
  <ul class="main-navigation">
    <li class="logo">
      <a href="/">
        <img src="/src/assets/images/AW-white.png" alt="Alan Way's signature">
      </a>
    </li>
    <li>
      <GlassPane :idPrefix='"menu-1"' classes="" text='Gallery' :positioner="false"></GlassPane>
    </li>
    <li>
      <GlassPane :idPrefix='"menu-2"' classes="" text='About' :positioner="false"></GlassPane>
    </li>
  </ul>
</template>

<style lang="scss">

.main-navigation h1#portfolio-name {
  font-size: 1rem;
}

</style>

<style lang="scss" scoped>
.main-navigation {
  --braceWidth: 150px;
  --braceHeight: calc(var(--braceWidth) * 0.6616);
  --bottomCrackFlippedOffset: calc(var(--braceWidth) * 0.2366);
  --realPaneHeight: calc(var(--braceWidth) * 0.173);
  --crackOffsetX: calc(var(--braceWidth) * 0.4746);
  --crackOffsetY: calc(var(--braceWidth) * 0.4122);

  margin: unset;
  padding: unset;
  position: fixed;
  z-index: 1;
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;

  .logo {
    margin-right: auto;

    a {
      height: 100%;
    }

    img {
      height: calc(100% + 69%);
    }
  }

  li {
    height: 100%;
    display: flex;
    align-items: flex-start;
    position: relative;

    a {
      height: 100%;
      padding: 0 1rem;
      display: inline-block;
      color: #d6d7d8;
      display: flex;
      align-items: center;
      font-family: "Playfair Display", serif;

      img {
        height: 100%;;
      }
    }

    // &:not(:first-child, :nth-child(2)) {
    //   &:before {
    //     content: '';
    //     height: 60%;
    //     left: 0;
    //     position: absolute;
    //     width: 1px;
    //     background: #d6d7d8;
    //   }
    // }
  }
}
</style>

<script>
export default {
  name: 'Menu'
}
</script>
