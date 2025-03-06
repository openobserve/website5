<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";

const props = defineProps({
  heading: {
    type: Object,
    required: true,
  },
  items: {
    type: Array as () => Array<{
      id: number;
      title: string;
      description: string;
      image?: string;
      sections?: { title: string; description: string }[];
      primaryButton?: { text: string; link: string; icon?: string };
      secondaryButton?: { text: string; link: string; icon?: string };
    }>,
    required: true,
  },
  titleTextColor: {
    type: String,
    default: "text-[#E2E3E5]",
    required: false,
  },
  descriptionTextColor: {
    type: String,
    default: "text-[#BEC0C2]",
    required: false,
  },
  borderColor: {
    type: String,
    default: "bg-gradient-blue",
    required: false,
  },
});
</script>

<template>
  <CustomSection>
    <div class="py-3">
      <Heading
        :title="heading?.title"
        :description="heading?.subtitle"
        align="CENTER"
      />
    </div>
    <div
      :class="[
        `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 w-full mt-10`,
      ]"
    >
      <div
        class="card-bg rounded-2xl p-8 flex flex-col h-full border border-[#2A2B2E] hover:border-[#3A3B3E] transition-colors"
        v-for="item in items"
        :key="item.id"
      >
        <div class="flex flex-col items-center text-center">
          <!-- Icon -->
          <div
            class="w-12 h-12 mb-[4vh] flex items-center justify-center bg-[#2A2B2E] rounded-full"
          >
            <CustomImage :image="item.image" cssClass="w-6 h-6" />
          </div>

          <div>
            <!-- Main Title and Description -->
            <h2 :class="[titleTextColor, 'text-xl font-semibold mb-3']">
              {{ item.title }}
            </h2>
            <p :class="[descriptionTextColor, 'text-sm']">
              {{ item.description }}
            </p>
          </div>

          <!-- Sections -->
          <div v-for="(section, index) in items" :key="index" class="pb-[1vh]">
            <CustomSeprater class="my-5" />
            <h3 :class="[titleTextColor, 'text-base font-semibold mb-2']">
              {{ section.title }}
            </h3>
            <p :class="[descriptionTextColor, 'text-sm']">
              {{ section.description }}
            </p>
          </div>
        </div>

        <div class="flex flex-row justify-center mt-5 space-x-2">
          <div v-if="item?.primaryButton">
            <CustomButton
              variant="secondary"
              :buttonText="item?.primaryButton?.text"
              :buttonLink="item?.primaryButton?.link"
            >
              <CustomImage
                cssClass="w-10 h-5"
                v-if="item.primaryButton?.icon"
                :image="item?.primaryButton?.icon"
              />
            </CustomButton>
          </div>
          <div v-if="item?.secondaryButton">
            <CustomButton
              variant="secondary"
              :buttonText="item?.secondaryButton?.text"
              :buttonLink="item?.secondaryButton?.link"
            >
              <CustomImage
                cssClass="w-10 h-5"
                v-if="item?.secondaryButton?.icon"
                :image="item?.secondaryButton?.icon"
              />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  </CustomSection>
</template>
<style scoped>
.car-bg {
  background: rgba(18, 21, 24, 0.7);
}
</style>
