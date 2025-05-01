<template>
  <section class="relative py-12 md:py-16 mb-6 overflow-hidden">
    <!-- Gradient background -->
    <div class="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-blue"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11 relative z-10">
      <article class="max-w-7xl mx-auto">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <a
            v-for="tag in tags"
            :key="tag.slug"
            :href="`/${type}/tag/${tag.slug}`"
            class="px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 backdrop-blur-sm capitalize"
          >
            {{ tag.name }}
          </a>
        </div>

        <!-- Title -->
        <header>
          <h1 class="text-xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
            {{ title }}
          </h1>
        </header>

        <!-- Author Info & Social Sharing -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <!-- Author Info -->
          <div class="flex items-center flex-wrap gap-4">
            <!-- Avatars -->
            <div class="flex -space-x-3">
              <div
                v-for="it in author"
                :key="it.name"
                class="relative rounded-full border-2 border-white/80"
              >
                <div class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold">
                  <img
                    v-if="it.image?.url"
                    :src="it.image.url"
                    :alt="it.name"
                    class="h-full w-full object-cover"
                  />
                  <span v-else>{{ getInitials(it.name) }}</span>
                </div>
              </div>
            </div>

            <!-- Author Names -->
            <address class="not-italic text-white flex flex-wrap items-center gap-1">
              <template v-for="(it, index) in author" :key="`name-${it.name}`">
                <span class="font-medium">{{ it.name }}</span>
                <span v-if="index < author.length - 1" class="text-white/70 text-xs">,</span>
              </template>
            </address>
          </div>

          <!-- Social Icons -->
          <nav class="flex gap-2 items-center">
            <a
              :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`"
              target="_blank"
              rel="noopener"
              class="rounded-full bg-white/10 p-2 hover:bg-white/20"
              aria-label="Share on Twitter"
            >
              <img src="/img/icon/twittericon-for-blog.svg" alt="Twitter Icon" class="h-5 w-5" />
            </a>

            <a
              :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`"
              target="_blank"
              rel="noopener"
              class="rounded-full bg-white/10 p-2 hover:bg-white/20"
              aria-label="Share on LinkedIn"
            >
              <img src="/img/icon/linkdinicon-for-blog.svg" alt="LinkedIn Icon" class="h-5 w-5" />
            </a>

            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`"
              target="_blank"
              rel="noopener"
              class="rounded-full bg-white/10 p-2 hover:bg-white/20"
              aria-label="Share on Facebook"
            >
              <img src="/img/icon/facebookicon-for-blog.svg" alt="Facebook Icon" class="h-5 w-5" />
            </a>

            <button
              @click="copyToClipboard"
              class="rounded-full bg-white/10 p-2 hover:bg-white/20"
              :title="copied ? 'Copied!' : 'Copy link'"
              aria-label="Copy link"
            >
              <img src="/img/icon/linkicon-for-blog.svg" alt="Copy Icon" class="h-5 w-5" />
            </button>
          </nav>
        </div>

        <!-- Publish Date and Read Time -->
        <div class="flex flex-wrap gap-4 text-white text-sm mt-4">
          <div class="flex items-center">
            <Calendar class="h-4 w-4 mr-1" />
            <time :datetime="publishDate">{{ publishDate }}</time>
          </div>
          <div class="flex items-center">
            <Clock class="h-4 w-4 mr-1" />
            <span>{{ calculateReadingTime(content) }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>

  <!-- Blog Cover Image -->
  <section class="container mx-auto px-4 mb-6">
    <div class="max-w-7xl mx-auto">
      <figure class="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl">
        <img :src="blogImage" :alt="title" class="object-cover w-full h-full" />
      </figure>
    </div>
  </section>
</template>


<script setup lang="ts">
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import { getInitials } from "@/utils/getInitials";
import { Calendar, Clock } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const props = defineProps<{
  type: string;
  title: string;
  blogImage: string;
  tags: {
    name: string;
    slug: string;
  }[];
  author: {
    name: string;
    image: {
      url: string;
    };
    slug: string;
  }[];
  publishDate: string;
  content: string;
  shareUrl: string;
}>();



const copied = ref(false);

const apiUrl = import.meta.env.PUBLIC_APP_BASE_URL;
const shareUrl = `${apiUrl}${props.shareUrl}`;
const copyToClipboard = () => {
  navigator.clipboard.writeText(shareUrl);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>
