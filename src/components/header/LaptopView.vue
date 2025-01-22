<template>
  <header class="bg-black">
    <div
      class="w-full mx-auto px-4 flex justify-between items-center"
    >
      <Logo />
      <nav>
        <ul class="flex space-x-2 xl:space-x-6 w-full">
          <li
            class="relative py-6"
            @mouseenter="onPlatformMenuHover"
            @mouseleave="onPlatformMenuMouseLeave"
          >
            <a href="#" class="text-white font-semibold text-base hover:underline"> Platform </a>
          </li>
          <li class="relative py-6" @mouseenter="onSolutionMenuHover" @mouseleave="onSolutionMenuMouseLeave">
            <a href="#" class="text-white font-semibold text-base"> Solution </a>
          </li>
          <li class="relative py-6">
            <a href="#" class="text-white font-semibold text-base"> Resources </a>
          </li>
          <li class="relative py-6">
            <a href="#" class="text-white font-semibold text-base"> Company </a>
          </li>
          <li class="relative py-6">
            <a href="#" class="text-white font-semibold text-base"> Pricing </a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center space-x-2 xl:space-x-4">
        <CustomButton variant="tertiary" size="small"> LOGIN IN </CustomButton>
        <CustomButton variant="secondary" size="small"> DOWNLOAD </CustomButton>
        <CustomButton variant="primary" size="small"> GET DEMO </CustomButton>
      </div>
    </div>
    <div
      class="absolute top-full flex justify-center translate-x-[15%] w-[80%] xl:w-3/4 container mx-auto"
      @mouseenter="onPlatformMenuHover"
      v-if="isPlatformMenuOpen"
      >
      <CustomHoverHeader @mouseleave="onPlatformMenuMouseLeave">
        <div>
          <h3 class="text-xl font-bold pb-2 text-[#FFFFFF]">
            {{ items.platform.title }}
          </h3>

          <div class="w-full flex justify-between flex-col md:flex-row gap-2">
            <div
              class="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
            >
              <div v-for="(item, index) in items.platform.items" :key="index">
                <SectionHeader :title="item.title" :items="item.items" />
              </div>
            </div>

            <div
              class="w-full md:w-1/3 bg-gray-700 bg-opacity-50 p-4 rounded-lg"
            >
              <SectionHeader
                :title="items.platform.keyFeature.title"
                :items="items.platform.keyFeature.items"
              />
            </div>
          </div>
          <div
            class="hidden md:flex flex-col md:flex-row justify-between mt-6 gap-4"
          >
            <CustomHeaderButton
              title="Full Stack Observability Platform"
              linkTitle="View Platform"
            />
            <button class="btn">Pricing</button>
          </div>
        </div>
      </CustomHoverHeader>
    </div>
  </header>
</template>
<script setup>
import Logo from "../core/Logo.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomHoverHeader from "./CustomHoverHeader.vue";
import CustomHeaderButton from "./CustomHeaderButton.vue";
import SectionHeader from "./SectionHeader.vue";
import { defineProps, ref } from "vue";
defineProps({
  items: {
    type: Object,
    required: true,
  },
});

const isPlatformMenuOpen = ref(false);
const isSolutionMenuOpen = ref(false);
const isResourcesMenuOpen = ref(false);
// Handle hover event and position the dropdown dynamically
const onPlatformMenuHover = (event) => {
  isPlatformMenuOpen.value = true;
};

const onPlatformMenuMouseLeave = () => {
  isPlatformMenuOpen.value = false;
};

const onSolutionMenuHover = (event) => {
  isSolutionMenuOpen.value = true;
};

const onSolutionMenuMouseLeave = () => {
  isSolutionMenuOpen.value = false;
};

const onResourcesMenuHover = (event) => {
  isResourcesMenuOpen.value = true;
};

const onResourcesMenuMouseLeave = () => {
  isResourcesMenuOpen.value = false;
};
</script>
