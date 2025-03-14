<script setup lang="ts">
import CustomButton from "../core/CustomButton.vue";
import CustomImage from "../core/CustomImage.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
interface SupportSection {
  title: string;
  description: string;
}

const props = defineProps({
  card: {
    type: Object as () => {
      image: string;
      title: string;
      description: string;
      items: SupportSection[];
      primaryButton: {
        text: string;
        icon?: string;
        link?: string;
      };
      secondaryButton: {
        text: string;
        icon?: string;
        link?: string;
      };
    },
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
  <div
    class="card-bg rounded-2xl p-8 flex flex-col h-full border border-[#2A2B2E] hover:border-[#3A3B3E] transition-colors">
    <div class="flex flex-col items-center text-center">
      <!-- Icon -->
      <div class="w-12 h-12 mb-[4vh] flex items-center justify-center bg-[#2A2B2E] rounded-full">
        <CustomImage :image="card.image" cssClass="w-6 h-6" />
      </div>

      <div>
        <!-- Main Title and Description -->
        <h2 :class="[titleTextColor, 'text-xl font-semibold mb-3']">
          {{ card.title }}
        </h2>
        <p :class="[descriptionTextColor, 'text-sm']">
          {{ card.description }}
        </p>
      </div>

      <!-- Sections -->
      <div v-for="(section, index) in card.items" :key="index" class="pb-[1vh]">
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
      <div v-if="card?.primaryButton">
        <CustomButton variant="secondary" :buttonText="card?.primaryButton?.text"
          :buttonLink="card?.primaryButton?.link" :target="card?.primaryButton?.target">
          <CustomImage cssClass="w-10 h-5" v-if="card.primaryButton?.icon" :image="card?.primaryButton?.icon" />
        </CustomButton>
      </div>
      <div v-if="card?.secondaryButton">
        <CustomButton variant="secondary" :buttonText="card?.secondaryButton?.text"
          :buttonLink="card?.secondaryButton?.link" :target="card?.secondaryButton?.target">
          <CustomImage cssClass="w-10 h-5" v-if="card?.secondaryButton?.icon" :image="card?.secondaryButton?.icon" />
        </CustomButton>
      </div>
    </div>
  </div>
</template>
<style scoped>
.car-bg {
  background: rgba(18, 21, 24, 0.7);
}
</style>
