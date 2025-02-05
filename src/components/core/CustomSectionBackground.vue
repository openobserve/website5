<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  direction: {
    type: String,
    default: 'top'
  }
})

const directions = {
  top: "bg-[url('/img/bg/gradient-bg/TextureBG.svg')] bg-[50%_2%]",
  bottom: "bg-[url('/img/bg/gradient-bg/TextureBottomBG.svg')] bg-[50%_100%]"
}

const directionClass = directions[props.direction]
</script>

<template>
  <div :class="`${directionClass} w-full h-auto container mx-auto rounded-xl bg-no-repeat bg-[50%_100%] bg-cover`">
    <slot></slot>
  </div>
</template>