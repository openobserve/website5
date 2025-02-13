<script setup lang="ts">
import { generateNavLink } from "../../utils/redirection";
import CustomBluredImage from "../core/CustomBluredImage.vue";
interface Blog {
  title: string;
  description: string;
  image: {
    url: string;
  };
  slug: string;
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
  linkColor: {
    type: String,
    default: "text-[#00A3FF]",
  },
  type: {
    type: String,
    default: "blog",
  },
});
</script>

<template>
  <div class="pb-2">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <a
          v-for="blog in sectionData"
          :key="blog.title"
          :href="generateNavLink(type, blog.slug)"
          rel="noopener noreferrer"
          :class="[
            cardBgColor,
            'flex flex-col rounded-xl overflow-hidden cardShadow border border-transparent hover:border-blue-500 transition-all duration-300 hover:shadow-2xl',]">
        
          <CustomBluredImage :image="blog?.image?.url || ''" :altText="blog.title"  />

          <div class="w-full p-6 flex flex-col">
            <div>
              <h6 :class="[titleTextColor, 'text-md font-bold mb-3']">
                {{ blog.title }}
              </h6>
              <p :class="[descriptionTextColor, 'mb-2 text-sm line-clamp-2']">
                {{ blog.description }}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
