<script setup>
import { ref, defineProps } from "vue";
import CustomButton from "./CustomButton.vue";

// Define props for reusability
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

// Active tab state
const activeTab = ref(props.tabs[0]); // Default to the first tab

// Function to handle tab switching
const selectTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="flex flex-col md:flex-row bg-black text-white py-8">
    <!-- Left Tabs Column -->
    <div
      class="flex flex-col items-start md:w-1/3 lg:w-1/4 border-r border-gray-700 px-2"
    >
      <div class="space-y-4">
        <template v-for="tab in tabs" :key="tab.id">
          <button
            class="flex items-center px-2 py-2 text-left text-lg font-medium border-l-4 transition-all"
            :class="{
              'text-white border-blue-500': activeTab.id === tab.id,
              'text-gray-400 border-transparent hover:text-white hover:border-gray-600':
                activeTab.id !== tab.id,
            }"
            @click="selectTab(tab)"
          >
            {{ tab.title }}
          </button>
        </template>
      </div>
    </div>

    <!-- Right Content Area -->
    <div
      class="flex flex-col md:flex-row md:w-2/3 lg:w-3/4 items-center justify-between rounded-lg md:mx-10 max-md:mx-0 py-6 space-y-6 md:space-y-0 md:space-x-6"
      style="background-color: rgba(53, 59, 64, 1)"
    >
      <!-- Text Content -->
      <div class="max-w-md space-y-4">
        <h1 class="text-3xl font-bold md:text-5xl">{{ activeTab.title }}</h1>
        <p class="text-gray-400 leading-relaxed">{{ activeTab.subtitle }}</p>

        <CustomButton variant="secondary" class="max-md:mx-auto">
          {{ activeTab.buttonText }}
        </CustomButton>
      </div>

      <!-- Image -->
      <div class="w-full max-w-md">
        <img
          :src="activeTab.image"
          :alt="activeTab.title"
          class="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-color {
  background-color: linear-gradient(
    rgba(208, 251, 255, 1),
    rgba(119, 139, 255, 1)
  );
}
</style>
