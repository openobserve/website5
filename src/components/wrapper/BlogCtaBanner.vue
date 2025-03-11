<script setup>
import { defineProps } from "vue";
import CustomButton from "../core/CustomButton.vue";

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
    class="relative w-full bg-cover bg-center py-2"
    :style="{ backgroundImage: 'url(/img/bg/gradient-bg/bannerBg.svg)' }"
    id="bannerComponent"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <!-- Column 1: Title & Primary Button -->
        <div class="text-center md:text-left space-y-1.5">
          <h1
            class="text-lg font-bold text-black text-center md:text-left"
          >
            {{ bannerTitle }}
          </h1>
          <p class="text-sm text-black">
            {{ bannerDescription }}
          </p>
          <div class="flex justify-center md:justify-start">
            <CustomButton
              v-if="primaryButton?.text"
              variant="bannerSecondary"
              :button-link="primaryButton.link"
              btn-class="px-3 md:px-3 py-1 text-xs"
            >
              {{ primaryButton.text }}
            </CustomButton>
          </div>
        </div>

        <!-- Column 2: Features List -->
        <div class="md:text-left space-y-2">
          <h2
            class="text-lg font-semibold text-black text-center md:text-left"
          >
            {{ featureTitle }}
          </h2>
          <p class="text-sm text-black">{{ monthlyText }}:</p>
          <ul class="space-y-1">
            <li
              v-for="(feature, index) in items"
              :key="index"
              class="flex items-x gap-1 text-xs text-black"
            >
              <img src="/img/icon/RightTick.svg" alt="icon" class="w-3 h-3" />
              <span>{{ feature.title }}</span>
            </li>
          </ul>
        </div>

        <!-- Column 3: Secondary Button & Description -->
        <div
          class="md:col-span-2 lg:col-span-1 flex flex-col justify-center space-y-5 items-center md:mx-auto lg:mx-0"
        >
          <CustomButton
            class="justify-center"
            v-if="secondaryButton?.text"
            variant="bannerPrimary"
            :button-link="secondaryButton.link"
            target="_blank"
            rel="noopener noreferrer"
            btn-class="px-3 md:px-3 py-1 text-xs"
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
