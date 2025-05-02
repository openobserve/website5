<template>
  <div class="max-w-4xl mx-auto my-10 lg:px-0 px-4">
    <HeadingSection :title="title" :description="description" align="center" />
    <div class="w-full flex flex-col gap-4 items-center h-full justify-center">
      <TabsHeader :tabs="tabs" :activeTab="activeTab" @update:activeTab="activeTab = $event" />
      <!-- Dynamic Tab Buttons -->
      <!-- <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="handleTabChange(tab.value)"
        class="px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer"
        :class="{
          'bg-white text-primary-purple shadow': activeTab === tab.value,
          'bg-gray-100 text-gray-700 hover:bg-gray-200':
            activeTab !== tab.value,
        }"
      >
        {{ tab.label }}
      </button> -->
      <OptionsCard :tabs="tabs" :activeTab="activeTab" />
    </div>
  </div>
</template>
<script setup lang="ts">
import HeadingSection from "../core/HeadingSection.vue";
import TabsHeader from "../core/TabsHeader.vue";
import OptionsCard from "./OptionsCard.vue";
import { ref, watch } from "vue";
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
// Handle Tab Change
const handleTabChange = (tabValue: string) => {
  activeTab.value = tabValue;
  // Emit the active tab change (if you need to communicate it with a parent component)
  // $emit('update:activeTab', tabValue);
};

// Watcher to detect changes in activeTab (optional for logging or other side-effects)
watch(activeTab, (newValue) => {
  console.log("Active Tab changed to:", newValue);
});
</script>
<style scoped></style>
