<script setup>
import { computed } from "vue";
import CustomImage from "./CustomImage.vue";

const props = defineProps({
  imgSrc: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'medium'
  },
  iconSize: {
    type: [String, Number],
    required: true
  },
});

const sizePresets = {
  small: 65,
  medium: 100,
  large: 150,
};

const containerSize = computed(() => {
  return typeof props.size === 'number' 
    ? props.size 
    : sizePresets[props.size] || sizePresets.medium;
});

const containerClasses = computed(() => [
  'relative rounded-full',
].join(' '));

</script>
<template>
  <div
    :class="containerClasses"
    :style="{
      width: containerSize + 'px',
      height: containerSize + 'px',
      // background: getGradientBackground
    }"
  >
    <div class="absolute rounded-full border border-white bg-stone-300 flex items-center justify-center">
      <CustomImage
        :image="imgSrc"
        altText="Image"
        cssClass="object-cover p-3"
        :style="{
          width: `${Number(iconSize)}px`,
          height: `${Number(iconSize)}px`
        }"
      />
    </div>
  </div>
</template>
