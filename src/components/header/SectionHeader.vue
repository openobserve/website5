<template>
  <div class="w-full space-y-1 xl:space-y-2">
    <a :href="`/platform/${link}`" class="text-[#FFFFFF] text-sm md:text-base lg:text-sm xl:text-base font-semibold cursor-pointer gradient-hover">
      {{ title }}
    </a>
    <ul class="space-y-0.5">
      <li v-for="(item, index) in updatedItems" :key="index" class="text-[#BEC0C2] text-sm">
        <a :href="item.slug" :class="item.slug ? 'gradient-hover' : ''">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { slugify } from '../../utils/slugify';

// **Props**
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// **Computed Slug for Items**
const updatedItems = computed(() => {
  return props.items.map((item) => ({
    ...item,
    slug: `/platform/${props.link}#${slugify(item.title)}`
  }));
});
</script>

<style scoped>
.gradient-hover {
  display: inline-block;
}
/* .gradient-hover:hover {
  background: linear-gradient(
    to left,
    rgb(var(--blue-light)),
    rgb(var(--blue-dark))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */
.gradient-hover:hover {
  background: linear-gradient(to left, #09E6FF, #00FFC3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
