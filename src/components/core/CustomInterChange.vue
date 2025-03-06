<script setup>
import { ref, computed, onUnmounted } from "vue";
import CustomImage from "./CustomImage.vue";
import { slugify } from "@/utils/slugify";
import { getImageUrl } from "@/utils/GetImageUrl";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
// Reactive state for modal visibility
const showDialog = ref(false);
const selectedImage = ref(""); // Store the clicked image URL
// Toggle dialog visibility
const openDialog = (imageUrl) => {
  selectedImage.value = imageUrl;
  showDialog.value = true;
  window.addEventListener("keydown", handleKeydown);
};

const closeDialog = () => {
  showDialog.value = false;
  selectedImage.value = ""; // Clear selected image
  window.removeEventListener("keydown", handleKeydown);
};

// Handle Escape key press
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
};

const sectionClasses = computed(() => (index) => ({
  "md:flex-row-reverse": index % 2 !== 0, // Apply reverse for odd indexes
}));

// Ensure event listener cleanup
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="container mx-auto p-6 mt-5">
    <Heading
      v-if="heading?.title || heading?.subtitle"
      :title="heading.title"
      :description="heading.subtitle"
      align="CENTER"
    />
    <div v-for="(item, index) in items" :key="index" class="mb-8 md:mb-0">
      <div
        :class="[
          'w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mt-5 relative ',
          sectionClasses(index),
        ]"
        :id="slugify(item.title)"
      >
        <div class="relative w-full md:w-1/2">
          <!-- Background Image -->
          <div
            class="absolute inset-0 bg-cover bg-center rounded-lg z-0"
            :style="{
              backgroundImage: `url('/img/bg/gradient-bg/featureBG.svg')`,
            }"
          ></div>

          <!-- Foreground Image (Clickable) -->
          <div
            class="relative w-full h-auto rounded-lg shadow-md p-3 z-10 cursor-zoom-in"
            @click="openDialog(getImageUrl(item.image))"
          >
            <!-- <CustomImage
            :image="image"
            cssClass="w-full h-auto rounded-lg shadow-md"
          /> -->
            <CustomImage
              :image="getImageUrl(item.image) || ''"
              :altText="item.title"
              height="full"
              class="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        <div class="w-full md:w-1/2 z-10 flex flex-col space-y-2">
          <h2
            class="text-[#f4f4f5] font-inter font-semibold text-xl md:text-2xl lg:text-4xl"
          >
            {{ item.title }}
          </h2>
          <div v-if="item.items?.length" class="flex flex-col space-y-2">
            <div
              v-for="(item, index) in item.items"
              :key="index"
              class="flex flex-col space-y-1"
            >
              <h3
                class="font-inter font-semibold text-sm md:text-base lg:text-lg text-white"
              >
                {{ item.title }}
              </h3>
              <p class="font-inter text-sm text-gray-300">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Image Dialog -->
  <div
    v-if="showDialog"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 h-screen"
    @click="closeDialog"
  >
    <button
      class="absolute top-3 right-3 text-white cursor-pointer z-50"
      @click="closeDialog"
    >
      ✖
    </button>
    <div class="relative p-8 md:p-[5rem] rounded-lg md:h-screen">
      <CustomImage
        :image="selectedImage"
        class="w-full h-full rounded-lg object-contain"
        @click.stop
      />
    </div>
  </div>
</template>
