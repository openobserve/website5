<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import LeftSideCard from "../../components/cardComponent/LeftSideCard.vue";
import RightSideCard from "../../components/cardComponent/RightSideCard.vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading
      :title="props.items.title"
      :description="props.items.subtitle"
      align="CENTER"
    />
    <!-- Desktop View -->
    <div class="hidden md:block py-10 relative">
      <img
        src="/Platform/Ellipse 141.svg"
        alt="Image"
        class="absolute opcacity-30 object-contain"
      />
      <div
        class="flex flex-row gap-3 justify-center container mx-auto pt-3 h-full w-full"
      >
        <div v-if="props.items.items.length > 0">
          <LeftSideCard :card="props.items.items[0]" />
        </div>

        <div v-if="props.items.items.length > 0">
          <RightSideCard :cards="props.items.items.slice(1)" />
        </div>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="block md:hidden">
      <div class="flex flex-col space-y-3">
        <LeftSideCard
          v-for="(card, index) in props.items.items"
          :key="index"
          :card="card"
        />
      </div>
    </div>
  </CustomSection>
</template>
