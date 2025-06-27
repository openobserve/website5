<template>
  <CustomSection sectionClass="!py-10">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full max-w-7xl mx-auto">
      <div class="col-span-1 lg:col-span-3 w-full">
        <!-- What you'll learn section -->
        <div class="w-full mb-8">
          <div class="sticky top-20 border rounded-xl p-4">
            <div class="flex flex-row gap-2 w-full items-center h-full mb-4">
              <Star class="w-5 h-5 mb-1 text-purple-600 shrink-0" />
              <h2 class="text-xl font-bold">What you'll learn</h2>
            </div>
            <div class="flex flex-col space-y-4" v-for="(objective, index) in objectives" :key="index">
              <div class="flex items-center gap-4 text-base mb-2 font-normal">
                <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <div class="w-2 h-2 bg-primary-green rounded-full"></div>
                </div>
                <p class="text-gray-700">
                  {{ objective.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Summary section -->
        <div class="flex flex-col w-full text-left">
          <div v-html="htmlContent" class="prose max-w-none text-gray-700"></div>
        </div>
      </div>
      <!-- Resources section -->
      <div class="w-full mb-8 col-span-1">
        <div class="border rounded-xl p-4">
          <h2 class="text-2xl font-bold mb-4">Resources</h2>
          <ul class="flex flex-col text-left w-full" v-for="(resource, index) in resources" :key="index">
            <li>
              <a :href="resource.link"
                class="text-base block font-normal rounded-lg mb-2 hover:text-gray-700 transition duration-300 ease-in-out"
                :target="resource.target || '_self'">
                <p class="">
                  {{ resource.text }}
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import CustomSection from "../core/CustomSection.vue";
import { Star } from "lucide-vue-next";
import { marked } from "marked";
import { ref, watch } from "vue";

interface Objective {
  description: string;
}
interface Summary {
  title: string;
  description: string;
}
interface Resources {
  text: string;
  description?: string;
  target?: string;
  link: string;
}

const props = defineProps({
  objectives: {
    type: Array as () => Objective[],
    required: true,
  },
  summary: {
    type: Object as () => Summary,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  resources: {
    type: Array as () => Resources[],
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
});

const htmlContent = ref("");

// Convert markdown to HTML
function processMarkdown(markdownText: string) {
  if (!markdownText) return;
  htmlContent.value = marked(markdownText);
}

// Watch for changes in summary.description
watch(
  () => props.content,
  (newContent) => {
    processMarkdown(newContent);
  },
  { immediate: true }
);
</script>

<style scoped>
/* Add any custom styles here */
</style>