<template>
  <CustomSection sectionClass="">
    <!-- Heading Section -->
    <HeadingSection :title="title" :description="description" align="LEFT" class="" />

    <!-- Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-10">
      <div class="w-full group" v-for="(item, index) in items" :key="index">
        <SupportCard :data="item" />
      </div>
    </div>
  </CustomSection>
</template>

<script setup lang="ts">
import SupportCard from "@/components/contactus/SupportCard.vue";
import CustomSection from "@/components/core/CustomSection.vue";
import HeadingSection from "@/components/core/HeadingSection.vue";
const props = defineProps<{
  title: string;
  description: string;
  items: Array<any>;
}>();
</script>
