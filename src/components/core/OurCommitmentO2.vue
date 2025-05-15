<template>
  <section id="our-commitment">
    <CustomSection sectionClass="!pb-0">
    <!-- Title with horizontal lines -->
    <FramedTitle :title="title" />

    <!-- Content grid -->
    <div class="bg-light-gray rounded-lg p-8 shadow-sm border border-border">
      <!-- Text content -->
      <div class="space-y-4 text-gray-600">
        <div class="text-lg mb-4" v-html="paragraphs"></div>
      </div>
    </div>
    </CustomSection>
  </section>
</template>

<script setup>
import CustomSection from "./CustomSection.vue";
import FramedTitle from "./FramedTitle.vue";
const props = defineProps({
 title: {
    type: String,
    required: true,
  },
  paragraphs: {
    type: String,
    required: true,
  }
});
</script>