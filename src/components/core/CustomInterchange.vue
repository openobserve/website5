<script setup>
import { computed } from "vue";
import HeadingSection from "./HeadingSection.vue";
import CustomImage from "./CustomImage.vue";
import { Quote, Check } from "lucide-vue-next";
import { motion } from "motion-v";
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

const LeftVariant = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
      delay: 0,
    },
  },
};

const RightVariant = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
      delay: 0,
    },
  },
};

const cardVariant = computed(() => {
  return props.direction === "right" ? RightVariant : LeftVariant;
});

const listVariant = computed(() => {
  return props.direction === "right" ? LeftVariant : RightVariant;
});
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
      <motion.div
        :initial="'hidden'"
        :whileInView="'visible'"
        :variants="cardVariant"
        :inViewOptions="{ once: true, amount: 0.3 }"
        class="h-auto rounded-lg border border-card bg-white shadow-sm p-6 xl:p-10 z-10 w-full lg:w-1/2"
      >
        <div class="flex flex-col items-start gap-4">
          <div class="flex flex-row items-start gap-3">
            <!-- Icon -->
            <div
              class="bg-black/5 text-color-primary-blue rounded-md p-4 shrink-0 mt-1"
            >
              <Quote class="w-6 h-6" />
            </div>

            <!-- Quote + Author Info -->
            <div class="flex flex-col">
              <p
                class="text-gray-600 italic text-base lg:text-lg font-medium mb-4"
              >
                "{{ cardData?.quote }}"
              </p>
            </div>
            <!-- Author image and name,role,company -->
          </div>
          <div class="flex flex-row items-start gap-3 md:ml-16">
            <CustomImage
              :src="cardData?.avatar"
              class="w-12 h-12 rounded-full shrink-0"
            />
            <div>
              <p class="font-semibold text-base text-gray-900">
                {{ cardData?.name }}
              </p>
              <p class="text-sm text-gray-500">{{ cardData?.role }}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <!-- Feature List -->
      <motion.div
        class="w-full lg:w-1/2 z-10 flex flex-col space-y-6"
        :initial="'hidden'"
        :whileInView="'visible'"
        :variants="listVariant"
        :inViewOptions="{ once: true, amount: 0.3 }"
      >
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
      </motion.div>
    </div>
  </div>
</template>
