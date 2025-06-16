<script setup>
import FeaturedWebinarCard from "@/components/core/FeaturedWebinarCard.vue"
import PastWebinarCard from "@/components/core/PastWebinarCard.vue"

const props = defineProps({
  liveWebinars: {
    type: Array,
    required: false,
    default: () => []
  },
  upcomingWebinars: {
    type: Array,
    required: false,
    default: () => []
  },
  pastWebinars: {
    type: Array,
    required: false,
    default: () => []
  },
  heading: {
    type: Object,
    required: false
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
if (props.liveWebinars.length > 0) {
  featuredWebinar = props.liveWebinars[0];
} else if (props.upcomingWebinars.length > 0) {
  featuredWebinar = props.upcomingWebinars[0];
} else if (props.pastWebinars.length > 0) {
  featuredWebinar = props.pastWebinars[0];
}

// For right side: up to 2 past webinars, excluding the featured one if it's from past
let rightPastWebinars = [];
if (props.pastWebinars.length > 0) {
  rightPastWebinars = props.pastWebinars
    .filter(w => !featuredWebinar || w.id !== featuredWebinar.id)
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, 2);
}
</script>

<template>
  <section v-if="featuredWebinar">
    <div class="container px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 py-16 lg:py-20 mx-auto ">
      <div class="flex flex-row h-full flex-1 gap-8 items-stretch justify-between">
        <!-- Featured Webinar (left side - 70%) -->
        <div class="flex flex-col gap-8 basis-[70%]">
          <FeaturedWebinarCard :webinar="featuredWebinar" class="h-full" />
        </div>

        <!-- Past Webinars (right side - 30%) -->
        <div class="hidden lg:flex flex-col gap-10 basis-[30%]">
          <template v-for="webinar in rightPastWebinars" :key="webinar.id">
            <div v-if="isWebinarPast(webinar)" class="rounded-lg relative overflow-hidden h-full">
              <a :href="`/webinars/${webinar.slug}`" class="cursor-pointer h-full">
                <div class="aspect-video bg-gray-200">
                  <img src="https://img.youtube.com/vi/4VwuC1tpRP4/hqdefault.jpg" alt="Webinar Thumbnail"
                    class="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300" />
                </div>

                <!-- Background Gradient -->
                <div
                  class="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#6A76E3] via-blue-900/60 via-blue-800/25 to-transparent z-20 pointer-events-none">
                </div>

                <!-- Content Overlay -->
                <div class="absolute inset-0 z-30 flex flex-col justify-between p-2 pointer-events-none">
                  <div class="self-end"></div>
                  <div class="self-start w-full">
                    <div class="bg-opacity-50 rounded p-1">
                      <h3 class="text-base font-semibold mb-0 line-clamp-2 text-white">
                        {{ webinar.title }}
                      </h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>


            <PastWebinarCard v-else :webinar="webinar" sourceKey="past" class="h-full flex-1 min-h-0"
              style="min-width: 0;" />
          </template>
        </div>

      </div>

    </div>
  </section>
</template>