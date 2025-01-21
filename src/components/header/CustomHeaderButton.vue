<script setup>
const props = defineProps({ title: String, linkTitle: String });
</script>
<template>
  <div
    class="bg-black stroke-current bg-gradient-to-r from-neutral-700 to-neutral-800  rounded-md p-2"
  >
    <div class="flex justify-between gap-5">
      <h3 class="text-white">{{ title }}</h3>
      <h3 class="gradient-hover cursor-pointer">
        {{ linkTitle }}
      </h3>
    </div>
  </div>
</template>
<style scoped>
.gradient-hover {
  background: linear-gradient(
    to left,
    rgb(var(--blue-light)),
    rgb(var(--blue-dark))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
