<script setup>
import { computed } from "vue";
import UsecaseCardWithIcon from "../cards/UsecaseCardWithIcon.vue";
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

// Compute heading properties to avoid unnecessary template logic
const hasHeading = computed(() => props.heading?.title || props.heading?.subtitle);
</script>

<template>
  <CustomSectionBackground direction="bottom">
    <CustomSection>
      <div class="flex flex-col max-w-full">
        <!-- Render heading only if it has content -->
        <Heading v-if="hasHeading" :title="heading.title" :description="heading.subtitle" />

        <div class="mt-10">
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
            <UsecaseCardWithIcon v-for="(item, index) in items" :key="index" :card="item" :index="index"
              class="cardShadow" />
          </div>
        </div>
      </div>
    </CustomSection>
  </CustomSectionBackground>
</template>

<style scoped>
.cardShadow {
  transition: all 0.3s ease-in-out;
}

.cardShadow:hover {
  box-shadow: 0 0 60px 0 rgba(66, 174, 255, 0.8);
  border-radius: 1rem;
}

.cardShadow:hover :deep(h3) {
  color: #80b9ff;
}
</style>
