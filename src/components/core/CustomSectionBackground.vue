<template>
  <div :class="`${directionClass} w-full container mx-auto  h-auto bg-no-repeat bg-cover md:bg-contain md:bg-center`">
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
  top: "bg-[url('/BackgroundTopMobile.svg')] md:bg-[url('/homesectionbgtop.svg')]",
  bottom: "bg-[url('/BackgeoundBottomMobile.svg')] md:bg-[url('/homesectionbgbottom.svg')]"
}

const directionClass = directions[props.direction]
</script>
