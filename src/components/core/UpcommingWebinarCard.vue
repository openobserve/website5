<script setup>
import { Calendar, Clock, Play } from 'lucide-vue-next'; // Added Play icon
import CustomButton from './CustomButton.vue';

const props = defineProps({
  webinar: {
    type: Object,
    required: true
  }
});

// Compute if the webinar is live
import { computed } from 'vue';

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
</script>

<template>
  <div
    class="flex flex-col bg-white border border-gray-200 rounded-lg transition-shadow overflow-hidden flex-1 h-full group">
    <!-- Video Thumbnail Section -->
    <div class="relative">
      <!-- Video thumbnail with gradient overlay -->
      <div
        :class="`h-40 w-full bg-gradient-to-r ${webinar.gradient} flex items-center justify-center relative overflow-hidden`">
        <!-- Sample video frame (replace with actual thumbnail if available) -->
        <div class="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div class="w-full h-full bg-gray-200 flex items-center justify-center">
            <span class="text-gray-400 text-sm">Video Thumbnail</span>
          </div>
        </div>

        <!-- Play button overlay -->
        <div
          class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="bg-white/90 rounded-full p-3 shadow-lg">
            <Play class="w-6 h-6 text-gray-900 fill-current" />
          </div>
        </div>

        <!-- Date badge -->
        <!-- <div class="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <Calendar class="w-3 h-3 mr-1" />
          <span>
            {{ new Date(webinar.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
          </span>
        </div> -->

        <!-- Live/Upcoming badge -->
        <!-- <span :class="isLive ? 'bg-red-600' : 'bg-green-600'"
          class="text-white text-xs px-2 py-1 rounded-full absolute top-2 right-2">
          {{ isLive ? 'Live' : 'Upcoming' }}
        </span> -->

        <!-- Duration badge (bottom right) -->
        <div v-if="webinar.duration"
          class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
          {{ webinar.duration }}
        </div>
      </div>
    </div>

    <!-- Content section -->
    <div class="flex flex-col p-4 flex-1">
      <div class="mb-3">
        <h3 class="text-lg font-bold text-gray-900 line-clamp-2 mb-2">{{ webinar.title }}</h3>
        <p class="text-gray-600 text-sm line-clamp-2">{{ webinar.description }}</p>
      </div>

      <div class="mt-auto">
        <!-- Time information -->
        <div class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Clock class="w-4 h-4 flex-shrink-0" />
          <span>{{ webinar.time }}</span>
        </div>

        <!-- Author section -->
        <div class="flex items-center gap-3 pt-3 border-t border-gray-100">
          <div class="relative rounded-full border-2 border-white/80 flex-shrink-0">
            <div
              class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold">
              <img src="/img/icon/github-icon.svg" :alt="webinar.speakers[0]" class="h-full w-full object-cover"
                loading="lazy" />
            </div>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ webinar.speakers[0] }}</p>
            <p class="text-xs text-gray-500 truncate">{{ webinar.speakers[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>