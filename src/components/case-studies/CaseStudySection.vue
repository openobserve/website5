<template>
  <CustomSection>
    <HeadingSection
      :title="sectionData.title"
      :description="sectionData.description"
      align="CENTER"
      class=""
    />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CaseStudyCard v-for="(item, index) in data" :key="index" :item="item" />
    </div>
    <!-- View All Button -->
    <div class="mt-12 flex justify-center">
      <a :href="sectionData.button.link">
        <button
          class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          {{ sectionData.button.text }}
          <ArrowRight class="ml-2 h-4 w-4" />
        </button>
      </a>
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import type { CaseStudies } from "@/types/case-studies";
import CaseStudyCard from "./CaseStudyCard.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import { reactive } from "vue";
import { ArrowRight } from "lucide-vue-next";
const props = defineProps<{
  data: CaseStudies[];
}>();
const sectionData = reactive({
  title: "Customer Stories",
  description:
    "See how customers are transforming their observability with OpenObserve.",
  button: {
    text: "View Customer Stories",
    link: "/customer-stories",
  },
});
</script>
