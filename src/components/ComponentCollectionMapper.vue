<template>
  <div>
    <component
      v-for="(it, index) in data"
      :key="index"
      :is="componentsMap[it.__component]"
      v-bind="it"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import HomeHeroSection from './heroSections/HomeHeroSection.vue';
import FaqWrapper from './FAQComponent/FaqWrapper.vue';

export default defineComponent({
  name: 'ComponentCollectionMapper',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const componentsMap = computed(() => ({
      'section.herosection': HomeHeroSection,
      'section.faq':FaqWrapper
    }));

    return {
      componentsMap,
    };
  },
});
</script>
