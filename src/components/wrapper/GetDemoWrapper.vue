<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomInterChange from "../core/CustomInterChange.vue";
import CustomButton from "../core/CustomButton.vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading :title="props.items.title" align="CENTER" />
    <div class="py-10 text-center">
      <CustomButton variant="secondary">
        {{ props.items.btnTitle }}
      </CustomButton>
    </div>
  </CustomSection>
</template>
