<template>
  <div>
    <component
      v-for="(it, index) in data"
      :key="index"
      :is="componentsMap[it.__component]"
      v-bind="it"
      v-bind="it"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import HomeHeroSection from './heroSections/HomeHeroSection.vue';
import FaqWrapper from './FAQComponent/FaqWrapper.vue';
import FeatureCardWithIconWrapper from './cardComponent/FeatureCardWithIconWrapper.vue';
import UsecaseCardWithIconWrapper from './cardComponent/UsecaseCardWithIconWrapper.vue';
import TopCompaniesWrapper from './wrapper/TopCompaniesWrapper.vue';
import CompanySwiper from './core/CompanySwiper.vue';
import BlogWrapper from './wrapper/BlogWrapper.vue';
import HomeFeatureWrapper from './wrapper/HomeFeatureWrapper.vue';
import HomeWhyO2Wrapper from './wrapper/HomeWhyO2Wrapper.vue';
import CustomBanner from './core/CustomBanner.vue';
import FeatureHeroSection from './heroSections/FeatureHeroSection.vue';
import FeatureCardWrapper from './wrapper/FeatureCardWrapper.vue';
import TabsWithImageWrapper from './wrapper/TabsWithImageWrapper.vue';
import TabsWrapper from './wrapper/TabsWrapper.vue';
import CaseStudyWrapper from './wrapper/CaseStudyWrapper.vue';
import BannerWrapper from './wrapper/BannerWrapper.vue';
import PlatformLogsHeroSection from './heroSections/PlatformLogsHeroSection.vue';
import CustomCardWrapper from './cards/CustomCardWrapper.vue';
import VisitSandbox from './core/VisitSandbox.vue';
import CustomSeprater from './core/CustomSeprater.vue';
import GetDemoWrapper from './wrapper/GetDemoWrapper.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

console.log(props.data,"Ridddhi")


const componentsMap = computed(() => ({
  
  'section-hero.homepage-hero': HomeHeroSection,
  'section-cards.features1': FeatureCardWithIconWrapper,
  'section-cards.features2': UsecaseCardWithIconWrapper,
  'section-cards.stats': TopCompaniesWrapper,
  'section-cards.clients': CompanySwiper,
  // 'section-cards.case-studies': BlogWrapper,
  'section-features.feature-list': HomeFeatureWrapper,
  'section-cards.features3': HomeWhyO2Wrapper,
  'section-separator.separator':CustomSeprater,

  'section-hero.feature-hero-section': FeatureHeroSection,
  'section-cards.feature4': FeatureCardWrapper,
  'section-features.platform-tabs-wrapper': TabsWithImageWrapper,
  'section-features.tabs-features': TabsWrapper,
  // 'section.caseStudyWrapper': CaseStudyWrapper,
  'section-cta.banner': BannerWrapper,
  'section-cta.plain-cta':GetDemoWrapper,

  'section-hero.feature-sub-hero-section': PlatformLogsHeroSection,
    'section-faqs.frequently-asked-question': FaqWrapper,

    'section-cta.call-to-action': VisitSandbox,
  'section-cards.features5': CustomCardWrapper,
}));
</script>
