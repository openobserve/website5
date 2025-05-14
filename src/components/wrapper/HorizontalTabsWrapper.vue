<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
    <CustomSection>
        <HeadingSection :title="title" :description="description" align="CENTER" />
      <div>
        <div class="w-full">
          <TabsHeader :tabs="tabs" :activeTab="activeTab" @update:activeTab="activeTab = $event"
            gridClass="grid w-full grid-cols-2 md:grid-cols-4 gap-2" />
          <HorizontalTabs :tabs="tabs" :activeTab="activeTab" />
        </div>
      </div>
    </CustomSection>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import TabsHeader from '../core/TabsHeader.vue';
import HorizontalTabs from '../TabsComponent/HorizontalTabs.vue';
import HeadingSection from '../core/HeadingSection.vue';
import CustomSection from '../core/CustomSection.vue';
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