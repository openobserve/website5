<template>
  <CustomSection sectionClass="!pt-14 !pb-0">
    <div class="max-w-4xl mx-auto">
      <div
        class="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <div
          class="flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div class="flex-1">
            <div class="flex items-center mb-3">
              <div
                class="w-10 h-10 bg-[#45A4F3] rounded-lg flex items-center justify-center mr-3"
              >
                <Server class="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ title }}</h3>
                <p class="text-sm text-gray-600">{{ subtitle }}</p>
              </div>
            </div>

            <p class="text-gray-700 mb-4">
              {{ description }}
            </p>

            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
              <span
                v-for="(item, index) in items"
                :key="index"
                class="flex items-center"
              >
                <Check class="h-4 w-4 mr-1 text-[#5ACA7A]" />
                {{ item.title }}
              </span>
            </div>
          </div>

          <div class="flex flex-col items-center lg:items-end gap-3">
            <CustomButton
              size="small"
              :buttonText="primaryButton.text"
              :buttonLink="primaryButton.link"
              :target="primaryButton.target"
              variant="primary"
              :btn-class="'!bg-[#45A4F3] hover:!bg-blue-600 !text-white !font-semibold !px-8 !py-3 !rounded-lg !text-sm !text-center'"
            />

            <CustomButton
              size="small"
              :buttonText="secondaryButton.text"
              :buttonLink="secondaryButton.link"
              :target="secondaryButton.target"
              variant="secondary"
              :btn-class="'!text-[#45A4F3] hover:!text-blue-600 !underline !text-[13px] !bg-transparent !p-0'"
            />
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Server, Check } from "lucide-vue-next";
import CustomSection from "@/components/core/CustomSection.vue";
import CustomButton from "../core/CustomButton.vue";

const props = defineProps<{
  title: string;
  subtitle: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
    target?: string;
  };
  secondaryButton: {
    text: string;
    link: string;
    target?: string;
  };
  items: Array<{
    title: string;
  }>;
}>();
</script>
