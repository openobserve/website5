<template>
  <div>
    <component
      v-for="(it, index) in data"
      :key="index"
      :is="componentsMap[it.__component]"
      v-bind="getPropsByComponent(it)"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import HomeHeroSection from './heroSections/HomeHeroSection.vue';
import FaqWrapper from './FAQComponent/FaqWrapper.vue';
import FeatureCardWithIconWrapper from './cardComponent/FeatureCardWithIconWrapper.vue';
import UsecaseCardWithIconWrapper from './cardComponent/UsecaseCardWithIconWrapper.vue';
import CompanySwiper from './core/CompanySwiper.vue';
import CustomAnnouncement from './core/CustomAnnouncement.vue';

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
      'section.featurecard': FeatureCardWithIconWrapper,
      'section.usecasecard': UsecaseCardWithIconWrapper,
      'section.faq': FaqWrapper,
      'section.companyswiper': CompanySwiper, // Add this line
    }));

    const getPropsByComponent = (item) => {
      switch(item.__component) {
        case 'section.featurecard':
        case 'section.usecasecard':
          return { cardData: item };
        case 'section.herosection':
          return item;
        case 'section.faq':
          return item;
        case 'section.companyswiper':
        return { data: item.items };
        default:
          return item;
      }
    };

    return {
      componentsMap,
      getPropsByComponent,
    };
  },
});
</script>