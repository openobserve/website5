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
      'section.faq':FaqWrapper,
      'section.featureCardWithIconWrapper':FeatureCardWithIconWrapper,
      'section.usecaseCardWithIconWrapper':UsecaseCardWithIconWrapper,
      'section.topCompanyWrapper':TopCompaniesWrapper,
      'section.companySwiper':CompanySwiper,
      'section.blogWrapper':BlogWrapper,
      'section.homeFeatureWrapper':HomeFeatureWrapper,
      'section.homeWhyO2Wrapper':HomeWhyO2Wrapper,
      'section.customBanner':CustomBanner,
      'section.featureHeroSection':FeatureHeroSection,
      'section.featureCardWrapper':FeatureCardWrapper,
      'section.tabsWithImageWrapper':TabsWithImageWrapper,
      'section.tabsWrapper':TabsWrapper,
      'section.caseStudyWrapper':CaseStudyWrapper,
      'section.bannerWrapper':BannerWrapper,
    }));

    return {
      componentsMap,
    };
  },
});
</script>