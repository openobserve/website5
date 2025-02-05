<script setup>
import LeftSideCommonFormFeature from "../../components/forms/LeftSideCommonFormFeature.vue";
import CustomSection from "../core/CustomSection.vue";
import CommonForm from "../forms/CommonForm.vue";
import TextWithGradient from "../HeaderComponents/TextWithGradient.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keyFeatures: {
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
  <CustomSection>
    <!-- Conditionally render TextWithGradient if title is provided -->
    <TextWithGradient
      v-if="title"
      class="text-2xl md:text-5xl font-bold text-center mb-6 max-w-xl mx-auto"
      :title="title"
      textGradientColor="text-color"
    />

    <div class="flex flex-col md:flex-row gap-8">
      <LeftSideCommonFormFeature
        :description="description"
        :keyFeatures="keyFeatures"
        :footerdescription="footerdescription"
      />
      <CommonForm />
    </div>

    <div
      class=""
      style="background-image: url('/demoPage/Eclipse-2.svg')"
    ></div>
  </CustomSection>
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
.text-color {
  background: var(
    --text-gradient,
    linear-gradient(270deg, #75cdd6 0%, #008cff 100%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
