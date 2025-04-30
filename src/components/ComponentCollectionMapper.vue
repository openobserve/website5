<template>
  <div>
    <component v-for="(it, index) in data" :key="index" :is="componentsMap[it.__component]"
      v-bind="getComponentProps(it)" />
  </div>
</template>

<script setup>
import { computed } from "vue";

// Import all possible section components
import CareerHero from "@/components/career/CareerHero.vue";
import CareerMission from "@/components/career/CareerMission.vue";
import CareerBenefits from "@/components/career/CareerBenefits.vue";
import CareerGlobalTeam from "@/components/career/CareerGlobalTeam.vue";
import CareerTestimonials from "@/components/career/CareerTestimonials.vue";
import CareerTechnology from "@/components/career/CareerTechnology.vue";
import CareerCTA from "@/components/career/CareerCTA.vue";
import VerticalTabs from "@/components/TabsComponent/VerticalTabs.vue";

const props = defineProps({
  data: { type: Array, required: true },
  blogsData: { type: Array, required: false },
  blogs: { type: Array, required: false },
  caseStudyData: { type: Array, required: false },
  bannerData: { type: Object, required: false },
});

const componentsMap = computed(() => ({
  "section-hero.careers-hero": CareerHero,
  "section-text.mission-statement": CareerMission,
  "section-cards.career-benefits": CareerBenefits,
  "section-features.global-team": CareerGlobalTeam,
  "section-testimonials.employee-testimonials": CareerTestimonials,
  "section-features.technology": CareerTechnology,
  "section-features.cta": CareerCTA,
  "section-solutions.solutions": VerticalTabs,
}));

const getComponentProps = (it) => {
  switch (it.__component) {
    case "section-cards.blog":
      return { ...it, data: props.blogsData };
    case "section-cards.case-studies":
      return { ...it, data: props.caseStudyData };
    case "section-cards.resources-blogs":
      return { ...it, items: props.blogs };
    case "section-cta.banner":
      return { ...it, ...props.bannerData };
    default:
      return it;
  }
};
</script>
