<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./UsecaseCardWithIcon.vue";
import CustomSection from "../core/CustomSection.vue";
import CustomImage from "../core/CustomImage.vue";
import Heading from "../core/Heading.vue";
import { object } from "astro:schema";

const props = defineProps({
  items:{
    type:Array,
    required:true,
  },
  heading:{
    type:Object,
    required:true,
  },
});
</script>

<template>
  <CustomSection>
    <div class="flex flex-col max-w-full container mx-auto">
      <Heading
        :title="heading?.title"
        :description="heading?.subtitle"
      />
      <div class="mt-10">
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
          <!-- Loop moved here -->
          <IconTitleCard
            v-for="(item, index) in items"
            :key="index"
            :card="item"
            :index="index"
          />

          <!-- Static "View all use cases" card -->
          <div
            class="rounded-2xl w-full p-[0.0625rem] shadow-md bg-gradient-blue hover:bg-gradient-blue transition-all duration-300 hover:shadow-2xl cardShadow"
          >
            <div
              class="flex flex-col space-y-4 w-full h-full items-center justify-center rounded-2xl bg-[#23282c] p-8"
            >
              <div class="w-16 h-16 overflow-hidden">
                <CustomImage src="CardSeeALLicon.svg" alt="View all use cases" cssClass="w-full h-full object-cover" />
              </div>
              <h3 class="text-[#BEC0C2] text-base font-semibold">View all use cases</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>
