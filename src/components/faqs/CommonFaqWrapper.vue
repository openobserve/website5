<script setup lang="ts">
import HeadingSection from "../core/HeadingSection.vue";
import FaqList from "./FaqList.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  background: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <div class="max-w-4xl mx-auto px-4 py-12 space-y-2">
      <HeadingSection
        :title="title"
        :description="description"
        align="CENTER"
      />
      <div class="pt-8">
        <FaqList :faqList="items" />
      </div>
    </div>
  </div>
</template>
