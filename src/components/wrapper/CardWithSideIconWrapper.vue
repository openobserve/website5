<script setup>
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithShadowBorder from "../core/CardWithShadowBorder.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomButton from "../core/CustomButton.vue";

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
});
</script>

<template>
  <CustomSection>
    <div>
      <!-- Heading Section -->
      <HeadingSection :title="title" :description="description" align="center" />
      <div className="relative group mx-auto max-w-5xl">
        <div
          className="absolute -inset-1 bg-gradient-to-r from-primary-purple to-primary-blue rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300">
        </div>
        <div class="relative flex justify-center items-center">
          <button className="w-full  cursor-pointer transition-all duration-300 transform group-hover:scale-[1.01]">
            <img :src="image?.url" :alt="image?.altText" className="rounded-lg border shadow-md" />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 rounded-lg transition-all duration-300">
            </div>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- CardWithSideIcon -->
        <CardWithSideIcon v-for="(card, index) in data" :key="index" :title="card.title" :description="card.description"
          :icon="card.icon" :theme="card.theme" :items="card.items" />
      </div>
      <div class="text-center mt-6">
        <CustomButton :buttonLink="btnValues?.buttonLink" :btn-class="btnValues?.theme" size="small" class="text-md inline-flex px-10 py-4"
          :buttonText="btnValues?.buttonText" />
      </div>

    </div>
  </CustomSection>
</template>