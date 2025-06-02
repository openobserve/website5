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
console.log("Header props:", props.navData);
</script>


<template>
  <div class="w-full fixed top-0 z-50 backdrop-blur-md custom-gradient text-black transition-all duration-500">
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

.custom-gradient {
  /* background: linear-gradient(
    141.57deg,
    rgba(255, 255, 255, 0.4) 12.11%, 
    rgba(255, 255, 255, 0.3) 83.21%
  ); */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0.3) 100%
  );
}
</style>