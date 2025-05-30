<template>
  <CustomSection sectionClass="!py-8">
    <div class="lg:mx-auto lg:px-0 px-4">
      <!-- Optional Heading -->
      <div class="max-w-4xl mx-auto">
        <TabsHeader
          :tabs="tabsWithSlugs"
          :activeTab="activeTab"
          @update:activeTab="activeTab = $event"
          gridClass="grid w-full justify-center grid-cols-2 gap-2"
        />
      </div>

      <!-- Pass only items for selected tab -->
      <PricingCards :items="activeTabData?.items || []" />
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import PricingCards from "./PricingCards.vue";
import CustomSection from "../core/CustomSection.vue";
import { slugify } from "@/utils/slugify";

interface PricingFeature {
  title: string;
}
interface PricingButton {
  text: string;
  link: string;
  theme?: string;
  target?: string;
  class?: string;
}
interface PricingItem {
  title: string;
  description: string;
  bottomDescription?: string;
  features: PricingFeature[];
  primaryButton: PricingButton;
}

// 🆕 Updated props to match your JSON data
const props = defineProps<{
  title?: string;
  description?: string;
  cloud: PricingItem[];
  selfHosted: PricingItem[];
}>();

// 🆕 Convert to tab format inside the component
const tabs = computed(() => [
  {
    title: "Cloud",
    value: "cloud",
    items: props.cloud,
  },
  {
    title: "Self Hosted",
    value: "self-hosted",
    items: props.selfHosted,
  },
]);

const tabsWithSlugs = computed(() =>
  tabs.value.map((tab) => ({
    ...tab,
    value: slugify(tab.title),
  }))
);

const activeTab = ref(tabsWithSlugs.value[0]?.value || "");
const activeTabData = computed(() =>
  tabsWithSlugs.value.find((tab) => tab.value === activeTab.value)
);
</script>

<style scoped></style>
