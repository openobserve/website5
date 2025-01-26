<template>
  <div
    :class="[
      'w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-10 py-10',
      sectionClasses,
    ]"
  >
    <div class="w-full md:w-1/2">
      <img
        :src="image"
        :alt="title"
        class="w-full h-auto rounded-lg shadow-md"
      />
    </div>
    <div class="w-full md:w-1/2">
      <h2 class="text-[#f4f4f5] mb-4 font-inter font-semibold text-xl md:text-2xl lg:text-4xl">
        {{ title }}
      </h2>
      <div v-if="items.length">
        <div v-for="(item, index) in items" :key="index" class="mb-4">
          <h3 class="font-inter font-semibold text-sm md:text-base lg:text-lg text-white mb-2">
            {{ item.title }}
          </h3>
          <p class="font-inter text-sm text-gray-300 mb-2">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "CustomInterChange",
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((item) => "title" in item && "description" in item);
      },
    },
    direction: {
      type: String,
      default: "left", // Default direction is left
      validator(value) {
        return ["left", "right"].includes(value); // Validate direction
      },
    },
  },
  setup(props) {
    const sectionClasses = computed(() => ({
      "md:flex-row-reverse": props.direction === "right",
    }));

    return {
      sectionClasses,
    };
  },
};
</script>
