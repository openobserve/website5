<template>
  <div>
    <component
      v-for="(it, index) in data"
      :key="index"
      :is="getComponentForKey(it.__component)"
      v-bind="getComponentProps(it)"
    />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { ArticlesResources, BlogResources } from "@/utils/constant";

const props = defineProps({
  data: { type: Array, required: true },
  blogsData: { type: Array, required: false },
  blogs: { type: Array, required: false },
  caseStudyData: { type: Array, required: false },
  articlesData: { type: Array, required: false },
  bannerData: { type: Object, required: false },
});

// Plain object for mapping keys to async components
// const componentsMap = {
//   "section-hero.resource-hero-section": defineAsyncComponent(() => import("@/components/herosection/CommonHeroSection.vue")),
//   "section-hero.contact-hero-sectionx": defineAsyncComponent(() => import("@/components/herosection/CommonHeroSection.vue")),
//   "section-text.mission-statement": defineAsyncComponent(() => import("@/components/career/CareerMission.vue")),
//   "section-cards.career-benefits": defineAsyncComponent(() => import("@/components/career/CareerBenefitsWrapper.vue")),
//   "section-features.global-team": defineAsyncComponent(() => import("@/components/career/CareerGlobalTeam.vue")),
//   "section-cards.testimonials": defineAsyncComponent(() => import("@/components/career/CareerTestimonials.vue")),
//   "section-features.technologies": defineAsyncComponent(() => import("@/components/career/CareerTechnology.vue")),
//   "section-features.cta": defineAsyncComponent(() => import("@/components/core/CTA.vue")),
//   "section-features.feature-left-tabs": defineAsyncComponent(() => import("@/components/TabsComponent/VerticalTabs.vue")),
//   "section-features.feature-sub-page-top-tabs": defineAsyncComponent(() => import("@/components/wrapper/HorizontalTabsWrapper.vue")),
//   "section-features.tabs-features": defineAsyncComponent(() => import("@/components/TabsComponent/CapabilityTabs.vue")),
//   "section-faqs.fa-qs-page-section": defineAsyncComponent(() => import("@/components/faqs/FaqsWrapper.vue")),
//   "section-hero.cta-buttons": defineAsyncComponent(() => import("@/components/core/CTA.vue")),
//   "section-cards.feature1": defineAsyncComponent(() => import("@/components/wrapper/HomeCardWrapper.vue")),
//   "section-features.architecture": defineAsyncComponent(() => import("@/components/wrapper/PlatformArchitectureWrapper.vue")),
//   "section-hero.homepage-hero": defineAsyncComponent(() => import("@/components/herosection/HomeHerosection.vue")),
//   "section-cards.feature4": defineAsyncComponent(() => import("@/components/wrapper/CardWrapper.vue")),
//   "section-cards.solution-features": defineAsyncComponent(() => import("@/components/wrapper/CardWithBackgroundWrapper.vue")),
//   "section-cta.banner": defineAsyncComponent(() => import("@/components/core/CTA.vue")),
//   "section-features.homepage-feature": defineAsyncComponent(() => import("@/components/wrapper/CustomInterchangeWrapper.vue")),
//   "section-features.our-story": defineAsyncComponent(() => import("@/components/core/OurStory.vue")),
//   "section-features.our-commitment": defineAsyncComponent(() => import("@/components/core/OurCommitment.vue")),
//   "section-cards.our-partners": defineAsyncComponent(() => import("@/components/core/OurPartners.vue")),
//   "section-hero.solutions-hero-section": defineAsyncComponent(() => import("@/components/herosection/HeroSectionWithImage.vue")),
//   "section-hero.solution-subpage-herosection": defineAsyncComponent(() => import("@/components/herosection/SolutionSubPageHeroSection.vue")),
//   "section-features.paltofrm-sub-benefits": defineAsyncComponent(() => import("@/components/wrapper/CardWithoutBorderWrapper.vue")),
//   "section-cards.feature3": defineAsyncComponent(() => import("@/components/wrapper/CardWithSideIconResourcePage.vue")),
//   "section-forms.download-contact-form": defineAsyncComponent(() => import("@/components/downloads/DownloadForm.vue")),
//   "section-tabs.download-tabs": defineAsyncComponent(() => import("@/components/downloads/OpenObserveDeploymentOptions.vue")),
//   "section-tabs.pricing-tabs": defineAsyncComponent(() => import("@/components/pricing/PricingOptions.vue")),
//   "section-forms.contact": defineAsyncComponent(() => import("@/components/contactus/ContactFormWrapper.vue")),
//   "section-forms.demo-page-form": defineAsyncComponent(() => import("@/components/wrapper/DemoWrapper.vue")),
//   "section-cards.blog": defineAsyncComponent(() => import("@/components/blog/BlogSection.vue")),
//   "section-cards.community-support": defineAsyncComponent(() => import("@/components/contactus/CommunitySupport.vue")),
//   "section-policies.table-of-contents": defineAsyncComponent(() => import("@/components/policies/TOC.vue")),
//   "section-policies.summary": defineAsyncComponent(() => import("@/components/policies/SummaryWrapper.vue")),
//   "section-cards.plaform-key-features": defineAsyncComponent(() => import("@/components/wrapper/PlatformKeyFeaturesWrapper.vue")),
//   "section-faqs.frequently-asked-question": defineAsyncComponent(() => import("@/components/faqs/CommonFaqWrapper.vue")),
//   "section-features.home-marketecture-section": defineAsyncComponent(() => import("@/components/wrapper/HomeModernArchiture.vue")),
//   "section-cards.case-studies": defineAsyncComponent(() => import("@/components/case-studies/CaseStudySection.vue")),
//   "section-cards.articles": defineAsyncComponent(() => import("@/components/articles/LatestArticles.vue")),
//   "section-forms.contact-sales-form": defineAsyncComponent(() => import("@/components/wrapper/ContactSalesWrapper.vue")),
// };

// Function to get component by key using switch-case for possible future logic
function getComponentForKey(key) {
  switch (key) {
    case "section-hero.resource-hero-section":
      return defineAsyncComponent(() =>
        import("@/components/herosection/CommonHeroSection.vue")
      );
    case "section-hero.contact-hero-sectionx":
      return defineAsyncComponent(() =>
        import("@/components/herosection/CommonHeroSection.vue")
      );
    case "section-text.mission-statement":
      return defineAsyncComponent(() =>
        import("@/components/career/CareerMission.vue")
      );
    case "section-cards.career-benefits":
      return defineAsyncComponent(() =>
        import("@/components/career/CareerBenefitsWrapper.vue")
      );
    case "section-features.global-team":
      return defineAsyncComponent(() =>
        import("@/components/career/CareerGlobalTeam.vue")
      );
    case "section-cards.testimonials":
      return defineAsyncComponent(() =>
        import("@/components/career/CareerTestimonials.vue")
      );
    case "section-features.technologies":
      return defineAsyncComponent(() =>
        import("@/components/career/CareerTechnology.vue")
      );
    case "section-features.cta":
      return defineAsyncComponent(() => import("@/components/core/CTA.vue"));
    case "section-features.feature-left-tabs":
      return defineAsyncComponent(() =>
        import("@/components/TabsComponent/VerticalTabs.vue")
      );
    case "section-features.feature-sub-page-top-tabs":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/HorizontalTabsWrapper.vue")
      );
    case "section-features.tabs-features":
      return defineAsyncComponent(() =>
        import("@/components/TabsComponent/CapabilityTabs.vue")
      );
    case "section-faqs.fa-qs-page-section":
      return defineAsyncComponent(() =>
        import("@/components/faqs/FaqsWrapper.vue")
      );
    case "section-hero.cta-buttons":
      return defineAsyncComponent(() => import("@/components/core/CTA.vue"));
    case "section-cards.feature1":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/HomeCardWrapper.vue")
      );
    case "section-features.architecture":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/PlatformArchitectureWrapper.vue")
      );
    case "section-hero.homepage-hero":
      return defineAsyncComponent(() =>
        import("@/components/herosection/HomeHerosection.vue")
      );
    case "section-cards.feature4":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/CardWrapper.vue")
      );
    case "section-cards.solution-features":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/CardWithBackgroundWrapper.vue")
      );
    case "section-cta.banner":
      return defineAsyncComponent(() => import("@/components/core/CTA.vue"));
    case "section-features.homepage-feature":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/CustomInterchangeWrapper.vue")
      );
    case "section-features.our-story":
      return defineAsyncComponent(() =>
        import("@/components/core/OurStory.vue")
      );
    case "section-features.our-commitment":
      return defineAsyncComponent(() =>
        import("@/components/core/OurCommitment.vue")
      );
    case "section-cards.our-partners":
      return defineAsyncComponent(() =>
        import("@/components/core/OurPartners.vue")
      );
    case "section-hero.solutions-hero-section":
      return defineAsyncComponent(() =>
        import("@/components/herosection/HeroSectionWithImage.vue")
      );
    case "section-hero.solution-subpage-herosection":
      return defineAsyncComponent(() =>
        import("@/components/herosection/SolutionSubPageHeroSection.vue")
      );
    case "section-features.paltofrm-sub-benefits":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/CardWithoutBorderWrapper.vue")
      );
    case "section-cards.feature3":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/CardWithSideIconResourcePage.vue")
      );
    case "section-forms.download-contact-form":
      return defineAsyncComponent(() =>
        import("@/components/downloads/DownloadForm.vue")
      );
    case "section-tabs.download-tabs":
      return defineAsyncComponent(() =>
        import("@/components/downloads/OpenObserveDeploymentOptions.vue")
      );
    case "section-tabs.pricing-tabs":
      return defineAsyncComponent(() =>
        import("@/components/pricing/PricingOptions.vue")
      );
    case "section-forms.contact":
      return defineAsyncComponent(() =>
        import("@/components/contactus/ContactFormWrapper.vue")
      );
    case "section-forms.demo-page-form":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/DemoWrapper.vue")
      );
    case "section-cards.blog":
      return defineAsyncComponent(() =>
        import("@/components/blog/BlogSection.vue")
      );
    case "section-cards.community-support":
      return defineAsyncComponent(() =>
        import("@/components/contactus/CommunitySupport.vue")
      );
    case "section-policies.table-of-contents":
      return defineAsyncComponent(() =>
        import("@/components/policies/TOC.vue")
      );
    case "section-policies.summary":
      return defineAsyncComponent(() =>
        import("@/components/policies/SummaryWrapper.vue")
      );
    case "section-cards.plaform-key-features":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/PlatformKeyFeaturesWrapper.vue")
      );
    case "section-faqs.frequently-asked-question":
      return defineAsyncComponent(() =>
        import("@/components/faqs/CommonFaqWrapper.vue")
      );
    case "section-features.home-marketecture-section":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/HomeModernArchiture.vue")
      );
    case "section-cards.case-studies":
      return defineAsyncComponent(() =>
        import("@/components/case-studies/CaseStudySection.vue")
      );
    case "section-cards.articles":
      return defineAsyncComponent(() =>
        import("@/components/articles/LatestArticles.vue")
      );
    case "section-forms.contact-sales-form":
      return defineAsyncComponent(() =>
        import("@/components/wrapper/ContactSalesWrapper.vue")
      );
    case "section-downloads.cta":
      return defineAsyncComponent(() =>
        import("@/components/downloads/CloudCTASection.vue")
      );
    case "section-dowloads.additional-resources":
      return defineAsyncComponent(() =>
        import("@/components/downloads/AdditionalResouces.vue")
      );
    default:
      return undefined;
  }
}

const getComponentProps = (it) => {
  switch (it.__component) {
    case "section-cards.blog":
      return { ...it, data: props.blogsData, sectionData: BlogResources };
    case "section-cards.case-studies":
      return { ...it, data: props.caseStudyData };
    case "section-cards.articles":
      return {
        ...it,
        data: props.articlesData,
        sectionData: ArticlesResources,
      };
    case "section-cards.resources-blogs":
      return { ...it, items: props.blogs };
    case "section-cta.banner":
      return { ...it, ...props.bannerData };
    case "section-hero.homepage-hero":
      return { data: it };
    default:
      return it;
  }
};
</script>
