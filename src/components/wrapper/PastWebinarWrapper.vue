<template>
  <PastWebinarSection
    v-if="pastWebinars.length > 0"
    :pastWebinars="pastWebinars"
    :heading="pastWebinarHeading"
    sourceKey="past"
  />
</template>

<script setup>
import PastWebinarSection from "@/components/core/PastWebinarSection.vue";
import { isWebinarPast } from "@/utils/webinarHelpers";
import { ref, onBeforeUnmount, onMounted, computed } from "vue";
const props = defineProps({
  allWebinars: {
    type: Array,
    required: true,
  },
});
// 1. Reactive current time to keep checking status
const now = ref(new Date());
let interval;
onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 30000); // check every 30 seconds
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
// 2. Computed to update filtered past webinars whenever time or props change
const pastWebinars = computed(() => {
  return [...props.allWebinars]
    .filter((w) => isWebinarPast(w, now.value))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});

const pastWebinarHeading = {
  title: "Past Webinars",
  description:
    "Catch up on our previous webinars to stay updated on the latest trends and best practices in observability.",
};
</script>
