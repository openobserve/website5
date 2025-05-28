<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";

const props = defineProps({
 heading: {
    type: Object,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  btnValues: {
    type: String,
    required: false,
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  background: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection sectionClass="!pb-0">
      <!-- Heading Section -->
     <HeadingSection
        :title="heading?.title"
        :description="heading?.description"
        align="center"
        v-if="heading?.title || heading?.description"
      />

      <!-- Card rendering based on activeTab -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardWithSideIcon v-for="(item, index) in data" :key="index" :card="item" headingLevel="2" class="w-full h-full"
            />
      </div>
    </CustomSection>
  </div>
</template>
