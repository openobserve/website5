<script setup>
import { ref, computed, onUnmounted } from "vue";
import CustomImage from "./CustomImage.vue";
import { slugify } from "@/utils/slugify";
import { getImageUrl } from "@/utils/GetImageUrl";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: { type: Object, required: true },
  items: { type: Array, required: true },
});

const showDialog = ref(false);
const selectedImage = ref("");

const openDialog = (imageUrl) => {
  selectedImage.value = imageUrl;
  showDialog.value = true;
  window.addEventListener("keydown", handleKeydown);
};

const closeDialog = () => {
  showDialog.value = false;
  selectedImage.value = "";
  window.removeEventListener("keydown", handleKeydown);
};

const handleKeydown = (event) => {
  if (event.key === "Escape") closeDialog();
};

const sectionClasses = computed(() => (index) => index % 2 !== 0 ? "md:flex-row-reverse" : "");

onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <div class="container mx-auto p-3 mt-5">
    <Heading v-if="heading?.title || heading?.subtitle" :title="heading.title" :description="heading.subtitle"
      align="CENTER" />

    <div v-for="(item, index) in items" :key="index" class="mb-8 md:mb-0">
      <div :id="slugify(item.title)"
        :class="['w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mt-5 relative', sectionClasses(index)]">

        <div class="relative w-full md:w-1/2">
          <div class="absolute inset-0 bg-cover bg-center rounded-lg z-0"
            style="background-image: url('/img/bg/gradient-bg/featureBG.svg');"></div>

          <div class="relative w-full h-auto rounded-lg shadow-md p-3 z-10 cursor-zoom-in"
            @click="openDialog(getImageUrl(item.image))">
            <CustomImage :image="getImageUrl(item.image) || ''" :altText="item.title" height="full"
              class="w-full h-auto rounded-lg shadow-md" />
          </div>
        </div>

        <div class="w-full md:w-1/2 z-10 flex flex-col space-y-2">
          <h2 class="text-[#f4f4f5] font-inter font-semibold text-xl md:text-2xl lg:text-4xl">{{ item.title }}</h2>
          <div v-if="item.items?.length" class="flex flex-col space-y-2">
            <div v-for="(subItem, subIndex) in item.items" :key="subIndex" class="flex flex-col space-y-1">
              <h3 class="font-inter font-semibold text-sm md:text-base lg:text-lg text-white">{{ subItem.title }}</h3>
              <p class="font-inter text-sm text-gray-300">{{ subItem.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showDialog" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 h-screen"
    @click="closeDialog">
    <button class="absolute top-3 right-3 text-white cursor-pointer z-50" @click="closeDialog">✖</button>
    <div class="relative p-8 md:p-[5rem] rounded-lg md:h-screen">
      <CustomImage :image="selectedImage" class="w-full h-full rounded-lg object-contain" @click.stop />
    </div>
  </div>
</template>
