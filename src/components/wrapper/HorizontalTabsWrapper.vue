<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
    <CustomSection>
        <HeadingSection :title="heading?.title" :description="heading?.description" align="CENTER" />
      <div>
        <div class="w-full">
          <TabsHeader   :tabs="tabsWithSlugs" :activeTab="activeTab" @update:activeTab="activeTab = $event"
           :gridClass="`grid w-full grid-cols-2 md:grid-cols-${items.length} gap-2`" />
          <HorizontalTabs :tabs="tabsWithSlugs" :activeTab="activeTab" />
        </div>
      </div>
    </CustomSection>
  </section>
</template>

<script setup>
import { ref ,computed,watch} from 'vue'
import TabsHeader from '../core/TabsHeader.vue';
import HorizontalTabs from '../TabsComponent/HorizontalTabs.vue';
import HeadingSection from '../core/HeadingSection.vue';
import CustomSection from '../core/CustomSection.vue';
import { slugify } from '@/utils/slugify';
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

// Add `value` to each tab item based on slug
const tabsWithSlugs = computed(() =>
  props.items.map(item => ({
    ...item,
    value: slugify(item.title)
  }))
);

// Set the default active tab
const activeTab = ref('');
watch(
  () => tabsWithSlugs.value,
  (tabs) => {
    if (tabs.length && !activeTab.value) {
      activeTab.value = tabs[0].value;
    }
  },
  { immediate: true }
);
</script>