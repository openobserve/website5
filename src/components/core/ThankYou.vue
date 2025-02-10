<script setup>
import CustomButton from "../../components/core/CustomButton.vue";
import CustomSection from "./CustomSection.vue";

const handleClick = () => {
  window.location.assign("/");
};
</script>
<template>
  <div class="">
    <CustomSection>
      <div
        class="flex flex-col justify-center items-center space-y-8 text-white"
      >
        <img src="/img/thank-you.svg" alt="" class="h-40" />
        <h1 class="text-5xl">Thank you!</h1>
        <h3 class="text-xl">
          We received your request. We'll get back to you soon...
        </h3>
        <CustomButton variant="primary" @click="handleClick">
          Back to Home
        </CustomButton>
      </div>
    </CustomSection>
  </div>
</template>
<style scoped></style>
