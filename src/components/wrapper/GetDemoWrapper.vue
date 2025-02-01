<script setup>
import Heading from "../core/Heading.vue";
import CustomButton from "../core/CustomButton.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  btnData: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <Heading :title="props.title" align="CENTER" />
  <div class="py-10 text-center">
    <CustomButton variant="secondary" :buttonText="props.btnData.text">
    </CustomButton>
  </div>
</template>
