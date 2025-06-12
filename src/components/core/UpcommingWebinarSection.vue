<script setup>
import FeaturedWebinarCard from "@/components/core/FeaturedWebinarCard.vue"
import UpcomingWebinarCard from "@/components/core/UpcommingWebinarCard.vue"

const props = defineProps({
  upcomingWebinars: {
    type: Array,
    required: true
  }
});

// Select first 3 items
const firstThree = props.upcomingWebinars.slice(0, 3);

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

// Find live webinar in first three
const liveWebinar = firstThree.find(isWebinarLive);

// Prepare arrays for rendering
const featuredWebinar = liveWebinar || firstThree[0];
const otherWebinars = firstThree.filter(w => w !== featuredWebinar);
</script>

<template>
  <section class="py-16 px-4">
    <div class="container mx-auto ">
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Featured Webinar -->
        <div class="flex">
          <FeaturedWebinarCard :webinar="featuredWebinar" />
        </div>

        <!-- Other Upcoming Webinars -->
        <div class="flex flex-col space-y-6">
          <UpcomingWebinarCard v-for="webinar in otherWebinars" :key="webinar.id" :webinar="webinar" />
        </div>
      </div>
    </div>
  </section>
</template>