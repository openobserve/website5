<template>
  <section id="articles" class="bg-gray-50">
    <CustomSection>
      <HeadingSection
        :title="sectionData.title"
        :description="sectionData.description"
        align="CENTER"
        class=""
      />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(item, index) in data" :key="index">
          <BlogCard2 :blog="item" type="blog" />
        </div>
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
  </section>
</template>

<script setup lang="ts">
import type { CaseStudies } from "@/types/case-studies";
import BlogCard2 from "../blog/BlogCard2.vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import { reactive } from "vue";
import { ArrowRight } from "lucide-vue-next";
const props = defineProps<{
  data: CaseStudies[];
  sectionData: {
    title: string;
    description: string;
    button: {
      text: string;
      link: string;
    };
  };
}>();
</script>
