<template>
  <div
    :class="containerClasses"
    :style="{
      width: containerSize + 'px',
      height: containerSize + 'px',
      // background: getGradientBackground
    }"
  >
    <div class="absolute inset-[1px] p-[0.0625rem] rounded-full flex items-center justify-center"
    :class="bgColor"
    >
      <CustomImage
        :image="imgSrc"
        altText="Image"
        cssClass="object-cover p-1"
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
  },
  bgColor:{
    type: String,
    default: "bg-gradient-gray"
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
  props.bgColor, 
  props.borderColor
].join(' '));

</script>
