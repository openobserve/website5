<template>
  <section class="w-full py-12 md:py-24 " :class="background ? 'bg-gray-50' : ''">
    <div class="container px-4 sm:px-6 lg:px-8 xl:px-11 mx-auto">
      <div class="flex flex-col items-center space-y-4 text-center mb-10">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Our Tech</h2>
        <p class="mx-auto max-w-[700px] text-gray-500">
          {{ description }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div v-for="(feature, index) in features" :key="index" class="flex items-start space-x-4">
            <div class="p-2 rounded-full mt-1" :class="feature.iconBgClass">
              <component :is="getIconComponent(feature.iconClass)" class="h-5 w-5" :class="feature.iconColor" />
            </div>
            <div>
              <h3 class="text-xl font-bold">{{ feature.title }}</h3>
              <p class="text-gray-500">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="bg-gray-100 p-6 rounded-lg">
          <h3 class="text-xl font-bold mb-4">Tech We Use</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(tech, index) in techTags" :key="index"
              class="px-3 py-1 rounded-full text-sm font-medium text-white" :class="tech.color">
              {{ tech.name }}
            </span>
          </div>
          <div class="mt-6">
            <h4 class="font-bold mb-2">Engineering Principles</h4>
            <ul class="list-disc list-inside space-y-2 text-gray-500">
              <li v-for="(principle, index) in techList" :key="index">{{ principle }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Code, Globe, Rocket } from 'lucide-vue-next';
interface TechFeature {
  title: string;
  description: string;
  iconClass: string;
  iconColor: string;
  iconBgClass: string;
}

interface TechTag {
  name: string;
  color: string;
}

defineProps<{
  description: string;
  features: TechFeature[];
  techTags: TechTag[];
  techList: string[];
  background?: boolean;
}>();

// Helper function to map iconClass to the corresponding component
function getIconComponent(iconClass: string) {
  const iconMap: Record<string, any> = {
    Code,
    Globe,
    Rocket,
  };
  return iconMap[iconClass] || null;
}
</script>