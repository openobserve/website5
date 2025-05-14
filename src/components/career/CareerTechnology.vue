<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
   <CustomSection>
       <!-- Heading Section -->
        <HeadingSection
          v-if="title || description"
          :title="title"
          :description="description"
          align="center"
        />
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
   </CustomSection>
  </section>
</template>

<script setup lang="ts">
import { Code, Globe, Rocket } from 'lucide-vue-next';
import HeadingSection from '@/components/core/HeadingSection.vue';
import CustomSection from '@/components/core/CustomSection.vue';
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
  title: string;
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