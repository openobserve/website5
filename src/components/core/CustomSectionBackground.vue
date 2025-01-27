<template>
  <div :class="`${directionClass} w-full h-auto bg-no-repeat bg-cover md:bg-contain md:bg-center`">
    <slot></slot>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props=defineProps({
  direction:{
    type:String,
    default:'top'
  }
})

const directions={
  top: "bg-[url('/BackgroundTopMobile.svg')] md:bg-[url('/BackgroundShadowTop.svg')]",
  bottom: "bg-[url('/BackgeoundBottomMobile.svg')] md:bg-[url('/usecasebg.svg')]"
}

const directionClass = directions[props.direction]
</script>
