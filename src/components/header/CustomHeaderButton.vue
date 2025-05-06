<script setup>
const props = defineProps({ title: String, linkTitle: String, link: String });
</script>
<template>
  <div class="border border-gray-400 rounded-lg p-4 w-full">
    <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
      <h3 class="text-base">{{ title }}</h3>
      <a class="gradient-hover cursor-pointer text-base" :href="link">
        {{ linkTitle }}
      </a>
    </div>
  </div>
</template>
<style scoped>
/* .gradient-hover {
  background: linear-gradient(
    to left,
    rgb(var(--blue-light)),
    rgb(var(--blue-dark))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */
.gradient-hover {
  background: linear-gradient(to left, #6A76E3 ,#45A4F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-border {
  border: 1px solid #313539;
  border-radius: 0.5rem;
}
</style>