<script setup lang="ts">
import { generateAuthorLink } from "../../utils/redirection";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  authors: {
    type: Array as () => {
      id: number;
      documentId: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      name: string;
      bio: string;
      image: {
        url: string;
      };
      slug: string;
      youtubeUrl?: string | null;
      linkedInUrl?: string | null;
      twitterUrl?: string | null;
      instagramUrl?: string | null;
    }[],
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
  <section class="w-full">
    <p class="text-white px-2 py-2">About the Authors</p>
    <div class="flex flex-col space-y-4 w-full">
      <a
        v-for="author in authors"
        :href="generateAuthorLink(type, author.slug)"
        :key="author.id"
        :class="[cardBgColor, 'rounded-xl overflow-hidden flex md:flex-row']"
      >
        <!-- Left Side - Profile Image -->
        <div
          class="w-52 lg:w-1/5 h-44 relative flex items-center justify-center bg-gray-800 overflow-hidden"
        >
          <img
            v-if="author.image && author.image.url"
            :src="author.image.url"
            :alt="author.name"
            class="w-full h-full object-cover object-center"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center text-white"
          >
            No Image
          </div>
        </div>

        <!-- Right Side - Content -->
        <div
          class="w-full lg:w-4/5 p-2 md:p-3 lg:p-6 h-44 flex flex-col justify-between cursor-pointer"
        >
          <div class="flex flex-col space-y-2">
            <h3
              :class="[
                titleTextColor,
                'text-lg md:text-xl font-bold underline cursor-pointer',
              ]"
            >
              {{ author.name }}
            </h3>
            <p
              class="text-sm break-words line-clamp-3"
              :class="[descriptionTextColor]"
            >
              {{ author.bio }}
            </p>
          </div>

          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              v-if="author.linkedInUrl"
              :href="author.linkedInUrl"
              target="_blank"
              :class="[linkColor, 'underline']"
            >
              LinkedIn
            </a>
            <a
              v-if="author.twitterUrl"
              :href="author.twitterUrl"
              target="_blank"
              :class="[linkColor, 'underline']"
            >
              Twitter
            </a>
            <a
              v-if="author.instagramUrl"
              :href="author.instagramUrl"
              target="_blank"
              :class="[linkColor, 'underline']"
            >
              Instagram
            </a>
            <a
              v-if="author.youtubeUrl"
              :href="author.youtubeUrl"
              target="_blank"
              :class="[linkColor, 'underline']"
            >
              YouTube
            </a>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
