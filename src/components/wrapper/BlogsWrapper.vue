<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBlogs from "../../components/blogs/CustomBlogs.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <div class="py-10">
      <Heading :title="title" :description="description" align="CENTER" />
    </div>
    <CustomBlogs
      :sectionData="items"
      titleTextColor="text-white"
      descriptionTextColor="text-gray-400"
      cardBgColor="bg-[#2A2A2A]"
      linkColor="text-[#00A3FF]"
    />
  </CustomSection>
</template>
<style scoped></style>
