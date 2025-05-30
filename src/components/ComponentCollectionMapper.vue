<template>
  <div>
    <component v-for="(it, index) in data" :key="it.id || `${it.__component}-${index}`"
      :is="componentsMap[it.__component]" v-bind="getComponentProps(it)" />
  </div>
</template>

<script setup>
import { computed } from "vue";

// Import all possible section components
import CareerHero from "@/components/career/CareerHero.vue";
import CareerMission from "@/components/career/CareerMission.vue";
import CareerGlobalTeam from "@/components/career/CareerGlobalTeam.vue";
import CareerTestimonials from "@/components/career/CareerTestimonials.vue";
import CareerTechnology from "@/components/career/CareerTechnology.vue";
import CareerCTA from "@/components/career/CareerCTA.vue";
import VerticalTabs from "@/components/TabsComponent/VerticalTabs.vue";
import FaqsWrapper from "./faqs/FaqsWrapper.vue";
import HorizontalTabsWrapper from "./wrapper/HorizontalTabsWrapper.vue";
import CapabilityTabs from "./TabsComponent/CapabilityTabs.vue";
import HomeCardWrapper from "@/components/wrapper/HomeCardWrapper.vue";
import CommonHeroSection from "@/components/herosection/CommonHeroSection.vue";
import CTA from "@/components/core/CTA.vue";
import HomeHerosection from "@/components/herosection/HomeHerosection.vue";
import CardWrapper from "@/components/wrapper/CardWrapper.vue";
import CustomInterchangeWrapper from "@/components/wrapper/CustomInterchangeWrapper.vue";
import OurStory from "@/components/core/OurStory.vue";
import OurCommitmentO2 from "@/components/core/OurCommitment.vue";
import OurPartners from "@/components/core/OurPartners.vue";
import HeroSectionWithImage from "./herosection/HeroSectionWithImage.vue";
// import BlogSection from "./contactus/BlogSection.vue";
import CareerBenefitsWrapper from "./career/CareerBenefitsWrapper.vue";
import DownloadForm from "@/components/downloads/DownloadForm.vue";
import OpenObserveDeploymentOptions from "./downloads/OpenObserveDeploymentOptions.vue";
import CardWithBackgroundWrapper from "./wrapper/CardWithBackgroundWrapper.vue";
import HomeCardComprehensiveWrapper from "./wrapper/HomeCardComprehensiveWrapper.vue";
import PricingOptions from "./pricing/PricingOptions.vue";
import SuccessStories from "./core/SuccessStories.vue";
import CardWithSideIconResourcePage from "./wrapper/CardWithSideIconResourcePage.vue";
import CardWithoutBorderWrapper from "./wrapper/CardWithoutBorderWrapper.vue";
import ContactForm from "./forms/ContactForm.vue";
import BlogSection from "./blog/BlogSection.vue";
import CommunitySupport from "./contactus/CommunitySupport.vue";
import TOC from "./policies/TOC.vue";
import SummaryWrapper from "./policies/SummaryWrapper.vue";
import PoliciesHeader from "./policies/PoliciesHeader.vue";
import DemoForm from "./forms/DemoForm.vue";
import DemoWrapper from "./wrapper/DemoWrapper.vue";
import PlatformKeyFeaturesWrapper from "./wrapper/PlatformKeyFeaturesWrapper.vue";
import CommonFaqWrapper from "./faqs/CommonFaqWrapper.vue";
import ContactFormWrapper from "./contactus/ContactFormWrapper.vue";
import HomeModernArchiture from "./wrapper/HomeModernArchiture.vue";
import CaseStudySection from "@/components/case-studies/CaseStudySection.vue";
import { ArticlesResources, BlogResources } from "@/utils/constant";
import LatestArticles from "./articles/LatestArticles.vue";
import SolutionSubPageHeroSection from "./herosection/SolutionSubPageHeroSection.vue";
import ContactSalesWrapper from "./wrapper/ContactSalesWrapper.vue";
import PlatformArchitectureWrapper from "./wrapper/PlatformArchitectureWrapper.vue";

const props = defineProps({
  data: { type: Array, required: true },
  blogsData: { type: Array, required: false },
  blogs: { type: Array, required: false },
  caseStudyData: { type: Array, required: false },
  articlesData: { type: Array, required: false },
  bannerData: { type: Object, required: false },
});
const componentsMap = computed(() => ({
  "section-hero.resource-hero-section": CommonHeroSection,
  "section-hero.contact-hero-sectionx": CommonHeroSection,
  "section-text.mission-statement": CareerMission,
  "section-cards.career-benefits": CareerBenefitsWrapper,
  "section-features.global-team": CareerGlobalTeam,
  "section-cards.testimonials": CareerTestimonials,
  "section-features.technologies": CareerTechnology,
  "section-features.cta": CTA,
  "section-features.feature-left-tabs": VerticalTabs,
  "section-features.feature-sub-page-top-tabs": HorizontalTabsWrapper,
  "section-features.tabs-features": CapabilityTabs,
  "section-faqs.fa-qs-page-section": FaqsWrapper,
  "section-hero.cta-buttons": CTA,
  "section-cards.feature1": HomeCardWrapper,
  "section-features.architecture": PlatformArchitectureWrapper,
  "section-hero.homepage-hero": HomeHerosection,
  "section-cards.feature4": CardWrapper,
  "section-cards.solution-features": CardWithBackgroundWrapper,
  "section-cta.banner": CTA,
  "section-features.homepage-feature": CustomInterchangeWrapper,
  "section-features.our-story": OurStory,
  "section-features.our-commitment": OurCommitmentO2,
  "section-cards.our-partners": OurPartners,
  "section-hero.solutions-hero-section": HeroSectionWithImage,
  "section-hero.solution-subpage-herosection": SolutionSubPageHeroSection,
  "section-features.paltofrm-sub-benefits": CardWithoutBorderWrapper,
  // "section-cards.homepage-comprehensive-features": HomeCardComprehensiveWrapper,
  // "section-content.success-stories": SuccessStories, //removed this and add CaseStudySection
  "section-features.resources-feature-details": CardWithSideIconResourcePage,
  "section-downloads.downloads-form": DownloadForm,
  "section-downloads.deployment-options": OpenObserveDeploymentOptions,
  "section-pricing.pricing-options": PricingOptions,
  "section-forms.contact": ContactFormWrapper,
  "section-forms.demo-form": DemoWrapper,
  "section-cards.blog": BlogSection,
  "section-cards.community-support": CommunitySupport,
  "section-policies.table-of-contents": TOC,
  "section-policies.summary": SummaryWrapper,
  "section-cards.plaform-key-features": PlatformKeyFeaturesWrapper,
  "section-faqs.frequently-asked-question": CommonFaqWrapper,
  "section-features.home-marketecture-section": HomeModernArchiture,
  "section-cards.customer-stories": CaseStudySection,
  "section-cards.articles": LatestArticles,
  "section-forms.contact-sales-form": ContactSalesWrapper
}));

const getComponentProps = (it) => {
  switch (it.__component) {
    case "section-cards.blog":
      return { ...it, data: props.blogsData, sectionData: BlogResources };
    case "section-cards.case-studies":
      return { ...it, data: props.caseStudyData };
    case "section-cards.customer-stories":
      return { ...it, data: props.caseStudyData };
    case "section-cards.articles":
      return { ...it, data: props.articlesData, sectionData: ArticlesResources };
    case "section-cards.resources-blogs":
      return { ...it, items: props.blogs };
    case "section-cta.banner":
      return { ...it, ...props.bannerData };
    case "section-hero.homepage-hero":
      return { data: it };
    case "section-cards.blog":
      return { ...it, data: props.blogsData };
    default:
      return it;
  }
};
</script>
