<script setup>
import CardForDemoWrapper from "../core/CardForDemoWrapper.vue";
import CustomSection from "../core/CustomSection.vue";
import SalesForm from "../forms/SalesForm.vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
    <CustomSection>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <!-- Left: contact Form -->
          <SalesForm />

        <!-- Right: Why Choose Section -->
        <div class="flex flex-col bg-white p-3 rounded-md"  style="box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

          <h2 class="text-xl md:text-2xl xl:text-3xl  font-semibold text-black text-left">{{ title }}</h2>
          <div class="mt-6 space-y-6">
            <CardForDemoWrapper
              v-for="(card, index) in items"
              :key="index"
              :title="card.title"
              :description="card.description"
              :icon="card.icon"
              :theme="card.theme"
            />
          </div>
        </div>
      </div>
    </CustomSection>
</template>