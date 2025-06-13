<script setup>
import { Calendar, Play } from "lucide-vue-next";
import CustomButton from "./CustomButton.vue";
import { ref } from "vue";
import AddToCalenderPopup from "../webinars/AddToCalenderPopup.vue";
const props = defineProps({
  webinar: {
    type: Object,
    required: true,
  },
  sourceKey: {
    type: String,
    required: true,
  },
});
const showPopup = ref(false);

const calendarLinks = {
  webinarDetail: {
    eventTitle: "Mastering Real-Time Anomaly Detection",
    eventDate: "December 15, 2024",
    eventTime: "10:00 AM PT",
  },
  google:
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinar+Title&dates=20250620T100000Z/20250620T110000Z&details=Join+our+webinar&location=https://your-site.com",
  outlook:
    "https://outlook.live.com/owa/?rru=addevent&startdt=2025-06-20T10:00:00Z&enddt=2025-06-20T11:00:00Z&subject=Webinar+Title&location=https://your-site.com&body=Join+our+webinar",
  ics: "/ics/webinar.ics", // path to your ICS file
};

function registerForWebinar() {
  // Simulate successful registration
  setTimeout(() => {
    showPopup.value = true;
  }, 200);
}
</script>

<template>
  <div
    class="bg-white border border-gray-200 hover:shadow-lg rounded-lg transition-shadow overflow-hidden flex flex-col h-full">
    <div class="relative">
      <div :class="`h-48 bg-gradient-to-r ${webinar.gradient} flex items-center justify-center relative`">
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="relative z-10 text-center">
          <div
            class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-white/30 transition-colors cursor-pointer">
            <Play class="w-8 h-8 text-white" />
          </div>
          <div class="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
            <p class="text-white text-xs font-medium">{{ webinar.duration }}</p>
          </div>
        </div>
      </div>
      <span class="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
        {{ sourceKey === "past" ? "Recorded" : "Upcoming" }}
      </span>
    </div>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
        {{ webinar.title }}
      </h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ webinar.description }}
      </p>
      <div class="space-y-2 mb-4">
        <div class="flex items-center text-sm text-gray-600">
          <Calendar class="w-4 h-4 mr-2" />
          {{
            new Date(webinar.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          }}
        </div>
      </div>

      <div class="flex-1"></div>
      <!-- Separator above author -->
      <div class="border-t border-gray-100 my-3"></div>
      <!-- Author section always at bottom -->
      <div class="flex items-center gap-3 pt-1">
        <div class="relative rounded-full border-2 border-white/80">
          <div
            class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold">
            <img src="/img/icon/github-icon.svg" alt="it.name" class="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-sm font-medium text-gray-900">
            {{ webinar.speakers[0] }}
          </p>
          <p class="text-xs text-gray-500">{{ webinar.speakers[1] }}</p>
        </div>
      </div>

      <CustomButton v-if="sourceKey === 'upcoming'" class="w-full" variant="primary" @click="registerForWebinar">
        {{ "Register" }}
      </CustomButton>

      <AddToCalenderPopup :visible="showPopup" :calendarLinks="calendarLinks" @close="showPopup = false" />
    </div>
  </div>
</template>
