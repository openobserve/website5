<script setup lang="ts">
import { generateNavLink } from "../../utils/redirection";
interface Blog {
  title: string;
  description: string;
  image: {
    url: string;
  };
  slug: string; // added slug field for the link
}
const props = defineProps({
  sectionData: {
    type: Array as () => Blog[],
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
  type: {
    type: String,
    default: "blog",
  },
  linkColor: {
    type: String,
    default: "text-[#00A3FF]",
  },
});
</script>
<template>
  <div class="flex items-center justify-center mb-4">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 gap-3">
        <a
          v-for="blog in sectionData"
          :key="blog.title"
          :href="generateNavLink(type, blog.slug)"
          rel="noopener noreferrer"
          :class="[
            cardBgColor,
            'rounded-xl overflow-hidden grid grid-cols-3 items-center p-2 h-40 transition-transform hover:scale-105',
          ]"
        >
          <!-- Left Side - Image -->
          <div class="h-full rounded-lg">
            <img
              :src="blog?.image?.url || ''"
              :alt="blog.title"
              class="w-full  h-full rounded-lg"
            />
          </div>

          <!-- Right Side - Content -->
          <div class="px-2 col-span-2 flex flex-col space-y-2 h-full">
            <h6 :class="[titleTextColor, 'text-sm font-bold']">
              {{ blog.title }}
            </h6>
            <p :class="[descriptionTextColor, 'text-sm line-clamp-3']">
              {{ blog.description }}
            </p>

          </div>
        </a>
      </div>
    </div>
  </div>
</template>


