<template>
  <!-- Include Tailwind CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">

  <section class="w-full">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-16 px-4 text-center">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ data.hero.title }}</h1>
      <p class="text-lg mb-8 max-w-2xl mx-auto">{{ data.hero.description }}</p>
      <button class="bg-white text-blue-500 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
        {{ data.hero.buttonText }}
      </button>
    </div>

    <!-- Mission Statement -->
    <div class="max-w-4xl mx-auto py-12 px-4 text-center">
      <p class="text-gray-600">{{ data.missionStatement }}</p>
    </div>

    <!-- Benefits Section -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(benefit, index) in data.benefits" :key="index" class="bg-gray-900 text-white p-6 rounded-lg">
          <div class="flex justify-center mb-4">
            <div class="w-12 h-12 flex items-center justify-center rounded-full" :class="benefit.iconColor">
              <i class="text-2xl" :class="benefit.icon"></i>
            </div>
          </div>
          <h3 class="text-xl font-bold mb-2">{{ benefit.title }}</h3>
          <p class="text-gray-300">{{ benefit.description }}</p>
        </div>
      </div>
    </div>

    <!-- Global Team Section -->
    <div class="bg-gray-950 text-white py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-2">{{ data.globalTeam.title }}</h2>
        <p class="text-center text-gray-300 mb-12 max-w-3xl mx-auto">{{ data.globalTeam.description }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(feature, index) in data.globalTeam.features" :key="index" class="text-center">
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 flex items-center justify-center">
                <i class="text-2xl" :class="feature.icon"></i>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-300">{{ feature.description }}</p>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mt-12">
          <div class="h-64 relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-center text-gray-300">{{ data.globalTeam.mapText }}</p>
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div v-for="(dot, index) in data.globalTeam.mapDots" :key="index" class="w-3 h-3 rounded-full absolute"
                :style="{ backgroundColor: dot.color, left: dot.x + '%', top: dot.y + '%' }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="max-w-6xl mx-auto py-16 px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-2">{{ data.testimonials.title }}</h2>
      <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{{ data.testimonials.description }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(testimonial, index) in data.testimonials.items" :key="index"
          class="bg-gray-900 text-white p-6 rounded-lg">
          <p class="italic mb-6">"{{ testimonial.quote }}"</p>
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-600 mr-4">
              <img v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.name"
                class="w-full h-full object-cover">
            </div>
            <div>
              <p class="font-bold">{{ testimonial.name }}</p>
              <p class="text-gray-300 text-sm">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technology Section -->
    <div class="max-w-6xl mx-auto py-12 px-4">
      <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">{{ data.technology.description }}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div v-for="(feature, index) in data.technology.features" :key="index" class="flex items-start mb-8">
            <div class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mr-4">
              <i class="text-2xl" :class="feature.icon"></i>
            </div>
            <div>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-100 p-6 rounded-lg">
          <ul class="list-none p-0 m-0 flex flex-col gap-2">
            <li v-for="(tech, index) in data.technology.techList" :key="index" class="flex items-center">
              <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {{ tech }}
            </li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="(tag, index) in data.technology.techTags" :key="index"
              class="px-4 py-2 rounded-lg text-xs font-medium" :style="{ backgroundColor: tag.color }">
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gray-950 text-white py-16 px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ data.cta.title }}</h2>
      <p class="text-lg mb-8 max-w-2xl mx-auto">{{ data.cta.description }}</p>
      <button class="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors">
        {{ data.cta.buttonText }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
// Define interface for the component's props
interface Benefit {
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

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

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

interface TechFeature {
  description: string;
  icon: string;
}

interface TechTag {
  name: string;
  color: string;
}

interface CareersPageData {
  hero: {
    title: string;
    description: string;
    buttonText: string;
  };
  missionStatement: string;
  benefits: Benefit[];
  globalTeam: {
    title: string;
    description: string;
    features: GlobalTeamFeature[];
    mapText: string;
    mapDots: MapDot[];
  };
  testimonials: {
    title: string;
    description: string;
    items: Testimonial[];
  };
  technology: {
    description: string;
    features: TechFeature[];
    techList: string[];
    techTags: TechTag[];
  };
  cta: {
    title: string;
    buttonText: string;
    description: string;
  };
}

// Define props
const props = defineProps<{
  data: CareersPageData;
}>();

function hoverButton(event: MouseEvent) {
  (event.target as HTMLElement).style.backgroundColor = '#e5e7eb';
}

function unhoverButton(event: MouseEvent) {
  (event.target as HTMLElement).style.backgroundColor = '';
}
</script>