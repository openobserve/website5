<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
    <CustomSection>
        <HeadingSection :title="heading?.title" :description="heading?.description" align="CENTER" />
      <div>
        <div class="w-full">
          <TabsHeader :tabs="items" :activeTab="activeTab" @update:activeTab="activeTab = $event"
           :gridClass="`grid w-full grid-cols-2 md:grid-cols-${items.length} gap-2`" />
          <HorizontalTabs :tabs="items" :activeTab="activeTab" />
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
  heading: { 
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true
  },
  background: {
    type: Boolean,
    required: false,
  }
})

const activeTab = ref(props.items[0]?.title || '')
</script>