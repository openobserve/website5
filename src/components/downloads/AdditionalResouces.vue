<template>
  <CustomSection>
    <div class="max-w-4xl mx-auto w-full">
      <HeadingSection :title="heading.title" heading-level="2" align="CENTER" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="border border-gray-200 text-center p-6 hover:shadow-lg transition-shadow rounded-xl flex flex-col"
        >
          <img
            v-if="item.image?.url"
            :src="item.image.url"
            :alt="item.image.alternateText"
            class="h-10 w-11 mx-auto mb-4"
          />

          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ item.title }}
          </h3>

          <p class="text-gray-600 text-sm mb-4">
            {{ item.description }}
          </p>

          <!-- Optional Arrow Link -->
          <div v-if="item.button?.link" class="mt-auto mx-auto">
            <CustomButton
              size="small"
              :buttonText="item.button.text"
              :buttonLink="item.button.link"
              :variant="index === 1 ? 'primary' : 'secondary'"
              :btn-class="
                index === 1
                  ? '!bg-[#F45B49] !text-white hover:!opacity-90 !text-sm !font-medium'
                  : '!text-[#45A4F3] hover:!text-blue-800 hover:!bg-white !text-sm !font-medium'
              "
            />
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import CustomButton from "@/components/core/CustomButton.vue"; // Adjust path as needed
import CustomSection from "@/components/core/CustomSection.vue";
import HeadingSection from "@/components/core/HeadingSection.vue";

const props = defineProps<{
  heading: {
    title: string;
  };
  items: Array<{
    title: string;
    description: string;
    button: {
      text: string;
      link: string;
      target?: string;
    };
    image?: {
      url: string;
      alternateText?: string;
    };
  }>;
}>();
</script>
