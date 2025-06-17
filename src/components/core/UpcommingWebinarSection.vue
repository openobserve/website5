<script setup>
import FeaturedWebinarCard from "@/components/core/FeaturedWebinarCard.vue"
import PastWebinarCard from "@/components/core/PastWebinarCard.vue"
import { isWebinarLive, isWebinarFuture, isWebinarPast } from '@/utils/webinarHelpers';
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
    .sort((a, b) => new Date(b.date) - new Date(a.date))
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
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);
}
</script>

<template>
  <section v-if="featuredWebinar">
    <div class="container px-4 sm:px-6 lg:px-8 xl:px-20 py-16 lg:py-20 mx-auto ">
      <FeaturedWebinarCard :webinar="featuredWebinar" class="h-full" />
    </div>
  </section>
</template>