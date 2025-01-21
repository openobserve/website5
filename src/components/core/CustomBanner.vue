<template>
  <div
    class="flex items-center justify-center w-full h-[250px] bg-cover bg-center"
    style="background-image: url('/public/Texture.svg'), url('/public/BG.svg')"
  >
    <div
      class="flex justify-between align-middle mx-auto w-full max-w-[1200px] p-40"
    >
      <div>
        <h1 class="text-2xl font-bold text-white drop-shadow-md">
          {{ title }}
        </h1>
        <p class="text-lg font-light text-white mt-2 drop-shadow-md">
          {{ subtitle }}
        </p>
      </div>
      <div class="flex items-center justify-center gap-4 mt-6">
        <CustomButton
          v-for="(button, index) in buttons"
          :key="index"
          :variant="button.variant"
        >
          {{ button.text }}
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "./CustomButton.vue"; // Import the CustomButton component

export default {
  name: "CustomBanner",
  components: {
    CustomButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      required: true, // Array of objects with `text` and `variant`
    },
  },
};
</script>

<style scoped></style>
