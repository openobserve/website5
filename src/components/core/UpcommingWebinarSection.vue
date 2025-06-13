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
              class="border border-gray-200 rounded-lg p-0 h-full flex flex-col relative overflow-hidden"
              style="aspect-ratio: 16/9;">

              <!-- Layer 1: YouTube Video Embed (Bottom layer) -->
              <div class="absolute inset-0 z-10">
                <iframe class="w-full h-full rounded-lg"
                  :src="`https://www.youtube.com/embed/4VwuC1tpRP4?si=sQl7Un-qZ4aqUJEg`" title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
              </div>

              <!-- Layer 2: Background overlay image (Middle layer) -->
              <!-- Layer 2: Background gradient overlay (Middle layer) -->
              <div
                class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#6A76E3] via-blue-900/60 via-blue-800/25 to-transparent z-20 rounded-lg">
              </div>


              <!-- Layer 3: Content overlay (Top layer) -->
              <div class="absolute inset-0 z-30 flex flex-col justify-between p-2">
                <!-- Duration Badge (Top right) -->
                <div class="self-end">
                  <span class="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
                    {{ webinar.duration }}
                  </span>
                </div>

                <!-- Title Overlay (Bottom) -->
                <div class="self-start w-full">
                  <!-- Text background for better readability -->
                  <div class=" bg-opacity-50 rounded p-1">
                    <h3 class="text-base font-semibold mb-0 line-clamp-2 text-white">
                      {{ webinar.title }}
                    </h3>
                  </div>
                </div>
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