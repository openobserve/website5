<template>
  <div class="bg-gradient-to-r from-primary-purple/5 to-primary-blue/5">
    <CustomSection>
      <HeadingSection
        v-if="title || description"
        :title="title"
        :description="description"
        align="center"
      />
      <div
        class="grid gap-6"
        :class="gridClass"
      >
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="text-center"
        >
          <Cards
            :title="feature.title"
            :description="feature.description"
            :icon="feature.icon"
            :theme="feature.iconColor"
            align="center"
          />
        </div>
      </div>

      <div class="bg-light-gray rounded-lg p-6 mt-12">
        <div class="h-64 relative bg-white">
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-center">{{ mapText }}</p>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              v-for="(dot, index) in mapDots"
              :key="index"
              class="w-3 h-3 rounded-full absolute animate-ping duration-700 ease-in-out"
              :class="dot.color"
              :style="{ left: dot.x + '%', top: dot.y + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </CustomSection>
  </div>
</template>

<script setup lang="ts">
import Cards from "../core/Cards.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
import { computed } from "vue";
interface GlobalTeamFeature {
  title: string;
  description: string;
  icon: string;
}

interface MapDot {
  x: number;
  y: number;
  color: string;
}

const props = defineProps<{
  title: string;
  description: string;
  features: GlobalTeamFeature[];
  mapText: string;
  mapDots: MapDot[];
}>();

const gridClass = computed(() => {
  const count = props?.features?.length

  if (count >= 3) {
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  } else if (count === 2) {
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
  } else if (count === 1) {
    return 'grid-cols-1'
  } else {
    return ''
  }
})
</script>
