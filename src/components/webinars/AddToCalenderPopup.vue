<!-- AddToCalendarPopup.vue -->
<!-- <template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50 text-gray-700"
  >
    <div class="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl">
      <h2 class="text-2xl font-bold mb-4">Thank You for Registering!</h2>
      <p class="mb-6">
        Hi Abhishek, you've successfully registered for Mastering Real-Time
        Anomaly Detection on December 15, 2024 at 10:00 AM PT.
      </p>

      <div class="flex flex-col space-y-3 mb-4 max-w-56 mx-auto text-sm">
        <a
          :href="calendarLinks.google"
          target="_blank"
          class="button-style flex items-center justify-center space-x-2"
        >
          <Calendar class="w-4 h-4" />
          <span>Add to Google Calendar</span>
        </a>

        <a
          :href="calendarLinks.outlook"
          target="_blank"
          class="button-style flex items-center justify-center space-x-2"
        >
          <Download class="w-4 h-4" />
          <span>Download Outlook .ICS</span>
        </a>

        <a
          :href="calendarLinks.ics"
          download="webinar.ics"
          class="button-style flex items-center justify-center space-x-2"
        >
          <Download class="w-4 h-4" />
          <span>Download Apple .ICS</span>
        </a>
      </div>
      <p>
        You'll receive a confirmation email with these details shortly. We look
        forward to seeing you at the webinar!
      </p>
      <button
        @click="closePopup"
        class="text-gray-500 hover:text-gray-700 mt-2"
      >
        Close
      </button>
    </div>
  </div>
</template> -->
<template>
  <Transition name="fade">
  <div
    v-if="visible"
    class="fixed inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center z-50 text-gray-700 pointer-events-none no-scroll"
  >
     <div
      class="flex items-center justify-center w-full h-full pointer-events-auto"
    >
    <div class="relative bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl">
      <!-- Close Icon -->
      <button
        @click="closePopup"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-2xl font-bold mb-4">Thank You for Registering!</h2>
      <p class="mb-6">
        Hi Abhishek, you've successfully registered for Mastering Real-Time
        Anomaly Detection on December 15, 2024 at 10:00 AM PT.
      </p>

      <div class="flex flex-col space-y-3 mb-4 max-w-56 mx-auto text-sm">
        <a
          :href="calendarLinks.google"
          target="_blank"
          class="button-style flex items-center justify-center space-x-2"
        >
          <Calendar class="w-4 h-4" />
          <span>Add to Google Calendar</span>
        </a>

        <a
          :href="calendarLinks.outlook"
          target="_blank"
          class="button-style flex items-center justify-center space-x-2"
        >
          <Download class="w-4 h-4" />
          <span>Download Outlook .ICS</span>
        </a>

        <a
          :href="calendarLinks.ics"
          download="webinar.ics"
          class="button-style flex items-center justify-center space-x-2"
        >
          <Download class="w-4 h-4" />
          <span>Download Apple .ICS</span>
        </a>
      </div>
      <p>
        You'll receive a confirmation email with these details shortly. We look
        forward to seeing you at the webinar!
      </p>
    </div>
    </div>
  </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from "vue";
import { Calendar, Download,X } from "lucide-vue-next";
const props = defineProps<{
  visible: boolean;
  calendarLinks: {
    google: string;
    outlook: string;
    ics: string;
  };
}>();

const emit = defineEmits(["close"]);

function closePopup() {
  emit("close");
}
// Utility function
function toggleBodyScroll(disable: boolean) {
  if (disable) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
}

// Watch for popup visibility
watch(
  () => props.visible,
  (visible) => {
    toggleBodyScroll(visible);
  }
);
</script>
<style scoped>

.button-style {
  background-color: #155dfc;
  color: white;
  transition: all 0.3s ease;
  padding: 6px;
  border-radius: 6px;
}
.button-style:hover {
  background-color: #155dfc;
  opacity: 0.9;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
