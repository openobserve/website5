<script setup>
import { Calendar, Clock, Play, Star } from 'lucide-vue-next';
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
    <div class="hero-gradient p-6 text-white">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
            <Play class="w-4 h-4" />
          </div>
          <div>
            <h2 class="text-2xl font-bold">{{ webinar.title }}</h2>
            <p class="text-white/90">{{ webinar.subtitle }}</p>
          </div>
        </div>
        <span :class="isLive ? 'bg-red-600' : 'bg-green-600'" class="text-white px-3 py-1 rounded-full text-sm">
          {{ isLive ? 'LIVE' : 'Upcoming' }}
        </span>
      </div>
    </div>
    <div class="p-6">
      <div class="flex items-center space-x-6 mb-4 text-gray-600">
        <div class="flex items-center space-x-2">
          <Calendar class="w-4 h-4" />
          <span>{{ date }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <Clock class="w-4 h-4" />
          <span>{{ time }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <Clock class="w-4 h-4" />
          <span>{{ webinar.duration }}</span>
        </div>
      </div>
      <p class="text-gray-700 mb-6">
        {{ webinar.description }}
      </p>
      <div class="mb-6">
        <div class="flex items-center space-x-2 mb-4">
          <Star class="w-5 h-5 text-purple-600" />
          <h3 class="text-lg font-semibold text-gray-900">What You'll Learn</h3>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          <div v-for="(item, index) in webinar.learnings" :key="index" class="flex items-center space-x-2">
            <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <span class="text-gray-700">{{ item }}</span>
          </div>
        </div>
      </div>
      <div>
        <template v-if="isUpcoming">
          <SubscriptionForm buttonVariant="primary" :buttonOnClick="handleButtonClick" />
          <p class="text-xs text-gray-500 mt-2">
            Note: By registering, you consent to receive emails regarding this event recording and related product
            updates.
          </p>
        </template>
      </div>
    </div>
  </div>
</template>