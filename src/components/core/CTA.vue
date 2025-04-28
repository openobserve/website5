<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  align: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'left',
  },
  buttons: {
    type: Array as () => Array<{ text: string; link: string; variant: string }>,
    required: false,
    default: () => [],
  },
});
</script>

<template>

  <div class="w-full bg-gradient-to-r from-indigo-400 to-blue-400 py-20 px-5">
    <div
      class="max-w-full mx-auto flex flex-col"
      :class="{
        'items-start text-left': align === 'left',
        'items-center text-center': align === 'center',
        'items-end text-right': align === 'right'
      }"
    >
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        {{ title }}
      </h1>
      <p class="text-white text-lg md:text-xl">
        {{ description }}
      </p>
      <!-- Buttons -->
      <div v-if="buttons.length">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
          size="medium"
          :buttonText="button.text"
          :buttonLink="button.link"
          btn-class="bg-white text-indigo-500 mt-6"
        />
      </div>
    </div>
  </div>

</template>
