<script setup>
import { defineProps } from "vue";
import IconTitleCard from "./UsecaseCardWithIcon.vue";
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
    <div class="flex flex-col max-w-full container mx-auto">
      <Heading :title="props.cardData?.title" :description="props.cardData?.description" />
      <div class="mt-10">
        <div class="flex flex-col justify-center">
          <IconTitleCard :cards="props.cardData?.items" />
        </div>
      </div>
    </div>
  </CustomSection>
</template><script setup>
import { defineProps } from "vue";
import IconTitleCard from "./UsecaseCardWithIcon.vue";
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
    <div class="flex flex-col max-w-full">
      <Heading :title="props.cardData.title" :description="props.cardData.description" />
      <div class="mt-10">
        <div class="flex flex-col justify-center">
          <IconTitleCard :cards="props.cardData.items" />
        </div>
      </div>
    </div>
  </CustomSection>
</template>
