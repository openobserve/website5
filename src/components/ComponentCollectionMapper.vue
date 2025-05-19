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
import CardWithSideIconWrapper from "./wrapper/CardWithSideIconWrapper.vue";
import HomeHerosection from "@/components/herosection/HomeHerosection.vue";
import CardWrapper from "@/components/wrapper/CardWrapper.vue";
import CustomInterchangeWrapper from "@/components/wrapper/CustomInterchangeWrapper.vue";
import OurStory from "@/components/core/OurStory.vue";
import OurCommitmentO2 from "@/components/core/OurCommitmentO2.vue";
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
import BlogSection from "./contactus/BlogSection.vue";
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

const props = defineProps({
  data: { type: Array, required: true },
  blogsData: { type: Array, required: false },
  blogs: { type: Array, required: false },
  caseStudyData: { type: Array, required: false },
  articlesData: { type: Array, required: false },
  bannerData: { type: Object, required: false },
});
const componentsMap = computed(() => ({
  "section-hero.common-hero": CommonHeroSection,
  "section-text.mission-statement": CareerMission,
  "section-cards.career-benefits": CareerBenefitsWrapper,
  "section-features.global-team": CareerGlobalTeam,
  "section-testimonials.employee-testimonials": CareerTestimonials,
  "section-features.technology": CareerTechnology,
  "section-features.cta": CareerCTA,
  "section-solutions.solutions": VerticalTabs,
  "section-solutions.tabs": HorizontalTabsWrapper,
  "section-solutions.capabilities": CapabilityTabs,
  "section-solutions.faqs": FaqsWrapper,
  "section-hero.cta-buttons": CTA,
  "section-features.benefits": HomeCardWrapper,
  "section-features.architecture": CardWithSideIconWrapper,
  "section-hero.homepage-hero": HomeHerosection,
  "section-cards.homepage-features": CardWrapper,
  "section-cards.solution-features": CardWithBackgroundWrapper,
  "section-cta.homepage-cta": CTA,
  "section-features.homepage-feature-details": CustomInterchangeWrapper,
  "section-story.our-story": OurStory,
  "section-story.our-commitment": OurCommitmentO2,
  "section-story.our-partners": OurPartners,
  "section-hero.platform-sub-hero": HeroSectionWithImage,
  "section-hero.solution-sub-hero": SolutionSubPageHeroSection,
  "section-features.paltofrm-sub-benefits": CardWithoutBorderWrapper,
  "section-cards.homepage-comprehensive-features": HomeCardComprehensiveWrapper,
  // "section-content.success-stories": SuccessStories, //removed this and add CaseStudySection
  "section-features.resources-feature-details": CardWithSideIconResourcePage,
  "section-downloads.downloads-form": DownloadForm,
  "section-downloads.deployment-options": OpenObserveDeploymentOptions,
  "section-pricing.pricing-options": PricingOptions,
  "section-forms.contact-form": ContactFormWrapper,
  "section-forms.demo-form": DemoWrapper,
  "section-cards.blog": BlogSection,
  "section-contact.community-support": CommunitySupport,
  "section-policies.table-of-contents": TOC,
  "section-policies.summary": SummaryWrapper,
  "section-key-features-benefits.key-features": PlatformKeyFeaturesWrapper,
  "sections.faq": CommonFaqWrapper,
  "section-features.homepage-architecture": HomeModernArchiture,
  "section-cards.customer-stories": CaseStudySection,
  "section-cards.articles": LatestArticles,
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
