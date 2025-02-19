<script setup>
import { slugify } from "@/utils/slugify";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <CustomSection>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 place-items-center -mt-20 z-10">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="rounded-3xl w-full h-full p-[0.0625rem] bg-gradient-blue transition-all duration-300 shadow-2xl hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)]"
      >
        <!-- Content Layer -->
        <div class="grid bg-gray-800 rounded-3xl p-6 h-full transition-colors place-content-center">
          <!-- Icon and Title Row -->
          <div class="flex items-center space-x-4 mb-3">
            <!-- Icon/Logo -->
              <CustomImage
                v-if="item?.image"
                :image="item?.image"
                :altText="item.title || ''"
                class="w-10 h-10"
              />
            <!-- Title -->
            <h3 class="text-white font-medium text-lg">{{ item.title }}</h3>
          </div>
          
          <!-- Description -->
          <p 
            class="text-gray-300 text-sm" 
            v-html="item?.description"
          ></p>
          <!-- <a 
            :href="item?.link"
            class="text-blue-300 text-semibold text-left text-base w-full"
          >
            Learn More
          </a> -->
        </div>
      </div>
    </div>
  </CustomSection>
</template>
