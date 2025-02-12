<script setup>
import { defineProps, ref, onMounted } from "vue";
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
    required: false,
  },
});

const copied = ref(false);

// Define the docker command as a constant
const DOCKER_COMMAND = `docker run -d -e ZO_ROOT_USER_EMAIL="root@example.com -e ZO_ROOT_USER_PASSWORD="Complexpass#123 public.ecr.aws/zinclabs/openobserve:latest`;

const copyCode = () => {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = DOCKER_COMMAND;

  // Make the textarea invisible but keep it in the DOM
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";

  // Add it to the DOM
  document.body.appendChild(textarea);

  try {
    // Select and copy the text
    textarea.select();
    document.execCommand("copy");
    copied.value = true;

    // Reset copy status after 1.5 seconds
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (err) {
    console.error("Failed to copy:", err);
  } finally {
    // Clean up by removing the textarea
    document.body.removeChild(textarea);
  }
};
</script>

<template>
  <section
    class="relative flex lg:justify-start md:h-[calc(100vh-100px)] pb-36 md:pb-0 text-center lg:text-left bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-16"
  >
    <video
      v-if="backgroundVideo"
      class="absolute lg:bottom-0 left-0 w-full h-full object-contain object-bottom"
      autoplay
      loop
      muted
      playsinline
    >
      <source :src="backgroundVideo?.url" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div
      class="relative pt-10 md:pt-10 md:pl-10 lg:pt-20 lg:pl-20 text-white max-w-4xl"
    >
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center sm:text-left"
        v-html="title"
      ></h1>

      <p class="sm:text-xl mb-6">
        {{ description }}
      </p>

      <!-- Code Block Container -->
      <div
        class="relative bg-gray-800 rounded-lg text-gray-300 font-mono text-md w-full max-w-md p-4 mt-[2vh] overflow-x-auto my-[2vh]"
      >
        <!-- Copy Button -->
        <button
          @click="copyCode"
          class="absolute top-4 right-2 text-white p-1 flex items-center focus:outline-none focus:ring-0"
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

        <!-- Code Content -->
        <pre class="whitespace-pre-wrap break-all line-clamp-1 pr-[2vh]">{{
          DOCKER_COMMAND
        }}</pre>
      </div>

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
