<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBlogs from "../../components/blogs/CustomBlogs.vue";
import CustomBlogsSwiper from "../blogs/CustomBlogsSwiper.vue";
import CustomButton from "../core/CustomButton.vue";
const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div >
    <CustomSection>
      <div class="py-3">
        <Heading
          :title="heading?.title"
          :description="heading?.subtitle"
          align="CENTER"
        />
      </div>

      <div class="">
        <CustomBlogsSwiper
          :sectionData="items"
          titleTextColor="text-white"
          descriptionTextColor="text-gray-400"
          cardBgColor="bg-[#2A2A2A]"
          linkColor="text-[#00A3FF]"
        />
      </div>

      <div class="flex justify-center" v-if="primaryButton">
        <CustomButton
          variant="secondary"
          size="medium"
          :buttonText="primaryButton.text"
          :buttonLink="primaryButton.link"
        />
      </div>
    </CustomSection>
  </div>
</template>

<style scoped></style>
