<template>
  <section id="our-commitment">
    <CustomSection sectionClass="!pb-0">
    <!-- Title with horizontal lines -->
    <FramedTitle :title="data.title" />

    <!-- Content grid -->
    <div class="bg-light-gray rounded-lg p-8 shadow-sm border border-border">
      <!-- Text content -->
      <div class="space-y-4 text-gray-600">
        <div class="text-lg mb-4" v-html="data.paragraphs"></div>
      </div>
    </div>
    </CustomSection>
  </section>
</template>

<script setup>
import CustomSection from "./CustomSection.vue";
import FramedTitle from "./FramedTitle.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});
</script>