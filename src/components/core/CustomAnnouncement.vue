<script setup>
import CustomImage from "./CustomImage.vue";

// Props definition
const props = defineProps({
  AnnouncementBanner: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 py-3 flex items-center justify-between"
  >
    <!-- Empty space for layout -->
    <div class="flex-1"></div>

    <!-- Banner content -->
    <div class="text-center flex flex-col md:flex-row items-center gap-6">
      <!-- Announcement banner description -->
      <div class="font-semibold">
        <BannerSection />
        {{ props.AnnouncementBanner?.description }}
      </div>

      <!-- Register button -->
      <button
        class="text-white text-xs text-center justify-center px-2 py-2 bg-slate-900 rounded-full ml-10"
      >
        REGISTER NOW
      </button>

      <!-- Close icon at the bottom -->
      <div class="flex justify-center items-center">
        <CustomImage image="/img/icon/CloseIcon.svg" altText="Close Icon" cssClass="w-5 h-5 cursor-pointer" />
      </div>
    </div>

    <!-- Empty space for layout -->
    <div class="flex-1"></div>
  </div>
</template>
