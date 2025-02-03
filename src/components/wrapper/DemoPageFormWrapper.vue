<script setup>
import LeftFeatureSection from "../../components/forms/LeftFeatureSection.vue";
import SampleForm from "../../components/forms/SampleForm.vue";

defineProps({
  description: {
    type: String,
    required: true,
  },
  keyFeatures: {
    type: Array,
    required: true,
  },
  keyFeatures2: {
    type: Array,
    required: true,
  },
  footerdescription: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg glass-card p-6 md:p-12 max-w-7xl mx-auto"
  >
    <div class="flex flex-col md:flex-row gap-8">
      <LeftFeatureSection
        :description="description"
        :keyFeatures="keyFeatures"
        :keyFeatures2="keyFeatures2"
        :footerdescription="footerdescription"
      />
      <SampleForm />
    </div>
    <div
      class=""
      style="background-image: url('/demoPage/Eclipse-2.svg')"
    ></div>
  </div>
</template>
<style scoped>
.glass-card {
  border-radius: 16px;
  border-top: 1px solid var(--Glass-stroke, #fff);
  background: linear-gradient(
    180deg,
    rgba(1, 1, 1, 0.48) 29.9%,
    rgba(1, 1, 1, 0.8) 100%
  );
}
</style>
