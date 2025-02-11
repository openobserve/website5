<script setup>
import CustomRoundShapeSubPage from "../core/CustomRoundShapeSubPage.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection section-class="xl:px-0 relative overflow-hidden">
  <div class="relative w-full -mt-5">
    <!-- Background image with lower z-index -->
    <div class="absolute w-full">
      <img
        alt="Bottom decoration"
        class="w-full h-full"
        src="/img/bg/platform/glass-bg.svg"
      />
    </div>

    <!-- Content with higher z-index -->
    <div class="relative flex flex-row w-full justify-center mt-10 px-3 gap-4">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="flex flex-row gap-2"
      >
        <!-- Left Side: Icon -->
        <CustomRoundShapeSubPage 
          :imgSrc="item.image" 
          iconSize="small" 
          size="small" 
          class="shrink-0"
        />

        <!-- Right Side: Text -->
        <div class="flex flex-col items-start">
          <h2 class="font-semibold text-2xl mb-2 text-white">
            {{ item.title }}
          </h2>
          <p class="text-sm md:text-base text-gray-300">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</CustomSection>
</template>
