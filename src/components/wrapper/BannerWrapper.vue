<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomBanner from "../core/CustomBanner.vue";

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <CustomSection
    sectionClass="py-6 lg:py-8 xl:py-16"
    v-if="items.title || items.subtitle"
  >
    <Heading
      v-if="items.title || items.subtitle"
      :title="items.title"
      :description="items.subtitle"
      align="CENTER"
    />
  </CustomSection>
  <div v-for="(item, index) in items.items" :key="index">
    <CustomBanner
      :title="item.title"
      :subtitle="item.subtitle"
      :buttons="
        item.buttons.map((button, buttonIndex) => ({
          text: button.text, // Dynamically set from API
          variant: buttonIndex === 0 ? 'white' : 'secondary', // First button is white, others secondary
        }))
      "
    />
  </div>
</template>
