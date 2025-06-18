<template>
  <CustomSection sectionClass="!pt-0">
    <div class="py-3 grid grid-cols-1 lg:grid-cols-3 w-full max-w-7xl mx-auto" v-if="authors">
      <SingleAuthorDetails :type="type" :author="authors" client:load class="col-span-2" />
      <div class="col-span-1"></div>
    </div>
  </CustomSection>
</template>
<script setup lang="ts">
import SingleAuthorDetails from "../blog/SingleAuthorDetails.vue";
import CustomSection from "../core/CustomSection.vue";
const props = defineProps({
  authors: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
console.log(props.authors, "authorrrrr")
</script>
<style scoped></style>
