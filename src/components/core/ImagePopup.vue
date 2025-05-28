<!-- components/ImagePopup.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm custom-gradient h-screen" @click="close">
    <button class="absolute top-3 right-3 text-black text-xl z-50 cursor-pointer" @click.stop="close">✖</button>
    <div class="flex items-center p-8 md:p-[5rem] rounded-lg md:h-screen">
      <img :src="src" class="w-full max-h-[90vh] object-contain rounded" @click.stop />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: String,
  visible: Boolean
});
const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>
<style scoped>
.custom-gradient {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0.3) 100%
  );
}
</style>