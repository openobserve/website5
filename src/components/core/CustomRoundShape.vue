<template>
  <div
    :class="containerClasses"
    :style="{
      width: containerSize + 'px',
      height: containerSize + 'px',
      // background: getGradientBackground
    }"
  >
    <div class="absolute inset-[2px] rounded-full bg-gradient-gray flex items-center justify-center">
      <CustomImage
        :image="imgSrc"
        altText="Image"
        cssClass="object-cover p-2"
        :style="{
          width: `${Number(iconSize)}px`,
          height: `${Number(iconSize)}px`
        }"
      />
    </div>
  </div>
</template>

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
  borderColor: {
    type: String,
    default: "bg-gradient-blue"
  }
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
  props.borderColor
].join(' '));

</script>