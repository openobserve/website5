<script setup>
import { Calendar, Clock, Users } from 'lucide-vue-next';
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
  <div class="flex bg-white border border-gray-200 hover:shadow-lg rounded-lg transition-shadow overflow-hidden flex-1">
    <div class="flex w-full">
      <div :class="`w-32 bg-gradient-to-r ${webinar.gradient} flex items-center justify-center`">
        <div class="text-white text-center p-4">
          <Calendar class="w-8 h-8 mx-auto mb-2" />
          <p class="text-xs font-medium">
            {{ new Date(webinar.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-between flex-1 p-6">
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-bold text-gray-900 line-clamp-2 flex-1 mr-3">{{ webinar.title }}</h3>
          <span :class="isLive ? 'bg-red-600' : 'bg-green-600'" class="text-white text-xs px-2 py-1 rounded-full">
            {{ isLive ? 'Live' : 'Upcoming' }}
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ webinar.description }}</p>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <div class="flex items-center space-x-1">
              <Clock class="w-4 h-4" />
              <span>{{ webinar.time }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative rounded-full border-2 border-white/80">
            <div
              class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold">
              <img src="/img/icon/github-icon.svg" alt="it.name" class="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-sm font-medium text-gray-900">{{ webinar.speakers[0] }}</p>
            <p class="text-xs text-gray-500">{{ webinar.speakers[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>