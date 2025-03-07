<script setup>
import CustomInterChange from "../core/CustomInterChange.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  // title: {
  //   type: String,
  //   required: true,
  // },
  // description: {
  //   type: String,
  //   required: true,
  // },
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="container mx-auto p-6 mt-5">
    <Heading :title="heading.title" :description="heading.subtitle" align="CENTER" />

    <div v-for="(item, index) in items" :key="index" class="mb-8 md:mb-0">
      <CustomInterChange :key="{ index }" :items="item.items" :title="item.title" :image="item.image"
        :direction="index % 2 === 0 ? 'left' : 'right'" />
    </div>
  </div>
</template>
