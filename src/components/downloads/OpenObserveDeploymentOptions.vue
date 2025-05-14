<template>
  <CustomSection sectionClass="max-w-4xl !pb-0">
    <HeadingSection :title="title" :description="description" align="center" class="!mb-10"/>
    <div class="w-full flex flex-col gap-4 items-center h-full justify-center mt-6 lg:px-12">
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

      <!-- SubTabs logic -->
      <template v-if="currentTab?.subTabs">
        <TabsHeader
          :tabs="currentTab.subTabs"
          :activeTab="activeSubTab"
          @update:activeTab="activeSubTab = $event"
          gridClass="grid w-full justify-center grid-cols-2 gap-2"
        />
        <OptionsCard :tabs="currentTab.subTabs" :activeTab="activeSubTab" />
      </template>

      <!-- No SubTabs -->
      <template v-else>
        <OptionsCard :tabs="tabs" :activeTab="activeTab" />
      </template>
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import OptionsCard from "./OptionsCard.vue";
import CustomSection from "../core/CustomSection.vue";
import { computed, ref, watch } from "vue";
const props = defineProps<{
  title: {
    type: String;
    required: true;
  };
  description: {
    type: String;
    required: true;
  };
  buttons: {
    type: Object;
    required: true;
  };
  tabs: {
    type: Array;
    required: true;
  };
}>();
const activeTab = ref(props.tabs[0]?.value || "");
const activeSubTab = ref("");

// Get current active main tab object
const currentTab = computed(() =>
  props.tabs.find((tab) => tab.value === activeTab.value)
);

// Watch for change in main tab to reset subtab
watch(
  () => activeTab.value,
  (newVal) => {
    const subTabs = props.tabs.find((t) => t.value === newVal)?.subTabs || [];
    activeSubTab.value = subTabs[0]?.value || "";
  },
  { immediate: true }
)
</script>
<style scoped></style>
