<script setup>
import FeaturedWebinarCard from "@/components/core/FeaturedWebinarCard.vue"
import PastWebinarCard from "@/components/core/PastWebinarCard.vue"

const props = defineProps({
  upcomingWebinars: {
    type: Array,
    required: true
  },
  pastWebinars: {
    type: Array,
    required: false,
    default: () => []
  }
});

// Helper to check if a webinar is live
function isWebinarLive(webinar) {
  if (!webinar.startTime) return false;
  const now = new Date();
  const start = new Date(webinar.startTime);
  let duration = 60;
  if (webinar.duration) {
    const match = webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now >= start && now <= end;
}

// Helper to check if a webinar is in the future (not started yet)
function isWebinarFuture(webinar) {
  if (!webinar.startTime) return false;
  const now = new Date();
  const start = new Date(webinar.startTime);
  return start > now;
}

// Helper to check if a webinar is in the past
function isWebinarPast(webinar) {
  if (!webinar.startTime) return true;
  const now = new Date();
  const start = new Date(webinar.startTime);
  let duration = 60;
  if (webinar.duration) {
    const match = webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now > end;
}

// Find the first live webinar
const liveWebinar = props.upcomingWebinars.find(isWebinarLive);

// If no live, find the next upcoming webinar (future)
const upcomingWebinar = !liveWebinar
  ? props.upcomingWebinars.find(isWebinarFuture)
  : null;

// If neither, find up to 3 most recent past webinars
let fallbackPast = [];
if (!liveWebinar && !upcomingWebinar && props.pastWebinars.length > 0) {
  fallbackPast = [...props.pastWebinars]
    .filter(isWebinarPast)
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
}

let featuredWebinar = null;
if (liveWebinar) {
  featuredWebinar = liveWebinar;
} else if (upcomingWebinar) {
  featuredWebinar = upcomingWebinar;
} else if (fallbackPast.length > 0) {
  featuredWebinar = fallbackPast;
}

// For right side: up to 2 past webinars, excluding the featured one if it's from past
let rightPastWebinars = [];
if (!liveWebinar && !upcomingWebinar && fallbackPast.length > 1) {
  rightPastWebinars = fallbackPast.slice(1, 3);
} else if (props.pastWebinars.length > 0 && (liveWebinar || upcomingWebinar)) {
  rightPastWebinars = [...props.pastWebinars]
    .filter(isWebinarPast)
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, 2);
}

console.log("Featured Webinar:", featuredWebinar);
</script>

<template>
  <section v-if="featuredWebinar">
    <div class="container px-4 sm:px-6 lg:px-8 xl:px-40 py-16 lg:py-20 mx-auto ">
      <div class="flex flex-row h-full flex-1 gap-8 items-stretch">
        <!-- Featured Webinar (take remaining space) -->
        <div class="flex flex-col gap-8 min-w-0">
          <FeaturedWebinarCard :webinar="featuredWebinar" class="h-full flex-1" />
        </div>
        <!-- Past Webinars on the right (fixed 16:9 ratio) -->
        <div class="flex flex-col gap-8 h-full" style="width: 360px; max-width: 40vw;">
          <template v-for="webinar in rightPastWebinars" :key="webinar.id">
            <div v-if="isWebinarPast(webinar)"
              class="bg-white border border-gray-200 rounded-lg p-0 h-full flex flex-col"
              style="aspect-ratio: 16/9; min-width: 0;">
              <!-- Top part: video/gradient area -->
              <div
                :class="`h-40 w-full bg-gradient-to-r ${webinar.gradient} flex items-center justify-center relative overflow-hidden rounded-t-lg`"
                style="aspect-ratio: 16/9;">
                <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-400 text-sm">Video Thumbnail</span>
                  </div>
                </div>
                <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  {{ webinar.duration }}
                </div>
              </div>
              <!-- Title -->
              <div class="p-6 flex-1 flex flex-col justify-center">
                <h3 class="text-lg font-bold text-gray-900 mb-0 line-clamp-2">
                  {{ webinar.title }}
                </h3>
              </div>
            </div>
            <PastWebinarCard v-else :webinar="webinar" sourceKey="past" class="h-full flex-1"
              style="aspect-ratio: 16/9; min-width: 0;" />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>