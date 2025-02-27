<script setup>
import { defineProps } from "vue";
import CustomButton from "./CustomButton.vue";

const props = defineProps({
  bannerTitle: { type: String, required: true },
  bannerDescription: { type: String, required: true },
  primaryButton: {
    type: Object,
    required: true,
    validator: (value) =>
      value.hasOwnProperty("text") && value.hasOwnProperty("link"),
  },
  secondaryButton: {
    type: Object,
    default: () => ({ text: "", link: "#" }),
    validator: (value) =>
      value.hasOwnProperty("text") && value.hasOwnProperty("link"),
  },
  getStartedText: { type: String, default: "Get Started" },
  items: { type: Array, required: false },
  featureTitle: { type: String, required: false },
  monthlyText: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <section
    class="relative w-full bg-cover bg-center px-6 md:px-8 lg:px-12 py-10"
    :style="{ backgroundImage: 'url(/img/bg/gradient-bg/bannerBg.svg)' }"
    aria-labelledby="banner-title"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-11">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Column 1: Title & Primary Button -->
        <div class="text-center md:text-left space-y-5">
          <h1
            class="text-2xl md:text-3xl lg:text-4xl font-bold text-black text-center md:text-left"
          >
            {{ bannerTitle }}
          </h1>
          <p class="text-base text-black">
            {{ bannerDescription }}
          </p>
          <div class="flex justify-center md:justify-start">
            <CustomButton
              v-if="primaryButton?.text"
              variant="bannerSecondary"
              :button-link="primaryButton.link"
            >
              {{ primaryButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Column 2: Features List -->
        <div class="md:text-left space-y-4">
          <h2
            class="text-xl md:text-2xl font-semibold text-black text-center md:text-left"
          >
            {{ featureTitle }}
          </h2>
          <p class="text-sm text-black">{{ monthlyText }}:</p>
          <ul class="space-y-3">
            <li
              v-for="(feature, index) in items"
              :key="index"
              class="flex items-x gap-3 text-sm text-black"
            >
              <img src="/img/icon/RightTick.svg" alt="icon" class="w-5 h-5" />
              <span>{{ feature.title }}</span>
            </li>
          </ul>
        </div>

        <!-- Column 3: Secondary Button & Description -->
        <div
          class="md:col-span-2 lg:col-span-1 flex flex-col justify-center space-y-5 items-center md:mx-auto lg:mx-0"
          id="bannerComponent"
        >
          <CustomButton
            class="justify-center"
            v-if="secondaryButton?.text"
            variant="bannerPrimary"
            :button-link="secondaryButton.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ secondaryButton.text }}
          </CustomButton>

          <p class="text-sm text-center max-w-[30vh]">
            {{ getStartedText }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
