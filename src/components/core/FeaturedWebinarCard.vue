<script setup>
import { Calendar, Clock, Play, Star } from 'lucide-vue-next';
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import ZoomRegisterForm from '../forms/ZoomRegisterForm.vue';
import { formatDateTimeInET } from '@/utils/getFormattedTime';
import CustomButton from './CustomButton.vue';
const props = defineProps({
  webinar: {
    type: Object,
    required: true
  }
});

// get date and time
const { date, time } = formatDateTimeInET(props.webinar.date)

// 1. Reactive current time
const now = ref(new Date());

// 2. Keep time updated every 30 seconds
let interval;
onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 30000); // every 30 seconds
});

onBeforeUnmount(() => {
  clearInterval(interval);
});

const isLive = computed(() => {
  let start;
  if (props.webinar.date) {
    start = new Date(props.webinar.date);
  } else {
    start = new Date(`${props.webinar.date}`);
  }
  let duration = 60;
  if (props.webinar.duration) {
    const match = props.webinar.duration.match(/\d+/);
    if (match) duration = parseInt(match[0]);
  }
  const end = new Date(start.getTime() + duration * 60000);
  return now.value >= start && now.value <= end;
});

const isUpcoming = computed(() => {
  if (props.webinar.date) {
    const start = new Date(props.webinar.date);
    return start > now.value;
  }
  return false;
});

const shouldRedirect = ref(false);
function handleButtonClick() {
  shouldRedirect.value = true;
}

watch(shouldRedirect, (val) => {
  if (val && props.webinar.slug) {
    window.location.href = `/webinars-videos/${props.webinar.slug}`;
  }
});

const webinarDetails = computed(() => {
  return {
    eventTitle: props.webinar.title,
    eventDate: date,
    eventTime: time,
    email: "",
  };
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-2xl overflow-hidden mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <!-- Left Side: Content -->
      <div class="p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
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
            <div class="text-xs sm:text-sm text-gray-500 font-medium">{{ isLive ? 'LIVE' : webinar.duration }}</div>
          </div>


          <h2
            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight transition-colors duration-300">
            {{ webinar.title }}
          </h2>


          <p class="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-4">
            {{ webinar.description }}
          </p>

          <!-- Event Details -->
          <div class="flex flex-col sm:flex-row sm:items-center  gap-4 mb-3">
            <div class="flex items-center gap-3">
              <Calendar class="w-5 h-5 text-blue-600" />
              <div class="font-semibold text-gray-900">{{ date }}</div>
            </div>
            <div class="flex items-center gap-3">
              <Clock class="w-5 h-5 text-blue-600" />
              <div class="font-semibold text-gray-900">{{ time }}</div>
            </div>
          </div>
        </div>

        <!-- Action Section -->
        <div>
          <!-- What You'll Learn -->
          <div class="mb-6 sm:mb-8 w-full mt-2">
            <div class="flex items-center gap-3 mb-4 sm:mb-4">
              <Star class="w-5 h-5 mb-1 text-purple-600 shrink-0" />
              <h3 class="text-xl sm:text-lg font-bold text-gray-900">What You'll Learn</h3>
            </div>

            <div class="space-y-3 sm:space-y-2  ">
              <div v-for="(item, index) in webinar.objectives" :key="index"
                class="flex items-center gap-3 sm:gap-4 group">
                <div class="w-5 h-5 sm:w-5 sm:h-5 bg-green-200 rounded-full flex items-center justify-center">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-green rounded-full"></div>
                </div>
                <p
                  class="text-sm sm:text-base text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                  {{ item }}
                </p>
              </div>
            </div>
          </div>

          <!-- <template v-if="!isLive || !isUpcoming">
            <a :href="`webinars-videos/${webinar.slug}`"
              class="flex items-center justify-between bg-gray-900 text-white rounded-2xl p-4 sm:p-6 hover:bg-gray-800 transition-colors duration-300 group">
              <div>
                <h3 class="text-base sm:text-lg font-bold mb-1">Watch Recording</h3>
                <p class="text-gray-300 text-xs sm:text-sm">Full session available</p>
              </div>
              <Play class="w-6 h-6 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </template> -->
        </div>
      </div>

      <!-- Right Side: Learning Points & Visual -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        <div class="flex flex-col justify-center items-center h-full">

          <!-- Visual Element for Past Webinars -->
          <template v-if="!isLive && !isUpcoming">
            <div class="flex items-start justify-center mb-6 sm:mb-8 w-full">
              <div class="relative group cursor-pointer w-full max-w-[500px] sm:max-w-[700px]">
                <div class="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <a :href="`/webinars-videos/${webinar.slug}`" class="cursor-pointer h-full">
                    <div class="aspect-video bg-gray-200">
                      <img :src="webinar?.image?.url" :alt="webinar?.title"
                        class="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </template>

          <!-- Visual Element for Live/Upcoming Webinars -->
          <template v-else>
            <div class="flex items-start justify-center mb-6 sm:mb-8 w-full">
              <div class="relative group w-full max-w-[500px] sm:max-w-[700px] overflow-hidden rounded-2xl shadow-xl">
                <img :src="webinar?.image?.url" :alt="webinar?.title"
                  class="w-full h-auto object-cover transition-transform" />
              </div>
            </div>
          </template>
          <template v-if="isLive || isUpcoming">
            <!-- <ZoomRegisterForm buttonVariant="primary" direction="col" :buttonOnClick="handleButtonClick"
              :popupDetails="webinarDetails" />
            <p class="text-xs  text-gray-500 mt-2">
              Note: By registering, you consent to receive emails regarding this event recording and related product
              updates.
            </p> -->
            <a :href="`/webinars-videos/${webinar.slug}`">
              <CustomButton variant="primary" type="submit">
                Register
              </CustomButton>
            </a>
          </template>
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