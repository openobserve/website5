<script setup>
import { Calendar, Play } from "lucide-vue-next";
import CustomButton from "./CustomButton.vue";
import { ref } from "vue";
import AddToCalenderPopup from "../webinars/AddToCalenderPopup.vue";
import { formatDateTimeInET } from "@/utils/getFormattedTime";
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

const { date, time } = formatDateTimeInET(props.webinar.date);
function registerForWebinar() {
  // Simulate successful registration
  setTimeout(() => {
    showPopup.value = true;
  }, 200);
}
</script>

<template>
  <a :href="`/webinars-videos/${webinar.slug}`"
    class="bg-white border border-gray-200 hover:shadow-lg rounded-lg transition-shadow overflow-hidden flex flex-col h-full cursor-pointer no-underline">
    <div class="relative">
      <!-- <div class="h-48 flex items-center justify-center relative bg-cover bg-center"
        :style="webinar.image?.url ? `background-image: url(${webinar.image.url})` : ''"> -->
      <div class="h-48 flex items-center justify-center relative bg-cover bg-center"
        :style="`background-image: url('https://openobserve-staging-website.s3.us-west-2.amazonaws.com/assets/large_pipelines_hero_cd23919099.png')`">
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="relative z-10 text-center">
          <div
            class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-white/30 transition-colors">
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
          {{ date }}
        </div>
      </div>

      <div class="flex-1"></div>
      <div class="border-t border-gray-100 my-3"></div>
      <div class="flex flex-wrap gap-2 w-full items-center">
        <div class="flex flex-row gap-2" v-for="(it, index) in webinar.authors" :key="it.slug">
          <div class="rounded-full border-2 border-white/80">
            <div
              class="h-10 w-10 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-white text-sm font-semibold">
              <img v-if="it.image?.url" :src="it.image?.url" :alt="it.name" class="h-full w-full object-cover"
                loading="lazy" />
              <span v-else class="text-sm font-semibold">{{
                getInitials(it.name)
              }}</span>
            </div>
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-sm font-medium text-gray-900">
              {{ it.name }}
            </span>
            <span class="text-xs font-medium text-gray-500">
              {{ it.authorBio }}
            </span>
          </div>
          <div :class="[
            'border-gray-200',
            index !== webinar.authors.length - 1 ? 'border-l' : '',
          ]"></div>
        </div>
      </div>
      <CustomButton v-if="sourceKey === 'upcoming'" class="w-full mt-3" variant="primary"
        @click.stop="registerForWebinar">
        Register
      </CustomButton>

      <AddToCalenderPopup :visible="showPopup" :calendarLinks="calendarLinks" @close="showPopup = false" />
    </div>
  </a>
</template>
