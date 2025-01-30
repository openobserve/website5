<script setup>
import CustomInterChange from "../core/CustomInterChange.vue";
import CustomSection from "../core/CustomSection.vue";
import Heading from "../core/Heading.vue";
const props = defineProps({
  // title: {
  //   type: String,
  //   required: true,
  // },
  // description: {
  //   type: String,
  //   required: true,
  // },
  heading:{
    type:Object,
    required:true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <CustomSection>
    <div class="">
      <Heading :title="heading.title" :description="heading.subtitle" align="CENTER" />
    </div>
    <div class="container mx-auto px-4 md:px-10" v-for="(item, index) in items">
      <CustomInterChange
        :key="{ index }"
        :items="item.items"
        :title="item.title"
        :image="item.image"
        :direction="index % 2 === 0 ? 'left' : 'right'"
      />
    </div>
  </CustomSection>
</template>
