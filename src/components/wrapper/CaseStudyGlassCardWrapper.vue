<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import LeftSideCard from "../../components/cardComponent/LeftSideCard.vue";
import RightSideCard from "../../components/cardComponent/RightSideCard.vue";
import CustomButton from "../core/CustomButton.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <CustomSection>
    <Heading
      :title="props.title"
      :description="props.description"
      align="CENTER"
    />
    <!-- Desktop View -->
    <div class="md:block py-10 relative">
      <CustomImage
        image="/img/bg/gradient-bg/Ellipse-141.svg"
        altText="Background decoration"
        cssClass="absolute opacity-30 object-contain"
      />
    </div>
    <div
      class="flex flex-row gap-3 justify-center container mx-auto pt-3 h-full w-full"
    >
      <div v-if="props.items.length > 0">
        <LeftSideCard
          class="relative bg-opacity-80 backdrop-blur-lg glass-card"
          :card="props.items[0]"
        />
      </div>

      <div v-if="props.items.length > 0">
        <RightSideCard :cards="props.items.slice(1)" />
      </div>
    </div>

    <div class="flex justify-center" v-if="buttonText">
      <CustomButton
        variant="secondary"
        size="medium"
        :buttonText="buttonText"
      />
    </div>

    <!-- Mobile View -->
    <div class="block md:hidden">
      <div class="flex flex-col space-y-3">
        <LeftSideCard
          class="relative bg-opacity-80 backdrop-blur-lg glass-card"
          v-for="(card, index) in props.items"
          :key="index"
          :card="card"
        />
      </div>
    </div>
  </CustomSection>
</template>
<style scoped>
.glass-card {
  background: linear-gradient(
    180deg,
    rgba(1, 1, 1, 0.48) 29.9%,
    rgba(1, 1, 1, 0.8) 100%
  );
}
</style>
