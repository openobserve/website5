<script setup>
import CustomImage from "../core/CustomImage.vue";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: "Image",
  },
  height: {
    type: String,
  }
});

</script>

<template>
  <div :class="[
    'w-full',
    'relative',
    'rounded-lg',
    'overflow-hidden',
    'bg-white',
    'bg-center',
    'bg-cover',
    props.height ? 'h-full' : 'h-44'
  ]">
    <div class="absolute inset-0 blur-3xl" :style="{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"></div>
    <img :src="image" :alt="altText" class="relative w-full h-full object-contain rounded-lg  group-hover:grayscale-0 transition-all duration-300" />
  </div>
</template>