<script setup lang="ts">
import { ref } from "vue";
import TabsHeader from "../core/TabsHeader.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomButton from "../core/CustomButton.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  align: {
    type: String,
    default: "center",
  },
  data: {
    type: Object,
    required: true,
  },
  standardCTA: {
    type: Object,
    required: false,
  },
  enterpriseCTA: {
    type: Object,
    required: false,
  },
});

const tabs = [
  { label: "Standard", value: "standard" },
  { label: "Enterprise", value: "enterprise" },
];

const activeTab = ref("standard");
</script>
<template>
  <CustomSection class="">
    <!-- Heading Section -->
    <HeadingSection :title="title" :description="description" align="center" />
    <!-- Centered Tabs -->
    <div class="flex justify-center">
      <div class="w-full">
        <TabsHeader
          :tabs="tabs"
          :activeTab="activeTab"
          gridClass="grid w-full max-w-3xl grid-cols-2 gap-2"
          @update:activeTab="activeTab = $event"
        />
      </div>
    </div>

    <!-- Card rendering based on activeTab -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <CardWithSideIcon
        v-for="(card, index) in data[activeTab]"
        :key="index"
        :title="card.title"
        :description="card.description"
        :icon="card.icon"
        :theme="card.theme"
      />
    </div>

    <div class="text-center mt-12">
      <CustomButton
        :buttonLink="
          activeTab === 'standard'
            ? standardCTA?.buttonLink
            : enterpriseCTA?.buttonLink
        "
        :btn-class="`!text-sm ${activeTab === 'standard' ? standardCTA?.theme : enterpriseCTA?.theme}`"
        size="small"
        class="inline-flex"
        :buttonText="
          activeTab === 'standard'
            ? standardCTA?.buttonText
            : enterpriseCTA?.buttonText
        "
      />
    </div>
  </CustomSection>
</template>
