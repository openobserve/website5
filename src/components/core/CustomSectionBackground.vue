<template>
  <div :class="`${directionClass} w-full h-auto container mx-auto rounded-xl bg-no-repeat bg-[50%_0vh] `">
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
  top: "bg-[url('/TextureBG.svg')]",
  bottom: "bg-[url('/TextureBottomBG.svg')]"

  //  top: "bg-[url('/BackgroundTopMobile.svg')] md:bg-[url('/homesectionbgtop.svg')]",
  // bottom: "bg-[url('/TextureBG.svg')] md:bg-[url('/TextureBG.svg')]"
}
 

const directionClass = directions[props.direction]
</script>
<style scoped>
.bg-container {
  @apply w-full h-screen flex items-center justify-center;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>