---
// src/components/core/WebinarWrapper.vue
<script setup>
import UpcommingWebinarSection from "@/components/core/UpcommingWebinarSection.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  allWebinars: {
    type: Array,
    required: true
  }
});

const now = new Date();

function isWebinarLive(webinar) {
  if (!webinar.startTime) return false;
  const start = new Date(webinar.startTime);
  let duration = 60;
  if (webinar.duration) {
    const match = webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now >= start && now <= end;
}

function isWebinarFuture(webinar) {
  if (!webinar.startTime) return false;
  const start = new Date(webinar.startTime);
  return start > now;
}

function isWebinarPast(webinar) {
  if (!webinar.startTime) return true;
  const start = new Date(webinar.startTime);
  let duration = 60;
  if (webinar.duration) {
    const match = webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now > end;
}

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