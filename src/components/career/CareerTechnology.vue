<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
   <CustomSection>
       <!-- Heading Section -->
        <HeadingSection
          v-if="heading?.title || heading?.description"
          :title="heading.title"
          :description="heading.description"
          align="center"
        />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div v-for="(feature, index) in features" :key="index" class="flex items-start space-x-4">
            <div class="p-2 rounded-full mt-1" :class="feature.iconBgClass">
              <component :is="getIconComponent(feature.image)" class="h-5 w-5" :class="feature.iconColor" />
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
          <h3 class="text-xl font-bold mb-4">{{ techTags.title }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(tech, index) in techTags.techList" :key="index"
              class="px-3 py-1 rounded-full text-sm font-medium text-white" :class="tagColor[tech.title]">
              {{ tech.title }}
            </span>
          </div>
          <div class="mt-6">
            <h4 class="font-bold mb-2">{{ techFeatures.title }}</h4>
            <ul class="list-disc list-inside space-y-2 text-gray-500">
              <li v-for="(principle, index) in techFeatures.items" :key="index">{{ principle.title }}</li>
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
  title: string;
  color: string;
}

defineProps<{
  heading?: {
    title: string;
    description: string;
  };
  features: TechFeature[];
  techTags: {
    title: string;
    techList: TechTag[];
  };
  techFeatures: {
    title: string;
    items: {
      title: string;
    }[];
  };
  background?: boolean;
}>();

// Helper function to map iconClass to the corresponding component
function getIconComponent(image: string) {
  const iconMap: Record<string, any> = {
    Code,
    Globe,
    Rocket,
  };
  return iconMap[image] || null;
}

const tagColor = {
  "Rust": "bg-orange-500 text-white",
  "TypeScript": "bg-blue-500 text-white",
  "React":"bg-blue-700 text-white",
  "Vue.js":"bg-cyan-500 text-white",
  "Kubernetes":"bg-purple-500 text-white",
  "Docker":"bg-blue-600 text-white",
  "AWS": "bg-blue-800 text-white",
  "Azure":"bg-yellow-500 text-white",
  "SQL Database":"bg-red-500 text-white",
  "gRPC":"bg-gray-700 text-white",
  "ArgoCD":"bg-pink-600 text-white",
  "Terraform":"bg-green-700 text-white"
}
</script>