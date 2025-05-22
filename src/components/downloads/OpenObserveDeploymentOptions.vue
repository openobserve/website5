<template>
  <CustomSection sectionClass="max-w-4xl !pb-0 !pt-10">
    <HeadingSection
      :title="title"
      :description="description"
      align="center"
      class="!mb-3c"
    />
    <div
      class="w-full flex flex-col gap-4 items-center h-full justify-center lg:px-12"
    >
      <!-- <TabsHeader
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
      />
      <OptionsCard :tabs="tabs" :activeTab="activeTab" /> -->
      <!-- Main Tabs -->
      <TabsHeader
        :tabs="tabs"
        :activeTab="activeTab"
        @update:activeTab="activeTab = $event"
        gridClass="grid w-full justify-center grid-cols-2 gap-2"
      />
      <OptionsCard :tabs="tabs" :activeTab="activeTab" />
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import OptionsCard from "./OptionsCard.vue";
import CustomSection from "../core/CustomSection.vue";
import { computed, ref, watch, onMounted } from "vue";
interface Tab {
  value: string;
  // Add other properties as needed
}

const props = defineProps<{
  title: string;
  description: string;
  buttons: Record<string, any>;
  tabs: Tab[];
}>();
const activeTab = ref(props.tabs[0]?.value || "");

// Watch for change in main tab to reset subtab
watch(() => activeTab.value, { immediate: true });

onMounted(() => {
  const hash = window.location.hash?.replace("#", "");
  const tabExists = props.tabs.find(tab => tab.value === hash);
  if (tabExists) {
    activeTab.value = hash;
    // Optional: Scroll to the tab
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
});
</script>
<style scoped></style>
