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
  <div class="min-h-screen">
    <div class="container mx-auto px-1">
      <div class="grid grid-rows-1 lg:grid-rows-2 gap-8">
        <a
          v-for="blog in sectionData"
          :key="blog.title"
         :href="generateNavLink(type, blog.slug)"
          rel="noopener noreferrer"
          :class="[cardBgColor, 'rounded-xl overflow-hidden transition-transform hover:scale-105 flex flex-rows md:flex-row']"
        >
          <!-- Left Side - Image -->
          <div class="w-full md:h-auto relative">
            <img
              :src="blog.image.url || ''"
              :alt="blog.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Right Side - Content -->
          <div class="w-full p-6 flex flex-col justify-between">
            <div>
              <h6 :class="[titleTextColor, 'text-md font-bold mb-3']">
                {{ blog.title }}
              </h6>
              <p :class="[descriptionTextColor, 'mb-2 text-sm line-clamp-2']">
                {{ blog.description }}
              </p>
            </div>
            <span
              :class="[linkColor, 'text-sm font-semibold hover:opacity-80 inline-block']"
            >
              LEARN MORE
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
