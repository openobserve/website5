<script setup lang="ts">
import CustomSection from "../core/CustomSection.vue";
interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  author: string;
}

const props = defineProps({
  blog: {
    type: Object as () => Blog,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-white",
  },
  descriptionTextColor: {
    type: String,
    default: "text-gray-400",
  },
  cardBgColor: {
    type: String,
    default: "bg-[#2A2A2A]",
  },
  linkColor: {
    type: String,
    default: "text-[#00A3FF]",
  },
});
</script>

<template>
  <CustomSection>
    <div class="container mx-auto px-4">
      <div
        :class="[
          cardBgColor,
          'rounded-xl overflow-hidden flex flex-col md:flex-row',
        ]"
      >
        <!-- Left Side - Image -->
        <div class="w-full md:w-1/3 h-48 md:h-auto relative">
          <img
            :src="blog.imageUrl"
            :alt="blog.title"
            class="w-full h-full object-cover absolute inset-0"
          />
        </div>

        <!-- Right Side - Content -->
        <div class="w-full md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h3 :class="[titleTextColor, 'text-xl font-bold mb-3']">
              {{ blog.title }}
            </h3>
            <p :class="[descriptionTextColor, 'mb-4 text-sm']">
              {{ blog.description }}
            </p>
            <p class="text-sm text-gray-500">By: {{ blog.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>
