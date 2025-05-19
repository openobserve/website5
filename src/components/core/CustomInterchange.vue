<script setup>
import { computed } from "vue";
import HeadingSection from "./HeadingSection.vue";
import CustomImage from "./CustomImage.vue";
import { Quote, Check } from "lucide-vue-next";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  cardData: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  theme: {
    type: String,
    required: false,
  },
  direction: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
});

const sectionClasses = computed(() => ({
  "lg:flex-row-reverse": props.direction === "right",
}));
</script>

<template>
  <div :class="['w-full flex flex-col', props.theme]">
    <HeadingSection
      v-if="heading"
      :title="heading.title"
      :description="heading.description"
    />

    <div
      class="w-full flex flex-col lg:flex-row justify-center items-center gap-12"
      :class="sectionClasses"
    >
      <!-- client review Section -->
      <div
        class="h-auto rounded-lg border border-card bg-white shadow-sm p-3 z-10 w-full lg:w-1/2"
      >
        <div class="flex items-start gap-4">
          <!-- Icon -->
          <div
            class="bg-black/5 text-color-primary-blue rounded-full p-2 shrink-0 mt-1"
          >
            <Quote class="w-6 h-6" />
          </div>

          <!-- Quote + Author Info -->
          <div class="flex flex-col">
            <p class="text-gray-600 italic text-sm md:text-base leading-relaxed mb-4">
              "{{ cardData?.quote }}"
            </p>
            <div class="flex items-center gap-3">
              <CustomImage
                :src="cardData?.avatar"
                class="w-8 h-8 rounded-full shrink-0"
              />
              <div>
                <p class="font-semibold text-sm text-gray-900">
                  {{ cardData?.name }}
                </p>
                <p class="text-xs text-gray-500">{{ cardData?.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature List -->
      <div class="w-full lg:w-1/2 z-10 flex flex-col space-y-6">
        <div v-if="items?.length" class="flex flex-col space-y-6">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex items-start"
          >
            <div class="space-y-1">
              <div class="flex items-center">
                <Check
                  class="h-5 w-5 mr-2 bg-card rounded-full p-1 text-color-primary-blue"
                />
                <h3
                  class="font-inter font-semibold text-sm md:text-base lg:text-lg text-black"
                >
                  {{ item.title }}
                </h3>
              </div>
              <p class="font-inter text-sm text-gray-800 pl-7">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
