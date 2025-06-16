<script setup>
import { Calendar, Clock, Play, Star, Timer, ArrowRight, Users, BookOpen, CheckCircle } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import SubscriptionForm from '../forms/SubscriptionForm.vue';
import { formatDateTimeInET } from '@/utils/getFormattedTime';

const props = defineProps({
  webinar: {
    type: Object,
    required: true
  }
});

const { date, time } = formatDateTimeInET(props.webinar.date)

const isLive = computed(() => {
  const now = new Date();
  let start;
  if (props.webinar.startTime) {
    start = new Date(props.webinar.startTime);
  } else {
    start = new Date(`${props.webinar.date} ${props.webinar.time}`);
  }
  let duration = 60;
  if (props.webinar.duration) {
    const match = props.webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now >= start && now <= end;
});

const isUpcoming = computed(() => {
  if (props.webinar.startTime) {
    const now = new Date();
    const start = new Date(props.webinar.startTime);
    return start > now;
  }
  return false;
});

const shouldRedirect = ref(false);
function handleButtonClick() {
  shouldRedirect.value = true;
}

watch(shouldRedirect, (val) => {
  if (val && props.webinar.slug) {
    window.location.href = `/webinars/${props.webinar.slug}`;
  }
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-2xl overflow-hidden max-w-6xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
      <!-- Left Side: Content -->
      <div class="p-4 sm:p-6 lg:p-12 flex flex-col justify-between">
        <!-- Header -->
        <div>
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full" :class="{
                'bg-red-500 animate-pulse': isLive,
                'bg-green-500': isUpcoming,
                'bg-gray-400': !isLive && !isUpcoming
              }"></div>
              <span class="text-xs sm:text-sm font-semibold uppercase tracking-wider" :class="{
                'text-red-600': isLive,
                'text-green-600': isUpcoming,
                'text-gray-600': !isLive && !isUpcoming
              }">
                {{ isLive ? 'Live Now' : (isUpcoming ? 'Upcoming' : 'Recorded') }}
              </span>
            </div>
            <div class="text-xs sm:text-sm text-gray-500 font-medium">{{ webinar.duration }}</div>
          </div>

          <a :href="`/webinars/${webinar.slug}`" class="block group mb-4 sm:mb-6">
            <h1
              class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
              {{ webinar.title }}
            </h1>
          </a>

          <p class="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8">
            {{ webinar.description }}
          </p>

          <!-- Event Details -->
          <div class="flex flex-col gap-4 mb-6 sm:mb-8">
            <div class="bg-gray-50 rounded-2xl p-4">
              <div class="flex items-center gap-3">
                <Calendar class="w-5 h-5 text-blue-600" />
                <div>
                  <div class="text-xs sm:text-sm text-gray-500">Date</div>
                  <div class="font-semibold text-gray-900">{{ date }}</div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 rounded-2xl p-4">
              <div class="flex items-center gap-3">
                <Clock class="w-5 h-5 text-blue-600" />
                <div>
                  <div class="text-xs sm:text-sm text-gray-500">Time</div>
                  <div class="font-semibold text-gray-900">{{ time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Section -->
        <div>
          <template v-if="isLive || isUpcoming">
            <SubscriptionForm buttonVariant="primary" :buttonOnClick="handleButtonClick" :eventTitle="webinar.title"
              :eventDate="date" :eventTime="time" :email="webinar.email" />
          </template>

          <template v-else>
            <a :href="`https://www.youtube.com/watch?v=4VwuC1tpRP4`" target="_blank"
              class="flex items-center justify-between bg-gray-900 text-white rounded-2xl p-4 sm:p-6 hover:bg-gray-800 transition-colors duration-300 group">
              <div>
                <h3 class="text-base sm:text-lg font-bold mb-1">Watch Recording</h3>
                <p class="text-gray-300 text-xs sm:text-sm">Full session available</p>
              </div>
              <Play class="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </template>
        </div>
      </div>

      <!-- Right Side: Learning Points & Visual -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-12 flex flex-col justify-center">
        <div class="flex flex-col justify-center items-center h-full">
          <!-- Visual Element for Past Webinars -->
          <template v-if="!isLive && !isUpcoming">
            <div class="flex items-start justify-center mb-6 sm:mb-8 w-full">
              <div class="relative group cursor-pointer w-full max-w-[320px] sm:max-w-[400px]">
                <div class="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <iframe class="w-full h-full" :src="`https://www.youtube.com/embed/4VwuC1tpRP4?si=sQl7Un-qZ4aqUJEg`"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                  </iframe>
                </div>
                <div
                  class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl flex items-center justify-center">
                  <div
                    class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                    <Play class="w-4 h-4" />
                    <span class="font-medium text-sm">Open in YouTube</span>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Stats for Live/Upcoming -->
          <template v-else>
            <div class="flex items-center justify-center mb-6 sm:mb-8">
              <div class="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                  <div class="text-xl sm:text-2xl font-bold text-blue-600">{{ isLive ? 'LIVE' : '60' }}</div>
                  <div class="text-xs sm:text-sm text-gray-600">{{ isLive ? 'Now' : 'Minutes' }}</div>
                </div>
                <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center">
                  <div class="text-xl sm:text-2xl font-bold text-green-600">Free</div>
                  <div class="text-xs sm:text-sm text-gray-600">Access</div>
                </div>
              </div>
            </div>
          </template>

          <!-- What You'll Learn -->
          <div class="mb-6 sm:mb-8 w-full">
            <div class="flex items-center gap-3 mb-4 sm:mb-6">
              <Calendar class="w-5 h-5 sm:w-6 sm:h-6" />
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Key Takeaways</h2>
            </div>

            <div class="space-y-3 sm:space-y-4">
              <div v-for="(item, index) in webinar.learnings" :key="index"
                class="flex items-start gap-3 sm:gap-4 group">
                <div class="w-5 h-5 sm:w-6 sm:h-6 bg-green-200 rounded-full flex items-center justify-center">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-green rounded-full"></div>
                </div>
                <p
                  class="text-sm sm:text-base text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>