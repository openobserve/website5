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
  <div class="w-full flex flex-col gap-4 relative pt-6 lg:pt-4">
    <HeadingSection v-if="heading" :title="heading.title" :description="heading.description" />

    <div class="w-full flex flex-col lg:flex-row justify-center items-center gap-4 md:gap-6" :class="sectionClasses">
      <!-- Quote Section -->
      <div class="relative h-auto rounded-lg border border-gray-200 bg-white shadow-sm p-3 z-10 w-full lg:w-1/2">
        <div class="flex items-start gap-4">
          <div class="bg-primary/10 text-primary rounded-full p-2">
            <Quote class="w-6 h-6" />
          </div>
          <p class="text-gray-600 italic text-sm leading-relaxed">
            {{ cardData?.quote }}
          </p>
        </div>

        <div class="flex items-center gap-3 mt-4">
          <CustomImage :src="cardData?.avatar" class="w-8 h-8 rounded-full"/>
          <div>
            <p class="font-semibold text-sm text-gray-900">{{ cardData?.name }}</p>
            <p class="text-xs text-gray-500">{{ cardData?.role }}</p>
          </div>
        </div>
      </div>

      <!-- Feature List -->
      <div class="w-full lg:w-1/2 z-10 flex flex-col space-y-6">
        <div v-if="items?.length" class="flex flex-col space-y-6">
          <div v-for="(item, index) in items" :key="index" class="flex items-start">
            <Check class="h-5 w-5 mr-3 bg-blue-500/20 rounded-full p-1 flex-shrink-0 text-blue-500" />
            <div class="flex flex-col space-y-1">
              <h3 class="font-inter font-semibold text-sm md:text-base lg:text-lg text-black">
                {{ item.title }}
              </h3>
              <p class="font-inter text-sm text-gray-800">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
