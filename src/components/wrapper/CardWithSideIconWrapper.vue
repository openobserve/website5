<script setup>
import { ref } from "vue";
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomButton from "../core/CustomButton.vue";
import TabsHeader from "../core/TabsHeader.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  btnValues: {
    type: String,
    required: false,
  },
  data: {
    type: Array,
    required: true,
  },
  background: {
    type: Boolean,
    required: false,
  },
});

</script>

<template>
  <div :class="background ? 'bg-gray-50' : ''">
    <CustomSection :section-class="`pb-0 sm:pb-0 lg:pb-0 xl:pb-0`">
      <div>
        <!-- Heading Section -->
        <HeadingSection
          :title="title"
          :description="description"
          align="center"
        />
        <div className="group mx-auto max-w-5xl">
          <!-- <div
          className="absolute -inset-1 bg-gradient-to-r from-primary-purple to-primary-blue rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300">
        </div> -->
          <div class="flex justify-center items-center">
            <!-- <button
              className="w-full  cursor-pointer transition-all duration-300 transform group-hover:scale-[1.01]"
            > -->
              <span class="sr-only">{{ title }}</span>
              <img
                :src="image?.url"
                :alt="image?.alt"
                className="rounded-lg border shadow-md"
                :width="image?.width || 'auto'"
                :height="image?.height || 'auto'"
                loading="lazy"
                decoding="async"
              />
              <!-- <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 rounded-lg transition-all duration-300">
            </div> -->
            <!-- </button> -->
          </div>
        </div>
      </div>
    </CustomSection>
  </div>
</template>
