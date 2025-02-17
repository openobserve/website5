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

/**
 * Returns the url of the image that is most suitable for the
 * blog listing display. Tries to return the medium image url
 * first, then the large, then the small, and finally the
 * original image url.
 * 
 * This function is used to get the image URL and not using the default one for below reasons:
 * 1. To render low resolution image for the listing
 * 2. Avoid large GIFs to avoid rednering delays
 * 3. Fallback to other formats if the intended one is not found
 */
const getImageUrl = ({ image }: Blog) =>
  image?.formats?.medium?.url ??
  image?.formats?.large?.url ??
  image?.formats?.small?.url ??
  image?.url ??
  "";
</script>

<template>
  <div class="pb-2">
    <div class="container mx-auto px-4">
      <div class="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <a
          v-for="blog in sectionData"
          :key="blog.title"
          :href="generateNavLink(type, blog.slug)"
          rel="noopener noreferrer"
          :class="[
  cardBgColor,
  'relative flex flex-col rounded-xl overflow-hidden cardShadow border border-transparent transition-all duration-200 ease-in-out',
]">
          <CustomBluredImage :image="getImageUrl(blog)" :altText="blog.title"  />
          <div class="w-full p-6 flex flex-col">
              <h6 :class="[titleTextColor, 'text-md font-bold mb-3']">
                {{ blog.title }}
              </h6>
              <p :class="[descriptionTextColor, 'mb-2 text-sm line-clamp-2']">
                {{ blog.description }}
              </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<style>
.cardShadow::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  transition: border-color 0.2s ease-in-out;
}

.cardShadow:hover::after {
  border-color: #3b82f6; /* Tailwind blue-500 */
}

</style>
