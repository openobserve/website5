<template>
  <section class="w-full py-12" :class="background ? 'bg-gray-50' : ''">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 space-y-10">
      <div>
        <HeadingSection :title="title" :description="description" align="CENTER" />
      </div>
      <div>
        <div class="w-full">
          <TabsHeader :tabs="tabs" :activeTab="activeTab" @update:activeTab="activeTab = $event"
            gridClass="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 gap-2" />
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
  },
  background: {
    type: Boolean,
    required: false,
  }
})

const activeTab = ref(props.tabs[0]?.value || '')
</script>