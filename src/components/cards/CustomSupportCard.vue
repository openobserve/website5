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
      icon: string;
      title: string;
      description: string;
      sections: SupportSection[];
      buttons: {
        text: string;
        icon?: string;
        type: "default" | "discord" | "slack";
        variant?: string;
      }[];
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
    class="card-bg rounded-2xl p-8 flex flex-col h-full border border-[#2A2B2E] hover:border-[#3A3B3E] transition-colors"
  >
    <div class="flex flex-col items-center text-center">
      <!-- Icon -->
      <div
        class="w-12 h-12 mb-6 flex items-center justify-center bg-[#2A2B2E] rounded-full"
      >
        <CustomImage :src="card.icon" :alt="card.title" cssClass="w-6 h-6" />
      </div>

      <!-- Main Title and Description -->
      <h2 :class="[titleTextColor, 'text-xl font-semibold mb-3']">
        {{ card.title }}
      </h2>
      <p :class="[descriptionTextColor, 'text-sm mb-8']">
        {{ card.description }}
      </p>

      <!-- Sections -->
      <div class="flex-grow">
        <div
          v-for="(section, index) in card.sections"
          :key="index"
          class="py-3"
        >
          <CustomSeprater class="my-5" />
          <h3 :class="[titleTextColor, 'text-base font-semibold mb-2']">
            {{ section.title }}
          </h3>
          <p :class="[descriptionTextColor, 'text-sm']">
            {{ section.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center gap-5 text-center">
      <div v-for="(button, index) in card.buttons" :key="index" class="mb-2">
        <CustomButton
          :variant="button.variant || 'secondary'"
          class="flex items-center justify-center gap-2"
        >
          <!-- Render icon if provided -->
          <CustomImage cssClass="px-4" v-if="button.icon" :src="button.icon" alt="button icon " />
          <!-- Render text if no icon is provided -->
          <span v-else>
            {{ button.text }}
          </span>
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
