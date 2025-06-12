<template>
  <CustomSection sectionClass="!pt-10">
    <div
      class="flex flex-col lg:flex-row container mx-auto space-x-0 md:space-x-10"
    >
      <!-- What you'll learn section -->
      <div class="w-full lg:w-[30%] mb-8">
        <div class="sticky top-20 border border-primary-purple rounded-xl p-4">
          <h2 class="text-2xl font-bold mb-4">What you'll learn</h2>
          <div
            class="flex flex-col space-y-4"
            v-for="(objective, index) in objectives"
            :key="index"
          >
            <div class="flex items-center gap-4 text-base mb-2 font-normal">
              <div
                class="text-primary-purple rounded-full p-4 shrink-0 w-2 h-2 border border-primary-purple flex items-center justify-center"
              >
                {{ index + 1 }}
              </div>
              <p class="text-gray-700">
                {{ objective.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Summary section -->
      <div class="flex flex-col w-full lg:w-[70%] text-left">
        <div class="w-[700px] h-[400px]">
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
        </div>
        <div class="mt-8 text-justify">
          <h2 class="text-lg md:text-3xl font-medium mb-4">{{ summary.title }}</h2>
          <p v-html="summary.description" class="text-gray-700"></p>
        </div>
      </div>
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import CustomSection from "../core/CustomSection.vue";
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
