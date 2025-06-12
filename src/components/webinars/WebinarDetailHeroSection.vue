<template>
  <section class="py-12 md:py-16 mb-6 hero-gradient">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11">
      <article class="">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <a
            v-for="tag in tags"
            :key="tag.slug"
            :href="`/${type}/tag/${tag.slug}/`"
            class="px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 backdrop-blur-sm capitalize"
          >
            {{ tag.name }}
          </a>
        </div>

        <!-- Title -->
        <h1
          class="text-xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white"
        >
          {{ title }}
        </h1>

        <!-- Author Info & Social Sharing -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div class="flex items-center flex-wrap gap-3" v-if="author">
            <div class="flex -space-x-3">
              <div
                v-for="it in author"
                :key="it.name"
                class="relative rounded-full border-2 border-white/80"
              >
                <div
                  class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold"
                >
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

            <div class="flex flex-col">
              <address
                class="not-italic text-white flex flex-wrap items-center gap-1"
              >
                <template
                  v-for="(it, index) in author"
                  :key="`name-${it.name}`"
                >
                  <a
                    :href="`/${type}/author/${it.slug}/`"
                    class="font-medium hover:underline"
                    >{{ it.name }}</a
                  >
                  <span
                    v-if="index < author.length - 1"
                    class="text-white/70 text-xs"
                    >,</span
                  >
                </template>
              </address>
              <div class="flex flex-wrap gap-4 text-white/80 text-sm">
                <div class="flex items-center gap-1">
                  <Calendar class="h-4 w-4" />
                  <span>{{ formatPublishDate(publishDate) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Clock class="h-4 w-4" />
                  <span>{{ availability }}</span>
                </div>
                <div class="flex items-center gap-1">
                 <Globe class="h-4 w-4"/>
                  <span>{{ getLanguageFullName(language) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Icons -->
          <div class="flex gap-2 items-center">
            <a
              v-for="(item, index) in socialMedia"
              :key="index"
              :href="item.href"
              target="_blank"
              rel="noopener"
              class="rounded-full bg-white/10 w-8 h-8 hover:bg-white/20 flex items-center justify-center"
              :aria-label="item.ariaLabel"
            >
              <img :src="item.icon" :alt="item.alt" class="w-4 h-4" />
            </a>
            <button
              @click="copyToClipboard"
              :class="[
                'rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 cursor-pointer',
                'bg-white/10 hover:bg-white/20',
                copied ? 'ring-2 ring-white' : '',
              ]"
              :title="copied ? 'Copied!' : 'Copy link'"
              aria-label="Copy link"
            >
              <img
                src="/img/icon/link-icon-for-blog.svg"
                alt="Copy"
                class="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getInitials } from "@/utils/getInitials";
import { Calendar, Clock, Globe } from "lucide-vue-next";
import { ref } from "vue";
import { formatPublishDate } from "@/utils/formatPublishDate";
import {getLanguageFullName} from "@/utils/getLanguageFullName";
const props = defineProps<{
  type: string;
  title: string;
  description: string;
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
  availability: string;
  language: string;
  shareUrl: string;
}>();
const copied = ref(false);

const apiUrl = import.meta.env.PUBLIC_APP_BASE_URL;
const shareUrl = `${apiUrl}${props.shareUrl}/`;
const copyToClipboard = () => {
  navigator.clipboard.writeText(shareUrl);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
const socialMedia = ref([
  {
    name: "twitter",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      props.title
    )}&url=${encodeURIComponent(shareUrl)}`,
    icon: "/img/icon/twitter-icon-blog-individual.svg",
    alt: "Twitter",
    ariaLabel: "Share on Twitter",
  },
  {
    name: "linkedin",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
    icon: "/img/icon/lkdin-logo.png",
    alt: "LinkedIn",
    ariaLabel: "Share on LinkedIn",
  },
  {
    name: "facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    icon: "/img/icon/fb-logo.png",
    alt: "Facebook",
    ariaLabel: "Share on Facebook",
  },
]);
</script>
