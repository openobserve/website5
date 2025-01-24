<script setup>
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
import CustomInterChange from "../core/CustomInterChange.vue";
const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <Heading
      :title="props.items.title"
      :description="props.items.subtitle"
      align="CENTER"
    />
    <div v-for="(item, index) in props.items.items" :key="index">
      <CustomInterChange
        :key="index"
        :items="item.Items"
        :title="item.Title"
        :image="item.Image"
        :direction="`${index % 2 === 0 ? 'left' : 'right'}`"
      />
    </div>
  </CustomSection>
</template>
<style scoped></style>
