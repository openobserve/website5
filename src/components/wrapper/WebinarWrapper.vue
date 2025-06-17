--- // src/components/core/WebinarWrapper.vue
<script setup>
import UpcommingWebinarSection from "@/components/core/UpcommingWebinarSection.vue";
import CustomSection from "../core/CustomSection.vue";
import {
  isWebinarLive,
  isWebinarFuture,
  isWebinarPast,
} from "@/utils/webinarHelpers";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  allWebinars: {
    type: Array,
    required: true,
  },
});
//  Track current time reactively
const now = ref(new Date());
let interval;
onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 30000); // update every 30 sec
});
onBeforeUnmount(() => {
  clearInterval(interval);
});

// Computed webinar categories based on current time
const liveWebinars = computed(() =>
  props.allWebinars.filter((w) => isWebinarLive(w, now.value))
);
const upcomingWebinars = computed(() =>
  props.allWebinars.filter((w) => isWebinarFuture(w, now.value))
);
const pastWebinars = computed(() =>
  props.allWebinars.filter((w) => isWebinarPast(w, now.value))
);

const upcomingWebinarHeading = {
  title: "Upcoming Webinars",
  description:
    "Join our live webinars to learn about the latest in observability, log analytics, and more.",
};

const pasWebinarHeading = {
  title: "Past Webinars",
  description:
    "Catch up on our previous webinars to stay updated on the latest trends and best practices in observability.",
};
</script>

<template>
  <!-- Always pass all three arrays to UpcommingWebinarSection -->
  <UpcommingWebinarSection
    :liveWebinars="liveWebinars"
    :upcomingWebinars="upcomingWebinars"
    :pastWebinars="pastWebinars"
    :heading="upcomingWebinarHeading"
  />
</template>
