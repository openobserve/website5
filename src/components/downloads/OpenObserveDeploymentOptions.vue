<template>
  <CustomSection sectionClass="max-w-4xl !pt-10">
    <HeadingSection
      :title="heading?.title"
      :description="heading?.description"
      align="center"
      class="!mb-4"
      />
    <div
      class="w-full flex flex-col gap-4 items-center h-full justify-center lg:px-12"
    >
      <!-- Tabs Header -->
      <!-- <TabsHeader
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
      />
      <OptionsCard :tabs="tabs" :activeTab="activeTab" /> -->
      <!-- Main Tabs -->
      <TabsHeader
        :tabs="tabsWithSlugs"
        :activeTab="activeTab"
        @update:activeTab="handleTabChange"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
        :key="activeTab"
      />
      <OptionsCardCloud v-if="activeTab === 'cloud'" :data="cloudData" />
      <OptionsCardSelfHosted v-else :data="selfHostedData" />
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import OptionsCard from "./OptionsCard.vue";
import OptionsCardCloud from "./OptionsCardCloud.vue";
import OptionsCardSelfHosted from "./OptionsCardSelfHosted.vue";
import CustomSection from "../core/CustomSection.vue";
import { slugify } from "@/utils/slugify";

// Props definition
const props = defineProps<{
  heading: {
    title: string;
    description: string;
  };
  buttons: Record<string, any>;
  cloudData: {
    type: Object;
  };
  selfHostedData: {
    type: Object;
  };
  // tabs: Tab[];
}>();

const tabs = [
  { title: "Cloud" },
  { title: "Self Hosted" }
];
// Convert tabs to include `value` based on the slug
const tabsWithSlugs = computed(() =>
  tabs.map((tab) => ({
    ...tab,
    value: slugify(tab.title),
  }))
);
// Initialize activeTab only after determining hash (not immediately to avoid flash)
const activeTab = ref(tabsWithSlugs.value[0]?.value || "");
const activeTabData = computed(() =>
  tabsWithSlugs.value.find((tab) => tab.value === activeTab.value)
);

// Handle tab change and update URL hash
function handleTabChange(value: string) {
  activeTab.value = value;
  history.replaceState(null, "", `#${value}`);
}
// Set initial tab on mount using hash if exists
onMounted(() => {
  const hash = window.location.hash.replace("#", "");
  const found = tabsWithSlugs.value.find((tab) => tab.value === hash);
  activeTab.value = found?.value || tabsWithSlugs.value[0]?.value || "";

  if (found) {
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
});
</script>

<style scoped></style>
