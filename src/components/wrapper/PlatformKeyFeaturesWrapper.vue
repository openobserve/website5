<script setup lang="ts">
import { computed, ref } from "vue";
import TabsHeader from "../core/TabsHeader.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomButton from "../core/CustomButton.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CustomSection from "../core/CustomSection.vue";
const props = defineProps({
  heading:{
    type: Object,
    required: false,
  },
  tabs:{
    type: Array,
    required: false,
  },
  align: {
    type: String,
    default: "center",
  },
  standard:{
    type: Array,
    required: true,
  },
  enterprise:{
    type: Array,
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

const tabData = computed(() => {
  return activeTab.value === "standard" ? props.standard : props.enterprise;
});

</script>
<template>
  <CustomSection class="">
    <!-- Heading Section -->
    <HeadingSection :title="heading?.title" :description="heading?.description" align="center" />
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
      <CardWithSideIcon v-for="(item, index) in tabData" :key="index" :card="item" class="w-full h-full" />
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
