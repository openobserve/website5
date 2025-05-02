<script setup>
import { ref } from 'vue';
import CustomSection from "../core/CustomSection.vue";
import HeadingSection from "../core/HeadingSection.vue";
import CardWithSideIcon from "../core/CardWithSideIcon.vue";
import CustomButton from "../core/CustomButton.vue";
import TabsHeader from "../core/TabsHeader.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  btnValues: {
    type: String,
    required: false,
  },
  data: {
    type: Array,
    required: true,
  }
});

</script>

<template>
  <CustomSection>
    <div>
      <!-- Heading Section -->
      <HeadingSection :title="title" :description="description" align="center" />

      <!-- Card rendering based on activeTab -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <CardWithSideIcon v-for="(card, index) in data" :key="index" :title="card.title" :description="card.description"
          :icon="card.icon" :theme="card.theme" />
      </div>
    </div>
  </CustomSection>
</template>