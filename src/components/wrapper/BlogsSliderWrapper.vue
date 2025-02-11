<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBlogsSwiper from "../../components/blogs/CustomBlogsSwiper.vue";
import CustomButton from "../core/CustomButton.vue";
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
  btnTitle: {
    type: String,
    default: "Read More",
  },
});
</script>
<template>
  <CustomSection>
    <Heading :title="title" :description="description" align="LEFT" />
    <CustomBlogsSwiper
      :sectionData="items"
      titleTextColor="text-white"
      descriptionTextColor="text-gray-400"
      cardBgColor="bg-[#2A2A2A]"
      linkColor="text-[#00A3FF]"
    />
    <div class="text-center">
      <CustomButton variant="secondary" size="small"
        >{{ btnTitle }}
      </CustomButton>
    </div>
  </CustomSection>
</template>
<style scoped></style>
