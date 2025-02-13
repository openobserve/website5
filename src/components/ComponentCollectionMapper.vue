<template>
  <div>
    <component
      v-for="(it, index) in data"
      :key="index"
      :is="componentsMap[it.__component]"
      v-bind="getComponentProps(it)"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import HomeHeroSection from "./heroSections/HomeHeroSection.vue";
import FaqWrapper from "./FAQComponent/FaqWrapper.vue";
import FeatureCardWithIconWrapper from "./cardComponent/FeatureCardWithIconWrapper.vue";
import UsecaseCardWithIconWrapper from "./cardComponent/UsecaseCardWithIconWrapper.vue";
import TopCompaniesWrapper from "./wrapper/TopCompaniesWrapper.vue";
import CompanySwiper from "./core/CompanySwiper.vue";
import BlogWrapper from "./wrapper/BlogWrapper.vue";
import HomeFeatureWrapper from "./wrapper/HomeFeatureWrapper.vue";
import HomeWhyO2Wrapper from "./wrapper/HomeWhyO2Wrapper.vue";
import CustomBanner from "./core/CustomBanner.vue";
import FeatureHeroSection from "./heroSections/FeatureHeroSection.vue";
import FeatureCardWrapper from "./wrapper/FeatureCardWrapper.vue";
import TabsWithImageWrapper from "./wrapper/TabsWithImageWrapper.vue";
import TabsWrapper from "./wrapper/TabsWrapper.vue";
import CaseStudyWrapper from "./wrapper/CaseStudyWrapper.vue";
import BannerWrapper from "./wrapper/BannerWrapper.vue";
import PlatformLogsHeroSection from "./heroSections/PlatformLogsHeroSection.vue";
import CustomCardWrapper from "./cards/CustomCardWrapper.vue";
import VisitSandbox from "./core/VisitSandbox.vue";
import GetDemoWrapper from "./wrapper/GetDemoWrapper.vue";
import CompanyAboutUsHeroSection from "./heroSections/CompanyAboutUsHeroSection.vue";
import CustomStoryWrapper from "./wrapper/CustomStoryWrapper.vue";
import AboutCommunityWrapper from "./wrapper/AboutCommunityWrapper.vue";
import CommunitySupportCardWrapper from "./cardComponent/CommunitySupportCardWrapper.vue";
import ContactUsHeroSection from "./heroSections/ContactUsHeroSection.vue";
import CustomSeprater from "./core/CustomSeprater.vue";
import PlatformSubTabsWrapper from "./core/PlatformSubTabsWrapper.vue";
import CustomFeatureCard from "./cards/CustomFeatureCard.vue";
import SolutionSubpageHeroSection from "./heroSections/SolutionSubpageHeroSection.vue";
import SolutionHeroSection from "./heroSections/SolutionHeroSection.vue";
import CustomFeatureCardSubPage from "./cards/CustomFeatureCardSubpage.vue";
import CompanyJoinOOHeroSection from "./heroSections/CompanyJoinOOHeroSection.vue";
import CustomOpenObserveCard from "./cards/CustomOpenObserveCard.vue";
import ResourceHeroSection from "./heroSections/ResourceHeroSection.vue";
import ResourceCardsWrapper from "./wrapper/ResourceCardsWrapper.vue";
import BlogsWrapper from "./wrapper/BlogsWrapper.vue";
import SupportCardWrapper from "./wrapper/SupportCardWrapper.vue";
import ResourceFaqWrapper from "./FAQComponent/ResourceFaqWrapper.vue";
import CommonFormWrapper from "./wrapper/CommonFormWrapper.vue";
import ObservablititySuiteWrapper from "./wrapper/ObservablititySuiteWrapper.vue";
import EnterpriceSupportForm from "./forms/EnterpriceSupportForm.vue";
import SectionSwitcher from "./cloud-selfHostedSection/SectionSwitcher.vue";
import CustomComparisonTable from "./core/CustomComparisonTable.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  caseStudyData: {
    type: Array,
    required: false,
  },
  blogs: {
    type: Array,
    required: false,
  },
});

const componentsMap = computed(() => ({
  "section-hero.homepage-hero": HomeHeroSection,
  "section-cards.features1": FeatureCardWithIconWrapper,
  "section-cards.features2": UsecaseCardWithIconWrapper,
  "section-cards.stats": TopCompaniesWrapper,
  "section-cards.clients": CompanySwiper,
  "section-cards.case-studies": CaseStudyWrapper,
  "section-features.home-features-list": HomeFeatureWrapper,
  "section-cards.features3": HomeWhyO2Wrapper,
  "section-separator.separator": CustomSeprater,
  "section-hero.feature-hero-section": FeatureHeroSection,
  "section-cards.feature4": FeatureCardWrapper,
  "section-features.platform-tabs-wrapper": TabsWithImageWrapper,
  "section-forms.contact": CommonFormWrapper,
  "section-features.tabs-features": TabsWrapper,
  "section-cta.banner": BannerWrapper,
  "section-cta.plain-cta": GetDemoWrapper,
  "section-features.feature-list": PlatformSubTabsWrapper, //platform subpage (with bg image)
  "section-features.feature-sub-page-top-tabs": TabsWrapper, //solution sub page (without bg image )

  "section-hero.feature-sub-hero-section": PlatformLogsHeroSection,
  // 'section-cards.feature-highlights':CustomFeatureCard,
  "section-faqs.frequently-asked-question": FaqWrapper,

  "section-hero.solutions-hero-section": SolutionHeroSection, //SolutionPage hero section
  "section-hero.feature-solution-hero-section": SolutionSubpageHeroSection, //solution subpage hero section
  "section-cards.feature-highlights": CustomFeatureCardSubPage,
  "section-cta.call-to-action": VisitSandbox,
  "section-cards.features5": CustomCardWrapper,
  "section-cta.call-to-action": VisitSandbox,
  "section-hero.company-hero-section": CompanyAboutUsHeroSection,
  "section-features.info-right-feature": CustomStoryWrapper,
  "section-features.info-left-feature": AboutCommunityWrapper,
  "section-cards.community-support": CommunitySupportCardWrapper,
  "section-forms.enterprice-contact": EnterpriceSupportForm,
  "section-hero.contact-hero-section": ContactUsHeroSection,
  "section-hero.resource-hero-section": ResourceHeroSection,
  "section-cards.resource-feature-highlight": ResourceCardsWrapper,
  "section-cards.blogs": BlogsWrapper,
  // "section-cards.blog-with-categories":
  "section-cards.resource-support-card": SupportCardWrapper,
  "section-hero.company-why-o2-hero-section": CompanyJoinOOHeroSection,
  "section-cards.why-customer-love-us": CustomOpenObserveCard,
  "section-faqs.fa-qs-page-section": ResourceFaqWrapper,
  "section-features.observability-space": ObservablititySuiteWrapper,
  //download page
  "section-tabs.download-tabs":SectionSwitcher,
  "section-table.plans-feature-table":CustomComparisonTable,
  // "section-cards.explore-resources":DownloadCaseStudyWrapper,
  "section-forms.contact": CommonFormWrapper, //it is in the up section.......
}));

const getComponentProps = (it) => {
  if (it.__component === "section-cards.case-studies") {
    return {
      ...it,
      data: props.caseStudyData,
    };
  } else if (it.__component === "section-cards.blogs") {
    return {
      ...it,
      items: props.blogs,
    };
  }
  return it;
};
</script>
