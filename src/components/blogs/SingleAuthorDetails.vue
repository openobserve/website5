<script setup lang="ts">
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
      }
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
});

const redirectToAuthor = (slug: string) => {
  if (slug) {
    window.location.assign(`/author/${slug}`);
  }
};
</script>

<template>
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 w-full">
    <p class="text-white px-2 py-2">About the Authors</p>
    <div class="flex flex-col space-y-4">
      <div
        v-for="author in authors"
        :key="author.id"
        :class="[cardBgColor, 'rounded-xl overflow-hidden flex md:flex-row']"
      >
        <!-- Left Side - Profile Image -->
        <div
          class="w-full md:w-1/6 h-44 md:h-auto relative flex items-center justify-center bg-gray-800"
        >
          <img
            v-if="author.image.url"
            :src="author.image.url"
            :alt="author.name"
            class="w-full h-full object-cover absolute inset-0"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-white">
            No Image
          </div>
        </div>

        <!-- Right Side - Content -->
        <div class="w-full md:w-2/3 p-6 h-44 flex flex-col justify-between cursor-pointer"@click="redirectToAuthor(author.slug)">
          <div>
            <h3
              :class="[titleTextColor, 'text-xl font-bold mb-3 underline cursor-pointer']"
              @click="redirectToAuthor(author.slug)"
            >
              {{ author.name }}
            </h3>
            <p
              class="mb-4 text-sm break-words line-clamp-3"
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
      </div>
    </div>
  </section>
</template>
