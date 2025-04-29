<script setup>
import { ref, computed, onUnmounted } from "vue";
import CustomImage from "./CustomImage.vue";
import { slugify } from "@/utils/slugify";

const props = defineProps({
  heading: {
    type: Object,
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

const showDialog = ref(false);

const openDialog = () => {
  showDialog.value = true;
  window.addEventListener("keydown", handleKeydown);
};

const closeDialog = () => {
  showDialog.value = false;
  window.removeEventListener("keydown", handleKeydown);
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeDialog();
  }
};

const sectionClasses = computed(() => ({
  "md:flex-row-reverse": props.direction === "right",
}));

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div :id="slugify(title)" class="w-full flex flex-col gap-6 mt-10">
    <!-- Section Heading -->
    <div class="text-center mx-auto px-4">
      <h2 class="text-[#f4f4f5] font-inter font-semibold text-2xl md:text-3xl lg:text-4xl">
        {{ heading.title }}
      </h2>
      <p v-if="description" class="mt-2 text-gray-300 text-sm md:text-base">
        {{ heading.description }}
      </p>
    </div>

    <!-- Main Content Layout -->
    <div
      :class="[
        'w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6',
        sectionClasses,
      ]"
    >
      <!-- Left/Right Image Section -->
      <div class="relative w-full md:w-1/2">
        <!-- Background Gradient -->
        <div
          class="absolute inset-0 bg-cover bg-center rounded-lg z-0"
          :style="{ backgroundImage: 'url(/img/bg/gradient-bg/featureBG.svg)' }"
        ></div>

        <!-- Foreground Image -->
        <div
          class="relative w-full h-auto rounded-lg shadow-md p-3 z-10 cursor-zoom-in"
          @click="openDialog"
        >
          <CustomImage
            :image="image || ''"
            :altText="title"
            class="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>

      <!-- Text Content Section -->
      <div class="w-full md:w-1/2 z-10 flex flex-col space-y-2">
        <div
          v-if="items?.length"
          class="flex flex-col space-y-4 px-2 md:px-4"
        >
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

    <!-- Modal Dialog for Zoomed Image -->
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
          :src="image.url"
          class="w-full h-full rounded-lg object-contain"
          @click.stop
        />
      </div>
    </div>
  </div>
</template>
