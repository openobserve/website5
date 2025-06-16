<template>
  <section class="py-12 md:py-16 mb-6 hero-gradient">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-full items-center justify-center">
        <article class="">
          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-4">
            <a v-for="tag in tags" :key="tag.slug" :href="`/${type}/tag/${tag.slug}/`"
              class="px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 backdrop-blur-sm capitalize">
              {{ tag.name }}
            </a>
          </div>

          <!-- Title -->
          <h1 class="text-xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white">
            {{ title }}
          </h1>
          <p class="text-white text-lg mb-6">{{ description }}</p>
          <!-- Webinar Info & Social Sharing -->
          <div class="flex flex-col justify-between items-start gap-4">
            <div class="flex items-center flex-wrap gap-3">
              <div class="flex flex-col">
                <div class="flex flex-wrap gap-4 text-white text-lg w-full xl:justify-between">
                  <div class="flex items-center gap-1">
                    <Calendar class="h-4 w-4" />
                    <!-- <span>{{ formatPublishDate(publishDate) }}</span> -->
                    <span>{{ date }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Clock class="h-4 w-4" />
                    <!-- <span>{{ getLocalTimeWithAbbreviation(time) }}</span> -->
                    <span>{{ time }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Timer class="h-4 w-4" />
                    <span>{{ duration }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- registration From -->
            <div v-show="isUpcoming" class="w-3/4">
              <SubscriptionForm :popupDetails="webinarDetails" button-variant="secondary" />
              <h4 class="text-white/90 text-sm my-2">
                Note: By registering, you consent to receive emails regarding this event recording and related product
                updates.
              </h4>
            </div>
            <!-- Social Icons -->
            <div class="flex gap-2 items-center text-white/90">
              <span>Share:</span>
              <a v-for="(item, index) in socialMedia" :key="index" :href="item.href" target="_blank" rel="noopener"
                class="rounded-full bg-white/10 w-8 h-8 hover:bg-white/20 flex items-center justify-center"
                :aria-label="item.ariaLabel">
                <img :src="item.icon" :alt="item.alt" class="w-4 h-4" />
              </a>
              <button @click="copyToClipboard" :class="[
                'rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 cursor-pointer',
                'bg-white/10 hover:bg-white/20',
                copied ? 'ring-2 ring-white' : '',
              ]" :title="copied ? 'Copied!' : 'Copy link'" aria-label="Copy link">
                <img src="/img/icon/link-icon-for-blog.svg" alt="Copy" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>
        <div class="aspect-video border border-white/10 rounded-xl backdrop-blur-lg p-4 bg-white/10">
          <iframe :class="`w-full h-full`" src="https://www.youtube.com/embed/QvgyHU3_wME?si=Ute7fsnMLwkIL9ZS&rel=0"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="rounded-xl"></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getInitials } from "@/utils/getInitials";
import { Calendar, Clock, Globe, Timer } from "lucide-vue-next";
import { ref, computed } from "vue";
import { formatPublishDate } from "@/utils/formatPublishDate";
import { getLanguageFullName } from "@/utils/getLanguageFullName";
import {
  getTimeInZones,
  getLocalTimeWithAbbreviation,
  formatDateTimeInET,
} from "@/utils/getFormattedTime";
import SubscriptionForm from "../forms/SubscriptionForm.vue";
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
  duration: string;
  language: string;
  shareUrl: string;
  time: string;
}>();
const { date, time } = formatDateTimeInET(props.publishDate);
const zoneTimes = computed(() => getTimeInZones(props.time));
// Convert to Date
const isUpcoming = computed(() => {
  const now = new Date(); // current date object
  const eventDate = new Date(props.publishDate); // convert to date
  // console.log(eventDate > now, "eventDate > now", props.publishDate, now);
  return eventDate > now;
});

const webinarDetails = computed(() => {
  return {
    eventTitle: props.title,
    eventDate: date,
    eventTime: time,
    email: "",
  };
});
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
