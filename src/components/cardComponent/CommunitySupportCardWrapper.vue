<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./CommunitySupportCard.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomSectionBackground from "../core/CustomSectionBackground.vue";

const props = defineProps({
  cardData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
    <CustomSection>
      <div class="flex flex-col max-w-full container mx-auto space-y-14">
        <Heading
          :title="props.cardData?.title"
          :description="props.cardData?.description"
        />
        <div class="mt-10">
          <div class="flex flex-col justify-center">
            <IconTitleCard :cards="props.cardData?.items" />
          </div>
        </div>
        <Heading 
         :description="props.cardData?.subtitle"
        />
      </div>
    </CustomSection>
</template>
