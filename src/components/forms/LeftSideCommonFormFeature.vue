<script setup>
import CustomImage from "../core/CustomImage.vue";

defineProps({
  description: {
    type: String,
    required: true,
  },
  keyFeatures: {
    type: Array,
    required: true,
  },
  footerdescription: {
    type: String,
    required: true,
  },
});

const data = {
  description:
    "Whether you're managing infrastructure, debugging applications, or optimizing user experiences, OpenObserve makes it easy to monitor, analyze, and act—all in one platform.",
  keyFeatures: [
    {
      title: "Simple Onboarding",
      description:
        "Start monitoring in minutes with an intuitive setup process.",
    },
    {
      title: "No Upfront Costs",
      description: "Begin with our free plan and scale as your needs grow.",
    },
    {
      title: "Flexible Deployment",
      description:
        "Choose between cloud or self-hosted options to suit your requirements.",
    },
  ],
  footerdescription:
    "Take control of your observability stack with OpenObserve.",
};

</script>

<template>
  <div class="md:w-1/2 p-3">
    <p class="text-white mb-6 text-sm md:text-lg lg:text-xl text-center md:text-start">{{ data?.description }}</p>
    <div>
      <ul class="space-y-6">
        <li
          v-for="(feature, index) in data?.keyFeatures"
          :key="index"
          class="flex flex-row gap-2"
        >
          <div class="flex items-center w-8 h-8">
            <img
              src="/rightTick.svg"
              alt="icon"
              class="w-full h-full"
            />
          </div>
          <div class="flex flex-col space-y-1">
            <span class="text-white font-medium">{{ feature.title }}</span>
             <p v-if="feature.description" class="text-gray-300 text-sm">
            {{ feature.description }}
          </p>
          </div>
        </li>
      </ul>
      <h3 class="font-semibold text-white py-6 text-md md:text-lg lg:text-xl text-center md:text-start">
        {{ data?.footerdescription }}
      </h3>
    </div>
  </div>
</template>
