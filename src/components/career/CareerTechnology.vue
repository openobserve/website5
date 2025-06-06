<template>
  <section class="w-full" :class="background ? 'bg-gray-50' : ''">
    <CustomSection>
      <!-- Heading Section -->
      <HeadingSection
        v-if="heading?.title || heading?.description"
        :title="heading?.title"
        :description="heading?.description"
        align="center"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Features Column -->
        <div class="space-y-6">
          <div
            v-for="feature in features"
            :key="feature?.id"
            class="flex items-start space-x-4"
          >
            <div
              v-if="feature?.theme"
              :class="[
                'p-2 rounded-full flex items-center justify-center w-10 h-10 shrink-0 bg-card',
                feature.theme,
              ]"
            >
              <img
                v-if="feature?.image?.url"
                :src="feature.image?.url"
                :alt="feature.image?.alternativeText"
                class="w-full rounded-lg object-cover"
              />
            </div>
            <div>
              <h3 v-if="feature?.title" class="text-xl font-bold">
                {{ feature.title }}
              </h3>
              <p v-if="feature?.description" class="text-gray-500">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tech Tags Column -->
        <div class="bg-gray-100 p-6 rounded-lg">
          <h3 v-if="techTags?.title" class="text-xl font-bold mb-4">
            {{ techTags.title }}
          </h3>

          <div v-if="techTags?.techList?.length" class="flex flex-wrap gap-2">
            <span
              v-for="tech in techTags.techList"
              :key="tech?.id"
              class="px-3 py-1 rounded-full text-sm font-medium text-white"
              :class="tagColor[tech?.title] || 'bg-gray-500'"
            >
              {{ tech?.title }}
            </span>
          </div>

          <div v-if="techFeatures?.length" class="mt-6">
            <template
              v-for="featureGroup in techFeatures"
              :key="featureGroup?.id"
            >
              <h4 v-if="featureGroup?.title" class="font-bold mb-2">
                {{ featureGroup.title }}
              </h4>
              <ul
                v-if="featureGroup?.items?.length"
                class="list-disc list-inside space-y-2 text-gray-500"
              >
                <li v-for="item in featureGroup.items" :key="item?.id">
                  {{ item?.title }}
                </li>
              </ul>
            </template>
          </div>
        </div>
      </div>
    </CustomSection>
  </section>
</template>

<script setup lang="ts">
import HeadingSection from "@/components/core/HeadingSection.vue";
import CustomSection from "@/components/core/CustomSection.vue";
import CustomImage from "@/components/core/CustomImage.vue";
interface Feature {
  id?: number;
  title?: string;
  description?: string;
  cardLink?: string | null;
  target?: string | null;
  theme?: string | null;
  image?: Object;
  button?: any | null;
}

interface TechTag {
  id?: number;
  title?: string;
}

interface TechFeatureGroup {
  id?: number;
  title?: string;
  items?: {
    id?: number;
    title?: string;
  }[];
}

defineProps<{
  heading?: {
    id?: number;
    title?: string;
    description?: string | null;
  };
  features?: Feature[];
  techTags?: {
    id?: number;
    title?: string;
    techList?: TechTag[];
  };
  techFeatures?: TechFeatureGroup[];
  background?: boolean;
}>();

const tagColor = {
  Rust: "bg-orange-500",
  TypeScript: "bg-blue-500",
  React: "bg-blue-700",
  "Vue.js": "bg-cyan-500",
  Kubernetes: "bg-purple-500",
  Docker: "bg-blue-600",
  AWS: "bg-blue-800",
  Azure: "bg-yellow-500",
  "SQL Database": "bg-red-500",
  gRPC: "bg-gray-700",
  ArgoCD: "bg-pink-600",
  Terraform: "bg-green-700",
};
</script>
