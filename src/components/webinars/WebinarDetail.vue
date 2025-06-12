<template>
  <CustomSection sectionClass="!pt-10">
    <div
      class="flex flex-col container max-w-6xl mx-auto"
    >
      <!-- What you'll learn section -->
      <div class="w-full mb-8">
        <div class="sticky top-20 border border-gray-400 rounded-xl p-4">
          <h2 class="text-2xl font-bold mb-4">What you'll learn</h2>
          <div
            class="flex flex-col space-y-4"
            v-for="(objective, index) in objectives"
            :key="index"
          >
            <div class="flex items-center gap-4 text-base mb-2 font-normal">
              <div
                class="text-primary-green rounded-full shrink-0 flex items-center justify-center"
              >
                <!-- {{ index + 1 }} -->
                  <CircleCheckBig class="h-5 w-5" />
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
        <!-- <div class="w-[700px] h-[400px]">
          <iframe
            :class="`w-full h-full`"
            src="https://www.youtube.com/embed/QvgyHU3_wME?si=Ute7fsnMLwkIL9ZS&rel=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            class="rounded-xl"
          ></iframe>
        </div> -->
        <div class=" text-justify">
          <h2 class="text-lg md:text-3xl font-medium mb-4">{{ summary.title }}</h2>
          <p v-html="summary.description" class="text-gray-700"></p>
        </div>
      </div>
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import CustomSection from "../core/CustomSection.vue";
import { Check ,CircleCheckBig} from 'lucide-vue-next';
import Summary from "../policies/Summary.vue";
interface Objective {
  description: string;
}
interface Summary {
  title: string;
  description: string;
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
});
</script>
<style scoped></style>
