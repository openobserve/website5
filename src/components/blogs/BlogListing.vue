<script setup lang="ts">
interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}
const props = defineProps({
  sectionData: {
    type: Array as () => Blog[], // Correctly typed array of Blog objects
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
  <div class="min-h-screen">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <a
          v-for="blog in sectionData"
          :key="blog.title"
          :href="blog.link"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            cardBgColor,
            'max-w-sm rounded-xl overflow-hidden transition-transform block',
          ]"
        >
          <div class="h-48 overflow-hidden">
            <img
              :src="blog.imageUrl"
              :alt="blog.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6">
            <h3 :class="[titleTextColor, 'text-xl font-bold mb-3']">
              {{ blog.title }}
            </h3>
            <p :class="[descriptionTextColor, 'mb-4 text-sm']">
              {{ blog.description }}
            </p>
            <span
              :class="[linkColor, 'text-sm font-semibold hover:opacity-80']"
            >
              LEARN MORE
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
