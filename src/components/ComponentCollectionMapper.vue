<template>
  <div>
    <component v-for="(it, index) in data" :key="index" :is="componentsMap[it.__component]"
      v-bind="getComponentProps(it)" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import HomeHeroSection from "./heroSections/HomeHeroSection.vue";
import FaqWrapper from "./FAQComponent/FaqWrapper.vue";
import FeatureCardWithIconWrapper from "./wrapper/FeatureCardWithIconWrapper.vue";
import UsecaseCardWithIconWrapper from "./wrapper/UsecaseCardWithIconWrapper.vue";
import CustomTiels from "./cards/CustomTiles.vue";
import CompanySwiper from "./core/CompanySwiper.vue";
import HomeFeatureWrapper from "./wrapper/HomeFeatureWrapper.vue";
import HomeWhyO2Wrapper from "./wrapper/HomeWhyO2Wrapper.vue";
import FeatureHeroSection from "./heroSections/FeatureHeroSection.vue";
import CircularFrameCardWrapper from "./wrapper/CircularFrameCardWrapper.vue";
import CustomTabsWithImage from "./core/CustomTabsWithImage.vue";
import TabsWrapper from "./wrapper/TabsWrapper.vue";
import BlogsDataWrapper from "./wrapper/BlogsDataWrapper.vue";
import CustomBanner from "./core/CustomBanner.vue";
import PlatformLogsHeroSection from "./heroSections/PlatformLogsHeroSection.vue";
import CustomCard from "./cards/CustomCard.vue";
import VisitSandbox from "./core/VisitSandbox.vue";
import GetDemoWrapper from "./wrapper/GetDemoWrapper.vue";
import CompanyAboutUsHeroSection from "./heroSections/CompanyAboutUsHeroSection.vue";
import CustomStoryWrapper from "./wrapper/CustomStoryWrapper.vue";
import AboutCommunityWrapper from "./wrapper/AboutCommunityWrapper.vue";
import CommunitySupportCardWrapper from "./wrapper/CommunitySupportCardWrapper.vue";
import ContactUsHeroSection from "./heroSections/ContactUsHeroSection.vue";
import CustomSeprater from "./core/CustomSeprater.vue";
import PlatformSubTabsWrapper from "./core/PlatformSubTabsWrapper.vue";
import SolutionSubpageHeroSection from "./heroSections/SolutionSubpageHeroSection.vue";
import SolutionHeroSection from "./heroSections/SolutionHeroSection.vue";
import SubpageCircularFrameCard from "./cards/SubpageCircularFrameCard.vue";
import CompanyJoinOOHeroSection from "./heroSections/CompanyJoinOOHeroSection.vue";
import CustomOpenObserveCard from "./cards/CustomOpenObserveCard.vue";
import ResourceHeroSection from "./heroSections/ResourceHeroSection.vue";
import ResourceCardsWrapper from "./wrapper/ResourceCardsWrapper.vue";
import BlogsWrapper from "./wrapper/BlogsWrapper.vue";
import CustomSupportCard from "./cards/CustomSupportCard.vue";
import ResourceFaqWrapper from "./FAQComponent/ResourceFaqWrapper.vue";
import CommonFormWrapper from "./wrapper/CommonFormWrapper.vue";
import ObservablititySuiteWrapper from "./wrapper/ObservablititySuiteWrapper.vue";
import EnterpriceSupportForm from "./forms/EnterpriceSupportForm.vue";
import SectionSwitcher from "./cloud-selfHostedSection/SectionSwitcher.vue";
import CustomComparisonTable from "./core/CustomComparisonTable.vue";
import TierSwitcher from "./cloud-selfHostedTier/TierSwitcher.vue";
import TestimonialWrapper from "./wrapper/TestimonialWrapper.vue";
import KeyFeatureWrapper from "./wrapper/KeyFeatureWrapper.vue";
import DemoForm from "./forms/demoForm.vue";
import DemoPageWrapper from "./wrapper/DemoPageWrapper.vue";
import CaseStudyWrapper from "./wrapper/CaseStudyWrapper.vue";
import CaseStudyListing from "./case-studies/CaseStudyListing.vue";
import ClientTestimonials from "./testimonials/ClientTestimonials.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  blogsData: {
    type: Array,
    required: false,
  },
  blogs: {
    type: Array,
    required: false,
  },
  caseStudyData: {
    type: Array,
    required: false,
  },
  bannerData: {
    type: Object,
    required: false,
  },
});

const componentsMap = computed(() => ({
  "section-hero.homepage-hero": HomeHeroSection,
  "section-cards.features1": FeatureCardWithIconWrapper,
  "section-cards.features2": UsecaseCardWithIconWrapper,
  "section-cards.stats": CustomTiels,
  "section-cards.clients": CompanySwiper,
  // "section-cards.case-studies": CaseStudyWrapper,
  "section-cards.blog": BlogsDataWrapper,
  "section-features.home-features-list": HomeFeatureWrapper,
  "section-cards.features3": HomeWhyO2Wrapper,
  "section-cards.testimonials": TestimonialWrapper,
  "section-separator.separator": CustomSeprater,
  "section-hero.feature-hero-section": FeatureHeroSection,
  "section-cards.feature4": CircularFrameCardWrapper,
  "section-features.platform-tabs-wrapper": CustomTabsWithImage,
  "section-forms.contact": CommonFormWrapper,
  "section-features.tabs-features": TabsWrapper,
  "section-cta.banner": CustomBanner,
  "section-cta.plain-cta": GetDemoWrapper,
  "section-features.feature-list": PlatformSubTabsWrapper, //platform subpage (with bg image)
  "section-features.feature-sub-page-top-tabs": TabsWrapper, //solution sub page (without bg image )
  "section-hero.demo-herosection": DemoPageWrapper,

  "section-hero.feature-sub-hero-section": PlatformLogsHeroSection,
  // 'section-cards.feature-highlights':CustomFeatureCard,
  "section-faqs.frequently-asked-question": FaqWrapper,

  "section-hero.solutions-hero-section": SolutionHeroSection, //SolutionPage hero section
  "section-hero.feature-solution-hero-section": SolutionSubpageHeroSection, //solution subpage hero section
  "section-cards.feature-highlights": SubpageCircularFrameCard,
  "section-cta.call-to-action": VisitSandbox,
  "section-cards.features5": CustomCard,
  "section-cta.call-to-action": VisitSandbox,
  "section-hero.company-hero-section": CompanyAboutUsHeroSection,
  "section-features.info-right-feature": CustomStoryWrapper,
  "section-features.info-left-feature": AboutCommunityWrapper,
  "section-cards.community-support": CommunitySupportCardWrapper,
  "section-forms.enterprice-contact": EnterpriceSupportForm,
  "section-hero.contact-hero-section": ContactUsHeroSection,
  "section-hero.resource-hero-section": ResourceHeroSection,
  "section-cards.resource-feature-highlight": ResourceCardsWrapper,
  "section-cards.resources-blogs": BlogsWrapper,
  // "section-cards.blog-with-categories":
  "section-cards.resource-support-card": CustomSupportCard,
  "section-hero.company-why-o2-hero-section": CompanyJoinOOHeroSection,
  "section-cards.why-customer-love-us": CustomOpenObserveCard,
  "section-faqs.fa-qs-page-section": ResourceFaqWrapper,
  "section-features.observability-space": ObservablititySuiteWrapper,
  //download page
  "section-tabs.download-tabs": SectionSwitcher,
  "section-table.plans-feature-table": CustomComparisonTable,
  // "section-cards.explore-resources":DownloadBlogsDataWrapper,
  "section-forms.contact": CommonFormWrapper, //it is in the up section.......

  // pricing page
  "section-tabs.pricing-tabs": TierSwitcher,
  "section-features.key-feature-wrapper": KeyFeatureWrapper,
  "section-forms.download-contact-form": DemoForm,

  //case-studies page
  "section-cards.case-studies-section":CaseStudyListing,
  "section-cards.clients-testimonials" : ClientTestimonials,
  
  "section-cards.case-studies":CaseStudyWrapper,
}));

const getComponentProps = (it) => {
  if (it.__component === "section-cards.blog") {
    return {
      ...it,
      data: props.blogsData,
    };
  } else if (it.__component === "section-cards.case-studies") {
    return {
      ...it,
      data: props.caseStudyData,
    };
  } else if (it.__component === "section-cards.resources-blogs") {
    return {
      ...it,
      items: props.blogs,
    };
  } else if (it.__component === "section-cta.banner") {
    return {
      ...it,
      title: props.bannerData.title,
      description: props.bannerData.description,
      featureTitle: props.bannerData.featureTitle,
      primaryButton: props.bannerData.primaryButton,
      secondaryButton: props.bannerData.secondaryButton,
      bottomText: props.bannerData.bottomText,
      items: props.bannerData.items,
      monthlyText: props.bannerData.monthlyText,
    };
  }
  return it;
};
</script>
