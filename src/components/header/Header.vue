<script setup>
import LaptopView from "./LaptopView.vue";
import MobileView from "./MobileView.vue";

const props = defineProps({
  navData: {
    type: Object,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
});
</script>


<template>
  <div :class="[
    'w-full top-0 backdrop-blur-3xl bg-[#23282C] text-black transition-all duration-500',
    props.class
  ]">
    <div class="lg:block hidden">
      <LaptopView :items="navData" />
    </div>
    <div class="lg:hidden block">
      <MobileView :items="navData" />
    </div>
  </div>
</template>


<style scoped>
/* Add custom styles only if absolutely necessary */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  list-style-type: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>