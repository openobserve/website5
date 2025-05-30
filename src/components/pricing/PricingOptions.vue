<template>
  <CustomSection sectionClass="!py-8">
    <div class="lg:mx-auto lg:px-0 px-4">
      <!-- <HeadingSection v-if="title || description" :title="title" :description="description" align="center" /> -->
      <div class="max-w-4xl mx-auto">
        <TabsHeader
          :tabs="tabsWithSlugs"
          :activeTab="activeTab"
          @update:activeTab="activeTab = $event"
          gridClass="grid w-full justify-center grid-cols-2 gap-2"
        />
      </div>
      <PricingCards :tabs="tabsWithSlugs" :activeTab="activeTab" />
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import PricingCards from "./PricingCards.vue";
import CustomSection from "../core/CustomSection.vue";
import { slugify } from "@/utils/slugify";
interface Tab {
  value?: string;
  title: string;
  // Add other properties as needed
}
const props = defineProps<{
  title: {
    type: String;
    optional: true;
  };
  description: {
    type: String;
    optional: true;
  };
  tabs: Tab[];
}>();
// Convert tabs to include `value` based on the slug
const tabsWithSlugs = computed(() =>
  props.tabs.map((tab) => ({
    ...tab,
    value: slugify(tab.title),
  }))
);
const activeTab = ref(tabsWithSlugs.value[0]?.value || "");
</script>
<style scoped></style>
