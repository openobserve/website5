<script setup>
import FeaturedWebinarCard from "@/components/core/FeaturedWebinarCard.vue";
import PastWebinarCard from "@/components/core/PastWebinarCard.vue";
import {
  isWebinarLive,
  isWebinarFuture,
  isWebinarPast,
} from "@/utils/webinarHelpers";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  liveWebinars: {
    type: Array,
    required: false,
    default: () => [],
  },
  upcomingWebinars: {
    type: Array,
    required: false,
    default: () => [],
  },
  pastWebinars: {
    type: Array,
    required: false,
    default: () => [],
  },
  heading: {
    type: Object,
    required: false,
  },
});
// ⏱️ Reactive `now` to track time-based changes
const now = ref(new Date());
let interval;
onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 30000); // every 30 seconds
});
onBeforeUnmount(() => {
  clearInterval(interval);
});

// 🔁 Filter with reactive time reference
const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

const featuredWebinar = computed(() =>
  props.liveWebinars[0] ||
  props.upcomingWebinars[0] ||
  [...props.pastWebinars].sort(sortByDateDesc)[0] ||
  null
);

</script>

<template>
  <section v-if="featuredWebinar">
    <div
      class="container px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-40 py-16 lg:py-20 mx-auto"
    >
      <FeaturedWebinarCard :webinar="featuredWebinar" class="h-full" />
    </div>
  </section>
</template>