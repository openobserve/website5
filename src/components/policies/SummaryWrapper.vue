<template>
    <CustomSection sectionClass="max-w-4xl !py-0">
      <Summary
        v-for="(item, index) in items"
        :key="index"
        :id="item.id"
        :number="index + 1"
        :title="item.title"
        :content="item.content"
        class="mb-10"
      />
    </CustomSection>
  </template>
  
  <script setup lang="ts">
  import Summary from "./Summary.vue"; // adjust path as needed
  import CustomSection from "../core/CustomSection.vue";
  defineProps<{
    items: {
      id: string
      title: string
      content: string
    }[]
  }>()
  </script>
  