<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomTabs from "../core/CustomTabs.vue";
import GetDemoWrapper from "./GetDemoWrapper.vue";
import CustomSeprater from "../core/CustomSeprater.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  heading:{
    type:Object,
    required:true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading
      :title="heading?.title"
      :description="heading?.subtitle"
      align="CENTER"
    />

    <CustomTabs class="py-10" :items="items" client:load />
    <div v-if="items.getDemoButton && items.getDemoTitle">
      <GetDemoWrapper
        :title="props.items.getDemoTitle"
        :btnData="props.items.getDemoButton"
      />
    </div>
  </CustomSection>
  <div>
    <CustomSeprater />
  </div>
</template>
<style scoped></style>
