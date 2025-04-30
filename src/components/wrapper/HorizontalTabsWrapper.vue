<template>
  <section class="w-full py-12 md:py-24 bg-light-gray">
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <HeadingSection :title="title" :description="description" align="CENTER" />
      </div>
      <div class="mt-12">
        <div class="w-full">
          <TabsHeader :tabs="tabs" :activeTab="activeTab" @update:activeTab="activeTab = $event" />
          <HorizontalTabs :tabs="tabs" :activeTab="activeTab" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import TabsHeader from '../core/TabsHeader.vue';
import HorizontalTabs from '../TabsComponent/HorizontalTabs.vue';
import HeadingSection from '../core/HeadingSection.vue';

const props = defineProps({
  title: String,
  description: String,
  tabs: {
    type: Array,
    required: true
  }
})

const activeTab = ref(props.tabs[0]?.value || '')
</script>