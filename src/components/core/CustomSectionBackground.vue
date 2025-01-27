<template>
  <div :class="`${directionClass} w-full container mx-auto h-auto rounded-xl bg-no-repeat bg-cover`">
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
