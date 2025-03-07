<script setup>
import { defineProps, ref, computed } from "vue";
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

// Track selected client
const selectedIndex = ref(0);
const currentItem = computed(() => props.items[selectedIndex.value]);

// Function to update selected client
const selectClient = (index) => {
  selectedIndex.value = index;
};
</script>

<template>
  <CustomSection>
    <div
      class="relative flex flex-col glass-card bg-opacity-80 backdrop-blur-lg shadow-lg p-6 z-10"
    >
      <!-- case study's main title and subtitle -->
      <div class="line-clamp-3">
        <Heading
          :title="currentItem.heading?.title"
          :description="currentItem.heading?.subtitle"
          align="CENTER"
        />
      </div>
      <div class="flex flex-col-reverse lg:flex-row gap-3 lg:gap-6">
        <div class="flex flex-col w-full lg:w-1/2 gap-2 lg:gap-4">
          <!-- title decsription of the items in items -->
          <div
            v-for="item in currentItem.items"
            :key="item.id"
            class="rounded-2xl px-3 lg:px-4 py-2 lg:py-3 bg-dark-glass"
          >
            <h3 class="text-sm lg:text-lg text-white font-medium mb-2">
              {{ item?.title }}
            </h3>
            <p class="text-xs lg:text-base font-light text-white">
              {{ item?.description }}
            </p>
          </div>
          <!-- Button -->
          <div class="gap-4 mt-3 lg:mt-0 w-full md:w-72 justify-center">
            <CustomButton
              variant="secondary"
              buttonText="View Case Study"
              :buttonLink="currentItem?.link"
            />
          </div>
        </div>
        <!-- case study image -->
        <div class="relative w-full lg:w-1/2 mt-4 md:mt-0">
          <div class="absolute inset-0 bg-cover bg-center rounded-lg image-bg z-0"></div>
          <div class="relative z-10">
            <CustomImage :image="currentItem?.image?.formats?.medium" class="p-3" />
          </div>
        </div>
      </div>
      <!-- Client logos -->
      <div class="flex flex-row">
        <div class="hidden lg:block w-1/2"></div>
        <div
          class="flex flex-row space-x-10 mt-3 lg:mt-6 w-full lg:w-1/2 h-16  overflow-hidden"
        >
          <div
            v-for="(item, index) in items"
            :key="item.id"
            class="relative flex-none justify-center cursor-pointer transition-all duration-300"
             :class="selectedIndex === index ? 'brightness-200 glow-effect' : 'brightness-75'"
            @click="selectClient(index)"
          >
            <CustomImage
              :image="item?.clientLogo?.url"
              cssClass=" w-full h-10 transition-transform transform"
            />
            <!-- Gradient Underline -->
            <div
              class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>

<style scoped>
.glass-card {
  border-radius: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(180deg, rgba(1, 1, 1, 0.48) 30%, rgba(1, 1, 1, 0.8) 100%);
}
.bg-dark-glass {
  background: linear-gradient(
    90deg,
    rgba(42, 48, 51, 1) 0%,
    rgba(82, 92, 97, 0.7) 50%,
    rgba(157, 170, 178, 0)
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.image-bg {
  background: linear-gradient(
    45deg,
    rgba(49, 53, 57, 1),
    rgba(31, 34, 38, 1),
    rgba(49, 53, 57, 1)
  );
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.glow-effect::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 150%;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(64, 113, 212, 1) 0%, rgba(0, 0, 0, 0) 70%);
  opacity: 0.8;
  filter: blur(10px);
  
}

.glow-effect:hover::before {
  opacity: 1;
}

.glow-effect {
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}
</style>
