<template>
  <PastWebinarSection v-if="pastWebinars.length > 0" :pastWebinars="pastWebinars" :heading="pastWebinarHeading"
    sourceKey="past" />
</template>

<script setup>
import PastWebinarSection from "@/components/core/PastWebinarSection.vue";

const props = defineProps({
  allWebinars: {
    type: Array,
    required: true
  }
});

const now = new Date();

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

const pastWebinars = props.allWebinars.filter(isWebinarPast);

const pastWebinarHeading = {
  title: "Past Webinars",
  description: "Catch up on our previous webinars to stay updated on the latest trends and best practices in observability.",
};
</script>
