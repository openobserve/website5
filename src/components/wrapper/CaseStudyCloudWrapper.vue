<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import LeftSideCard from "../../components/cardComponent/LeftSideCard.vue";
import RightSideCard from "../../components/cardComponent/RightSideCard.vue";
import CustomButton from "../core/CustomButton.vue";
import CustomSectionBackground from "../core/CustomSectionBackground.vue";
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
    <div class="hidden md:block py-10 relative">
      <img
        src="/Platform/Ellipse-141.svg"
        alt="Image"
        class="absolute opcacity-30 object-contain"
      />
      <div class="">
        <div v-if="props.items.length > 0">
          <RightSideCard :card="props.items" />
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <CustomButton
        variant="secondary"
        size="medium"
        buttonText="SEE ALL BLOGS"
      />
    </div>
    <!-- Mobile View -->
    <div class="block md:hidden">
      <div class="flex flex-col space-y-3">
        <LeftSideCard
          v-for="(card, index) in props.items"
          :key="index"
          :card="card"
        />
      </div>
    </div>
  </CustomSection>
</template>
