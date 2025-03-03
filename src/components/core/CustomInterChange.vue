<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import CustomImage from "./CustomImage.vue";
import { slugify } from "@/utils/slugify";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  direction: {
    type: String,
    default: "left",
    validator(value) {
      return ["left", "right"].includes(value);
    },
  },
});

// Reactive state for modal visibility
const showDialog = ref(false);

// Toggle dialog visibility
const openDialog = () => {
  showDialog.value = true;
  window.addEventListener("keydown", handleKeydown);
};

const closeDialog = () => {
  showDialog.value = false;
  window.removeEventListener("keydown", handleKeydown);
};

// Handle Escape key press
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
};

const sectionClasses = computed(() => ({
  "md:flex-row-reverse": props.direction === "right",
}));

// Ensure event listener cleanup
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    :class="[
      'w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mt-5 relative ',
      sectionClasses,
    ]"
    :id="slugify(title)"
  >
    <div class="relative w-full md:w-1/2">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-cover bg-center rounded-lg z-0"
        :style="{ backgroundImage: `url('/img/bg/gradient-bg/featureBG.svg')` }"
      ></div>

      <!-- Foreground Image (Clickable) -->
      <div
        class="relative w-full h-auto rounded-lg shadow-md p-3 z-10 cursor-zoom-in"
        @click="openDialog"
      >
        <CustomImage
          :image="image"
          cssClass="w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>

    <div class="w-full md:w-1/2 z-10 flex flex-col space-y-2">
      <h2
        class="text-[#f4f4f5] font-inter font-semibold text-xl md:text-2xl lg:text-4xl"
      >
        {{ title }}
      </h2>
      <div v-if="items?.length" class="flex flex-col space-y-2">
        <div
          v-for="(item, index) in items"
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

  <!-- Image Dialog -->
  <div
    v-if="showDialog"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 h-screen"
    @click="closeDialog"
    >
    <!-- Close button should be inside this relative container -->
    <button
      class="absolute top-3 right-3 text-white cursor-pointer z-50"
      @click="closeDialog"
    >
      ✖
    </button>
    <div class="relative p-8 md:p-[5rem] rounded-lg md:h-screen">
      <CustomImage
        :src="image.url"
        class="w-full h-full rounded-lg object-contain"
        @click.stop
        />
    </div>
  </div>
</template>
