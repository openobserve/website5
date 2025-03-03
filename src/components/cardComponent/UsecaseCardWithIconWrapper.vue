<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./UsecaseCardWithIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomSectionBackground from "../core/CustomSectionBackground.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  heading: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <CustomSectionBackground direction="bottom">
    <CustomSection>
      <div class="flex flex-col max-w-full container mx-auto">
        <Heading :title="heading?.title" :description="heading?.subtitle" />
        <div class="mt-10">
          <div
            class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6"
          >
            <!-- Loop moved here -->
            <IconTitleCard
              v-for="(item, index) in items"
              :key="index"
              :card="item"
              :index="index"
            />
          </div>
        </div>
      </div>
    </CustomSection>
  </CustomSectionBackground>
</template>
<style scoped>
.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  /* Shadow effect */
  border-radius: 1rem;
  transition: all;
}

.cardShadow:hover h3 {
  color: #80b9ff;
}
</style>
