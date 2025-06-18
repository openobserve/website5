<template>
  <section class="w-full">
    <h5 class="text-base lg:text-lg font-medium mb-2">
      {{ author?.length > 1 ? "About the Authors" : "About the Author" }}
    </h5>
    <div class="space-y-4 flex flex-col w-full">
      <a v-for="(authorItem, index) in author" :key="index" :href="generateAuthorLink(type, authorItem.slug)"
        class="rounded-xl border border-primary-blue/20 bg-light-gray/50">
        <div class="p-2 lg:p-6">
          <div class="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <div class="w-20  shrink-0 rounded-full overflow-hidden border-2 border-primary-blue"
              v-if="authorItem.image?.url">
              <img :src="authorItem.image?.url" :alt="authorItem.name" class="h-full w-full object-cover" />
            </div>
            <div
              class="w-20 h-20 shrink-0 rounded-full overflow-hidden hero-gradient flex items-center justify-center text-white font-semibold"
              v-else>
              {{ getInitials(authorItem.name) }}
            </div>
            <div class="flex flex-col gap-2 w-full">
              <div class="flex flex-row justify-between items-center">
                <h3 class="text-base md:text-xl font-bold mb-1">
                  {{ authorItem.name }}
                </h3>
                <!-- Social Icons -->
                <div class="flex gap-2 items-center">
                  <a v-for="(item, index) in socialMedia" :key="index" href="" target="_blank" rel="noopener"
                    class="rounded-full bg-gray-800/10 w-8 h-8 hover:bg-gray-800/20 flex items-center justify-center"
                    :aria-label="item.ariaLabel">
                    <img :src="item.icon" :alt="item.alt" class="w-4 h-4" />
                  </a>
                </div>
              </div>
              <p class="text-sm md:text-base text-muted-foreground">
                {{ authorItem.bio }}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Author } from "@/types/blog";
import { ref } from "vue";
import { generateAuthorLink } from "@/utils/redirection";
import { getInitials } from "@/utils/getInitials";
const props = defineProps<{
  author: Author[];
  type: string;
}>();

const socialMedia = ref([
  {
    name: "twitter",
    href: `${props.author?.twitterUrl}`,
    icon: "/img/icon/twitter-icon-webinar-individual.svg",
    alt: "Twitter",
    ariaLabel: "Share on Twitter",
  },
  {
    name: "linkedin",
    href: `${props.author?.linkedinUrl}`,
    icon: "/img/icon/linkdin-icon-for-webinar.svg",
    alt: "LinkedIn",
    ariaLabel: "Share on LinkedIn",
  },
  {
    name: "facebook",
    href: `${props.author?.instagramUrl}`,
    icon: "/img/icon/facebook-icon-for-webinar.svg",
    alt: "Facebook",
    ariaLabel: "Share on Facebook",
  },
]);
</script>
