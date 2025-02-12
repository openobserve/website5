<script setup>
import { defineProps } from "vue";
import { ref } from "vue";
import CustomButton from "../core/CustomButton.vue";

// Define props for the component
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
  secondaryButton: {
    type: Object,
    default: () => ({}),
  },
  backgroundVideo: {
    type: String,
    required: false, // URL rue,of the GIF or image
  },
});

const copied = ref(false);

const copyCode = () => {
  const codeBlock = document.querySelector("code").innerText;
  navigator.clipboard.writeText(codeBlock).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  });
};
</script>

<template>
  <section
    class="relative flex lg:justify-start md:h-[calc(100vh-100px)] pb-36 md:pb-0 text-center lg:text-left bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-16"
  >
    <video
      class="absolute lg:bottom-0 left-0 w-full h-full object-contain object-bottom"
      autoplay
      loop
      muted
      playsinline
      onloadstart="this.playbackRate=1.5;"
    >
      <source :src="backgroundVideo?.url" type="video/mp4" />
      <!-- <source src="/Homepage/Screen Recording 2025-02-07 104522.mp4" type="video/mp4" /> -->
      Your browser does not support the video tag.
    </video>
    <!-- Content Section -->
    <div
      class="relative pt-10 md:pt-10 md:pl-10 lg:pt-20 lg:pl-20 text-white max-w-4xl"
    >
      <!-- Title -->
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center sm:text-left"
      >
        {{ title }}
      </h1>
      <!-- Subtitle -->
      <p class="sm:text-xl mb-6">
        {{ description }}
      </p>

      <!-- Copyable Code Block -->
      <div
        class="relative bg-gray-800 rounded-lg text-gray-300 font-mono text-md w-full max-w-md md:max-w-sm lg:max-w-lg p-4 mt-[2vh] overflow-x-auto my-[2vh]"
      >
        <!-- Copy Button -->
        <button
          @click="copyCode"
          class="absolute top-2 right-2 text-white p-1 flex items-center focus:outline-none focus:ring-0"
        >
          <img
            :src="
              copied
                ? '/download-pricing/copiedIcon.svg'
                : '/download-pricing/copyIcon.svg'
            "
            alt="copy icon"
            class="w-4 h-4"
          />
        </button>

        <!-- Code Block -->
        <pre class="whitespace-pre-wrap break-words">
    <code ref="codeBlock">
docker run -d \
    -e ZO_ROOT_USER_EMAIL="root@example.com" \
    -e ZO_ROOT_USER_PASSWORD="Complexpass#123" \
    public.ecr.aws/zinclabs/openobserve:latest
    </code>
  </pre>
      </div>
      <!-- Buttons -->
      <div class="flex flex-wrap justify-center lg:justify-start gap-4">
        <CustomButton
          variant="primary"
          class="w-full sm:w-auto"
          :buttonLink="primaryButton.link"
          target="_blank"
        >
          {{ primaryButton.text }}
        </CustomButton>
        <CustomButton
          variant="secondary"
          class="w-full sm:w-auto"
          :buttonLink="secondaryButton.link"
          target="_blank"
        >
          {{ secondaryButton.text }}
        </CustomButton>
      </div>
    </div>
  </section>
</template>
