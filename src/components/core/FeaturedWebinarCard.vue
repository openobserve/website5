<script setup>
import { Calendar, Clock, Play, Star, Timer } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import SubscriptionForm from '../forms/SubscriptionForm.vue';
import { formatDateTimeInET } from '@/utils/getFormattedTime';

const props = defineProps({
  webinar: {
    type: Object,
    required: true
  }
});

const { date, time } = formatDateTimeInET(props.webinar.date)

// Compute if the webinar is live
const isLive = computed(() => {
  const now = new Date();
  let start;
  if (props.webinar.startTime) {
    start = new Date(props.webinar.startTime);
  } else {
    start = new Date(`${props.webinar.date} ${props.webinar.time}`);
  }
  // Extract duration in minutes (handles "60 min" or "45 minutes")
  let duration = 60;
  if (props.webinar.duration) {
    const match = props.webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now >= start && now <= end;
});

// Add isUpcoming computed
const isUpcoming = computed(() => {
  if (props.webinar.startTime) {
    const now = new Date();
    const start = new Date(props.webinar.startTime);
    return start > now;
  }
  return false;
});

// --- Only call redirect after successful registration ---
const shouldRedirect = ref(false);
function handleButtonClick() {
  shouldRedirect.value = true;
}

// Watch for shouldRedirect and perform redirect if true
import { watch } from 'vue';
watch(shouldRedirect, (val) => {
  if (val && props.webinar.slug) {
    window.location.href = `/webinars/${props.webinar.slug}`;
  }
});
</script>

<template>
  <div class="flex flex-col bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden w-full">
    <div>

    </div>
    <div class="hero-gradient p-6 text-white">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center space-x-4">
          <a :href="`/webinars/${webinar.slug}`" class="no-underline hover:underline focus:underline outline-none"
            tabindex="0">
            <h2 class="text-2xl font-bold">{{ webinar.title }}</h2>
          </a>
        </div>
        <span :class="isLive ? 'bg-red-600' : (isUpcoming ? 'bg-green-600' : 'bg-gray-600')"
          class="text-white px-3 py-1 rounded-full text-sm self-start sm:self-auto">
          {{ isLive ? 'LIVE' : (isUpcoming ? 'Upcoming' : 'Past') }}
        </span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-6">
      <!-- Date, Time, Duration -->
      <div class="flex flex-col md:flex-row items-start space-y-2 space-x-6 mb-4 text-gray-600">
        <div class="flex items-center space-x-2">
          <Calendar class="w-4 h-4" />
          <span>{{ date }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <Clock class="w-4 h-4" />
          <span>{{ time }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <Timer class="h-4 w-4" />
          <span>{{ webinar.duration }}</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-700 mb-6">{{ webinar.description }}</p>

      <!-- Learnings -->
      <div class="mb-6">
        <div class="flex items-center space-x-2 mb-4">
          <Star class="w-5 h-5 text-purple-600" />
          <h3 class="text-lg font-semibold text-gray-900">What You'll Learn</h3>
        </div>
        <div class="grid md:grid-cols-1 gap-3">
          <div v-for="(item, index) in webinar.learnings" :key="index" class="flex items-center space-x-2">
            <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-primary-green rounded-full"></div>
            </div>
            <span class="text-gray-700">{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- Conditional Section -->
      <div>
        <!-- Show subscription form if LIVE or UPCOMING -->
        <template v-if="isLive || isUpcoming">
          <SubscriptionForm buttonVariant="primary" :buttonOnClick="handleButtonClick" />
          <p class="text-xs text-gray-500 mt-2">
            Note: By registering, you consent to receive emails regarding this event recording and related product
            updates.
          </p>
        </template>

        <!-- Show Video Thumbnail if PAST -->
        <template v-else>
          <div class="max-w-xs">
            <div class="border border-gray-200 rounded-lg p-0 flex flex-col relative overflow-hidden"
              style="aspect-ratio: 16/9;">
              <!-- Layer 1: YouTube Video Embed -->
              <div class="absolute inset-0 z-10 pointer-events-none">
                <iframe class="w-full h-full rounded-lg pointer-events-none"
                  :src="`https://www.youtube.com/embed/4VwuC1tpRP4?si=sQl7Un-qZ4aqUJEg`" title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
              </div>

              <!-- Layer 2: Background gradient overlay -->
              <div
                class="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#6A76E3] via-blue-900/60 via-blue-800/25 to-transparent z-20 rounded-lg pointer-events-none">
              </div>

              <!-- Layer 3: Content overlay -->
              <div class="absolute inset-0 z-30 flex flex-col justify-between p-2 pointer-events-none">
                <!-- Duration Badge -->
                <div class="self-end">
                </div>
                <!-- Title Overlay -->
                <div class="self-start w-full">
                  <div class="bg-opacity-50 rounded p-1">
                    <h3 class="text-base font-semibold mb-0 line-clamp-2 text-white">
                      {{ webinar.title }}
                    </h3>
                  </div>
                </div>
              </div>

              <!-- Layer 4: Clickable overlay -->
              <a :href="`https://www.youtube.com/watch?v=4VwuC1tpRP4`" target="_blank" rel="noopener noreferrer"
                class="absolute inset-0 z-40" style="display: block; pointer-events: auto;"
                aria-label="Watch on YouTube"></a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
