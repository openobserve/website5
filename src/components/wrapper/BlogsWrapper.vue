<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBlogs from "../../components/blogs/CustomBlogs.vue";
import CustomBlogsSwiper from "../blogs/CustomBlogsSwiper.vue";
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
  <div class="py-20">
    <CustomSection>
      <div class="py-10">
        <Heading :title="title" :description="description" align="CENTER" />
      </div>

      <!-- Show slider component only on mobile (≤ 768px) -->
      <div class="block md:hidden">
        <CustomBlogsSwiper
          :sectionData="items"
          titleTextColor="text-white"
          descriptionTextColor="text-gray-400"
          cardBgColor="bg-[#2A2A2A]"
          linkColor="text-[#00A3FF]"
        />
      </div>

      <!-- Show normal component on larger screens (≥ 768px) -->
      <div class="hidden md:block">
        <CustomBlogs
          :sectionData="items"
          titleTextColor="text-white"
          descriptionTextColor="text-gray-400"
          cardBgColor="bg-[#2A2A2A]"
          linkColor="text-[#00A3FF]"
        />
      </div>
    </CustomSection>
  </div>
</template>

<style scoped></style>
