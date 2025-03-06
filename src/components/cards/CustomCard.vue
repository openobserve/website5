<script setup>
import { defineProps } from "vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
// Define props
const props = defineProps({
  heading: {
    type: Object,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
  primaryButton: {
    type: Object,
    required: true,
  },
});

// Define methods
function truncate(text, maxLength = 200) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}
const dynamicComponent = props.items.link ? "a" : "div";
</script>

<template>
  <div class="relative pt-10 bg-cover bg-no-repeat overflow-visible container mx-auto">
    <CustomSection>
      <Heading :title="heading?.title" :description="heading?.subtitle" align="CENTER" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 md:pt-20">
        <div v-for="(item, index) in items" :key="index">
          <dynamicComponent :href="item?.link">
            <div
              class="rounded-lg w-full h-full p-[0.0625rem] bg-gradient-blue transition-all duration-300 hover:shadow-[0_0_60px_0_rgba(66,174,255,0.8)] container mx-auto group">
              <!-- Content Layer -->
              <div class="flex flex-col space-y-4 w-full h-full items-center rounded-lg bg-[#23282c] p-8">
                <CustomImage :image="item.image" cssClass="h-16" />
                <h3 class="text-[#BEC0C2] text-2xl font-bold truncate" :title="item.title">
                  {{ item.title }}
                </h3>
                <p class="text-[#DCDCDF] text-base">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </dynamicComponent>
        </div>
      </div>
    </CustomSection>
  </div>
  <CustomSeprater />
</template>
