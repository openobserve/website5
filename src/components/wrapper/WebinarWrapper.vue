---
// src/components/core/WebinarWrapper.vue
<script setup>
import UpcommingWebinarSection from "@/components/core/UpcommingWebinarSection.vue";
import CustomSection from "../core/CustomSection.vue";
import { isWebinarLive, isWebinarFuture, isWebinarPast } from '@/utils/webinarHelpers';
const props = defineProps({
  allWebinars: {
    type: Array,
    required: true
  }
});
const liveWebinars = props.allWebinars.filter(isWebinarLive);
const upcomingWebinars = props.allWebinars.filter(isWebinarFuture);
const pastWebinars = props.allWebinars.filter(isWebinarPast);

const upcomingWebinarHeading = {
  title: "Upcoming Webinars",
  description: "Join our live webinars to learn about the latest in observability, log analytics, and more.",
};

const pasWebinarHeading = {
  title: "Past Webinars",
  description: "Catch up on our previous webinars to stay updated on the latest trends and best practices in observability.",
};
</script>

<template>
  <!-- Always pass all three arrays to UpcommingWebinarSection -->
  <UpcommingWebinarSection :liveWebinars="liveWebinars" :upcomingWebinars="upcomingWebinars"
    :pastWebinars="pastWebinars" :heading="upcomingWebinarHeading" />
</template>